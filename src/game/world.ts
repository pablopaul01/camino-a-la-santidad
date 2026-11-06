export const walls = [
 [-8,0,0.5,25],[8,0,0.5,25],[0,12,16,.5],
 [-5,-3,6,.5],[5,-3,6,.5],[-2,-8,.5,10],[2,-8,.5,10],[0,-13,4,.5]
];
export type SolidBounds = readonly [number, number, number, number];
export function canStand(x:number,z:number,solids:readonly SolidBounds[]=[]):boolean {
 return (z>-2.5||Math.abs(x)<1.5)&&x>-7.7&&x<7.7&&z<11.7&&z>-12.7&&![...walls,...solids].some(([wx,wz,w,d])=>Math.abs(x-wx)<w/2+.25&&Math.abs(z-wz)<d/2+.25);
}
export function movement(side:number,forward:number,yaw:number,dt:number){
 const n=Math.max(1,Math.hypot(side,forward)), step=3*Math.min(.05,Math.max(0,dt));
 return {x:(side*Math.cos(yaw)-forward*Math.sin(yaw))/n*step,z:(-side*Math.sin(yaw)-forward*Math.cos(yaw))/n*step};
}
export function advanceQuest(stage:number,id:string){return ['letter','gate','wall'][stage]===id?stage+1:stage}

export function shouldLook(pointerType:string,locked:boolean,dragging:boolean):boolean {
 return !locked && (pointerType==='mouse'||dragging);
}
