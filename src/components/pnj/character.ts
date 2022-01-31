import { random } from "../../helpers/number";

export const characters = [
  'À l’écoute',
  'Absorbé',
  'Accueillant',
  'Adorable',
  'Adroit',
  'Affectueux',
  'Agressif',
  'Aimable',
  'Aimant',
  'Aimant commander',
  'Aimant la compétition',
  'Aimant les contacts humains',
  'Aimant rendre service',
  'Altruiste',
  'Ambigu',
  'Ambitieux',
  'Amical',
  'Amusant',
  'Angélique',
  'Anxieux',
  'Apaisant',
  'Apathique',
  'Appliqué',
  'Arrogant',
  'Artiste',
  'Asocial',
  'Astucieux',
  'Attendrissant',
  'Attentif',
  'Attentionné',
  'Audacieux',
  'Autonome',
  'Autoritaire',
  'Avare',
  'Averti',
  'Bavard ',
  'Beau parleur',
  'Belliqueux',
  'Bête',
  'Bienveillant',
  'Blasé',
  'Borné',
  'Bourru',
  'Bout-en-train',
  'Brave',
  'Brillant',
  'Bruyant',
  'Brutal',
  'Buté',
  'Cafardeux',
  'Calme',
  'Candide',
  'Capable de mémoriser',
  'Capable de s’adapter facilement',
  'Capable de se concentrer',
  'Capricieux',
  'Caractériel',
  'Cérébral',
  'Chaleureux',
  'Chanceux',
  'Charismatique',
  'Cherchant à oublier ses difficultés',
  'Chieur',
  'Cinglé',
  'Cleptomane',
  'Coléreux',
  'Combatif',
  'Comique',
  'Communicatif',
  'Compétiteur',
  'Compréhensif',
  'Concentré',
  'Conciliant',
  'Concret (esprit pratique)',
  'Confiant',
  'Confiant en soi',
  'Conformiste',
  'Consciencieux',
  'Contemplatif',
  'Coopératif',
  'Coquet',
  'Courageux',
  'Courtois',
  'Créatif',
  'Crédule',
  'Critique',
  'Cruel',
  'Culotté',
  'Cultivé',
  'Cupide',
  'Curieux – dans le sens aimer découvrir de nouvelles choses',
  'Curieux – dans le sens aimer tout savoir pour lancer des rumeurs',
  'Cynique',
  'Débauché',
  'Débrouillard',
  'Décent',
  'Décontracté',
  'Découragé',
  'Dédaigneux',
  'Délicat',
  'Dépendant',
  'Déplaisant',
  'Dépressif',
  'Déraisonnable',
  'Désabusé',
  'Désenchanté',
  'Désintéressé',
  'Désinvolte',
  'Désordonné',
  'Détendu',
  'Détestable',
  'Dévoué',
  'Diabolique',
  'Digne',
  'Diplomate',
  'Direct',
  'Discipliné',
  'Discret',
  'Disponible',
  'Distingué',
  'Distrait',
  'Docile',
  'Doucereux',
  'Douteux',
  'Doux',
  'Droit',
  'Dur',
  'Dynamique',
  'Économe',
  'Effronté',
  'Égal d’humeur',
  'Égoïste',
  'Élégant',
  'Émotif',
  'Énergique',
  'Énervant',
  'Énigmatique',
  'Effacé',
  'Efficace',
  'Entêté',
  'Enthousiaste',
  'Envieux',
  'Escroc',
  'Étroit d’esprit',
  'Évitant les contacts avec les autres',
  'Excentrique',
  'Excessif',
  'Exigent',
  'Expansif',
  'Explorateur',
  'Expressif',
  'Extraverti',
  'Exubérant',
  'Fainéant',
  'Familier',
  'Fantasque',
  'Fantaisiste',
  'Fatiguant',
  'Faux',
  'Féminin',
  'Fêtard',
  'Ferme',
  'Fidèle',
  'Fier',
  'Flatteur',
  'Flegmatique',
  'Flexible',
  'Fonceur',
  'Fou',
  'Fougueux',
  'Fouinard',
  'Fouineur',
  'Fourbe',
  'Franc',
  'Froid',
  'Futé',
  'Gaffeur',
  'Gai',
  'Galant',
  'Geignard',
  'Généreux',
  'Gentil',
  'Glacial',
  'Gourmand',
  'Gracieux',
  'Grégaire',
  'Grossier',
  'Guindé',
  'Habile',
  'Hautain',
  'Hésitant',
  'Honnête',
  'Honorable',
  'Humble',
  'Hypocrite',
  'Hystérique',
  'Idiot',
  'Imaginatif',
  'Immature',
  'Impatient',
  'Impertinent',
  'Impliqué',
  'Impudent',
  'Impulsif',
  'Inébranlable',
  'Incertain',
  'Indépendant',
  'Indifférent',
  'Influençable',
  'Influent',
  'Ingénieux',
  'Ingénu',
  'Inoffensif',
  'Inquiet',
  'Insolent',
  'Intellectuel',
  'Intelligent',
  'Intolérant',
  'Intrépide',
  'Intuitif',
  'Ironique',
  'Irrésistible',
  'Irritant',
  'Jaloux',
  'Jeune',
  'Joueur',
  'Jovial',
  'Joyeux',
  'Juste',
  'Lâche',
  'Large d’esprit',
  'Leader',
  'Lent',
  'Libertin (au sens indépendance d’esprit, eu 17ème siècle)',
  'Logique',
  'Loyal',
  'Lunatique',
  'Lymphatique',
  'M’as-tu-vu',
  'Machiavélique',
  'Magnanime',
  'Maître de soi',
  'Maladroit',
  'Malhonnête',
  'Malicieux',
  'Malin',
  'Malsain',
  'Maniaque',
  'Manichéen',
  'Manifestant sa joie ou sa peine',
  'Manipulateur',
  'Manuel',
  'Mature',
  'Mauvais',
  'Méchant',
  'Méfiant',
  'Mégalomane',
  'Mélomane',
  'Meneur',
  'Menteur',
  'Mesquin',
  'Méthodique',
  'Méticuleux',
  'Minutieux',
  'Modéré',
  'Modeste',
  'Montrant peu sa joie ou sa peine',
  'Moral',
  'Mou',
  'Mystérieux',
  'Mythomane',
  'N’aimant pas être seul',
  'N’aimant pas le travail en équipe',
  'Naïf',
  'Narcissique',
  'Naturel',
  'Négatif',
  'Négligent',
  'Nerveux',
  'Niais',
  'Nigaud',
  'Nihiliste',
  'Nonchalant',
  'Normal',
  'Obéissant',
  'Objectif',
  'Observateur',
  'Occupé',
  'Opportuniste',
  'Optimiste',
  'Ordinaire',
  'Ordonné',
  'Organisé',
  'Orgueilleux',
  'Orienté solution',
  'Original',
  'Ouvert',
  'Pacifique',
  'Paisible',
  'Paresseux',
  'Passionné',
  'Passionnel',
  'Patient',
  'Pensif',
  'Persévérant',
  'Perspicace',
  'Persuasif',
  'Pervers',
  'Pessimiste',
  'Pétillant',
  'Peureux',
  'Pimbêche',
  'Poète',
  'Pointilleux',
  'Ponctuel',
  'Posé',
  'Possessif',
  'Précieux',
  'Prétentieux',
  'Précis',
  'Prévoyant',
  'Pragmatique',
  'Protecteur',
  'Prude',
  'Prudent',
  'Pudibond',
  'Puéril',
  'Pudique',
  'Qui a le contact facile',
  'Qui s’exprime facilement',
  'Rabat-joie',
  'Raffiné',
  'Raisonnable',
  'Râleur',
  'Rancunier',
  'Rapide',
  'Rassurant',
  'Rationnel',
  'Réaliste',
  'Rebelle',
  'Réceptif',
  'Reconnaissant',
  'Réfléchi',
  'Régulier',
  'Remuant',
  'Renfermé',
  'Renfrogné',
  'Réservé',
  'Résistant',
  'Respectable',
  'Respectueux',
  'Responsable',
  'Retord',
  'Rêveur',
  'Rigide',
  'Romantique',
  'Rouspéteur',
  'Rusé',
  'Rustre',
  'Sadique',
  'Sage',
  'Sanguin',
  'Sans pitié',
  'Sceptique',
  'Scrupuleux',
  'Secret',
  'Sécurisant',
  'Sensé',
  'Sensible',
  'Sensuel',
  'Sentimental',
  'Serein',
  'Sérieux',
  'Serviable',
  'Seul',
  'Sévère',
  'Silencieux',
  'Simple',
  'Simplet',
  'Snob',
  'Sociable',
  'Soigné',
  'Soigneux',
  'Solidaire',
  'Solitaire',
  'Sordide',
  'Sot',
  'Soucieux',
  'Soumis',
  'Souriant',
  'Spontané',
  'Sportif',
  'Stable',
  'Strict',
  'Subtil',
  'Suiveur',
  'Sûr de soi',
  'Surprenant',
  'Survolté',
  'Susceptible',
  'Taquin',
  'Téméraire',
  'Tenace',
  'Tendre',
  'Têtu',
  'Timide',
  'Tolérant',
  'Torturé',
  'Traître',
  'Tranquille',
  'Travailleur',
  'Tricheur',
  'Triste',
  'Utopiste',
  'Valeureux',
  'Vaniteux',
  'Vantard',
  'Vénale',
  'Vicieux',
  'Vif',
  'Violent',
  'Viril',
  'Virulent',
  'Vivant',
  'Volontaire',
  'Vrai',
] as const;

