import test from 'node:test';
import assert from 'node:assert/strict';
import { canStand } from '../src/game/world.ts';
test('a table blocks its footprint and player clearance, not the route around it',()=>{
 const table:[number,number,number,number]=[-5,3,1.7,.7];
 assert.equal(canStand(-5,3,[table]),false);
 assert.equal(canStand(-3.95,3,[table]),false);
 assert.equal(canStand(-3.6,3,[table]),true);
});
test('opening closing wall blocks the unused alley but preserves the courtyard',()=>{
 const wall:[number,number,number,number]=[0,-3,4,.5];
 assert.equal(canStand(0,-3,[wall]),false);
 assert.equal(canStand(0,0,[wall]),true);
});
test('neighbor and stacked crates block walking without blocking nearby approach',()=>{
 const solids:[number,number,number,number][]=[[3.5,-1,.74,.74],[-6.8,8,1.2,1.1]];
 assert.equal(canStand(3.5,-1,solids),false);
 assert.equal(canStand(-6.8,8,solids),false);
 assert.equal(canStand(3.5,1,solids),true);
});
