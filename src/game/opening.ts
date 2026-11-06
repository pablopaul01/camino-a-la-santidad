const neighborTurns=[
 {speaker:'Vecino',text:'Desde que comenzaron las detenciones, algunas familias ya no se reúnen aquí.',disclosure:'Diálogo recreado'},
 {speaker:'Saulo',text:'¿Han abandonado la ciudad?',disclosure:'Diálogo recreado · respuesta no documentada'},
 {speaker:'Vecino',text:'Algunas sí. ¿Has visto las casas que quedaron vacías?',disclosure:'Diálogo recreado'},
 {speaker:'Saulo',text:'Debo continuar mi viaje a Damasco.',disclosure:'Diálogo recreado · respuesta no documentada'}
] as const;
export const openingEncounter = {
 source: 'Hechos 8:1–3; 9:1–2',
 disclosure: 'El vecino, las respuestas de Saulo en este patio y la escenografía son una recreación narrativa. No son una cita bíblica.',
 turns: neighborTurns,
 lines: neighborTurns.map(turn=>turn.text),
 dialogue: neighborTurns.map(turn=>turn.speaker+': '+turn.text).join(' '),
 reflection: 'Eres Saulo, antes de su encuentro con Cristo. Hechos lo presenta participando en la persecución de la comunidad cristiana. Esta escena introduce sus consecuencias; no atribuye a Saulo una respuesta o un pensamiento interior.',
 nextChapterPlayable: true,
} as const;
export function canOpenEncounter(stage:number,id:string):boolean {
 return (stage===0&&id==='neighbor')||(stage===1&&id==='authorization')||(stage===2&&id==='departure');
}
export const authorizationEncounter = {
 source: 'Hechos 9:1–2',
 disclosure: 'Documento recreado; explicación en paráfrasis. No reproduce una carta conservada ni una cita literal.',
 lines: [
  'Saulo solicita al sumo sacerdote cartas dirigidas a las sinagogas de Damasco.',
  'Su propósito es encontrar allí a seguidores del Camino y llevarlos detenidos a Jerusalén.',
  'Esta autorización reconstruida presenta el contexto de Hechos 9,1–2. Ahora puedes dirigirte a la puerta para cerrar la preparación del viaje.'
 ],
} as const;

export function departureFrame(elapsed:number,dt:number){
 const next=Math.min(4,elapsed+Math.max(0,Math.min(.05,dt)));
 return {elapsed:next,opacity:Math.min(1,next/2),complete:next>=4};
}
