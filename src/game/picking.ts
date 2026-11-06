export type SceneNode = { parent: SceneNode | null };
export function belongsTo(object: SceneNode, root: SceneNode): boolean {
 for(let current:SceneNode|null=object;current;current=current.parent){
  if(current===root)return true;
 }
 return false;
}
