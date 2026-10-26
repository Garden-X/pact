// Non-normative maintenance checks for the source contracts and complete examples.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseRecord, parseTasks, parsePendingTasks } from './reference.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const pact=path.join(root,'ai','pact');
const text=file=>fs.readFileSync(file,'utf8').replaceAll('\r\n','\n');
const read=relative=>text(path.join(pact,relative));
let checks=0,links=0;
const failures=[];
const check=(name,fn)=>{try{fn();checks++;}catch(error){failures.push({name,error:error.message});}};
const field=(body,key)=>{
  const values=[...body.matchAll(new RegExp('^ *'+key+': (.*)$','gmu'))].map(match=>match[1]);
  assert.equal(values.length,1,'unique field '+key);return values[0];
};
function example(template){
  const content=read(template),section=content.indexOf('## EXAMPLE\n');
  assert.ok(section>=0,'EXAMPLE section');
  const tail=content.slice(section),opening=/^(`{3,})md\n/mu.exec(tail);
  assert.ok(opening,'complete Markdown example');
  const start=opening.index+opening[0].length,closing=new RegExp('^'+opening[1]+' *$','mu').exec(tail.slice(start));
  assert.ok(closing,'closing example fence');
  return tail.slice(start,start+closing.index).trimEnd();
}
const stripStamp=value=>value.replace(/^updated: [^\n]+$/gmu,'updated: <stamp>').trimEnd();
check('path literal exclamation and canonical Git object IDs',()=>{
  assert.match(read('PACT.md'),/`!` is an ordinary literal\s+character, never a negation operator/u);
  assert.match(read('PACT.md'),/full lowercase hexadecimal immutable Git commit object IDs/u);
});
check('state tuples do not override task counts',()=>{
  assert.match(read('PACT.md'),/tuples are necessary, not sufficient/u);
  assert.match(read('PACT.md'),/`active-draft` requires at least\s+one pending or active task/u);
});
check('parallel disjointness applies to writes in all owning contracts',()=>{
  assert.match(read('PACT.md'),/their write reservations are pairwise disjoint/u);
  assert.match(read('workflow/WORKFLOW.md'),/tasks' write `reservations` are pairwise disjoint/u);
  assert.match(read('templates/state.tpl.md'),/write reservations across all blocks must be pairwise disjoint/u);
});
check('prose interpretation requires existing evidenced decision',()=>{
  assert.match(read('PACT.md'),/must not interpret prose into permission/u);
  assert.match(read('PACT.md'),/task\/boundary decision record/u);
  assert.match(read('PACT.md'),/same facts\/query return `unresolved`/u);
});
check('portable JSON whitespace and sequence range',()=>{
  assert.match(read('PACT.md'),/JSON whitespace is only space, tab, carriage return and line feed/u);
  assert.match(read('PACT.md'),/1 through 9007199254740991 inclusive/u);
  assert.match(read('templates/state.tpl.md'),/integer from 1 through 9007199254740991/u);
});
check('transfer bindings and handoff owning narrative remain authoritative',()=>{
  assert.match(read('templates/state.tpl.md'),/already explicit Pending actor, model tier, local model binding, effort/u);
  assert.match(read('templates/state.tpl.md'),/Compare the whole owning publication, including material narrative/u);
  assert.match(read('templates/state.tpl.md'),/seq bump\s+without a material payload change is invalid/u);
});
check('workflow full example matches active target',()=>assert.equal(stripStamp(example('templates/workflow.tpl.md')),stripStamp(read('workflow/WORKFLOW.md'))));

for(const [file,version] of [['workflow','3.8'],['state','1.10'],['tasks','1.13'],['logic-draft','1.7'],['file-guard','1.1'],['keep-alive','1.2']]){
  check(file+' template version',()=>assert.equal(field(read('templates/'+file+'.tpl.md').split('## WHAT')[0],'version'),version));
}
for(const [file,version] of [['workflow/WORKFLOW.md','3.8'],['context/state/STATE.md','1.10'],['context/state/TASKS.md','1.13'],['context/state/LOGIC-DRAFT.md','1.7']]){
  check(file+' active drift marker',()=>{
    const parsed=parseRecord(read(file),'meta');assert.equal(parsed.verdict,'valid');assert.equal(parsed.fields.generated_from_version,version);
  });
}
check('actual workflow authoritative declarations and separate File Guard',()=>{
  const parsed=parseRecord(read('workflow/WORKFLOW.md'),'workflow');assert.equal(parsed.verdict,'valid');
  assert.equal(parsed.fields.default_branch,'main');assert.equal(parsed.fields.authority_remote,'origin');
  assert.equal(parsed.fields.gate_branch_pattern,'gate/<id>');assert.equal(parsed.fields.task_branch_pattern,'task/<gate-id>/<task-id>');
  assert.equal(parsed.fields.file_guard,'none');
});
const pendingExample=example('templates/tasks.tpl.md'),activeExample=example('templates/state.tpl.md');
let pending,active;
check('complete TASKS example parses',()=>{pending=parsePendingTasks(pendingExample);assert.equal(pending.verdict,'valid');assert.equal(pending.tasks.length,2);});
check('complete STATE example parses',()=>{active=parseTasks(activeExample);assert.equal(active.verdict,'valid');assert.equal(active.tasks.length,1);});
for(const key of ['id','role','parent','requires','reservations','trace']) check('exact transferred mechanical '+key,()=>assert.deepEqual(active.tasks[0][key],pending.tasks[0][key]));
const firstPending=pendingExample.slice(pendingExample.indexOf('- [ ] PACT-YYYYMMDD-001'),pendingExample.indexOf('- [ ] PACT-YYYYMMDD-002'));
for(const key of ['brief','task_scope','permitted_area','protected_area','unchanged_contracts','allowed_side_effects','escalation','model_tier','effort','effective_effort','tests','validation']){
  check('exact transferred prose/binding '+key,()=>assert.equal(field(activeExample,key),field(firstPending,key)));
}
check('current STATE active objects parse without historical handoffs',()=>{
  const parsed=parseTasks(read('context/state/STATE.md'));assert.equal(parsed.verdict,'valid');
  const meta=parseRecord(read('context/state/STATE.md'),'meta');assert.equal(meta.verdict,'valid');
  if(meta.fields.status==='clear')assert.equal(parsed.tasks.length,0);
  else assert.deepEqual(new Set(String(meta.fields.active_task).split(',').map(value=>value.trim())),new Set(parsed.tasks.map(task=>task.id)));
});
check('current Pending task entries parse without active duplicates',()=>{
  const pendingCurrent=parsePendingTasks(read('context/state/TASKS.md')),activeCurrent=parseTasks(read('context/state/STATE.md'));
  assert.equal(pendingCurrent.verdict,'valid');assert.equal(activeCurrent.verdict,'valid');
  assert.ok(pendingCurrent.tasks.every(task=>!activeCurrent.tasks.some(current=>current.id===task.id)));
});
check('record reader ignores fenced current-heading spoof',()=>{
  const parsed=parseRecord('~~~md\n## META\nstatus: blocked\n~~~\n## META\nstatus: clear\n','meta');
  assert.equal(parsed.verdict,'valid');assert.equal(parsed.fields.status,'clear');
});
check('record reader rejects repeated current heading',()=>assert.equal(parseRecord('## META\nstatus: clear\n## META\nstatus: active\n','meta').verdict,'invalid'));

const walk=directory=>fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
  const file=path.join(directory,entry.name);
  if(entry.name==='cache'||entry.name==='.git')return [];
  return entry.isDirectory()?walk(file):entry.isFile()&&entry.name.endsWith('.md')?[file]:[];
});
function proseOnly(content){
  let fence=null;const visible=[];
  for(const line of content.split('\n')){
    if(fence){if(new RegExp('^ {0,3}'+fence.char+'{'+fence.length+',} *$','u').test(line))fence=null;continue;}
    const match=/^ {0,3}(`{3,}|~{3,})(.*)$/u.exec(line);
    if(match){fence={char:match[1][0],length:match[1].length};continue;}
    visible.push(line);
  }
  return visible.join('\n');
}
for(const file of [...walk(pact),path.join(root,'README.md'),...(fs.existsSync(path.join(root,'conformance','README.md'))?[path.join(root,'conformance','README.md')]:[])]){
  const content=proseOnly(text(file));
  for(const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/gu)){
    let target=match[1].trim().replace(/^<|>$/gu,'');
    if(/^[a-z][a-z0-9+.-]*:/iu.test(target)||target.startsWith('#')||target.startsWith('/'))continue;
    target=target.split('#')[0];if(!target||/[<>]/u.test(target))continue;
    const resolved=path.resolve(path.dirname(file),decodeURIComponent(target));links++;
    check('relative link '+path.relative(root,file)+' -> '+target,()=>assert.ok(fs.existsSync(resolved),'missing '+resolved));
  }
}
console.log(JSON.stringify({checks,links,failures},null,2));
if(failures.length)process.exitCode=1;
