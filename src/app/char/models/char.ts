export type Sex = 'male' | 'female';
export type Race = 'human' | 'elf' | 'dwarf' | 'halfling';
export type Alignment = 'lawful' | 'neutral' | 'chaotic';

export interface Char {
  name: string | null;
  sex: Sex | null;
  race: Race | null;
  alignment: Alignment | null;

  abilities: {
    str: number;
    int: number;
    wis: number;
    dex: number;
    con: number;
    cha: number;
  };
}
