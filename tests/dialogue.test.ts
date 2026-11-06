import test from 'node:test';
import assert from 'node:assert/strict';
import { dialogueLine, nextDialogueIndex } from '../src/game/dialogue.ts';
test('dialogue advances one balloon per input and ends without repeating',()=>{
 const lines=['Primera intervención.','Segunda intervención.'];
 assert.equal(dialogueLine(lines,0),lines[0]);
 assert.equal(nextDialogueIndex(lines,0),1);
 assert.equal(dialogueLine(lines,1),lines[1]);
 assert.equal(dialogueLine(lines,nextDialogueIndex(lines,1)),null);
 assert.equal(nextDialogueIndex(lines,2),2);
});
