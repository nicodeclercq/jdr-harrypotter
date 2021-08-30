import { Trait } from "../../store/State";

type SkillValue = {
  min: number;
  baseTrait: Trait;
};

export const skills: Record<string, SkillValue> = {
  'Athlétisme': {min: 10, baseTrait: 'Dextérité'},
  'Bricolage': {min: 5, baseTrait: 'Dextérité'},
  'Bibliothèque': {min: 15, baseTrait: 'Intelligence'},
  'Combat': {min: 10, baseTrait: 'Force'},
  'Crochetage': {min: 10, baseTrait: 'Dextérité'},
  'Détection de la magie': {min: 20, baseTrait: 'Intelligence'},
  'Discrétion': {min: 10, baseTrait: 'Perception'},
  'Dressage': {min: 10, baseTrait: 'Charisme'},
  'Esquive': {min: 25, baseTrait: 'Dextérité'},
  'Fouille': {min: 20, baseTrait: 'Perception'},
  'Mentir/Convaincre': {min: 10, baseTrait: 'Charisme'},
  'Psychologie': {min: 5, baseTrait: 'Intelligence'},
  'Pistage': {min: 0, baseTrait: 'Perception'},
  'Transplanage': {min: 0, baseTrait: 'Pouvoir'},
  'Vol sur balai': {min: 0, baseTrait: 'Dextérité'},
};
