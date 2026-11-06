import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldLook } from '../src/game/world.ts';
test('mouse looks without a held button; touch requires dragging; locked input is handled separately',()=>{
 assert.equal(shouldLook('mouse',false,false),true);
 assert.equal(shouldLook('touch',false,false),false);
 assert.equal(shouldLook('touch',false,true),true);
 assert.equal(shouldLook('mouse',true,true),false);
});
