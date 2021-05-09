export const skills = (prompt: (name: string) => Promise<string>) => ({
  'Acrobatie/Quidditch': {min: 10},
  'Artisanat': {min: 5},
  'Athlétisme': {min: 20},
  'Bagarre': {min: 10},
  'Bibliothèque': {min: 15},
  'Commandement': {min: 10},
  'Connaissance scolaire': {min: 10},
  'Déguisement': {min: 5},
  'Discrétion': {min: 10},
  'Dressage/soin': {min: 10},
  'Empathie': {min: 20},
  'Esquive': {min: 25},
  'Fouille/ménage': {min: 20},
  'Langue étrangère': prompt('Langue étrangère').then((name: string) => ({[name]: {min: 0}})),
  'Langue natale': {min: 70},
  'Orientation': {min: 20},
  'Persuasion/Baratin': {min: 10},
  'Psychologie': {min: 5},
  'Secourisme': {min: 0},
  'Survie': {min: 0},
  'Triche': {min: 0},
  'Vigilance': {min: 20},
  'Connaissance': prompt('Connaissance').then((name: string) => ({[name]: ({min: 0})})),
  'Connaissance des Moldus': {min: 0},
  'Culture générale des sorciers': {min: 20},
  'Jeux sorciers': {min: 10},
  'Mythes et légendes des sorciers': {min: 5},
  'Bricolage': {min: 10},
  'Conduite': {min: 0},
  'Culture générale Moldue': {min: 20},
  'Jeux Moldus': {min: 10},
  'Serrurerie': {min: 10},
});