export const sexes = [
  'Homme',
  'Femme',
] as const;

export const colors = [
  {
    "name": "Abricot",
    "color": "E67E30"
  },
  {
    "name": "Acajou",
    "color": "88421D"
  },
  {
    "name": "Aigue-marine",
    "color": "79F8F8"
  },
  {
    "name": "Alezan (chevaux)",
    "color": "A76726"
  },
  {
    "name": "Amande",
    "color": "82C46C"
  },
  {
    "name": "Amarante",
    "color": "91283B"
  },
  {
    "name": "Ambre",
    "color": "F0C300"
  },
  {
    "name": "Améthyste",
    "color": "884DA7"
  },
  {
    "name": "Anthracite",
    "color": "303030"
  },
  {
    "name": "Aquilain (chevaux)",
    "color": "AD4F09"
  },
  {
    "name": "Argent (héraldique)",
    "color": "FFFFFF"
  },
  {
    "name": "Aubergine",
    "color": "370028"
  },
  {
    "name": "Auburn (cheveux)",
    "color": "9D3E0C"
  },
  {
    "name": "Aurore",
    "color": "FFCB60"
  },
  {
    "name": "Avocat",
    "color": "568203"
  },
  {
    "name": "Azur",
    "color": "007FFF"
  },
  {
    "name": "Baillet (chevaux, vieilli)",
    "color": "AE642D"
  },
  {
    "name": "Basané (teint)",
    "color": "8B6C42"
  },
  {
    "name": "Beurre",
    "color": "F0E36B"
  },
  {
    "name": "Bis",
    "color": "766F64"
  },
  {
    "name": "Bisque",
    "color": "FFE4C4"
  },
  {
    "name": "Bistre",
    "color": "856D4D"
  },
  {
    "name": "Bitume (pigment)",
    "color": "4E3D28"
  },
  {
    "name": "Blanc cassé",
    "color": "FEFEE2"
  },
  {
    "name": "Blanc lunaire",
    "color": "F4FEFE"
  },
  {
    "name": "Blé",
    "color": "E8D630"
  },
  {
    "name": "Bleu acier",
    "color": "3A8EBA"
  },
  {
    "name": "Bleu barbeau ou bleuet",
    "color": "5472AE"
  },
  {
    "name": "Bleu canard",
    "color": "048B9A"
  },
  {
    "name": "Bleu céleste",
    "color": "26C4EC"
  },
  {
    "name": "Bleu charrette",
    "color": "8EA2C6"
  },
  {
    "name": "Bleu ciel",
    "color": "77B5FE"
  },
  {
    "name": "Bleu de cobalt",
    "color": "22427C"
  },
  {
    "name": "Bleu de Prusse, de Berlin ou bleu hussard",
    "color": "24445C"
  },
  {
    "name": "Bleu électrique",
    "color": "2C75FF"
  },
  {
    "name": "Bleu givré",
    "color": "80D0D0"
  },
  {
    "name": "Bleu marine",
    "color": "03224C"
  },
  {
    "name": "Bleu nuit",
    "color": "0F056B"
  },
  {
    "name": "Bleu outremer (pigment)",
    "color": "004787"
  },
  {
    "name": "Bleu paon",
    "color": "067790"
  },
  {
    "name": "Bleu persan",
    "color": "4E63CE"
  },
  {
    "name": "Bleu pétrole",
    "color": "1D4851"
  },
  {
    "name": "Bleu roi ou de France",
    "color": "318CE7"
  },
  {
    "name": "Bleu turquin",
    "color": "425B8A"
  },
  {
    "name": "Blond vénitien (cheveux)",
    "color": "E7A854"
  },
  {
    "name": "Blond (cheveux)",
    "color": "E2BC74"
  },
  {
    "name": "Bouton d'or",
    "color": "FCDC12"
  },
  {
    "name": "Brique",
    "color": "842E1B"
  },
  {
    "name": "Bronze",
    "color": "614E1A"
  },
  {
    "name": "Brou de noix",
    "color": "3F2204"
  },
  {
    "name": "Caca d'oie",
    "color": "CDCD0D"
  },
  {
    "name": "Cacao",
    "color": "614B3A"
  },
  {
    "name": "Cachou (pigments)",
    "color": "2F1B0C"
  },
  {
    "name": "Cæruleum",
    "color": "357AB7"
  },
  {
    "name": "Café",
    "color": "462E01"
  },
  {
    "name": "Café au lait",
    "color": "785E2F"
  },
  {
    "name": "Cannelle",
    "color": "7E5835"
  },
  {
    "name": "Capucine",
    "color": "FF5E4D"
  },
  {
    "name": "Caramel (pigments)",
    "color": "7E3300"
  },
  {
    "name": "Carmin (pigment)",
    "color": "960018"
  },
  {
    "name": "Carotte",
    "color": "F4661B"
  },
  {
    "name": "Chamois",
    "color": "D0C07A"
  },
  {
    "name": "Chartreuse",
    "color": "7FFF00"
  },
  {
    "name": "Châtain (cheveux)",
    "color": "8B6C42"
  },
  {
    "name": "Chaudron",
    "color": "85530F"
  },
  {
    "name": "Chocolat",
    "color": "5A3A22"
  },
  {
    "name": "Cinabre (pigment)",
    "color": "DB1702"
  },
  {
    "name": "Citrouille",
    "color": "DF6D14"
  },
  {
    "name": "Coquille d'œuf",
    "color": "FDE9E0"
  },
  {
    "name": "Corail",
    "color": "E73E01"
  },
  {
    "name": "Cramoisi",
    "color": "DC143C"
  },
  {
    "name": "Cuisse de nymphe",
    "color": "FEE7F0"
  },
  {
    "name": "Cuivre",
    "color": "B36700"
  },
  {
    "name": "Cyan",
    "color": "2BFAFA"
  },
  {
    "name": "Écarlate",
    "color": "ED0000"
  },
  {
    "name": "Écru",
    "color": "FEFEE0"
  },
  {
    "name": "Émeraude (pigment PG18)",
    "color": "00815F"
  },
  {
    "name": "Fauve",
    "color": "AD4F09"
  },
  {
    "name": "Flave",
    "color": "E6E697"
  },
  {
    "name": "Fraise",
    "color": "BF3030"
  },
  {
    "name": "Fraise écrasée",
    "color": "A42424"
  },
  {
    "name": "Framboise",
    "color": "C72C48"
  },
  {
    "name": "Fuchsia",
    "color": "FD3F92"
  },
  {
    "name": "Fumée",
    "color": "BBD2E1"
  },
  {
    "name": "Garance (pigment)",
    "color": "EE1010"
  },
  {
    "name": "Glauque",
    "color": "649B88"
  },
  {
    "name": "Glycine",
    "color": "C9A0DC"
  },
  {
    "name": "Grège",
    "color": "BBAE98"
  },
  {
    "name": "Grenadine",
    "color": "E9383F"
  },
  {
    "name": "Grenat",
    "color": "6E0B14"
  },
  {
    "name": "Gris acier",
    "color": "AFAFAF"
  },
  {
    "name": "Gris de Payne",
    "color": "677179"
  },
  {
    "name": "Gris fer",
    "color": "7F7F7F"
  },
  {
    "name": "Gris perle",
    "color": "CECECE"
  },
  {
    "name": "Gris souris",
    "color": "9E9E9E"
  },
  {
    "name": "Groseille",
    "color": "CF0A1D"
  },
  {
    "name": "Gueules (héraldique)",
    "color": "E21313"
  },
  {
    "name": "Héliotrope",
    "color": "DF73FF"
  },
  {
    "name": "Incarnat",
    "color": "FF6F7D"
  },
  {
    "name": "Indigo",
    "color": "791CF8"
  },
  {
    "name": "Indigo (teinture)",
    "color": "2E006C"
  },
  {
    "name": "Isabelle",
    "color": "FEA777"
  },
  {
    "name": "Jaune canari",
    "color": "E7F00D"
  },
  {
    "name": "Jaune citron",
    "color": "F7FF3C"
  },
  {
    "name": "Jaune d'or",
    "color": "EFD807"
  },
  {
    "name": "Jaune de cobalt",
    "color": "FDEE00"
  },
  {
    "name": "Jaune de Mars (pigment)",
    "color": "EED153"
  },
  {
    "name": "Jaune de Naples (pigment)",
    "color": "FFF0BC"
  },
  {
    "name": "Jaune impérial",
    "color": "FFE436"
  },
  {
    "name": "Jaune mimosa",
    "color": "FEF86C"
  },
  {
    "name": "Lapis-lazuli",
    "color": "26619C"
  },
  {
    "name": "Lavallière (reliure)",
    "color": "8F5922"
  },
  {
    "name": "Lavande",
    "color": "9683EC"
  },
  {
    "name": "Lie de vin",
    "color": "AC1E44"
  },
  {
    "name": "Lilas",
    "color": "B666D2"
  },
  {
    "name": "Lime ou vert citron",
    "color": "9EFD38"
  },
  {
    "name": "Lin",
    "color": "FAF0E6"
  },
  {
    "name": "Magenta",
    "color": "FF00FF"
  },
  {
    "name": "Maïs",
    "color": "FFDE75"
  },
  {
    "name": "Malachite",
    "color": "1FA055"
  },
  {
    "name": "Mandarine",
    "color": "FEA347"
  },
  {
    "name": "Marron",
    "color": "582900"
  },
  {
    "name": "Mastic",
    "color": "B3B191"
  },
  {
    "name": "Mauve",
    "color": "D473D4"
  },
  {
    "name": "Menthe",
    "color": "16B84E"
  },
  {
    "name": "Moutarde",
    "color": "C7CF00"
  },
  {
    "name": "Nacarat",
    "color": "FC5D5D"
  },
  {
    "name": "Nankin",
    "color": "F7E269"
  },
  {
    "name": "Noisette",
    "color": "955628"
  },
  {
    "name": "Ocre jaune",
    "color": "DFAF2C"
  },
  {
    "name": "Ocre rouge",
    "color": "DD985C"
  },
  {
    "name": "Olive",
    "color": "708D23"
  },
  {
    "name": "Or (couleur)",
    "color": "FFD700"
  },
  {
    "name": "Orange brûlé",
    "color": "CC5500"
  },
  {
    "name": "Orchidée",
    "color": "DA70D6"
  },
  {
    "name": "Orpiment (pigment)",
    "color": "FCD21C"
  },
  {
    "name": "Paille",
    "color": "FEE347"
  },
  {
    "name": "Parme",
    "color": "CFA0E9"
  },
  {
    "name": "Pelure d'oignon",
    "color": "D58490"
  },
  {
    "name": "Pervenche",
    "color": "CCCCFF"
  },
  {
    "name": "Pistache",
    "color": "BEF574"
  },
  {
    "name": "Poil de chameau",
    "color": "B67823"
  },
  {
    "name": "Ponceau ou Coquelicot",
    "color": "C60800"
  },
  {
    "name": "Pourpre (héraldique)",
    "color": "9E0E40"
  },
  {
    "name": "Prasin",
    "color": "4CA66B"
  },
  {
    "name": "Prune",
    "color": "811453"
  },
  {
    "name": "Puce",
    "color": "4E1609"
  },
  {
    "name": "Rose Mountbatten",
    "color": "997A8D"
  },
  {
    "name": "Rouge anglais (pigment)",
    "color": "F7230C"
  },
  {
    "name": "Rouge cardinal",
    "color": "B82010"
  },
  {
    "name": "Rouge cerise",
    "color": "BB0B0B"
  },
  {
    "name": "Rouge d'Andrinople (teinture)",
    "color": "A91101"
  },
  {
    "name": "Rouge de Falun (pigment)",
    "color": "801818"
  },
  {
    "name": "Rouge feu",
    "color": "FF4901"
  },
  {
    "name": "Rouge indien (pigment)",
    "color": "CD5C5C"
  },
  {
    "name": "Rouge sang",
    "color": "850606"
  },
  {
    "name": "Rouge tomette",
    "color": "AE4A34"
  },
  {
    "name": "Rouille",
    "color": "985717"
  },
  {
    "name": "Roux",
    "color": "AD4F09"
  },
  {
    "name": "Rubis",
    "color": "E0115F"
  },
  {
    "name": "Sable",
    "color": "E0CDA9"
  },
  {
    "name": "Sable (héraldique)",
    "color": "000000"
  },
  {
    "name": "Safre",
    "color": "0131B4"
  },
  {
    "name": "Sang de bœuf",
    "color": "730800"
  },
  {
    "name": "Sanguine",
    "color": "850606"
  },
  {
    "name": "Saphir",
    "color": "0131B4"
  },
  {
    "name": "Sarcelle",
    "color": "008080"
  },
  {
    "name": "Saumon",
    "color": "F88E55"
  },
  {
    "name": "Sépia",
    "color": "AE8964"
  },
  {
    "name": "Sinople (héraldique)",
    "color": "149414"
  },
  {
    "name": "Smalt",
    "color": "003399"
  },
  {
    "name": "Soufre",
    "color": "FFFF6B"
  },
  {
    "name": "Tabac",
    "color": "9F551E"
  },
  {
    "name": "Taupe",
    "color": "463F32"
  },
  {
    "name": "Terre d'ombre",
    "color": "926D27"
  },
  {
    "name": "Tomate",
    "color": "DE2916"
  },
  {
    "name": "Topaze",
    "color": "FAEA73"
  },
  {
    "name": "Tourterelle ou Colombin",
    "color": "BBACAC"
  },
  {
    "name": "Turquoise",
    "color": "25FDE9"
  },
  {
    "name": "Vanille",
    "color": "E1CE9A"
  },
  {
    "name": "Vermeil",
    "color": "FF0921"
  },
  {
    "name": "Vermillon",
    "color": "DB1702"
  },
  {
    "name": "Vert bouteille",
    "color": "096A09"
  },
  {
    "name": "Vert céladon",
    "color": "83A697"
  },
  {
    "name": "Vert d'eau",
    "color": "B0F2B6"
  },
  {
    "name": "Vert de chrome",
    "color": "18391E"
  },
  {
    "name": "Vert-de-gris",
    "color": "95A595"
  },
  {
    "name": "Vert de Hooker",
    "color": "1B4F08"
  },
  {
    "name": "Vert de vessie",
    "color": "22780F"
  },
  {
    "name": "Vert émeraude ou Smaragdin (RAL 6001)",
    "color": "366735"
  },
  {
    "name": "Vert épinard",
    "color": "175732"
  },
  {
    "name": "Vert impérial",
    "color": "00561B"
  },
  {
    "name": "Vert lichen",
    "color": "85C17E"
  },
  {
    "name": "Vert olive",
    "color": "556B2F"
  },
  {
    "name": "Vert perroquet",
    "color": "3AF24B"
  },
  {
    "name": "Vert poireau",
    "color": "4CA66B"
  },
  {
    "name": "Vert pomme",
    "color": "34C924"
  },
  {
    "name": "Vert prairie",
    "color": "57D53B"
  },
  {
    "name": "Vert printemps",
    "color": "00FF7F"
  },
  {
    "name": "Vert sapin",
    "color": "095228"
  },
  {
    "name": "Vert sauge",
    "color": "689D71"
  },
  {
    "name": "Vert tilleul",
    "color": "A5D152"
  },
  {
    "name": "Vert Véronèse",
    "color": "5A6521"
  },
  {
    "name": "Violet",
    "color": "8806CE"
  },
  {
    "name": "Violet d'évêque",
    "color": "723E64"
  },
  {
    "name": "Viride",
    "color": "40826D"
  },
  {
    "name": "Zinzolin",
    "color": "6C0277"
  }
] as const;

