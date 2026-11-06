import test from 'node:test';
import assert from 'node:assert/strict';
import { canOpenEncounter, departureFrame } from '../src/game/opening.ts';
test('departure is available only after the two encounters',()=>{
 assert.equal(canOpenEncounter(0,'departure'),false);
 assert.equal(canOpenEncounter(1,'departure'),false);
 assert.equal(canOpenEncounter(2,'departure'),true);
 assert.equal(canOpenEncounter(3,'departure'),false);
});
test('departure transition is bounded and cannot skip through a slow frame',()=>{
 assert.deepEqual(departureFrame(0,0),{elapsed:0,opacity:0,complete:false});
 assert.equal(departureFrame(0,30).elapsed,.05);
 assert.equal(departureFrame(3.99,.05).complete,true);
 assert.equal(departureFrame(4,1).opacity,1);
});
