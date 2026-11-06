import test from 'node:test';
import assert from 'node:assert/strict';
import { canWalkRoad, reachedRest } from '../src/game/road.ts';
test('road allows walking from spawn to rest but not outside its edges',()=>{
 for(let z=9;z>=-23;z-=.15)assert.equal(canWalkRoad(0,z),true);
 assert.equal(canWalkRoad(7,0),false);
 assert.equal(canWalkRoad(0,-30),false);
 assert.equal(canWalkRoad(0,12),false);
});
test('road respects rock bounds and rest requires actual arrival',()=>{
 assert.equal(canWalkRoad(1,0,[[1,0,1,1]]),false);
 assert.equal(canWalkRoad(-2,0,[[1,0,1,1]]),true);
 assert.equal(reachedRest(0,9),false);
 assert.equal(reachedRest(0,-22),true);
});