export const getRandomAge = () => {
  const young = [16, 30] as const;
  const medium = [31, 50] as const;
  const old = [51, 80] as const;

  const probability = random(0, 100);

  if(probability < 40){
    return random(...young);
  }
  if(probability < 80){
    return random(...medium);
  }
  return random(...old);
}

export const firstnames = {
  Homme: [
  "Acke","Ackerly","Ackley","Acorn","Aedan","Aegis","Aiden","Alabaster","Alan","Alder","Alfalfa","Almond","Amon","Angel","Aqua","Archer","Ari","Arum","Ash","Asher","Aspen","Aster","Austin","Avis","Axel","Azure","Badger","Balsam","Bark","Barrow","Basil","Bay","Bayou","Bear","Berry","Birch","Bird","Blair","Blaze","Blue","Bluejay","Bramble","Bran","Branch","Breeze","Briar","Brier","Brighton","Bronze","Brook","Brooke","Brooks","Buck","Cade","Calder","Canyon","Carnelian","Cayenne","Cedar","Chase","Chervil","Chester",
  "Clay","Cliff","Cloud","Clove","Clyde","Coal","Coast","Cobalt","Colt","Copper","Coriander","Cornelian","Cotton","Cove","Crane","Crescent","Cricket","Crow","Cypress","Dakota","Dale","Danica","Danika","Dante","Dean","Deer","Delta","Dew","Dewy","Dingo","Drake","Dune","Dusk","Dusty","Eban","Edan","Elm","Ember","Everest","Falcon","Fen","Fennel","Fern","Field","Finch","Fjord","Flame","Flint","Ford","Forest","Forrest","Fox","Frost","Gale","Gibbon","Gideon","Ginger","Glen","Glenn","Glyn","Gold","Gorge","Granite","Grove","Harbor","Harvest","Haven","Hawk","Hawke","Hawthorn","Heath","Heron","Horizon","Huckleberry","Hudson","Hunter","Huntley","Hyatt","Hyde","Ice","Indigo","Jade","Jaguar","Jasper","Jay","Jericho","Jet","Jett","Jordan","Judas","Juniper","Kale","Kodiak","Kylan","Kyle","Lagoon","Lake","Land","Lando","Larch","Lark","Laurel","Lazuli","Leaf","Leif","Leo","Leon","Linden","Lion","Lynx","Mace","Macon","Mai","Mango","Mansi","Marin","Marino","Marsh","Mason","Mercury","Mica","Moor","Moth","Newt","North","Nova","Oak","Obsidian","Ocean","Oleander","Oliver","Onyx","Orchard","Orion","Pembroke","Pepper","Phoenix","Pike","Pine","Quarry","Quartz","Quest","Quill","Rain","Raine","Ram","Raven","Reed","Reef","Rhine","Ridge","Rio","River","Roan","Robin","Rock","Rowan","Rue","Ryland","Sable","Sage","Seal","Shadow","Shale","Shell","Silver","Sky","Skylark","Skyler","Slate","Snow","Sol","Sorrel","Spruce","Star","Starling","Steel","Steele","Sterling","Stone","Storm","Stormy","Sunny","Talon","Thicket","Thorn","Thyme","Tide","Tiger","Vale","Valerian","Winter","Wolf","Wolfe","Wood","Woods","Woody","Wren","Yarrow","Zinc",
  "Aaron","Abe","Abel","Abner","Abraham","Abram","Ada","Adam","Addie","Addison","Adelbert","Admiral","Adolph","Adolphus","Adrian","Al","Alan","Albert","Alberto","Albin","Alden","Alec","Alex","Alexander","Alf","Alfonso","Alford","Alfred","Alfredo","Allan","Allen","Allie","Alois","Alonzo","Aloysius","Alpha","Alphonse","Alphonso","Alton","Alvin","Alvis","Ambrose","Amos","Anderson","Andres","Andrew","Andy","Angelo","Angus","Ansel","Anson","Anthony","Anton","Antone","Antonio","Arch","Archibald","Archie","Arley","Armand","Arnold","Aron","Art","Arther","Arthur","Artie","Arvid","Aubrey","August","Augustus","Austin","Avery","Axel","Bailey","Barney","Bart","Bartholomew","Barton","Basil","Baxter","Bee","Ben","Benedict","Benjaman","Benjamin","Benjiman","Bennett","Bennie","Benny","Benton","Bernard","Bernhard","Bernice","Bernie","Berry","Bert","Bertha","Bertie","Bertram","Bertrand","Bessie","Beverly","Bill","Billie","Billy","Bishop","Blaine","Blair","Bob","Bonnie","Booker","Boss","Boyd","Bradford","Bradley","Brady","Brice","Brooks","Brown","Bruce","Bruno","Bryan","Bryant","Buck","Bud","Buford","Burl","Burley","Burr","Burrell","Burt","Burton","Buster","Butler","Byron","Cal","Caleb","Calvin","Carey","Carl","Carleton","Carlos","Carlton","Carrie","Carroll","Carson","Carter","Cary","Casper","Cecil","Charles","Charley","Charlie","Chas","Chauncey","Chesley","Chester","Chris","Christ","Christian","Christopher","Cicero","Clair","Clarance","Clare","Clarence","Clark","Claud","Claude","Clay","Clayton","Clem","Clement","Cleo","Cletus","Cleve","Cleveland","Cliff","Clifford","Clifton","Clint","Clinton","Clovis","Cloyd","Clyde","Coleman","Colonel","Columbus","Connie","Conrad","Corbett","Cornelious","Cornelius","Courtney","Coy","Crawford","Curley","Curtis","Cyril","Cyrus","Dale","Dallas","Dalton","Damon","Dan","Dana","Daniel","Darrell","Dave","David","Davis","Dayton","Dean","Dee","Delbert","Dell","Delmar","Denis","Dennis","Denver","Dewey","Dewitt","Dexter","Dick","Dillard","Doc","Dock","Doctor","Dominic","Dominick","Don","Donald","Donnie","Dorsey","Douglas","Dow","Doyle","Dudley","Duke","Duncan","Dwight","Earl","Earle","Early","Earnest","Ed","Edd","Eddie","Edgar","Edison","Edith","Edmond","Edmund","Edna","Eduardo","Edward","Edwin","Egbert","Elbert","Elder","Eldon","Eldridge","Eli","Elias","Elie","Eliga","Eligah","Elige","Elijah","Elisha","Elizabeth","Ella","Ellie","Elliot","Elliott","Ellis","Ellsworth","Ellwood","Elmer","Elmo","Elmore","Elsie","Elton","Elvin","Elvis","Elwin","Elwood","Elza","Elzie","Emanuel","Emerson","Emery","Emil","Emile","Emma","Emmet","Emmett","Emmit","Emmitt","Emory","Ennis","Enoch","Enos","Ephraim","Ephriam","Eric","Erick","Ernest","Ernie","Ernst","Ervin","Erwin","Essie","Esther","Ethel","Eugene","Eva","Evan","Evans","Everett","Everette","Evert","Ezekiel","Ezra","Fate","Fay","Felipe","Felix","Ferd","Ferdinand","Finis","Finley","Fitzhugh","Fletcher","Florence","Florian","Floyd","Ford","Forest","Forrest","Foster","Frances","Francis","Francisco","Frank","Franklin","Fred","Freddie","Frederic","Frederick","Fredrick","Freeman","French","Fritz","Furman","Gabe","Gabriel","Gail","Gale","Garfield","Garland","Garnett","Garrett","Gary","Gaston","Gaylord","Gene","General","Geo","George","Gerald","Gerard","Gerhard","Gertrude","Gilbert","Giles","Glen","Glenn","Glover","Godfrey","Golden","Gordon","Grace","Grady","Graham","Grant","Granville","Green","Gregorio","Gregory","Grover","Guadalupe","Gus","Guss","Gust","Gustaf","Gustav","Gustave","Guy","Hal","Hallie","Hamilton","Hamp","Hampton","Hans","Hardy","Harlan","Harley","Harmon","Harold","Harper","Harris","Harrison","Harry","Harve","Harvey","Haskell","Hattie","Hayden","Hayes","Hayward","Haywood","Hazel","Heber","Hector","Helen","Helmer","Henderson","Henery","Henry","Herbert","Herman","Hermon","Herschel","Hershel","Hezekiah","Hillard","Hilliard","Hilton","Hiram","Hobart","Hobert","Hobson","Hollis","Homer","Horace",
  "Hosea","Houston","Howard","Howell","Hoyt","Hubert","Hudson","Huey","Hugh","Hughie","Hugo","Hunter","Hurley","Hyman","Ida","Ignacio","Ignatius","Ike","Ira","Irene","Irl","Irvin","Irving","Irwin","Isaac","Isadore","Isaiah","Isham","Isiah","Isidore","Isom","Israel","Issac","Ivan","Ivey","Ivory","Ivy","Jack","Jackson","Jacob","Jake","James","Jason","Jasper","Jay","Jean","Jeff","Jefferson","Jennings","Jeremiah","Jerome","Jerry","Jess","Jesse","Jessie","Jesus","Jewel","Jewell","Jim","Jimmie","Jimmy","Jodie","Joe","Joel","John","Johnie","Johnnie","Johnny","Johnson","Jonah","Jonas","Jonathan","Jones","Jonnie","Jordan","Jose","Joseph","Josh","Joshua","Josiah","Juan","Judge","Judson","Jule","Jules","Julian","Julius","June","Junior","Junius","Justin","Karl","Keith","Kelly","Kenneth","King","Kirby","Kirk","Kyle","Lacy","Lafayette","Lamar","Lambert","Larkin","Larry","Laura","Laurence","Laverne","Lawrence","Lawson","Leander","Lee","Leigh","Leland","Lem","Lemon","Lemuel","Len","Lenard","Lennie","Leo","Leon","Leonard","Leopold","Leroy","Leslie","Lester","Levi","Levy","Lew","Lewis","Lige","Lillian","Lillie","Lincoln","Lindsay","Lindsey","Linwood","Lionel","Llewellyn","Lloyd","Logan","Lon","Lonie","Lonnie","Lonzo","Loren","Lorenzo","Lou","Louie","Louis","Louise","Lowell","Loy","Loyal","Loyd","Lucas","Lucian","Lucien","Lucious","Lucius","Ludwig","Luis","Luke","Lum","Luther","Lyle","Lyman","Lynn","Mabel","Mac","Mack","Madison","Mahlon","Major","Malcolm","Manley","Mannie","Manuel","Marcellus","Marcus","Margaret","Marie","Marion","Mark","Marshall","Mart","Martha","Martin","Marvin","Mary","Mason","Mat","Mathew","Mathias","Matt","Matthew","Mattie","Maude","Maurice","Max","Maxie","Maxwell","May","Maynard","McKinley","Melton","Melville","Melvin","Merl","Merle","Merlin","Merrill","Merritt","Merton","Mervin","Meyer","Michael","Micheal","Miguel","Mike","Mildred","Miles","Milford","Millard","Miller","Milo","Milton","Minnie","Minor","Mitchel","Mitchell","Monroe","Mont","Morgan","Morris","Mortimer","Morton","Mose","Moses","Murphy","Murray","Murry","Myles","Myron","Myrtle","Napoleon","Nat","Nathan","Nathaniel","Neal","Ned","Neil","Nellie","Nels","Nelson","Newell","Newman","Newt","Newton","Nicholas","Nick","Noah","Noble","Noel","Nolan","Norbert","Norman","Norris","Oakley","Obie","Ocie","Odell","Odie","Odis","Okey","Olaf","Ole","Olen","Olin","Oliver","Ollie","Omar","Omer","Oral","Oran","Oren","Orie","Orin","Orion","Orlando","Orlo","Orrin","Orval","Orville","Oscar","Ossie","Oswald","Otha","Otho","Otis","Ottis","Otto","Owen","Pablo","Palmer","Paris","Park","Parker","Pat","Patrick","Paul","Pearl","Pedro","Percival","Percy","Perley","Perry","Pete","Peter","Peyton","Phil","Philip","Phillip","Pierce","Pierre","Pink","Pleas","Pleasant","Porter","Preston","Price","Prince","Quincy","Rafael","Raleigh","Ralph","Ramon","Randall","Randolph","Ransom","Raphael","Ray","Raymond","Reed","Reese","Reginald","Reid","Reinhold","Rene","Reuben","Rex","Richard","Richmond","Riley","Robert","Rocco","Roderick","Rodney","Roe","Roger","Rogers","Roland","Rolla","Rolland","Rollie","Rollin","Roman","Romeo","Ronald","Roosevelt","Roscoe","Ross","Roswell","Rowland","Roy","Royal","Royce","Rube","Ruben","Rubin","Ruby","Rudolph","Ruel","Rufus","Rupert","Rush","Russel","Russell","Ruth","Salvatore","Sam","Sammie","Sampson","Samuel","Sanders","Sanford",
  "Santiago","Saul","Scott","Selmer","Seth","Seymour","Shelby","Shelly","Shelton","Sherman","Shirley","Sid","Sidney","Silas","Sim","Simeon","Simon","Smith","Sol","Solomon","Son","Spencer","Spurgeon","Squire","Stacy","Stanley","Stephen","Sterling","Steve","Steven","Stewart","Stuart","Sullivan","Sumner","Sydney","Sylvester","Talmage","Taylor","Ted","Terrence","Terry","Thad","Thaddeus","Theo","Theodore","Theron","Thomas","Thornton","Thurman","Tillman","Tim","Timothy","Tobe","Tom","Tomas","Tommie","Tommy","Toney","Tony","Tracy","Travis","Troy","Truman","Turner","Ulysses","Unknown","Urban","Valentine","Van","Vance","Vaughn","Vern","Verne","Verner","Vernie","Vernon","Vester","Victor","Vincent","Virgil","Vivian","Wade","Waldo","Walker","Wallace","Walter","Walton","Ward","Warner","Warren","Wash","Washington","Watson","Waverly","Wayman","Wayne","Webb","Webster","Weldon","Wellington","Wendell","Wesley","West","Wheeler","Wilber","Wilbert","Wilbur","Wilburn","Wiley","Wilford","Wilfred","Will","Willam","Willard","William","Williams","Willie","Willis","Wilmer","Wilson","Wilton","Winfield","Winfred","Winston","Wm","Wong","Worth","Wright","Wyatt","Wylie","Young","Zack","Zeb","Zollie"],
  Femme: [
    "Almond","Angel","Aqua","Ari","Arum","Ash","Aspen","Aster","Avis","Azure","Basil","Bay","Bayou","Bird","Blair","Blaze","Bramble","Breeze","Briar","Brier","Brook","Brooke","Brooks","Cayenne","Cedar","Clay","Cloud","Clove","Coriander","Cove","Crescent","Cricket","Cypress","Dakota","Dale","Danica","Danika","Deer","Delta","Dew","Dewy","Dusk","Dusty","Elm","Ember","Fen","Fennel","Fern","Gale","Gideon","Ginger","Glen","Glenn","Haven","Ice","Indigo","Jade","Jay","Jordan","Juniper","Kale","Lake","Lark","Laurel","Lazuli","Leaf","Leif","Linden","Mango","Marin","Mica","Nova","Oak","Ocean","Oleander","Orchard","Pepper","Phoenix","Pine","Rain","Raine","Raven","Reed","Reef","Rhine","River","Roan","Robin","Rowan","Sable","Sage","Shadow","Shale","Shell","Silver","Sky","Skyler","Snow","Sol","Sorrel","Spruce","Star","Starling","Sterling","Storm","Stormy","Sunny","Thyme","Vale","Winter","Wren","Yarrow",
    "Abelia","Acacia","Agate","Almond","Aloe","Alyssa","Amala","Amaranth","Amaryllis","Amber","Ambrosia","Amethyst","Anemone","Angel","Angelica","Angelice","Anise","Apple","April","Aqua","Arbor","Ari","Aria","Arum","Ash","Aspen","Aster","Aura","Aurelia","Aurora","Autumn","Ava","Avis","Aya","Azalea","Azolia","Azure","Basil","Bay","Bayou","Bee","Begonia","Belladonna","Beryl","Bird","Birdie","Blair","Blaze","Blossom","Bramble","Breeze","Breezy","Briar","Brier","Briny","Brook","Brooke","Brooks","Bryony","Bunny","Buttercup","Cadence","Calla","Camelia","Camellia","Camomile","Canary","Carina","Cascade","Cassa","Cassia","Catalina","Cayenne","Cedar","Celosia","Chandra","Cheyenne","Chrysanthe","Cinnamon","Clay","Clematis","Clementine","Cloud","Clove","Clover","Coral","Coriander","Cove","Crescent","Cricket","Crystal","Cypress","Daffodil","Dahlia","Daisy","Dakota","Dale","Danica","Danika","Daphne","Dawn","Deer","Delilah","Delta","Destiny","Dew","Dewy","Diamond","Doe","Dove","Dusk","Dusty","Ebony","Eden","Electra","Elektra","Elm","Ember","Emerald","Erica","Eve","Eytelia","Faith","Fauna","Fawn","Feather","Fen","Fennel","Fern","Fleur","Flora","Freesia","Fuchsia","Gaia","Galaxy","Gale","Galena","Garden","Garland","Garnet","Geranium","Gideon","Ginger","Glen","Glenn","Harmony","Haven","Hayley","Hazel","Heather","Hibiscus","Holly","Honey","Hyacinth","Ice","Indigo","Iris","Isle","Ivory","Ivy","Jacinth","Jade","Jasmine","Jay","Jewel","Jordan","Juniper","Kailani","Kale","Kalina","Karma","Kyla","Lake","Lale","Laleh","Lapis","Lark","Laurel","Lavender","Lazuli","Leaf","Leif","Leilani","Lelani","Lila","Lilac","Lillian","Lilly","Lily","Linden","Linnea","Lotus","Love","Lucerne","Luna","Magnolia","Mango","Maple","Mare","Marigold","Marin","Marina","Marine","Meadow","Melissa","Mesa","Mica","Mist","Misty","Moon","Myrtle","Nigella","Nova","Oak","Ocean","Oleander","Olive","Olivia","Opal","Orchard","Orchid","Oriel","Oriole","Pandora","Pansy","Peach","Peaches","Pearl","Peony","Pepper","Peridot","Petal","Petunia","Phoenix","Pine","Poppy","Posy","Primrose","Puma","Rain","Raine","Raven","Reed","Reef","Rhine","River","Roan","Robin","Rosa","Rose","Rosemary","Rosetta","Rowan","Rubia","Ruby","Rue","Ruellia","Sable","Saffron","Sage","Sahara","Sakura","Sapphire","Sassafras","Savanna","Savannah","Season","Senna","Sequoia","Shadow","Shale","Sharon","Shell","Shelly","Shore","Sienna","Sierra","Silver","Sky","Skye","Skyler","Snow","Sol","Solstice","Sorrel","Sparrow","Spring","Spruce","Star","Starling","Stella","Sterling","Storm","Stormy","Summer","Sunny","Sunshine","Swan","Sweetpea","Sycamore","Tansy","Teal","Tempest","Terra","Thyme","Tierra","Tigerlily","Topaz","Tulip","Vale","Valley","Vanilla","Vanille","Venus","Veronica","Violet","Vixen","Willow","Windy","Winter","Wren","Wynter","Yarrow","Zahra","Zinnia",
    "Abbie","Abigail","Ada","Adah","Adaline","Adda","Addie","Adela","Adelaide","Adele","Adelia","Adelina","Adeline","Adell","Adella","Adelle","Adline","Agatha","Agnes","Aileen","Aimee","Alberta","Albertha","Albertina","Albertine","Albina","Alda","Alene","Aletha","Alfreda","Alice","Alicia","Alida","Aline","Allene","Allie","Alma","Almeda","Almira","Alpha","Alta","Altha","Althea","Alva","Alvena","Alverta","Alvina","Alyce","Amalia","Amanda","Amber","Amelia","America","Amie","Amy","Ana","Anastasia","Andrea","Angela","Angelina","Angeline","Angie","Anita","Ann","Anna","Annabel","Annabell","Annabelle","Anne","Anner","Annetta","Annette","Annie","Annis","Antoinette","Antonette","Antonia","Ara","Ardella","Arie","Arizona","Arlene","Arlie","Arline","Arrie","Artie","Arvilla","Atha","Audie","Audra","Audrey","Augusta","Augustine","Aurelia","Aurora","Aurore","Ava","Avis","Barbara","Beatrice","Beaulah","Bell","Bella","Belle","Belva","Bennie","Berdie","Berenice","Bernadette","Bernadine","Bernice","Berniece","Berta","Bertha","Bertie","Beryl","Bess","Besse","Bessie","Beth","Bethel","Betsy","Bettie","Betty","Beula","Beulah","Billie","Birdie","Birtha","Birtie","Blanch","Blanche","Bobbie","Bonnie","Bridget","Buena","Bulah","Callie","Camilla","Camille","Carmela","Carmella","Carmen","Carol","Carolina","Caroline","Carolyn","Carrie","Cassie","Catharine","Catherine","Cathrine","Cathryn","Cecelia","Cecil","Cecile","Cecilia","Celeste","Celestine","Celia","Celina","Charity","Charles","Charlie","Charlotte","Cherry","Chloe","Christena","Christie","Christina","Christine","Claire","Clara","Clare","Claribel","Clarice","Clarissa","Claudia","Claudie","Claudine","Clementine","Clemmie","Cleo","Clifford","Clora","Clyde","Concepcion","Concetta","Connie","Constance","Consuelo","Cora","Coral","Corda","Cordelia","Cordia","Cordie","Corene","Corine","Corinne","Cornelia","Corrie","Corrine","Crystal","Cynthia","Dagmar","Daisy","Daphne","Deborah","Delia","Delilah","Dell","Della","Delma","Delpha","Delphia","Delphine","Delta","Dena","Dessie","Dewey","Diana","Dicie","Dillie","Dixie","Docia","Dollie","Dolly","Dolores","Dona","Donie","Donna","Donnie","Dora","Dorcas","Doris","Dorothea","Dorothy","Doshie","Dottie","Dovie","Drucilla","Dulcie","Easter","Ebba","Eda","Eddie","Edith","Edna","Edwina","Edyth","Edythe","Effie","Eileen","Elaine","Elda","Eldora","Eleanor","Eleanora","Eleanore","Electa","Elena","Elenora","Elfrieda","Elinor","Elisa","Elisabeth","Elise","Eliza","Elizabeth","Elizebeth","Ella","Ellen","Ellie","Elma","Elmira","Elna","Elnora","Eloise","Elsa","Elsie","Elta","Elva","Elvera","Elvie","Elvina","Elvira","Emelia","Emeline","Emilia","Emilie","Emily","Emma","Emmer","Emmie","Enid","Enola","Era","Erie","Erma","Erna","Ernestine","Essie","Esta","Estell","Estella","Estelle","Ester","Esther","Etha","Ethel","Ethelyn","Ethyl","Etta","Ettie","Eudora","Eugenia","Eugenie","Eula","Eulah","Eulalia","Eulalie","Euna","Eunice","Eura","Eva","Evalyn","Evangeline","Eve","Evelina","Evelyn","Evie","Exie","Fae","Fairy","Faith","Fannie","Fanny","Fay","Faye","Felicia","Fern","Ferne","Filomena","Fleta","Flo","Flora","Florance","Florence","Florida","Florine","Florrie","Flossie","Floy","Frances","Francis","Francisca","Frank","Frankie","Fred","Freda","Freeda","Freida","Frieda","Frona","Fronie","Gail","Garnet","Garnett","Gay","Gena","Gene","Geneva","Genevieve","Genie","George","Georgia","Georgiana","Georgianna","Georgie","Georgina","Geraldine","Gertie","Gertrude","Gladys","Glenn","Glenna","Glennie","Golda","Golden","Goldia","Goldie","Grace","Gracie","Grayce","Greta","Gretchen","Guadalupe","Gussie","Gusta","Gwendolyn","Hallie","Hanna","Hannah","Harriet","Harriett","Harriette","Hassie","Hattie","Hazel","Hazle","Hedwig","Helen","Helena","Helene","Helga","Hellen","Helma","Henrietta","Henriette","Henry","Hermina","Hermine","Hertha","Hessie","Hester","Hettie","Hilda","Hildegard","Hildegarde","Hildred","Hildur","Hilma","Honora","Hope","Hortense","Hulda","Huldah","Icie","Icy","Ida","Idell","Idella","Ila","Ima","Imogene","Ina","India","Ines","Inez","Inga","Iola","Iona","Ione","Ira","Irene","Iris","Irma","Isa","Isabel","Isabell","Isabella","Isabelle","Iva","Ivah","Ivy","Izetta","Izora","Jane","Janet","Janette","Janie","Jannie","Jean","Jeanette","Jeanie","Jeanne","Jeannette","Jennie","Jenny","Jesse","Jessica","Jessie","Jettie","Jewel","Jewell","Jimmie","Jo","Joan","Joanna","Joe","Johanna","John","Johnie","Johnnie","Josefa","Joseph","Josephine","Josie","Jossie","Joy","Joyce","Juana","Juanita","Judith","Julia","Julie","Juliet","Juliette","June","Justine","Kate","Katharine","Katherine","Katheryn","Kathleen","Kathrine","Kathryn","Kathryne","Katie","Kattie","Katy","Kay","Kittie","Kitty","Kizzie","Lacy","Lala","Lassie","Laura","Lauretta","Lavada","Laverne","Lavina","Lavinia","Lea","Leah","Leanna","Leatha","Leda","Lee","Leila","Lela","Lelah","Lelia","Lella","Lena","Lenna","Lennie","Lenora","Lenore","Leo","Leola","Leona","Leone","Leonie","Leonora","Leonore","Leontine","Leora","Leota","Lera","Leslie","Lessie","Leta","Letha","Letitia","Lettie","Lexie","Libbie","Libby","Lida","Liddie","Lila","Lilah","Lilian","Lilla","Lillian","Lillie","Lilly","Lily","Lina","Linda","Linnie","Lissie","Liza","Lizzie","Lois","Lola","Lollie","Loma","Lona","Lonie","Lonnie","Lora","Loraine","Lorena","Lorene","Loretta","Loretto","Lorna","Lorraine","Lottie","Lou","Louella","Louie","Louisa","Louise","Louvenia","Lovie",
    "Lovina","Lucia","Lucie","Lucile","Lucille","Lucinda","Lucretia","Lucy","Ludie","Lue","Luella","Luetta","Luisa","Lula","Lular","Lulu","Luna","Lura","Lutie","Luvenia","Lyda","Lydia","Lyla","Mabel","Mabell","Mabelle","Mable","Macie","Madaline","Madeleine","Madeline","Madelyn","Madge","Madie","Mae","Magdalen","Magdalena","Magdalene","Maggie","Magnolia","Mahala","Malinda","Malissa","Mallie","Malvina","Mamie","Mammie","Manda","Mandy","Manila","Manuela","Marcella","Marcia","Margaret","Margaretta","Margarette","Margarita","Margery","Margie","Margret","Marguerite","Maria","Mariah","Marian","Marie","Marietta","Marion","Marjorie","Marjory","Martha","Martina","Marvel","Mary","Mathilda","Mathilde","Matie","Matilda","Mattie","Maud","Maude","Maudie","Maurine","Maxie","Maxine","May","Maybell","Maybelle","Maye","Mayme","Maymie","Mazie","Meda","Melba","Melinda","Melissa","Mellie","Melva","Melvina","Mercedes","Merle","Mertie","Meta","Metta","Mettie","Mildred","Millicent","Millie","Mina","Minerva","Minna","Minnie","Minta","Mintie","Miriam","Missouri","Mittie","Mollie","Molly","Mona","Monica","Monnie","Mossie","Mozelle","Muriel","Myra","Myrl","Myrle","Myrna","Myrta","Myrtice","Myrtie","Myrtis","Myrtle","Nadine","Nan","Nancy","Nanie","Nannie","Naomi","Natalie","Nealie","Nell","Nella","Nelle","Nellie","Nena","Neta","Nettie","Neva","Nevada","Nina","Nita","Nola","Nona","Nonie","Nora","Norah","Norine","Norma","Nova","Novella","Ocie","Octavia","Oda","Odelia","Odessa","Odie","Odile","Ola","Olevia","Olga","Olive","Olivia","Ollie","Oma","Omie","Ona","Onie","Opal","Ophelia","Ora","Orpha","Osa","Osie","Ossie","Ottie","Ottilia","Ottilie","Ouida","Ova","Pansy","Paralee","Patricia","Patsy","Pattie","Paula","Paulina","Pauline","Pearl","Pearle","Pearlie","Peggy","Petra","Phebe","Philomena","Phoebe","Phyllis","Pinkie","Pollie","Polly","Priscilla","Prudence","Queen","Queenie","Rachael","Rachel","Rae","Ramona","Ray","Reba","Rebecca","Regina","Rella","Rena","Ressie","Reta","Retha","Retta","Reva","Rhea","Rhoda","Rilla","Rita","Robbie","Robert","Roberta","Roma","Rosa","Rosalee","Rosalia","Rosalie","Rosalind","Rosamond","Rosanna","Rose","Rosella","Rosemary","Rosetta","Rosia","Rosie","Rosina","Rossie","Rowena","Roxie","Rubie","Ruby","Rubye","Ruth","Ruthie","Sabina","Sadie","Sadye","Sallie","Sally","Salome","Samantha","Sammie","Sara","Sarah","Savannah","Selena","Selina","Selma","Sena","Serena","Shirley","Sibyl","Sidney","Signe","Sigrid","Sina","Sofia","Sophia","Sophie","Sophronia","Stella","Sudie","Sue","Sula","Susan","Susanna","Susie","Suzanne","Sybil","Sylvia","Tempie","Tena","Tennie","Teresa","Tessie","Thea","Thelma","Theo","Theodora","Theodosia","Theresa","Therese","Theresia","Thomas","Thora","Tilda","Tillie","Tina","Tommie","Tressa","Tressie","Treva","Trudie","Twila","Una","Ursula","Vada","Valeria","Valerie","Vallie","Vassie","Veda","Vella","Velma","Velva","Vena","Vera","Verda","Verdie","Vergie","Verla","Verna","Vernice","Vernie","Verona","Veronica","Versie","Vertie","Vesta","Veva","Victoria","Vida","Vina","Vinnie","Viola","Violet","Vira","Virgie","Virgil","Virginia","Viva","Vivian","Walter","Wanda","Wilda","Wilhelmina","Wilhelmine","Willa","William","Willie","Wilma","Winifred","Winnie","Winnifred","Winona","Yetta","Yvonne","Zada","Zelda","Zelia","Zella","Zelma","Zena","Zenobia","Zetta","Zettie","Zita","Zoe","Zola","Zona","Zora"]
};
  
