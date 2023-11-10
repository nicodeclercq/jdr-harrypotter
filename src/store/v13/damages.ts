export const DAMAGE_LEVEL = {
  healthy: "-",
  softlyInconvenient: "légèrement génant",
  painful: "douloureux",
  veryPainful: "très douloureux",
  unusable: "inutilisable",
} as const;

export type DamageLevel = keyof typeof DAMAGE_LEVEL;

export const DAMAGE_LOCATION = {
  head: "tête",
  neck: "cou",
  "shoulder left": "épaule gauche",
  "shoulder right": "épaule droite",
  torax: "torax",
  "arm left": "bras gauche",
  "arm right": "bras droit",
  belly: "ventre",
  pelvis: "pelvis",
  "hand left": "main gauche",
  "hand right": "main droite",
  "thigh left": "cuisse gauche",
  "thigh right": "cuisse droite",
  "knee left": "genou gauche",
  "knee right": "genou droit",
  "calf left": "mollet gauche",
  "calf right": "mollet droit",
  "foot left": "pied gauche",
  "foot right": "pied droit",
} as const;

export type DamageLocation = keyof typeof DAMAGE_LOCATION;
