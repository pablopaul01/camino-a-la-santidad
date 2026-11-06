export function dialogueLine(lines: readonly string[], index: number): string | null {
 return index >= 0 && index < lines.length ? lines[index] : null;
}
export function nextDialogueIndex(lines: readonly string[], index: number): number {
 return Math.min(lines.length, index + 1);
}


export type DialogueTurn = {speaker:string;text:string;disclosure:string};
