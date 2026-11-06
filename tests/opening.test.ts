import test from 'node:test';
import assert from 'node:assert/strict';
import { openingEncounter } from '../src/game/opening.ts';
test('opening identifies reconstruction, source and a bounded ending',()=>{
 assert.match(openingEncounter.source,/8:1/);
 assert.match(openingEncounter.disclosure,/recreación/);
 assert.match(openingEncounter.reflection,/Saulo/);
 assert.equal(openingEncounter.nextChapterPlayable,true);
});
