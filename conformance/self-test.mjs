import assert from 'node:assert/strict';
import { evaluate, normalizePath, matchesPath, parseRecord, ancestry, strictJSON } from './reference.mjs';

// Written before the reference implementation: material runner invariants.
assert.equal(normalizePath('/src/'), 'src/**');
assert.equal(normalizePath('src', ['src']), 'src/**');
assert.throws(() => normalizePath('../src/**'));
assert.throws(() => normalizePath('src\\a'));
assert.throws(() => normalizePath('src/**x'));
assert.equal(matchesPath('src/**', 'src/a/b.js'), true);
assert.equal(matchesPath('src/*', 'src/a/b.js'), false);
assert.equal(matchesPath('src/**/a.js', 'src/a.js'), true);
assert.equal(matchesPath('SRC/**', 'src/a.js'), false);
assert.equal(ancestry({ a: [], b: ['a'], c: ['b'] }, 'a', 'c', true), true);
assert.equal(ancestry({ c: ['b'] }, 'a', 'c', false), 'unresolved');
assert.equal(ancestry({ a: [], c: [] }, 'a', 'c', true), false);
assert.equal(parseRecord('## Gate Handoff\n\n    gate_id: G\n    seq: 1\n', 'gate-handoff').fields.seq, 1);
assert.equal(parseRecord('## Gate Handoff\n\n    seq: 1\n    seq: 2\n', 'gate-handoff').verdict, 'invalid');
assert.equal(evaluate({ operation: 'requires', input: { stage: 'pending', requirements: [{ id: 'git', status: 'unresolved' }] } }).ready, false);
assert.equal(evaluate({ operation: 'requires', input: { stage: 'active', requirements: [{ id: 'git', status: 'unavailable' }] } }).status, 'blocked');
assert.equal(evaluate({ operation: 'authority', input: { role: 'Worker', operation: 'force_push' } }).verdict, 'deny');
assert.equal(evaluate({ operation: 'derive', input: { graph: { a: [] }, history_complete: true, candidate: 'a', remote: { status: 'unresolved' } } }).integrated, 'unresolved');
assert.throws(() => strictJSON('\u00a01'));
assert.throws(() => strictJSON('1\u00a0'));
assert.equal(strictJSON(' \t1\r\n'), 1);
console.log('runner-invariants: 21 assertions passed');
