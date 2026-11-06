import test from 'node:test';
import assert from 'node:assert/strict';
import { openingEncounter } from '../src/game/opening.ts';
import { encounterTurns } from '../src/game/road-encounter.ts';
test('Saul responds between the question and identification in the encounter',()=>{
 assert.deepEqual(encounterTurns.map(turn=>turn.speaker),['Voz','Saulo','Voz','Voz']);
 assert.equal(encounterTurns[1].text,'¿Quién eres, Señor?');
});
test('neighbor conversation includes explicitly reconstructed protagonist responses',()=>{
 const replies=openingEncounter.turns.filter(turn=>turn.speaker==='Saulo');
 assert.ok(replies.length>0);
 assert.ok(replies.every(turn=>turn.disclosure.includes('recreado')));
});
