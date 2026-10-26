import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { evaluate } from './reference.mjs';

// Generates tiny synthetic Git histories; no project refs/hooks are changed.
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'pact-conformance-git-'));
let assertions=0;
const check=(actual,expected)=>{assert.deepEqual(actual,expected);assertions++;};
const git=(cwd,args,{input,allow=[0]}={})=>{
 const result=spawnSync('git',['-C',cwd,...args],{encoding:'utf8',input,env:{...process.env,GIT_AUTHOR_NAME:'Fixture',GIT_AUTHOR_EMAIL:'fixture@example.invalid',GIT_COMMITTER_NAME:'Fixture',GIT_COMMITTER_EMAIL:'fixture@example.invalid',GIT_AUTHOR_DATE:'2026-01-01T00:00:00Z',GIT_COMMITTER_DATE:'2026-01-01T00:00:00Z'}});
 if(result.error||!allow.includes(result.status))throw new Error(JSON.stringify({args,status:result.status,error:result.error?.message,stderr:result.stderr}));
 return {status:result.status,text:result.stdout.trim()};
};
try {
 const remote=path.join(temporary,'remote.git');fs.mkdirSync(remote);git(remote,['init','--bare','--initial-branch=main']);
 const tree=git(remote,['mktree'],{input:''}).text;
 const commit=(message,parents=[])=>git(remote,['commit-tree',tree,...parents.flatMap(parent=>['-p',parent])],{input:message+'\n'}).text;
 const base=commit('base'),middle=commit('middle',[base]),main=commit('main',[middle]),candidate=commit('candidate',[middle]),copy=commit('copied content',[base]);
 git(remote,['update-ref','refs/heads/main',main]);git(remote,['update-ref','refs/heads/gate/G',candidate]);git(remote,['update-ref','refs/heads/copied',copy]);
 const url=pathToFileURL(remote).href;
 const full=path.join(temporary,'full');git(temporary,['clone','--no-checkout',url,full]);
 check(git(full,['merge-base','--is-ancestor',base,'refs/remotes/origin/gate/G']).status,0);
 check(git(full,['merge-base','--is-ancestor',candidate,'refs/remotes/origin/copied'],{allow:[0,1]}).status,1);
 const single=path.join(temporary,'single');git(temporary,['clone','--single-branch','--no-checkout','--branch','main',url,single]);
 check(git(single,['show-ref','--verify','--quiet','refs/remotes/origin/gate/G'],{allow:[0,1]}).status,1);
 const observation=git(single,['ls-remote','--exit-code','origin','refs/heads/gate/G']).text.split(/\s+/u);
 check(observation,[candidate,'refs/heads/gate/G']);
 git(single,['fetch','--no-tags','origin','refs/heads/gate/G:refs/pact-observations/gate-G']);
 check(git(single,['rev-parse','refs/pact-observations/gate-G']).text,candidate);
 check(git(single,['merge-base','--is-ancestor',candidate,'refs/pact-observations/gate-G']).status,0);
 // The exact observation is useful even though the clone never tracked gate/G.
 const resolved=evaluate({operation:'derive',input:{graph:{[base]:[],[middle]:[base],[candidate]:[middle]},history_complete:true,candidate,expected_remote:'origin',expected_ref:'refs/heads/gate/G',remote:{status:'resolved',remote:'origin',ref:observation[1],tip:observation[0]}}});
 check(resolved,{integrated:true});
 const shallow=path.join(temporary,'shallow');git(temporary,['clone','--depth','1','--single-branch','--no-checkout','--branch','main',url,shallow]);
 check(git(shallow,['rev-parse','--is-shallow-repository']).text,'true');
 check(git(shallow,['show-ref','--verify','--quiet','refs/remotes/origin/gate/G'],{allow:[0,1]}).status,1);
 git(shallow,['fetch','--depth','1','--no-tags','origin','refs/heads/gate/G:refs/pact-observations/gate-G']);
 check(git(shallow,['cat-file','-e',base+'^{commit}'],{allow:[0,1,128]}).status===0,false);
 check(evaluate({operation:'candidate',input:{graph:{[candidate]:[middle]},history_complete:false,base,candidate}}),{verdict:'unresolved'});
 git(shallow,['fetch','--deepen','5','--no-tags','origin','refs/heads/gate/G:refs/pact-observations/gate-G']);
 check(git(shallow,['merge-base','--is-ancestor',base,'refs/pact-observations/gate-G']).status,0);
 const worktree=path.join(temporary,'worktree');git(full,['worktree','add','--detach',worktree,'refs/remotes/origin/gate/G']);
 check(git(worktree,['ls-remote','--exit-code','origin','refs/heads/gate/G']).text.split(/\s+/u),[candidate,'refs/heads/gate/G']);
 git(full,['remote','rename','origin','authority']);
 check(git(worktree,['ls-remote','--exit-code','authority','refs/heads/gate/G']).text.split(/\s+/u),[candidate,'refs/heads/gate/G']);
 check(git(full,['ls-remote','--exit-code','authority','refs/heads/missing'],{allow:[0,2]}).status,2);
 console.log(JSON.stringify({check:'git-remote-scenarios',assertions,passed:assertions,git:git(temporary,['--version']).text}));
}finally{
 const resolved=path.resolve(temporary),parent=path.resolve(os.tmpdir());
 if(path.dirname(resolved)!==parent||!path.basename(resolved).startsWith('pact-conformance-git-'))throw new Error('temporary cleanup target mismatch');
 fs.rmSync(resolved,{recursive:true,force:true});
}
