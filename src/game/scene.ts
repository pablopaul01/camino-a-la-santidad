import type { DialogueTurn } from './dialogue';
import { initialEncounter, startEncounter, tickEncounter, advanceVoice, encounterLines, encounterTurns } from './road-encounter';
import { canWalkRoad, reachedRest } from './road';
import { createRoad } from './road-scene';
import { canOpenEncounter, departureFrame } from './opening';
import { dialogueLine, nextDialogueIndex } from './dialogue';
import { belongsTo } from './picking';
import * as THREE from 'three';
import type { SolidBounds } from './world';
import { walls, canStand, movement, advanceQuest, shouldLook } from './world';

const $ = (id:string) => document.getElementById(id)!;
const isOpening = $('view').dataset.chapter === 'opening';
const isRoad = $('view').dataset.chapter === 'road';
const scene = new THREE.Scene();
scene.background = new THREE.Color(isRoad ? 0xc5b79f : isOpening ? 0xa8afb0 : 0x121f2c);
scene.fog = new THREE.FogExp2(isRoad ? 0xc5b79f : isOpening ? 0xa8afb0 : 0x121f2c,isRoad?.012:.033);
const camera = new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.1,65);
camera.rotation.order='YXZ';
const renderer = new THREE.WebGLRenderer({antialias:true,powerPreference:'low-power'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
renderer.setSize(innerWidth,innerHeight);
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.35;
$('view').appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xabbdd7,0x544331,2));
const moonlight=new THREE.DirectionalLight(0xb9d2ed,2.2);
moonlight.position.set(-4,12,-8);scene.add(moonlight);
const stone=new THREE.MeshStandardMaterial({color:0x807363,roughness:1});
const dark=new THREE.MeshStandardMaterial({color:0x403629,roughness:1});
const ground=new THREE.MeshStandardMaterial({color:0x6b6254,roughness:1});
const solids: SolidBounds[]=[];
function box(x:number,y:number,z:number,w:number,h:number,d:number,material:THREE.Material=stone){
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
 mesh.position.set(x,y,z);scene.add(mesh);
 // Only geometry intersecting the standing player's vertical body is solid.
 // Keep the collider footprint derived from the same dimensions as the mesh.
 if(y+h/2>.15&&y-h/2<1.65)solids.push([x,z,w,d]);
 return mesh;
}
type Hotspot = {id:string;mesh:THREE.Object3D;label:string;text:string};
let hotspots:Hotspot[]=[];
const lamps:THREE.PointLight[]=[];
if(isRoad){
 createRoad(scene,box);
}else{
box(0,-.1,0,18,.2,30,ground);
for(const [x,z,w,d] of walls){
 box(x,2.2,z,w,4.4,d);
 // Shallow courses on visible walls provide depth without texture downloads.
 if(w>1)for(let y=.6;y<4.4;y+=.7)box(x,y,z+.02,w,.025,d+.03,dark);
}
for(let i=0;i<9;i++){
 box(-10,2+i%3,-14+i*3,3,6+i%3,2);
 box(10,3,-14+i*3,3,6,2);
}
for(let i=0;i<5;i++)box(-1.6+i*.8,4.7,-13,.5,.65,.65);
const skyMoon=new THREE.Mesh(new THREE.SphereGeometry(.6,16,12),new THREE.MeshBasicMaterial({color:0xe6dfc8}));
skyMoon.position.set(-8,14,-28);if(!isOpening)scene.add(skyMoon);
// Fixed props stay against walls: inaccessible rear faces need no authored detail.
box(-5, .65,3,1.7,1.3,.7,dark);
box(6.9,1,7,.7,2,2,dark);
for(let i=0;i<4;i++)box(-6.8,.3+i*.32,8,1.2,.3,1.1,dark);
const paper=new THREE.MeshStandardMaterial({color:0xe3cfa1,roughness:1});
const letter=box(-5,1.32,3,.65,.03,.42,paper);
const gate=box(4.2,1.4,-2.68,1.7,2.8,.12,dark);
for(let i=0;i<7;i++)box(3.5+i*.23,1.4,-2.58,.035,2.75,.06,stone);
const opening=box(0,2.4,-12.7,1.25,1.6,.1,new THREE.MeshBasicMaterial({color:0x07131c}));

for(const [x,z] of [[-5,3],[4,-2],[0,-11]]){
 const light=new THREE.PointLight(0xffbb64,20,9,2);light.position.set(x,2,z);scene.add(light);lamps.push(light);
 box(x,1.9,z,.13,.35,.13,new THREE.MeshBasicMaterial({color:0xffca7a}));
}
const neighbor = new THREE.Group();
if(isOpening){
 const robe = new THREE.Mesh(new THREE.CylinderGeometry(.24,.37,1.2,10),new THREE.MeshStandardMaterial({color:0x655a4e}));
 robe.position.y=.8;
 const head = new THREE.Mesh(new THREE.SphereGeometry(.18,12,10),new THREE.MeshStandardMaterial({color:0xb58b6b}));
 head.position.y=1.58;
 neighbor.add(robe,head);neighbor.position.set(3.5,0,-1);
 scene.add(neighbor);
 solids.push([3.5,-1,.74,.74]);
 box(0,2.2,-3,4,4.4,.5);
}
hotspots=isOpening ? [
 {id:'neighbor',mesh:neighbor,label:'Escuchar al vecino',text:'Un vecino habla de las familias que han abandonado la ciudad.'},
 {id:'authorization',mesh:letter,label:'Examinar la autorización',text:'Documento recreado, basado en Hechos 9,1–2.'},
 {id:'departure',mesh:gate,label:'Partir hacia Damasco',text:'Salida del capítulo de Jerusalén.'}
] : [
 {id:'letter',mesh:letter,label:'Leer el mensaje',text:'«Las puertas están vigiladas. Busca la abertura al final del callejón». Mensaje recreado.'},
 {id:'gate',mesh:gate,label:'Observar la puerta',text:'La puerta no es una salida segura. El callejón conduce a la muralla.'},
 {id:'wall',mesh:opening,label:'Acercarse a la muralla',text:'Desde aquí, los discípulos podrán ayudarte a salir.'}
];
}
let openingStage=0;
let roadComplete=false;
let roadEncounter=isRoad?initialEncounter():null;
let departureElapsed:number|null=null;
let dialogueAnchor=new THREE.Vector3(3.5,2.1,-1);
let dialogueLines: string[]=[];
let dialogueTurns:readonly DialogueTurn[]=[];
let dialogueIndex=0, dialogueLoading=false, dialogueGeneration=0;
let stage=0,active=false,yaw=0,pitch=0,cinema=0,target:any=null,last=performance.now(),captionTime=0;
const keys=new Set<string>();
const ray=new THREE.Raycaster();
const objectives=['Encuentra el mensaje junto a la lámpara.','Acércate a la puerta de madera y examínala.','Sigue el callejón hasta la abertura en la muralla.'];
function reset(){roadComplete=false;if(isRoad){roadEncounter=initialEncounter();$('road-veil').hidden=true;$('road-speech').hidden=true;}departureElapsed=null;if(isOpening){$('departure').hidden=true;$('departure-note').hidden=true;}openingStage=0;dialogueGeneration++;dialogueLines=[];dialogueTurns=[];dialogueIndex=0;dialogueLoading=false;if(isOpening)$('speech').hidden=true;stage=0;yaw=0;pitch=0;cinema=0;camera.position.set(0,1.65,9);camera.rotation.set(0,0,0);$('objective').textContent=isRoad?'Sigue la senda hasta el pequeño refugio.':isOpening?'Acércate al vecino junto a la puerta y escucha.':objectives[0];$('caption').textContent='';$('ending').hidden=true}
function pause(){active=false;if(isRoad)$('road-speech').hidden=true;if(isOpening)$('speech').hidden=true;keys.clear();document.exitPointerLock?.();if(cinema<5&&$('ending').hidden){$('menu').hidden=false;$('start').textContent='Continuar exploración'}}
function activate() {
 active=true;
 last=performance.now();
 $('menu').hidden=true;
 $('failure').textContent='';
 if(isOpening)showDialogue();
 if(isRoad)renderRoadEncounter();
}
function captureFailed() {
 pause();
 $('failure').textContent='Este navegador no permitió capturar el mouse. Abre esta misma dirección en Chrome o Edge para ocultar el cursor y girar sin límites. Luego pulsa Continuar.';
}
function begin() {
 if(!matchMedia('(pointer:fine)').matches){activate();return}
 // Do not start desktop exploration until the browser confirms pointer lock.
 try {
  const request=renderer.domElement.requestPointerLock();
  request?.catch(captureFailed);
 } catch { captureFailed() }
}
$('start').onclick=begin;$('pause').onclick=pause;
$('restart').onclick=()=>{reset();begin()};
function showDialogue(){
 if(!isOpening)return;
 const line=dialogueLine(dialogueLines,dialogueIndex);
 $('speech').hidden=!active||line===null;
 if(line!==null){
  const turn=dialogueTurns[dialogueIndex];
  $('speech-speaker').textContent=turn?.speaker??'Documento';
  $('speech-disclosure').textContent=turn?.disclosure??'Documento recreado';
  $('speech').classList.toggle('speech-self',turn?.speaker==='Saulo');
  $('speech').setAttribute('aria-label','Intervención de '+(turn?.speaker??'Documento'));
  $('speech-text').textContent=line;
  $('speech-progress').textContent=(dialogueIndex+1)+' / '+dialogueLines.length;
  $('speech-next').textContent=dialogueIndex===dialogueLines.length-1?'Terminar · E':'Continuar · E';
 }
}
function advanceDialogue(){
 dialogueIndex=nextDialogueIndex(dialogueLines,dialogueIndex);
 if(dialogueLine(dialogueLines,dialogueIndex)===null){
  dialogueLines=[];openingStage=Math.min(2,openingStage+1);
  $('objective').textContent=openingStage===1
   ?'Examina la autorización sobre la mesa, al otro lado del patio.'
   :'Dirígete a la puerta de madera para partir hacia Damasco.';
 }
 showDialogue();
}
if(isOpening)$('speech-next').onclick=()=>{if(active)advanceDialogue()};
function renderRoadEncounter(){
 if(!isRoad||!roadEncounter)return;
 const phase=roadEncounter.phase;
 const veil=$('road-veil');
 const voice=$('road-speech');
 veil.hidden=phase==='waiting';
 voice.hidden=!active||phase!=='voice';
 $('interact').hidden=true;
 if(phase==='light'||phase==='voice'){
  veil.style.background='#f4e8bd';
  veil.style.opacity=String(phase==='voice'?.82:roadEncounter.elapsed/3*.82);
  camera.position.y=1.65-(phase==='voice'?1:roadEncounter.elapsed/3)*.9;
  $('objective').textContent='Una luz envuelve a Saulo.';
 }
 if(phase==='voice'){
  const turn=encounterTurns[roadEncounter.line];
  $('road-speaker').textContent=turn.speaker;
  $('road-disclosure').textContent=turn.disclosure+' · sin audio todavía';
  voice.classList.toggle('speech-self',turn.speaker==='Saulo');
  voice.setAttribute('aria-label','Intervención de '+turn.speaker);
  $('road-line').textContent=turn.text;
  $('road-progress').textContent=(roadEncounter.line+1)+' / '+encounterLines.length;
  $('road-next').textContent='Continuar · E';
 }
 if(phase==='blind'||phase==='complete'){
  veil.style.background='#080c12';
  veil.style.opacity=String(phase==='complete'?1:.82+roadEncounter.elapsed/3*.18);
  $('objective').textContent=phase==='complete'
   ?'Saulo no puede ver. Necesitará ayuda para entrar en Damasco. Fin de esta escena; Esc abre el menú.'
   :'Saulo se levanta, pero no puede ver.';
  camera.position.y=.75+(phase==='complete'?1:roadEncounter.elapsed/3)*.9;
 }
}
function interact(){
 if(isRoad&&active&&roadEncounter?.phase==='voice'){
  roadEncounter=advanceVoice(roadEncounter);renderRoadEncounter();return;
 }
 if(!active||cinema||dialogueLoading||departureElapsed!==null)return;
 if(dialogueLines.length){advanceDialogue();return}
 if(!target)return;
 if(isOpening){
  if(!canOpenEncounter(openingStage,target.id)){
   $('caption').textContent=openingStage===0?'Primero escucha al vecino junto a la puerta.':'Ya has completado este encuentro.';
   captionTime=4;return;
  }
  if(target.id==='departure'){
   departureElapsed=0;keys.clear();
   $('interact').hidden=true;
   $('departure').hidden=false;
   $('departure').style.opacity='0';
   $('objective').textContent='Rumbo a Damasco';
   return;
  }
  const encounterId=target.id;
  dialogueLoading=true;keys.clear();
  const generation=dialogueGeneration;
  import('./opening').then(({openingEncounter,authorizationEncounter})=>{
   if(generation!==dialogueGeneration)return;
   const authorization=encounterId==='authorization';
   dialogueTurns=authorization
    ?authorizationEncounter.lines.map(text=>({speaker:'Documento',text,disclosure:'Documento recreado · paráfrasis de Hechos 9,1–2'}))
    :openingEncounter.turns;
   dialogueLines=dialogueTurns.map(turn=>turn.text);
   dialogueAnchor.set(authorization?-5:3.5,authorization?1.7:2.1,authorization?3:-1);
   dialogueIndex=0;dialogueLoading=false;showDialogue();
  }).catch(()=>{
   if(generation!==dialogueGeneration)return;
   dialogueLoading=false;pause();
   $('failure').textContent='No se pudo cargar el diálogo. Vuelve a entrar para intentarlo.';
  });
  return;
 }
 const next=advanceQuest(stage,target.id);
 $('caption').textContent=next===stage?'Primero sigue la indicación del objetivo.':target.text;
 captionTime=7;
 if(next===stage)return;
 stage=next;
 if(stage<3)$('objective').textContent=objectives[stage];
 else{cinema=.001;keys.clear();$('objective').textContent='La muralla de Damasco';$('interact').hidden=true}
}
$('interact').onclick=interact;
if(isRoad)$('road-next').onclick=interact;
window.addEventListener('keydown',e=>{
 if(e.code==='Escape'){pause();return}
 if(!active)return;
 if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyE'].includes(e.code))e.preventDefault();
 keys.add(e.code);if(e.code==='KeyE'&&!e.repeat)interact();
});
window.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',pause);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
document.addEventListener('pointerlockchange',()=>{
 if(document.pointerLockElement===renderer.domElement)activate();
 else if(active&&matchMedia('(pointer:fine)').matches)pause();
});
document.addEventListener('pointerlockerror',captureFailed);
function look(dx:number,dy:number){if(!active||cinema||dialogueLines.length||departureElapsed!==null||(isRoad&&roadEncounter?.phase!=='waiting'))return;yaw-=dx*.0025;pitch=Math.max(-1.15,Math.min(1.15,pitch-dy*.0025))}
document.addEventListener('mousemove',e=>{if(document.pointerLockElement)look(e.movementX,e.movementY)});
let drag:number|null=null,px=0,py=0;
renderer.domElement.addEventListener('pointerdown',e=>{if(!active)return;drag=e.pointerId;px=e.clientX;py=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)});
renderer.domElement.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'&&shouldLook(e.pointerType,!!document.pointerLockElement,drag===e.pointerId)){if(e.pointerType==='mouse')look(e.movementX,e.movementY);else look(e.clientX-px,e.clientY-py);px=e.clientX;py=e.clientY}});
for(const event of ['pointerup','pointercancel','lostpointercapture'])renderer.domElement.addEventListener(event,()=>drag=null);
document.querySelectorAll<HTMLButtonElement>('[data-key]').forEach(button=>{
 button.onpointerdown=e=>{if(!active)return;button.setPointerCapture(e.pointerId);keys.add(button.dataset.key!)};
 button.onpointerup=button.onpointercancel=button.onlostpointercapture=()=>keys.delete(button.dataset.key!);
});
function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)}
window.addEventListener('resize',resize);
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();pause();$('failure').textContent='Se perdió el contexto gráfico. Recarga la página para continuar.'});
reset();($('start') as HTMLButtonElement).disabled=false;$('start').textContent=isRoad?'Continuar por el camino':isOpening?'Entrar en Jerusalén':'Entrar en Damasco';
const cineStart=new THREE.Vector3();
renderer.setAnimationLoop((now:number)=>{
 const dt=Math.min(.05,(now-last)/1000);last=now;
 if(active){
  if(isRoad&&roadEncounter&&roadEncounter.phase!=='waiting'){
   roadEncounter=tickEncounter(roadEncounter,dt);
   renderRoadEncounter();
  }else if(isOpening&&departureElapsed!==null){
   const frame=departureFrame(departureElapsed,dt);
   departureElapsed=frame.elapsed;
   camera.lookAt(4.2,1.4,-2.68);
   $('departure').style.opacity=String(frame.opacity);
   if(frame.complete){
    openingStage=3;
    active=false;keys.clear();
    document.exitPointerLock?.();
    window.location.assign('/camino');

   }
  }else if(cinema){
   if(cinema===.001)cineStart.copy(camera.position);
   cinema+=dt;
   const t=Math.min(1,cinema/4),smooth=t*t*(3-2*t);
   camera.position.lerpVectors(cineStart,new THREE.Vector3(0,2,-11.4),smooth);
   camera.lookAt(0,2.6,-13);
   if(cinema>=5){active=false;document.exitPointerLock?.();$('ending').hidden=false;$('caption').textContent=''}
  }else{
   const forward=(dialogueLines.length||dialogueLoading)?0:(Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown')));
   const side=(dialogueLines.length||dialogueLoading)?0:(Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft')));
   const delta=movement(side,forward,yaw,dt);
   if((isRoad?canWalkRoad:canStand)(camera.position.x+delta.x,camera.position.z,solids))camera.position.x+=delta.x;
   if((isRoad?canWalkRoad:canStand)(camera.position.x,camera.position.z+delta.z,solids))camera.position.z+=delta.z;
   camera.rotation.set(pitch,yaw,0);
   camera.updateMatrixWorld();
   ray.setFromCamera(new THREE.Vector2(0,0),camera);
   const hit=ray.intersectObjects(hotspots.map(h=>h.mesh))[0];
   target=hit&&hit.distance<3?hotspots.find(h=>belongsTo(hit.object,h.mesh)):null;
   $('interact').hidden=!target||dialogueLines.length>0||dialogueLoading||(isOpening&&!canOpenEncounter(openingStage,target?.id??''));
   if(target)$('interact').textContent=target.label+' · E';
  }
  if(isRoad&&!roadComplete&&reachedRest(camera.position.x,camera.position.z)){
   roadComplete=true;
   roadEncounter=startEncounter(roadEncounter!);
   keys.clear();$('caption').textContent='';
   renderRoadEncounter();
  }
  captionTime-=dt;if(captionTime<=0)$('caption').textContent='';
 }
 lamps.forEach((light,i)=>light.intensity=19+Math.sin(now*.002+i)*1.2);
 if(isOpening&&dialogueLines.length&&active){
  const anchor=dialogueAnchor.clone().project(camera);
  const balloon=$('speech');
  const halfWidth=Math.min(balloon.offsetWidth||360,innerWidth-48)/2;
  const balloonHeight=balloon.offsetHeight||240;
  const x=Math.max(halfWidth+24,Math.min(innerWidth-halfWidth-24,(anchor.x*.5+.5)*innerWidth));
  const y=Math.max(16,Math.min(innerHeight-balloonHeight-16,(-anchor.y*.5+.5)*innerHeight-balloonHeight-24));
  $('speech').style.left=x+'px';
  $('speech').style.top=y+'px';
 }
 renderer.render(scene,camera);
});


