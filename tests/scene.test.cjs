const fs=require('node:fs'),vm=require('node:vm');
const nodes=new Map(),events={};let loop,hitIndex=0;
const node=id=>{if(!nodes.has(id))nodes.set(id,{hidden:false,textContent:'',dataset:{},appendChild(){},addEventListener(){},setPointerCapture(){}});return nodes.get(id)};
class V{constructor(x=0,y=0,z=0){this.set(x,y,z)}set(x,y,z){Object.assign(this,{x,y,z});return this}copy(v){return this.set(v.x,v.y,v.z)}lerpVectors(a,b,t){return this.set(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.z+(b.z-a.z)*t)}}
class Obj{constructor(){this.position=new V();this.rotation={set(){}}}add(){}lookAt(){}updateMatrixWorld(){}updateProjectionMatrix(){}}
class Renderer{constructor(){this.domElement=node('canvas')}setPixelRatio(){}setSize(){}setAnimationLoop(f){loop=f}render(){}}
class Ray{setFromCamera(){}intersectObjects(meshes){return [{object:meshes[hitIndex],distance:1}]}}
const THREE={Group:Obj,Scene:Obj,Color:Obj,FogExp2:Obj,PerspectiveCamera:Obj,WebGLRenderer:Renderer,HemisphereLight:Obj,DirectionalLight:Obj,MeshStandardMaterial:Obj,MeshBasicMaterial:Obj,Mesh:Obj,BoxGeometry:Obj,SphereGeometry:Obj,PointLight:Obj,Vector3:V,Vector2:V,Raycaster:Ray};
const document={getElementById:node,querySelectorAll:()=>[],exitPointerLock(){},addEventListener(k,f){events['doc:'+k]=f}};
const window={addEventListener(k,f){events[k]=f}};
const ts=require('typescript');
const source=ts.transpileModule(fs.readFileSync(__dirname+'/../src/game/scene.ts','utf8'),{
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ES2020}
}).outputText.replace(/^import .*;\r?\n/gm,'');
import('../src/game/world.ts').then(world=>{vm.runInNewContext(source,{THREE,dialogueLine:(a,i)=>a[i]??null,nextDialogueIndex:(a,i)=>Math.min(a.length,i+1),belongsTo:(a,b)=>a===b,...world,document,window,innerWidth:800,innerHeight:600,devicePixelRatio:1,performance:{now:()=>0},matchMedia:()=>({matches:false}),Math,Number,Set});node('start').onclick();for(hitIndex=0;hitIndex<3;hitIndex++){loop(hitIndex*16);node('interact').onclick()}events.keydown({code:'Escape'});require('node:assert/strict').equal(node('menu').hidden,false,'Cinematic pause must show resume');node('start').onclick();for(let i=1;i<400;i++)loop(48+i*16);require('node:assert/strict').equal(node('ending').hidden,false,'Resumed cinematic must finish');});


import('../src/game/world.ts').then(world=>{
 const nodes2=new Map(), events2={};
 const node2=id=>{if(!nodes2.has(id))nodes2.set(id,{hidden:false,textContent:'',dataset:{},appendChild(){},addEventListener(){},setPointerCapture(){},requestPointerLock(){}});return nodes2.get(id)};
 class Renderer2 extends Renderer { constructor(){super();this.domElement=node2('canvas')} }
 const doc={getElementById:node2,querySelectorAll:()=>[],exitPointerLock(){},pointerLockElement:null,addEventListener(k,f){events2[k]=f}};
 vm.runInNewContext(source,{THREE:{...THREE,WebGLRenderer:Renderer2},dialogueLine:(a,i)=>a[i]??null,nextDialogueIndex:(a,i)=>Math.min(a.length,i+1),belongsTo:(a,b)=>a===b,...world,document:doc,window,innerWidth:800,innerHeight:600,devicePixelRatio:1,performance:{now:()=>0},matchMedia:()=>({matches:true}),Math,Number,Set});
 node2('start').onclick();
 require('node:assert/strict').equal(node2('menu').hidden,false,'Desktop must wait for actual mouse capture');
 doc.pointerLockElement=node2('canvas');events2.pointerlockchange();
 require('node:assert/strict').equal(node2('menu').hidden,true,'Capture starts exploration');
 doc.pointerLockElement=null;events2.pointerlockchange();
 require('node:assert/strict').equal(node2('menu').hidden,false,'Esc returns menu');
 events2.pointerlockerror();
 require('node:assert/strict').match(node2('failure').textContent,/Chrome|Edge/,'Rejected capture explains browser limitation');
});

