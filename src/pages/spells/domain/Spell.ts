export type Category = "eau" | "air" | "feu" | "terre" | "annulation" | "lévitation" | "métamorphose" | "attaque simple" | "détection magique" | "sort de base";

export type Spell = {
  name: string;
  incantation: string;
  description: string;
  level: number | undefined;
  category: Category;
};
