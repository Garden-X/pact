// Non-normative reference evaluator. Normative decisions live in PACT and cases.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const consumed = new Set(['file_guard','status','active_task','generated_from','generated_from_version','default_branch','authority_remote','gate_branch_pattern','task_branch_pattern','gate_id','seq','signal','candidate','branch','lead','recorded_at','id','role','actor','parent','task_phase','ready','requires','reservations','task_base','task_branch','task_candidate','source','trace','model_tier','model_binding','effort','effective_effort','decision','evidence','mode']);
const types = new Set(['meta','workflow','task','gate-handoff','acceptance']);
const clean = text => String(text).replaceAll('\r\n','\n');
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
export const same = (a,b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));

export function normalizePath(raw, directories = []) {
  if (typeof raw !== 'string' || !raw || /[\\\x00-\x1f\x7f]/u.test(raw)) throw new Error('invalid path');
  let value = raw.startsWith('/') ? raw.slice(1) : raw;
  if (value.startsWith('/') || !value || value.includes('//') || /^[A-Za-z][A-Za-z0-9+.-]*:/u.test(value)) throw new Error('invalid path');
  const directory = value.endsWith('/') || directories.includes(value);
  if (value.endsWith('/')) value = value.slice(0,-1);
  const segments = value.split('/');
  if (segments.some(segment => !segment || segment === '.' || segment === '..' || segment.includes('**') && segment !== '**' || /[?\[\]{}]/u.test(segment))) throw new Error('invalid path');
  if (directory && segments.at(-1) !== '**') segments.push('**');
  return segments.join('/');
}
function normalizeTarget(raw) {
  if(typeof raw!=='string'||!raw||/[\\\x00-\x1f\x7f]/u.test(raw))throw new Error('invalid target');
  const value=raw.startsWith('/')?raw.slice(1):raw;
  if(!value||/^[A-Za-z][A-Za-z0-9+.-]*:/u.test(value)||value.split('/').some(s=>!s||s==='.'||s==='..'))throw new Error('invalid target');
  return value;
}
const scalarSegment = (pattern,value) => {
  const p = [...pattern], v = [...value], memo = new Map();
  const visit = (i,j) => {
    const key = `${i}:${j}`; if (memo.has(key)) return memo.get(key);
    const answer = i === p.length ? j === v.length : p[i] === '*' ? visit(i+1,j) || j < v.length && visit(i,j+1) : j < v.length && p[i] === v[j] && visit(i+1,j+1);
    memo.set(key,answer); return answer;
  };
  return visit(0,0);
};
export function matchesPath(pattern, path, directories = []) {
  const p = normalizePath(pattern,directories).split('/');
  const normalized = normalizeTarget(path);
  const v = normalized.split('/'), memo = new Map();
  const visit = (i,j) => {
    const key = `${i}:${j}`; if (memo.has(key)) return memo.get(key);
    const answer = i === p.length ? j === v.length : p[i] === '**' ? visit(i+1,j) || j < v.length && visit(i,j+1) : j < v.length && scalarSegment(p[i],v[j]) && visit(i+1,j+1);
    memo.set(key,answer); return answer;
  };
  return visit(0,0);
}
function segmentOverlap(left,right) {
  const a = [...left], b = [...right], alphabet = [...new Set([...a,...b,'a','~'].filter(c => c !== '*'))];
  const queue = [[0,0,false]], seen = new Set();
  while (queue.length) {
    const [i,j,used] = queue.shift(), key = `${i}:${j}:${used}`;
    if (seen.has(key)) continue; seen.add(key);
    if (i === a.length && j === b.length && used) return true;
    if (a[i] === '*') queue.push([i+1,j,used]);
    if (b[j] === '*') queue.push([i,j+1,used]);
    for (const char of alphabet) {
      const x = a[i] === '*' ? i : a[i] === char ? i+1 : -1;
      const y = b[j] === '*' ? j : b[j] === char ? j+1 : -1;
      if (x >= 0 && y >= 0) queue.push([x,y,true]);
    }
  }
  return false;
}
export function patternsOverlap(left,right,directories=[]) {
  const a=normalizePath(left,directories).split('/'), b=normalizePath(right,directories).split('/'), queue=[[0,0,false]], seen=new Set();
  while(queue.length) {
    const [i,j,used]=queue.shift(), key=`${i}:${j}:${used}`; if(seen.has(key))continue;seen.add(key);
    if(i===a.length&&j===b.length&&used)return true;
    if(a[i]==='**')queue.push([i+1,j,used]);
    if(b[j]==='**')queue.push([i,j+1,used]);
    if(i<a.length&&j<b.length&&(a[i]==='**'||b[j]==='**'||segmentOverlap(a[i],b[j])))queue.push([a[i]==='**'?i:i+1,b[j]==='**'?j:j+1,true]);
  }
  return false;
}

