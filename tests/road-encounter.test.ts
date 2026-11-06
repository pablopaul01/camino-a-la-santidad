import test from 'node:test';
import assert from 'node:assert/strict';
import { initialEncounter, startEncounter, tickEncounter, advanceVoice } from '../src/game/road-encounter.ts';
test('encounter progresses light, paced voice, blindness; cannot skip or retrigger',()=>{
 let state=startEncounter(initialEncounter());
 assert.equal(state.phase,'light');
 assert.equal(advanceVoice(state).phase,'light');
 for(let i=0;i<70;i++)state=tickEncounter(state,.05);
 assert.equal(state.phase,'voice');
 state=advanceVoice(state);state=advanceVoice(state);
 assert.equal(state.phase,'voice');
 state=advanceVoice(state);assert.equal(state.phase,'voice');
 state=advanceVoice(state);assert.equal(state.phase,'blind');
 for(let i=0;i<70;i++)state=tickEncounter(state,.05);
 assert.equal(state.phase,'complete');
 assert.deepEqual(startEncounter(state),state);
});
test('zero elapsed time preserves encounter; slow frames are capped; reset starts waiting',()=>{
 const state=startEncounter(initialEncounter());
 assert.deepEqual(tickEncounter(state,0),state);
 assert.equal(tickEncounter(state,60).elapsed,.05);
 assert.equal(initialEncounter().phase,'waiting');
});
