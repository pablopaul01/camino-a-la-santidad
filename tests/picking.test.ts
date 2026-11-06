import test from 'node:test';
import assert from 'node:assert/strict';
import { Group, Mesh, BoxGeometry, MeshBasicMaterial, Raycaster, Vector3 } from 'three';
import { belongsTo } from '../src/game/picking.ts';
test('raycast against an NPC child resolves its interaction group',()=>{
 const group=new Group();
 const mesh=new Mesh(new BoxGeometry(),new MeshBasicMaterial());
 group.add(mesh);group.updateMatrixWorld(true);
 const hit=new Raycaster(new Vector3(0,0,2),new Vector3(0,0,-1)).intersectObject(group,true)[0];
 assert.ok(hit);
 assert.equal(belongsTo(hit.object,group),true);
 assert.equal(belongsTo(hit.object,new Group()),false);
 mesh.geometry.dispose();mesh.material.dispose();
});
