import * as THREE from 'three';

type BoxBuilder = (x:number,y:number,z:number,w:number,h:number,d:number,material?:THREE.Material)=>THREE.Mesh;

export function createRoad(scene:THREE.Scene,box:BoxBuilder) {
 const earth=new THREE.MeshStandardMaterial({color:0x9c805c,roughness:1});
 const path=new THREE.MeshStandardMaterial({color:0xc1a57c,roughness:1});
 const rock=new THREE.MeshStandardMaterial({color:0x7e7566,roughness:1});
 const timber=new THREE.MeshStandardMaterial({color:0x63503b,roughness:1});
 box(0,-.15,-10,100,.3,120,earth);
 box(0,.005,-9,8,.01,45,path);
 // Repeated formations frame the route without claiming a specific historic location.
 for(let i=0;i<14;i++){
  for(const side of [-1,1]){
   const hill=new THREE.Mesh(new THREE.ConeGeometry(4+i%3,4+i%4,7),earth);
   hill.position.set(side*(10+i%4),1,-38+i*4);
   hill.rotation.y=i*.7;scene.add(hill);
  }
 }
 for(const [x,z,w,h] of [[-3.8,0,1.1,.8],[3.8,-8,1.4,1.1],[-3.8,-15,1.2,.9]]){
  const boulder=box(x,h/2,z,w,h,1.3,rock);
  // Keep the visible footprint axis-aligned with its collider.
  boulder.material=rock;
 }
 // A modest shelter is a reconstructed rest point, not a documented biblical landmark.
 for(const x of [.8,2.8])box(x,1.3,-23,.16,2.6,.16,timber);
 box(1.8,2.65,-23,3,.12,2,timber);
 box(2.8,.35,-22,1,.7,.8,rock);
 const sun=new THREE.Mesh(new THREE.SphereGeometry(1.4,16,12),new THREE.MeshBasicMaterial({color:0xffe4ad}));
 sun.position.set(-23,18,-48);scene.add(sun);
}
