import { Trait } from "../../store/State";

type SkillValue = {
  min: number;
  baseTrait: Trait;
};

export const fantasySkills: Record<string, SkillValue> = {
  Combat: { min: 10, baseTrait: "Force" },
  Intimidation: { min: 10, baseTrait: "Force" },
  Convaincre: { min: 10, baseTrait: "Charisme" },
  Mentir: { min: 10, baseTrait: "Charisme" },
  Athlétisme: { min: 10, baseTrait: "Constitution" },
  Acrobatie: { min: 10, baseTrait: "Constitution" },
  Bricolage: { min: 10, baseTrait: "Dextérité" },
  Escamotage: { min: 10, baseTrait: "Dextérité" },
  Médecine: { min: 10, baseTrait: "Intelligence" },
  Connaissances: { min: 10, baseTrait: "Intelligence" },
  Psychologie: { min: 10, baseTrait: "Perception" },
  Discrétion: { min: 10, baseTrait: "Perception" },
};

export const hpSkills: Record<string, SkillValue> = {
  Athlétisme: { min: 10, baseTrait: "Dextérité" },
  Bricolage: { min: 5, baseTrait: "Dextérité" },
  Bibliothèque: { min: 15, baseTrait: "Intelligence" },
  Combat: { min: 10, baseTrait: "Force" },
  Crochetage: { min: 10, baseTrait: "Dextérité" },
  "Détection de la magie": { min: 20, baseTrait: "Intelligence" },
  Discrétion: { min: 10, baseTrait: "Perception" },
  Dressage: { min: 10, baseTrait: "Charisme" },
  Esquive: { min: 25, baseTrait: "Dextérité" },
  Fouille: { min: 20, baseTrait: "Perception" },
  "Mentir/Convaincre": { min: 10, baseTrait: "Charisme" },
  Psychologie: { min: 5, baseTrait: "Intelligence" },
  Pistage: { min: 0, baseTrait: "Perception" },
  Transplanage: { min: 0, baseTrait: "Pouvoir" },
  "Vol sur balai": { min: 0, baseTrait: "Dextérité" },
};
