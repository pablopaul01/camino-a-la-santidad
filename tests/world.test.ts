import test from 'node:test';
import assert from 'node:assert/strict';
import { canStand, advanceQuest, movement } from '../src/game/world.ts';
test('walls block and courtyard permits walking',()=>{assert.equal(canStand(0,6),true);assert.equal(canStand(8,6),false);assert.equal(canStand(0,-7),true);assert.equal(canStand(5,-7),false)});
test('story advances only in order and restart begins fresh',()=>{assert.equal(advanceQuest(0,'wall'),0);assert.equal(advanceQuest(0,'letter'),1);assert.equal(advanceQuest(1,'gate'),2);assert.equal(advanceQuest(2,'wall'),3);assert.equal(advanceQuest(0,'gate'),0)});
test('diagonal walking does not accelerate and frame time is bounded',()=>{const p=movement(1,1,0,1);assert.ok(Math.hypot(p.x,p.z)<=.15+1e-8);assert.equal(movement(0,0,0,.1).x,0)});
