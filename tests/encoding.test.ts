import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
test('application source is valid UTF-8 without corrupted Spanish text',()=>{
 function scan(dir:string){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
   const file=path.join(dir,entry.name);
   if(entry.isDirectory())scan(file);
   else if(/\.(ts|astro|css)$/.test(file)){
    const text=new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(file));
    assert.doesNotMatch(text,/[\u00c3\u00c2\ufffd]|\u00e2[\u20ac\u0080]/,file);
   }
  }
 }
 scan('src');
 const scene=fs.readFileSync('src/game/scene.ts','utf8');
 assert.ok(scene.includes('Continuar exploración'));
 assert.ok(scene.includes('Entrar en Jerusalén'));
});