export const lastnames=["Albatross","Ambarella","Antwork","Appletree","Arbutus","Armadill","Ash","Ashe","Asp","Aurora","Aves","Badger","Bags","Barracus","Barrows","Batt","Bay","Beaverdam","Beehive","Beetle","Bells","Birch","Birdnest","Biscus","Bitterwood","Blackjack","Boartusk","Books","Boots","Borealis","Bottlebrush","Bovin","Box","Bricks","Bristlecone","Bucket","Buckling","Bucks","Buckthorn","Bulb","Bullwark","Bunyip","Buttercup","Butters","Button","Buttons","Buttonwood","Candlelight","Candlenut","Canis","Capricorn","Caprine","Cassowary","Catts","Cerbus","Chalks","Chameleon","Clocks","Clockwork","Cobris","Cobweb","Codde","Coil","Colibiri","Collar","Colten","Conebush","Conifer","Copper","Corals","Cork","Cornus","Cowbell","Coyota","Crabapple","Craft","Crane","Cribbe","Crooks","Cross","Crow","Cubs","Cups","Cycad","Cygnet","Dendron","Dime","Doe","Dogbane","Dogwood","Dots","Doves","Dovetail","Draguar","Drake","Eaglet","Elderberry","Elks","Elm","Elms","Everglade","Evergreen","Fairy","Falcon","Fauns","Feast","Feather","Felide","Fenrin","Ferlet","Fern","Ferret","Fiddlesticks","Fiddlewood","Filly","Fingerling","Fir","Firethron","Firewheel","Flame","Fledgling","Flocks","Flower","Fluke","Fogs","Fourpetal","Foxglove","Ganders","Gears","Gerble","Gnats","Gnu","Gold","Goldfinch","Goldhorn","Goosander","Gooseberry","Gorgon","Gosling","Grace","Graytwig","Griffin","Griffins","Griffis","Grouse","Gulls","Hammers","Hare","Harpis","Hatch","Hawks","Hawthorn","Hazel","Hearth","Hedge","Hemlock","Heron","Hickories","Hinde","Hoganis","Hold","Holly","Horn","Hornbeam","Hornette","Horsetail","Hummingbird","Ibex","Ibis","Inkwell","Inkwood","Ironbark","Ironwood","Jackalope","Jackbuck","Juneberry","Juniper","Kelpis","Kettles","Knotts","Lace","Lacework","Lambkins","Larch","Laurel","Lavender","Leon","Leveret","Light","Lillypilly","Littletree","Locket","Locks","Locus","Logg","Loriss","Lyptus","Lyre","Magnolis","Magpie","Mallard","Mallow","Mandrake","Mapleleaf","Marble","Medlar","Minks","Mistle","Mitten","Mole","Mulberry","Myrtle","Nettle","Newts","Night","Nightingale","Nightmare","Nightshade","Oakwood","Oleander","Olive","Oliver","Orchids","Otters","Owler","Owlet","Partridge","Passel","Patt","Pegas","Persimmom","Pertinger","Pets","Phoenix","Pincushion","Pineneedle","Pinescrew","Plums","Poisonwood","Polliwog","Pots","Poults","Primrose","Prott","Pugs","Quilt","Rabbot","Ravens","Raywood","Reynards","Rich","Riddle","Rivers","Robin","Roc","Rook","Rooks","Roots","Rose","Rosewood","Rubble","Rubis","Salman","Salmander","Sands","Selket","Selpie","Serpen","Shore","Shrew","Silverberry","Silverling","Silverthorn","Slumber","Smallflower","Snakebark","Snowbell","Snowpear","Soots","Sow","Sparks","Spindle","Spindlewheel","Squabs","Staghart","Starling","Stems","Sterling","Stinkwood","Striker","Stripes","Strix","Strongbark","Sweaters","Sweetleaf","Sweets","Tadpol","Tadpole","Talpin","Tauris","Toads","Twig","Twigs","Twinkle","Vixen","Wattle","Willows","Wolfs","Wolpers","Woodwork","Yetis","Yowie"];

export const magics = [
  'Potion',
  'Potion',
  'Potion',
  'Potion',
  'Arythmancie',
  'Arythmancie',
  'Arythmancie',
  'Arythmancie',
  'Carthomancie',
  'Carthomancie',
  'Carthomancie',
  'Carthomancie',
  'Runes',
  'Runes',
  'Runes',
  'Runes',
  'Sorts',
  'Sorts',
  'Sorts',
  'Pierres',
  'Alchimie',
  'Divination',
  'Élémentalisme',
  'Astrologies',
  'Chamanisme',
  'Magie spirituelle',
  'Abjuration (détournement de la magie)',
  'Ensorceleur (création d\'objets magiques)',
];