// JSON.parse alone accepts duplicate object keys. This reader rejects them.
export function strictJSON(text) {
  let i=0;
  const ws=()=>{while(i<text.length&&/[ \t\r\n]/u.test(text[i]))i++;};
  const string=()=>{
    const start=i++;let escaped=false;
    while(i<text.length){const c=text[i++];if(c==='"'&&!escaped)return JSON.parse(text.slice(start,i));if(c==='\\'&&!escaped)escaped=true;else escaped=false;}
    throw new Error('unterminated JSON string');
  };
  const value=()=>{
    ws(); const c=text[i];
    if(c==='"')return string();
    if(c==='{'){
      i++;ws();const object=Object.create(null);if(text[i]==='}'){i++;return object;}
      while(i<text.length){ws();if(text[i]!=='"')throw new Error('JSON object key');const key=string();if(Object.hasOwn(object,key))throw new Error('duplicate JSON key');ws();if(text[i++]!==':')throw new Error('JSON colon');object[key]=value();ws();const end=text[i++];if(end==='}')return object;if(end!==',')throw new Error('JSON object separator');}
    }
    if(c==='['){i++;ws();const array=[];if(text[i]===']'){i++;return array;}while(i<text.length){array.push(value());ws();const end=text[i++];if(end===']')return array;if(end!==',')throw new Error('JSON array separator');}}
    const match=/^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/u.exec(text.slice(i));if(!match)throw new Error('JSON value');i+=match[0].length;return JSON.parse(match[0]);
  };
  const result=value();ws();if(i!==text.length)throw new Error('trailing JSON');return result;
}
// Validate this consumed integer from its decimal token before IEEE754 can
// round a noninteger into an integer. Other JSON numbers retain JSON semantics.
function exactSequence(text) {
  const match=/^[ \t\r\n]*(-?)(0|[1-9]\d*)(?:\.(\d+))?(?:[eE]([+-]?\d+))?[ \t\r\n]*$/u.exec(text);
  if(!match||match[1])throw new Error('sequence number');
  let digits=(match[2]+(match[3]||'')).replace(/^0+/u,'');
  if(!digits)throw new Error('positive sequence');
  const scale=BigInt(match[4]||'0')-BigInt((match[3]||'').length);
  if(scale<0n){
    const remove=-scale;
    if(remove>BigInt(digits.length))throw new Error('fractional sequence');
    const count=Number(remove);
    if(!/^0+$/u.test(digits.slice(-count)))throw new Error('fractional sequence');
    digits=digits.slice(0,-count);
  }else{
    if(BigInt(digits.length)+scale>16n)throw new Error('sequence range');
    digits+='0'.repeat(Number(scale));
  }
  const exact=BigInt(digits);
  if(exact<1n||exact>9007199254740991n)throw new Error('sequence range');
  return Number(exact);
}
function legacyScalar(value,key) {
  if(value==='none'||value==='null')return value;
  if(value==='true')return true;if(value==='false')return false;
  if(key==='seq'){if(!/^[1-9]\d*$/u.test(value))throw new Error('seq');return exactSequence(value);}
  if(value.startsWith('[')&&value.endsWith(']'))return value.slice(1,-1).trim()?value.slice(1,-1).split(',').map(v=>v.trim().replace(/^"(.*)"$/u,'$1')):[];
  if(value.startsWith('"'))return strictJSON(value);
  return value;
}
function legacyRootFields(lines) {
  const roots=[];let rootIndent=null;
  for(let index=0;index<lines.length;index++){
    const match=/^( *)([a-z][a-z0-9_]*):(?: (.*))?$/u.exec(lines[index]);
    if(!match)continue;
    const indent=match[1].length;
    // A deeper label remains part of the preceding scalar continuation or
    // mapping. It is opaque prose unless that owning field has a typed reader.
    // A later dedented root must not discard earlier visually indented roots.
    if(rootIndent===null||indent<=rootIndent){rootIndent=indent;roots.push({line:lines[index],index,m:match});}
  }
  return roots;
}
function scanDocument(text) {
  const lines=clean(text).split('\n'),headings=[],blocks=[],visible=[];let open=null,current=null;
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(open){if(new RegExp(`^ {0,3}${open.char}{${open.length},} *$`,'u').test(line)){blocks.push({...open,end:i,lines:lines.slice(open.start+1,i)});open=null;}continue;}
    const fence=/^ {0,3}(`{3,}|~{3,})(.*)$/u.exec(line);
    if(fence){open={char:fence[1][0],length:fence[1].length,info:fence[2].trim(),start:i,heading:current};continue;}
    const heading=/^## ([^\n]+)$/u.exec(line);if(heading){current={name:heading[1],index:i};headings.push(current);}
    visible.push({line,index:i,heading:current});
  }
  return {lines,headings,blocks,visible,unclosed:open};
}
function section(text,heading) {
  const doc=scanDocument(text),matches=doc.headings.filter(h=>h.name===heading);
  if(matches.length>1)throw new Error('duplicate owning heading');if(!matches.length)return null;
  const start=matches[0].index,end=doc.headings.find(h=>h.index>start)?.index??doc.lines.length;
  return doc.lines.slice(start+1,end).join('\n');
}
// A task prose surface is either a corpus projection heading or the template
// entry's root label with its deeper continuation, read relative to that
// label. Both surfaces at once are ambiguous. The prose is never interpreted.
function proseSurface(text,heading,key) {
  const doc=scanDocument(text),owner=doc.headings.find(h=>h.name==='Active Task');
  const visible=owner?doc.visible.filter(v=>v.heading?.index===owner.index&&!/^## /u.test(v.line)):[],lines=visible.map(v=>v.line);
  const labels=legacyRootFields(lines).filter(field=>field.m[2]===key),projection=heading?section(text,heading):null;
  if(labels.length>1||labels.length&&projection!==null)throw new Error('duplicate prose surface');
  if(projection!==null)return {form:'section',value:projection,fields:legacyRootFields(doc.visible.filter(v=>v.heading?.name===heading&&!/^## /u.test(v.line)).map(v=>v.line))};
  if(!labels.length)return null;
  const {index,m}=labels[0],indent=m[1].length,start=visible[index].index,width=line=>/^ */u.exec(line)[0].length;
  const end=visible.slice(index+1).find(v=>v.line.trim()&&width(v.line)<=indent)?.index??doc.headings.find(h=>h.index>owner.index)?.index??doc.lines.length;
  // The owning pact:task block is mechanical wherever it sits, never prose.
  const machine=new Set(doc.blocks.filter(block=>block.heading?.index===owner.index&&block.info==='pact:task').flatMap(block=>Array.from({length:block.end-block.start+1},(_,offset)=>block.start+offset)));
  const body=doc.lines.slice(start+1,end).filter((_,offset)=>!machine.has(start+1+offset)),fields=legacyRootFields(visible.filter(v=>v.index>start&&v.index<end).map(v=>v.line));
  // Structural lines delimit ownership; raw lines retain ordinary fences and
  // their contents, including unindented/root-looking text inside them.
  return {form:'label',value:[m[3]||'',...body.map(line=>line.slice(Math.min(indent,width(line))))].join('\n').trim(),fields};
}
const boundaryFields=['task_scope','permitted_area','protected_area','unchanged_contracts','allowed_side_effects','escalation'];
export function parseRecord(text,type) {
  if(!types.has(type)||typeof text!=='string')return {verdict:'invalid'};
  try {
    const heading={meta:'META',workflow:'Execution Hierarchy',task:'Active Task','gate-handoff':'Gate Handoff',acceptance:'Acceptance'}[type];
    const doc=scanDocument(text),owners=doc.headings.filter(h=>h.name===heading);
    if(owners.length>1)throw new Error('duplicate owning heading');if(!owners.length)return {verdict:'unresolved'};
    const owner=owners[0],blocks=doc.blocks.filter(b=>b.heading?.index===owner.index&&b.info===`pact:${type}`);
    if(blocks.length>1)throw new Error('duplicate block');
    if(doc.unclosed?.heading?.index===owner.index)return {verdict:'invalid'};
    const fields={},add=(key,value)=>{if(consumed.has(key)&&Object.hasOwn(fields,key))throw new Error('duplicate consumed field');Object.defineProperty(fields,key,{value,writable:true,enumerable:true,configurable:true});};
    if(blocks.length===1){for(const line of blocks[0].lines){if(!line.trim())continue;const match=/^([a-z][a-z0-9_]*): (.+)$/u.exec(line);if(!match)throw new Error('machine line');add(match[1],match[1]==='seq'?exactSequence(match[2]):strictJSON(match[2]));}}
    let legacy=doc.visible.filter(v=>v.heading?.index===owner.index&&!/^## /u.test(v.line)).map(v=>v.line);
    if(type==='workflow')for(const block of doc.blocks.filter(b=>b.heading?.index===owner.index&&b.info==='txt'))legacy.push(...block.lines);
    const roots=legacyRootFields(legacy);
    if(roots.length){
      for(let n=0;n<roots.length;n++){
        const current=roots[n],key=current.m[2],scalar=current.m[3]||'';if(!consumed.has(key))continue;
        if(scalar){add(key,legacyScalar(scalar,key));continue;}
        const nested=legacy.slice(current.index+1,roots[n+1]?.index??undefined).filter(line=>line.trim());
        if(key==='reservations'){
          const entries=[];for(let j=0;j<nested.length;j++){const p=/^\s+- path: (.+)$/u.exec(nested[j]);if(!p)return {verdict:'unresolved'};const m=/^\s+mode: (read|modify|create|delete|write)$/u.exec(nested[++j]||'');if(!m)return {verdict:'unresolved'};entries.push({path:p[1],mode:m[1]});}add(key,entries);
        }else if(key==='source'){
          const object=Object.create(null);for(const line of nested){const m=/^\s+([a-z_]+): (.*)$/u.exec(line);if(!m)return {verdict:'unresolved'};if(Object.hasOwn(object,m[1]))throw new Error('duplicate nested key');object[m[1]]=legacyScalar(m[2],m[1]);}add(key,object);
        }else return {verdict:'unresolved'};
      }
    }
    if(type==='workflow'){
      const guard=doc.visible.filter(v=>v.heading?.name==='File Guard').map(v=>v.line);if(guard.length){for(const line of guard){const match=/^file_guard: (.+)$/u.exec(line);if(match)add('file_guard',legacyScalar(match[1],'file_guard'));}}
    }
    if(!Object.keys(fields).length)return {verdict:'unresolved'};
    if(Object.hasOwn(fields,'seq')&&(!Number.isSafeInteger(fields.seq)||fields.seq<1))throw new Error('positive seq');
    if(Object.hasOwn(fields,'role')&&!['Prime','Lead','Worker','none'].includes(fields.role))throw new Error('role');
    if(Object.hasOwn(fields,'reservations')&&fields.reservations!=='none'&&!Array.isArray(fields.reservations))return {verdict:'unresolved'};
    return {verdict:'valid',fields};
  }catch{return {verdict:'invalid'};}
}
export function parseTasks(text) {
  try {
    const doc=scanDocument(text),owners=doc.headings.filter(h=>h.name==='Active Task');
    if(owners.length>1)return {verdict:'invalid'};if(!owners.length)return {verdict:'unresolved'};
    const owner=owners[0],blocks=doc.blocks.filter(b=>b.heading?.index===owner.index&&b.info==='pact:task');
    if(doc.unclosed?.heading?.index===owner.index)return {verdict:'invalid'};
    const end=doc.headings.find(h=>h.index>owner.index)?.index??doc.lines.length;
    const lines=doc.visible.filter(v=>v.heading?.index===owner.index&&!/^## /u.test(v.line)).map(v=>v.line);
    const idLines=legacyRootFields(lines).filter(field=>field.m[2]==='id').map(field=>({index:field.index,match:field.m}));
    let records=[];
    if(blocks.length)records=blocks.map((block,index)=>parseRecord('## Active Task\n'+doc.lines.slice(index?block.start:owner.index+1,blocks[index+1]?.start??end).join('\n'),'task'));
    else if(idLines.length)records=idLines.map((start,n)=>parseRecord('## Active Task\n'+lines.slice(start.index,idLines[n+1]?.index).join('\n'),'task'));
    else if(lines.some(line=>line.trim()==='None.'))return {verdict:'valid',tasks:[]};else return {verdict:'unresolved'};
    if(records.some(r=>r.verdict!=='valid'))return {verdict:records.some(r=>r.verdict==='invalid')?'invalid':'unresolved'};
    const tasks=records.map(r=>r.fields);if(tasks.some(t=>!t.id)||new Set(tasks.map(t=>t.id)).size!==tasks.length)return {verdict:'invalid'};
    return {verdict:'valid',tasks};
  }catch{return {verdict:'invalid'};}
}
export function parsePendingTasks(text) {
  try{
    const doc=scanDocument(text),owners=doc.headings.filter(h=>h.name==='Pending');
    if(owners.length!==1)return {verdict:owners.length?'invalid':'unresolved'};
    const start=owners[0].index,end=doc.headings.find(h=>h.index>start)?.index??doc.lines.length;
    const starts=doc.visible.filter(v=>v.index>start&&v.index<end&&/^- \[ \] PACT-(?:\d{8}|YYYYMMDD)-\d{3}(?: |$)/u.test(v.line));
    if(!starts.length)return doc.visible.some(line=>line.index>start&&line.index<end&&line.line.trim()==='None.')?{verdict:'valid',tasks:[]}:{verdict:'unresolved'};
    const tasks=[];
    for(let n=0;n<starts.length;n++){
      const id=/^- \[ \] (PACT-(?:\d{8}|YYYYMMDD)-\d{3})/u.exec(starts[n].line)[1];
      const entryEnd=starts[n+1]?.index??end;
      let body=doc.lines.slice(starts[n].index+1,entryEnd).join('\n');
      if(!doc.blocks.some(block=>block.start>starts[n].index&&block.start<entryEnd&&block.info==='pact:task'))body='  id: '+id+'\n'+body;
      const parsed=parseRecord('## Active Task\n\n'+body,'task');if(parsed.verdict!=='valid')return {verdict:parsed.verdict};if(parsed.fields.id!==id)return {verdict:'invalid'};tasks.push(parsed.fields);
    }
    if(new Set(tasks.map(t=>t.id)).size!==tasks.length)return {verdict:'invalid'};return {verdict:'valid',tasks};
  }catch{return {verdict:'invalid'};}
}
export function ancestry(graph,ancestor,tip,complete=false) {
  if(typeof ancestor!=='string'||typeof tip!=='string'||!graph||typeof graph!=='object')return 'unresolved';
  const queue=[tip],seen=new Set();let missing=false;
  while(queue.length){const node=queue.pop();if(node===ancestor)return true;if(seen.has(node))continue;seen.add(node);if(!Object.hasOwn(graph,node)){missing=true;continue;}if(!Array.isArray(graph[node]))return 'unresolved';queue.push(...graph[node]);}
  return complete&&!missing?false:'unresolved';
}
const verdict = value => ({verdict:value});
const requirementPattern=/^[a-z][a-z0-9-]*(?::[A-Za-z0-9][A-Za-z0-9._/-]*)?$/u;
const fullOid=value=>typeof value==='string'&&/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/u.test(value);
const validBranch=value=>typeof value==='string'&&value.length>0&&!value.startsWith('-')&&!/[\x00-\x20\x7f~^:?*\[\\]/u.test(value)&&!value.includes('..')&&!value.includes('@{')&&!value.includes('//')&&!value.endsWith('/')&&!value.endsWith('.')&&value!=='@'&&value.split('/').every(s=>s&&!s.startsWith('.')&&!s.endsWith('.lock'));
const stateRecordPath=path=>normalizeTarget(path).startsWith('ai/pact/context/state/');
const parseRequired=(text,type)=>{const result=parseRecord(text,type);if(result.verdict!=='valid')throw new Error(result.verdict);return result.fields;};
function requirementDecision(input) {
  if(!['pending','active'].includes(input.stage)||!Array.isArray(input.requirements))return verdict('invalid');
  const hold=value=>input.stage==='pending'?{verdict:value,ready:false}:{verdict:value,status:'blocked'};
  if(input.requirements.some(r=>typeof r.id!=='string'||!requirementPattern.test(r.id)))return hold('invalid');
  let unavailable=false,unknown=false;const seen=new Map();
  for(const requirement of input.requirements){const status=requirement.status??'unresolved';if(!['satisfied','unavailable','unresolved'].includes(status))return hold('invalid');if(seen.has(requirement.id)&&seen.get(requirement.id)!==status)unknown=true;seen.set(requirement.id,status);unavailable||=status==='unavailable';unknown||=status==='unresolved';}
  if(unavailable)return hold('unavailable');if(unknown)return hold('unresolved');
  return input.stage==='pending'?{verdict:'satisfied',ready:true}:{verdict:'satisfied',status:'active'};
}
function guardDecision(markdown,changes) {
  if(!markdown)return {denied:false,warnings:[]};
  const meta=parseRecord(markdown,'meta');if(meta.verdict!=='valid')return {unresolved:true};
  const mode=meta.fields.mode;if(!['strict','warn','off'].includes(mode))return {denied:false,warnings:['file-guard-mode-gap']};
  if(mode==='off')return {denied:false,warnings:[]};
  section(markdown,'Entries'); // Preserve duplicate-owning-heading rejection.
  const document=scanDocument(markdown),entryOwner=document.headings.find(h=>h.name==='Entries');
  const entries=[];for(const {line} of document.visible.filter(v=>entryOwner&&v.heading?.index===entryOwner.index)){
    if(!line.startsWith('|'))continue;const cells=line.split('|').slice(1,-1).map(s=>s.trim());if(cells[0]==='Path or pattern'||/^[-: ]+$/u.test(cells[0]))continue;
    const pattern=cells[0].replace(/^`|`$/gu,'');const operations=cells[1].split(',').map(s=>s.trim());
    if(operations.some(op=>!['read','modify','create','delete','aggregator'].includes(op)))return {unresolved:true};normalizePath(pattern);entries.push({pattern,operations});
  }
  let violation=false;for(const change of changes){const matching=entries.filter(entry=>matchesPath(entry.pattern,change.path));const permitted=matching.length?matching.some(entry=>entry.operations.includes(change.mode)):change.mode==='read';if(!permitted)violation=true;}
  return {denied:mode==='strict'&&violation,warnings:mode==='warn'&&violation?['file-guard']:[]};
}
function authority(input) {
  if(input.operation==='force_push')return verdict('deny');
  if(!input.records?.task||!input.records?.workflow)return verdict('unresolved');
  let assignment,workflow;try{assignment=parseRequired(input.records.task,'task');workflow=parseRequired(input.records.workflow,'workflow');}catch(error){return verdict(error.message==='invalid'?'invalid':'unresolved');}
  if(!assignment.actor||!assignment.role||typeof input.actor!=='string')return verdict('unresolved');
  if(!validBranch(input.branch||'read')||!validBranch(workflow.default_branch))return verdict('invalid');
  if(input.actor!==assignment.actor)return verdict('deny');
  const role=assignment.role,gate=workflow.gate_branch_pattern?.replace('<id>',input.gate_id),changes=input.changes||[];
  if(!Array.isArray(changes)||changes.some(change=>!['read','modify','create','delete'].includes(change.mode)))return verdict('unresolved');
  for(const change of changes)normalizeTarget(change.path);
  if(input.operation==='observe'){
    if(changes.some(c=>c.mode!=='read'))return verdict('deny');
  }else if(input.operation==='publish_task'){
    if(!['Worker','Lead'].includes(role)||input.branch!==assignment.task_branch)return verdict('deny');
    if(!assignment.task_base||assignment.task_base==='none'||!assignment.task_branch||assignment.task_branch==='none')return verdict('unresolved');
    if(!fullOid(assignment.task_base)||!validBranch(assignment.task_branch))return verdict('invalid');
    const expected=workflow.task_branch_pattern?.replace('<gate-id>',input.gate_id).replace('<task-id>',assignment.id);
    if(!expected)return verdict('unresolved');if(assignment.task_branch!==expected)return verdict('deny');
    if(!Array.isArray(assignment.reservations))return verdict('unresolved');
    for(const change of changes){
      if(role==='Worker'&&stateRecordPath(change.path)&&change.mode!=='read')return verdict('deny');
      let matched=false;for(const claim of assignment.reservations){if(!['read','modify','create','delete','write'].includes(claim.mode))return verdict('unresolved');if(matchesPath(claim.path,change.path)&&(claim.mode===change.mode||claim.mode==='write'&&['modify','create'].includes(change.mode)))matched=true;}
      if(change.mode!=='read'&&!matched)return verdict('deny');
    }
  }else if(input.operation==='integrate'){
    if(role!=='Lead'||input.branch!==gate)return verdict('deny');
    const review=input.integration;if(!review||!review.source||review.kind==='unresolved')return verdict('unresolved');
    if(review.kind!=='mechanical')return verdict('deny');
    if(!Array.isArray(review.reviewed_candidates)||!review.reviewed_candidates.length||!Array.isArray(review.changed_paths))return verdict('unresolved');
    if(changes.some(change=>!review.changed_paths.includes(normalizeTarget(change.path))&&!['ai/pact/context/state/TASKS.md','ai/pact/context/state/STATE.md'].includes(normalizeTarget(change.path))))return verdict('deny');
  }else if(input.operation==='record_decision'){
    if(role!=='Prime'||input.branch!==gate)return verdict('deny');
    if(!Array.isArray(input.changed_fields)||!input.changed_fields.length)return verdict('unresolved');
    const path=input.decision_kind==='boundary'?'ai/pact/context/state/STATE.md':'ai/pact/context/state/LOGIC-DRAFT.md';
    const field={boundary:'boundary_contract.approvals.append',acceptance:'acceptance.append',scope:'selected_logic.decision.append'}[input.decision_kind];
    if(!field||input.changed_fields.some(changed=>changed!==field)||changes.some(change=>normalizeTarget(change.path)!==path||change.mode!=='modify'))return verdict('deny');
  }else if(input.operation==='deliver'){
    if(role!=='Prime'||input.branch!==workflow.default_branch)return verdict('deny');
  }else return verdict('unresolved');
  const boundaryInputs=input.boundaries||[];
  if(assignment.parent&&assignment.parent!=='none'){
    const contract=proseSurface(input.records.task,'Boundary Contract','boundary_contract');
    const complete=contract&&boundaryFields.every(key=>{const fields=contract.fields.filter(field=>field.m[2]===key);return fields.length===1&&/^\S.*$/u.test(fields[0].m[3]||'');});
    if(!complete||!boundaryInputs.length)return verdict('unresolved');
  }
  for(const boundary of boundaryInputs){if(!boundary.source||!input.records?.boundary_decisions?.[boundary.source])return verdict('unresolved');if(boundary.result==='deny')return verdict('deny');if(boundary.result!=='allow')return verdict('unresolved');}
  if(workflow.file_guard===undefined)return verdict('unresolved');
  if(workflow.file_guard!=='none'&&!input.records?.file_guard)return verdict('unresolved');
  const guard=guardDecision(workflow.file_guard==='none'?null:input.records?.file_guard,changes);if(guard.denied)return verdict('deny');if(guard.unresolved)return verdict('unresolved');
  if(input.operation==='deliver'){
    const authorityRemote=Object.hasOwn(workflow,'authority_remote')?workflow.authority_remote:'origin';
    if(typeof authorityRemote!=='string'||!authorityRemote)return verdict('unresolved');
    const result=delivery({...input.delivery,expected_remote:authorityRemote,expected_ref:'refs/heads/'+workflow.default_branch});
    if(result.verdict!=='allow')return result;
  }
  return guard.warnings?.length?{verdict:'allow',warnings:guard.warnings}:verdict('allow');
}
// The queried coordinate comes from the query, never from the observation:
// remote defaults to the declared authority remote, a ref only where named.
function queriedCoordinate(input,defaultRef) {
  const remote=Object.hasOwn(input,'expected_remote')?input.expected_remote:'origin',ref=Object.hasOwn(input,'expected_ref')?input.expected_ref:defaultRef;
  if(typeof remote!=='string'||!remote||typeof ref!=='string'||!/^refs\/heads\/./u.test(ref))return null;
  return {remote,ref};
}
function observeRemote(input,coordinate) {
  const remote=input.remote;if(!coordinate||!remote||!['resolved','absent'].includes(remote.status))return 'unresolved';
  if(remote.remote!==coordinate.remote||remote.ref!==coordinate.ref)return 'unresolved';
  if(remote.status==='absent')return false;
  return typeof remote.tip==='string'?remote.tip:'unresolved';
}
function answerCheck(input) {
  const handoffResult=parseRecord(input.handoff,'gate-handoff'),acceptanceResult=parseRecord(input.answer?.record,'acceptance');
  if(handoffResult.verdict!=='valid'||acceptanceResult.verdict!=='valid')return verdict([handoffResult.verdict,acceptanceResult.verdict].includes('invalid')?'invalid':'unresolved');
  const handoff=handoffResult.fields,acceptance=acceptanceResult.fields,answer=input.answer;
  if(!answer.actor||!answer.commit||!answer.role||!handoff.gate_id||!handoff.seq||!handoff.signal||!handoff.candidate||!acceptance.decision||!acceptance.candidate||!acceptance.evidence)return verdict('unresolved');
  if(answer.role!=='Prime'||!fullOid(answer.commit)||handoff.signal!=='ready')return verdict('invalid');
  const paragraph=clean(answer.message||'').trimEnd().split(/\n[ \t]*\n/u).at(-1)||'';
  const lines=paragraph.split('\n');
  if(!lines.every(line=>/^[A-Za-z0-9-]+: .*$/u.test(line)))return verdict('invalid');
  const trailers=lines.filter(line=>line.startsWith('PACT-Answers:'));
  if(trailers.length!==1||trailers[0]!==`PACT-Answers: ${handoff.gate_id}#${handoff.seq}`)return verdict('invalid');
  if(!['accepted','not-accepted'].includes(acceptance.decision)||acceptance.candidate!==handoff.candidate||!fullOid(acceptance.candidate)||acceptance.evidence==='none')return verdict('invalid');
  if(!Array.isArray(answer.changed_paths))return verdict('unresolved');
  if(answer.changed_paths.length!==1||normalizeTarget(answer.changed_paths[0])!=='ai/pact/context/state/LOGIC-DRAFT.md')return verdict('invalid');
  const answers=input.answers||[answer],unique=new Set(answers.map(a=>a.commit));if(unique.size!==1)return verdict('invalid');
  return verdict('valid');
}
function closure(input) {
  if(answerCheck(input).verdict!=='valid')return {closed:'unresolved'};
  const acceptance=parseRequired(input.answer.record,'acceptance');if(acceptance.decision!=='accepted')return {closed:false};
  const tip=observeRemote(input,queriedCoordinate(input,'refs/heads/main'));if(tip==='unresolved')return {closed:'unresolved'};if(tip===false)return {closed:false};
  if(!fullOid(tip))return {closed:'unresolved'};
  const reach=ancestry(input.graph,input.answer.commit,tip,input.history_complete);if(reach!==true)return {closed:reach};
  const candidateReach=ancestry(input.graph,acceptance.candidate,input.answer.commit,input.history_complete);
  if(candidateReach!==true||!Array.isArray(input.candidate_to_answer_paths)||!input.delivery_handoff)return {closed:'unresolved'};
  if(input.candidate_to_answer_paths.some(path=>!stateRecordPath(path))||section(input.delivery_handoff,'Gate Handoff')!==section(input.handoff,'Gate Handoff'))return {closed:'unresolved'};
  return {closed:true};
}
function delivery(input) {
  if(answerCheck(input).verdict!=='valid')return verdict('deny');
  const acceptance=parseRequired(input.answer.record,'acceptance');if(acceptance.decision!=='accepted')return verdict('deny');
  if(input.newest_handoff){parseRequired(input.newest_handoff,'gate-handoff');if(section(input.newest_handoff,'Gate Handoff')!==section(input.handoff,'Gate Handoff'))return verdict('deny');}
  if(!Array.isArray(input.changes_after_candidate)||input.changes_after_candidate.some(path=>!stateRecordPath(path)))return verdict('deny');
  const observed=observeRemote(input,queriedCoordinate(input,'refs/heads/main'));
  if(observed==='unresolved')return verdict('unresolved');if(observed===false)return verdict('deny');
  if(!fullOid(observed))return verdict('unresolved');
  const candidate=ancestry(input.graph,acceptance.candidate,input.delivery_tip,input.history_complete),answer=ancestry(input.graph,input.answer.commit,input.delivery_tip,input.history_complete),accepted=ancestry(input.graph,acceptance.candidate,input.answer.commit,input.history_complete),ff=ancestry(input.graph,observed,input.delivery_tip,input.history_complete);
  if([candidate,answer,accepted,ff].includes(false))return verdict('deny');if([candidate,answer,accepted,ff].includes('unresolved'))return verdict('unresolved');return verdict('allow');
}
function handoffNarrative(text) {
  const doc=scanDocument(text),owners=doc.headings.filter(h=>h.name==='Gate Handoff');
  if(owners.length!==1)throw new Error('handoff owning section');
  const owner=owners[0],end=doc.headings.find(h=>h.index>owner.index)?.index??doc.lines.length;
  const skipped=new Set();
  for(const block of doc.blocks.filter(b=>b.heading?.index===owner.index&&b.info==='pact:gate-handoff'))for(let i=block.start;i<=block.end;i++)skipped.add(i);
  const mechanical=new Set(['gate_id','seq','signal','candidate','branch','lead','recorded_at']);
  const visible=doc.visible.filter(line=>line.heading?.index===owner.index&&line.index>owner.index);
  for(const field of legacyRootFields(visible.map(line=>line.line)))if(mechanical.has(field.m[2]))skipped.add(visible[field.index].index);
  return doc.lines.slice(owner.index+1,end).filter((line,index)=>!skipped.has(owner.index+1+index)).join('\n');
}
function handoffChange(input) {
  if(input.writer_role!=='Lead')return verdict('invalid');
  const next=parseRecord(input.next,'gate-handoff');if(next.verdict!=='valid')return verdict(next.verdict);
  if(!next.fields.gate_id||!next.fields.seq||!next.fields.branch||!next.fields.lead||!next.fields.recorded_at||next.fields.candidate===undefined||!next.fields.signal)return verdict('unresolved');
  if(!['working','ready','escalation'].includes(next.fields.signal)||!validBranch(next.fields.branch)||!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC\+00:00$/u.test(next.fields.recorded_at)||next.fields.signal==='ready'&&!fullOid(next.fields.candidate)||next.fields.signal!=='ready'&&next.fields.candidate!=='none')return verdict('invalid');
  if(input.previous===null)return verdict(next.fields.seq===1?'valid':'invalid');
  const previous=parseRecord(input.previous,'gate-handoff');if(previous.verdict!=='valid')return verdict('unresolved');
  if(section(input.previous,'Gate Handoff')===section(input.next,'Gate Handoff'))return verdict('valid');
  if(next.fields.gate_id!==previous.fields.gate_id||next.fields.seq!==previous.fields.seq+1)return verdict('invalid');
  const payload=fields=>Object.fromEntries(Object.entries(fields).filter(([key])=>!['seq','recorded_at'].includes(key)));
  if(!same(payload(previous.fields),payload(next.fields)))return verdict('valid');
  if(handoffNarrative(input.previous)===handoffNarrative(input.next))return verdict('invalid');
  const interpretation=input.materiality;
  if(!interpretation||typeof interpretation.source!=='string'||!interpretation.source.trim()||typeof interpretation.evidence!=='string'||!interpretation.evidence.trim())return verdict('unresolved');
  if(interpretation.result==='material')return verdict('valid');
  if(interpretation.result==='non-material')return verdict('invalid');
  return verdict('unresolved');
}
function stateCheck(input) {
  let draft,tasks,state,active;try{draft=parseRequired(input.draft,'meta');tasks=parseRequired(input.tasks,'meta');state=parseRequired(input.state,'meta');active=(input.active||[]).map(record=>parseRequired(record,'task'));}catch{return verdict('unresolved');}
  const combinations=[['none-selected','no-active-draft','clear'],['selected','no-active-draft','clear'],['selected','active-draft','clear'],['selected','active-draft','active'],['selected','active-draft','blocked'],['selected','active-draft','handoff'],['selected','complete','clear'],['superseded','no-active-draft','clear']];
  if(!combinations.some(row=>same(row,[draft.status,tasks.status,state.status])))return verdict('invalid');
  const ids=state.active_task==='none'||!state.active_task?[]:String(state.active_task).split(',').map(id=>id.trim());
  if(!same([...ids].sort(),active.map(t=>t.id).sort())||new Set(ids).size!==ids.length||ids.some(id=>(input.pending_ids||[]).includes(id)))return verdict('invalid');
  if(tasks.status==='active-draft'&&active.length===0&&(input.pending_ids||[]).length===0)return verdict('invalid');
  if(['complete','no-active-draft'].includes(tasks.status)&&(active.length>0||(input.pending_ids||[]).length>0))return verdict('invalid');
  if(state.status==='clear')return verdict(active.length===0?'valid':'invalid');
  if(!active.length)return verdict('invalid');
  for(const task of active){
    if(task.reservations==='none')task.reservations=[];
    if(!Array.isArray(task.reservations))return verdict('unresolved');
    for(const claim of task.reservations){
      if(!claim||typeof claim!=='object'||Array.isArray(claim))return verdict('invalid');
      if(claim.mode===undefined||claim.path===undefined)return verdict('unresolved');
      if(typeof claim.mode!=='string'||typeof claim.path!=='string')return verdict('invalid');
      if(!['read','modify','create','delete','write'].includes(claim.mode))return verdict('unresolved');
      normalizePath(claim.path);
    }
  }
  const phases=active.map(t=>t.task_phase);if(phases.some(p=>!['transferred','working','validating','blocked','handoff'].includes(p)))return verdict('invalid');
  const expected=phases.some(p=>['transferred','working','validating'].includes(p))?'active':phases.includes('blocked')?'blocked':'handoff';if(expected!==state.status)return verdict('invalid');
  if(active.length>1){
    if(new Set(active.map(t=>t.lead)).size!==1||!active[0].lead||new Set(active.map(t=>t.actor)).size!==active.length||active.some(t=>!t.actor)||(input.runs_tests||[]).length||(input.runs_builds||[]).length)return verdict('invalid');
    for(let i=0;i<active.length;i++)for(let j=i+1;j<active.length;j++){
      if(!Array.isArray(active[i].reservations)||!Array.isArray(active[j].reservations))return verdict('unresolved');
      for(const a of active[i].reservations)for(const b of active[j].reservations)if(a.mode!=='read'&&b.mode!=='read'&&patternsOverlap(a.path,b.path))return verdict('invalid');
    }
  }
  return verdict('valid');
}
function transfer(input) {
  const pending=parseRecord(input.pending,'task'),active=parseRecord(input.active,'task');if(pending.verdict!=='valid'||active.verdict!=='valid')return verdict('unresolved');
  for(const key of ['id','role','requires','reservations'])if(!Object.hasOwn(pending.fields,key)||!Object.hasOwn(active.fields,key))return verdict('unresolved');
  for(const key of ['id','role','parent','actor','lead','requires','reservations','task_base','task_branch','source','trace','model_tier','model_binding','effort','effective_effort'])if(Object.hasOwn(pending.fields,key)&&!same(pending.fields[key],active.fields[key]))return verdict('invalid');
  if((input.remaining_pending_ids||[]).includes(active.fields.id))return verdict('invalid');
  for(const [heading,key] of [['Brief','brief'],['Boundary Contract','boundary_contract'],['Validation','validation'],['Tests / Baseline','tests'],[null,'baseline']]){
    const before=proseSurface(input.pending,heading,key),after=proseSurface(input.active,heading,key);
    if(!heading&&!before&&!after)continue;
    if(!before?.value.trim()||!after||before.form!==after.form||before.value!==after.value)return verdict('invalid');
  }
  return verdict('valid');
}
export function evaluate(test) {
  const input=test.input||{};
  try{
    switch(test.operation){
      case 'path':return {verdict:'valid',normalized:normalizePath(input.pattern,input.directories),matches:matchesPath(input.pattern,input.path,input.directories)};
      case 'overlap':return {verdict:'valid',overlap:patternsOverlap(input.left,input.right,input.directories)};
      case 'parse':return parseRecord(input.text,input.type);
      case 'parse_tasks':return input.section==='Pending'?parsePendingTasks(input.text):parseTasks(input.text);
      case 'authority':return authority(input);
      case 'requires':return requirementDecision(input);
      case 'candidate':{const value=ancestry(input.graph,input.base,input.candidate,input.history_complete);return verdict(value==='unresolved'?'unresolved':value?'valid':'invalid');}
      case 'derive':{const tip=observeRemote(input,queriedCoordinate(input));return {integrated:tip==='unresolved'?'unresolved':tip===false?false:ancestry(input.graph,input.candidate,tip,input.history_complete)};}
      case 'handoff':return handoffChange(input);
      case 'answer':return answerCheck(input);
      case 'closure':return closure(input);
      case 'delivery':return delivery(input);
      case 'state':return stateCheck(input);
      case 'transfer':return transfer(input);
      default:return verdict('unresolved');
    }
  }catch{return verdict('invalid');}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const corpus=JSON.parse(fs.readFileSync(process.argv[2]||new URL('./cases.json',import.meta.url),'utf8'));
  const cases=Array.isArray(corpus)?corpus:corpus.cases;
  let failures=0;for(const test of cases){const actual=evaluate(test);if(!same(actual,test.expected)){failures++;console.error(JSON.stringify({id:test.id,expected:test.expected,actual}));}}
  console.log(JSON.stringify({cases:cases.length,passed:cases.length-failures,failed:failures}));process.exitCode=failures?1:0;
}
