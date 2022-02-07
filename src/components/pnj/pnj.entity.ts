export type PNJ = {
  name: string;
  description?: string | undefined | null;
  character: string[];
  age: number;
  gender: 'Homme' | 'Femme';
  color: {name: string, color: string},
  magics: string;
}