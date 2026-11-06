import type { SolidBounds } from './world';

export function canWalkRoad(x:number,z:number,solids:readonly SolidBounds[]=[]):boolean {
 return x>-4.5&&x<4.5&&z>-26&&z<10
  &&!solids.some(([sx,sz,w,d])=>Math.abs(x-sx)<w/2+.25&&Math.abs(z-sz)<d/2+.25);
}
export function reachedRest(x:number,z:number):boolean {
 return Math.hypot(x-1.7,z+22)<2.8;
}
