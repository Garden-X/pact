// Non-normative synthetic preservation/guard test; never migrates installations.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const fixturePath = new URL('./migration-fixtures.json', import.meta.url);
const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
const hash = text => createHash('sha256').update(text).digest('hex');
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
const stable = value => JSON.stringify(canonical(value));
export function planMigration(snapshot) {
  const before = Object.fromEntries(Object.entries(snapshot.files).map(([path,text]) => [path, hash(text)]));
  const after = { ...snapshot.files };
  // This deliberate small fixture mapping is not a general Markdown migrator.
  after['STATE.md'] = after['STATE.md'].replace(/(      - path: ([^\n]+)\n)        mode: write\n/u, '$1        mode: modify\n      - path: $2\n        mode: create\n');
  const plan = { sourceRevision: snapshot.sourceRevision, targetRevision: snapshot.targetRevision, before, after };
  plan.planHash = hash(stable(plan));
  return plan;
}
export function applyFixturePlan(plan, current, review, write) {
  const { planHash, ...payload } = plan;
  if (hash(stable(payload)) !== planHash) throw new Error('plan content hash mismatch');
  if (!review || review.planHash !== planHash || typeof review.evidence !== 'string' || !review.evidence.trim()) throw new Error('explicit reviewed plan required');
  if (current.sourceRevision !== plan.sourceRevision) throw new Error('source revision changed');
  if (current.targetRevision !== plan.targetRevision) throw new Error('target revision changed');
  if (stable(Object.keys(current.files).sort()) !== stable(Object.keys(plan.before).sort())) throw new Error('target file set changed');
  for (const [path, expectedHash] of Object.entries(plan.before)) if (hash(current.files[path]) !== expectedHash) throw new Error('target file hash changed: ' + path);
  // All guards precede the writer. This callback only writes synthetic fixture
  // copies when tests invoke it; this file never applies to the real project.
  write(structuredClone(plan.after));
  return { verdict:'applied' };
}
export function selfTest() {
  const snapshot = structuredClone(fixture), original = JSON.stringify(snapshot);
  const plan = planMigration(snapshot);
  assert.equal(JSON.stringify(snapshot), original, 'planning must not mutate source');
  let checks = 1;
  const review = { planHash:plan.planHash, evidence:'reviewed-synthetic-fixture' };
  const denied = (changedPlan, current, approval, reason) => {
    let writes = 0;
    assert.throws(() => applyFixturePlan(changedPlan, current, approval, () => { writes++; }), reason);
    assert.equal(writes, 0, 'failed guard must not invoke fixture writer');
    checks += 2;
  };
  denied(plan, { ...snapshot, sourceRevision:'dddddddddddddddddddddddddddddddddddddddd' }, review, /source revision/u);
  denied(plan, { ...snapshot, targetRevision:'dddddddddddddddddddddddddddddddddddddddd' }, review, /target revision/u);
  denied(plan, { ...snapshot, files:{ ...snapshot.files, 'STATE.md':snapshot.files['STATE.md']+'concurrent edit\n' } }, review, /file hash/u);
  denied(plan, { ...snapshot, files:{ ...snapshot.files, 'extra.md':'concurrent file' } }, review, /file set/u);
  denied(plan, snapshot, null, /reviewed plan/u);
  denied(plan, snapshot, { ...review, planHash:'stale-plan-hash' }, /reviewed plan/u);
  denied({ ...plan, after:{ ...plan.after, 'STATE.md':'tampered replacement' } }, snapshot, review, /content hash/u);
  let migrated;
  assert.deepEqual(applyFixturePlan(plan,snapshot,review,files => { migrated=files; }),{verdict:'applied'}); checks++;
  assert.equal(JSON.stringify(snapshot),original,'apply must preserve original snapshot'); checks++;
  const section = (text,name) => {
    const marker='## '+name+'\n', start=text.indexOf(marker);
    assert.ok(start>=0,'missing section '+name);
    const end=text.indexOf('\n## ',start+marker.length);
    return text.slice(start,end<0?undefined:end);
  };
  for (const requirement of fixture.preserved) {
    const before=snapshot.files[requirement.file], after=migrated[requirement.file];
    if(requirement.whole) assert.equal(after,before);
    else if(requirement.section) assert.equal(section(after,requirement.section),section(before,requirement.section));
    else { assert.ok(before.includes(requirement.text)); assert.ok(after.includes(requirement.text)); }
    checks++;
  }
  assert.match(migrated['STATE.md'],/mode: modify\n      - path: src\/\*\*\n        mode: create/u); checks++;
  assert.doesNotMatch(migrated['STATE.md'],/mode: delete/u); checks++;
  return { checks, preservationItems:fixture.preserved.length };
}
function realProjectPlanOnly() {
  const repository=new URL('../',import.meta.url);
  const revision=execFileSync('git',['rev-parse','HEAD'],{cwd:repository,encoding:'utf8'}).trim();
  const names=['STATE.md','TASKS.md','LOGIC-DRAFT.md'];
  const files=Object.fromEntries(names.map(name => [name,fs.readFileSync(new URL('../ai/pact/context/state/'+name,import.meta.url),'utf8')]));
  const before=Object.fromEntries(Object.entries(files).map(([path,text])=>[path,hash(text)]));
  const plan=planMigration({sourceRevision:revision,targetRevision:revision,files});
  for(const name of names)assert.equal(hash(fs.readFileSync(new URL('../ai/pact/context/state/'+name,import.meta.url),'utf8')),before[name],'plan-only must leave real records unchanged');
  return {mode:'plan-only',revision,files:names.length,planHash:plan.planHash,applied:false};
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) console.log(JSON.stringify({...selfTest(),realProject:realProjectPlanOnly()}));
