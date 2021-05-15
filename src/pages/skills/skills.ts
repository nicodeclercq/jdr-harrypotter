import { Trait } from "../../store/State";

type SkillValue = {
  min: number;
  baseTrait: Trait;
};

export const skills: Record<string, SkillValue> = {
  'Acrobatie': {min: 10, baseTrait: 'Dextérité'},
  'Bricolage': {min: 5, baseTrait: 'Dextérité'},
  'Bibliothèque': {min: 15, baseTrait: 'Intelligence'},
  'Combat': {min: 10, baseTrait: 'Force'},
  'Commandement': {min: 10, baseTrait: 'Apparence'},
  'Course': {min: 20, baseTrait: 'Force'},
  'Crochetage': {min: 10, baseTrait: 'Dextérité'},
  'Déguisement': {min: 5, baseTrait: 'Apparence'},
  'Discrétion': {min: 10, baseTrait: 'Perception'},
  'Dressage': {min: 10, baseTrait: 'Apparence'},
  'Esquive': {min: 25, baseTrait: 'Dextérité'},
  'Escalade': {min: 25, baseTrait: 'Force'},
  'Fouille': {min: 20, baseTrait: 'Perception'},
  'Lancer': {min: 20, baseTrait: 'Dextérité'},
  'Mentir/Convaincre': {min: 10, baseTrait: 'Apparence'},
  'Natation': {min: 20, baseTrait: 'Force'},
  'Navigation': {min: 20, baseTrait: 'Dextérité'},
  'Orientation': {min: 20, baseTrait: 'Perception'},
  'Psychologie': {min: 5, baseTrait: 'Intelligence'},
  'Pistage': {min: 0, baseTrait: 'Perception'},
  'Triche': {min: 0, baseTrait: 'Apparence'},
  'Transplanage': {min: 0, baseTrait: 'Pouvoir'},
  'Vigilance': {min: 20, baseTrait: 'Perception'},
  'Vol sur balai': {min: 0, baseTrait: 'Dextérité'},
};
