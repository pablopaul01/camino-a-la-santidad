export type EncounterPhase='waiting'|'light'|'voice'|'blind'|'complete';
export type EncounterState={phase:EncounterPhase;elapsed:number;line:number};
export const encounterTurns=[
 {speaker:'Voz',text:'Saulo, Saulo, ¿por qué me persigues?',disclosure:'Adaptación de Hechos 9,4'},
 {speaker:'Saulo',text:'¿Quién eres, Señor?',disclosure:'Respuesta de Saulo · Hechos 9,5'},
 {speaker:'Voz',text:'Soy Jesús, a quien tú persigues.',disclosure:'Adaptación de Hechos 9,5'},
 {speaker:'Voz',text:'Levántate y entra en la ciudad. Allí recibirás instrucciones.',disclosure:'Adaptación de Hechos 9,6'}
] as const;
export const encounterLines=encounterTurns.map(turn=>turn.text);
export function initialEncounter():EncounterState{return {phase:'waiting',elapsed:0,line:0}}
export function startEncounter(state:EncounterState):EncounterState{
 return state.phase==='waiting'?{phase:'light',elapsed:0,line:0}:state;
}
export function tickEncounter(state:EncounterState,dt:number):EncounterState{
 if(state.phase!=='light'&&state.phase!=='blind')return state;
 const elapsed=Math.min(3,state.elapsed+Math.max(0,Math.min(.05,dt)));
 if(elapsed<3)return {...state,elapsed};
 return {...state,elapsed:0,phase:state.phase==='light'?'voice':'complete'};
}
export function advanceVoice(state:EncounterState):EncounterState{
 if(state.phase!=='voice')return state;
 return state.line<encounterLines.length-1?{...state,line:state.line+1}:{phase:'blind',elapsed:0,line:state.line};
}
