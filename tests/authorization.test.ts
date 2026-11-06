import test from 'node:test';
import assert from 'node:assert/strict';
import { canOpenEncounter, authorizationEncounter } from '../src/game/opening.ts';
test('authorization follows neighbor, cannot be skipped and completion is bounded',()=>{
 assert.equal(canOpenEncounter(0,'authorization'),false);
 assert.equal(canOpenEncounter(0,'neighbor'),true);
 assert.equal(canOpenEncounter(1,'authorization'),true);
 assert.equal(canOpenEncounter(1,'neighbor'),false);
 assert.equal(canOpenEncounter(2,'authorization'),false);
 assert.match(authorizationEncounter.source,/9:1/);
 assert.match(authorizationEncounter.disclosure,/paráfrasis/);
 assert.match(authorizationEncounter.lines.join(' '),/Jerusalén/);
});
