import { Spell } from './domain/Spell';

export const spells: Record<string, Spell> = {
  "0": {
    "id": 0,
    "modifiers": {
      "primary": [
        2,
        0
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 1,
    "name": "Ouverture",
    "incantation": "Alohomora",
    "description": "Ouvre une porte fermée à clé par un dispositif non magique. Durée : - Formule extrême : s’applique à toutes les portes dans un rayon de POUvoir mètres du sorcier",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "1": {
    "id": 1,
    "modifiers": {
      "primary": [
        7,
        2
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 0,
    "name": "Air Chaud",
    "incantation": "",
    "description": "Provoque un vent chaud qui fait sécher instantanément la cible. Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Air",
    "secondaryElement": "Feu"
  },
  "2": {
    "id": 2,
    "modifiers": {
      "primary": [
        8,
        3
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 1,
    "name": "Charme de coussinage",
    "incantation": "",
    "description": "Permet de rendre un balai plus confortable. Durée : variable (heures) Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "3": {
    "id": 3,
    "modifiers": {
      "primary": [
        9,
        3
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 1,
    "name": "Crâne chauve",
    "incantation": "Calvorio",
    "description": "Fait disparaître les cheveux de la cible (APP - 1). Durée : - Formule extrême : APParence -2",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "4": {
    "id": 4,
    "modifiers": {
      "primary": [
        2,
        5
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 1,
    "name": "Crâne chauve fluo",
    "incantation": "Capilum",
    "description": "Fait tomber tous les poils de la cible et rend le crâne fluorescent (APP - 2). Durée : immédiate (poils) et variable (heures) (fluorescence) Formule extrême : APParence -1d2+1 et durée +1 heure",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "5": {
    "id": 5,
    "modifiers": {
      "primary": [
        9,
        9
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 1,
    "name": "Croche-pied",
    "incantation": "Lapsus",
    "description": "Fait tomber la personne. Jet de DEX x 3 afin de rester debout. Durée : - Formule extrême : Jet de DEXx2 afin de rester debout",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "6": {
    "id": 6,
    "modifiers": {
      "primary": [
        8,
        6
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 1,
    "name": "Déliage",
    "incantation": "Emancipare",
    "description": "Permet de se défaire de liens magiques ou non. Contre les effets du sort de Ficelage. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "7": {
    "id": 7,
    "modifiers": {
      "primary": [
        5,
        7
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 1,
    "name": "Fermeture",
    "incantation": "Collaporta",
    "description": "Ferme une serrure non magique afin de sceller une porte. Durée : - Formule extrême : s’applique à toutes les portes dans un rayon de POUvoir mètres du sorcier",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "8": {
    "id": 8,
    "modifiers": {
      "primary": [
        3,
        2
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 1,
    "name": "Finestra",
    "incantation": "Finestra",
    "description": "Permet de faire voler la vitre d'une fenêtre en minuscules éclats. Ce sort ne cause cependant aucun bruit. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "9": {
    "id": 9,
    "modifiers": {
      "primary": [
        2,
        2
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 1,
    "name": "Folleoreille",
    "incantation": "Folloreille",
    "description": "Fait remuer frénétiquement les oreilles d’une personne, ce qui diminue considérablement sa concentration. Donne un malus de 5% pour jeter des sorts et pour toute autre action nécessitant de se concentrer. Durée : Variable (rounds) Formule extrême : Malus de 10% et durée +1 round",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "10": {
    "id": 10,
    "modifiers": {
      "primary": [
        8,
        3
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 1,
    "name": "Lacer",
    "incantation": "Laqueare",
    "description": "Attache les lacets de la cible, jet de DEXx3 pour rester debout et un round pour les détacher. Durée : - Formule extrême : DEXx2 pour rester debout et 2 rounds pour détacher ses lacets",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "11": {
    "id": 11,
    "modifiers": {
      "primary": [
        8,
        4
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 1,
    "name": "Lévitation d’arbres",
    "incantation": "Mobiliarbus",
    "description": "Permet de faire léviter un arbre. Celui-ci suit ensuite le sorcier tant qu’il reste concentré sur le sortilège. Durée : Volontaire Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": true
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "12": {
    "id": 12,
    "modifiers": {
      "primary": [
        4,
        6
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 1,
    "name": "Lévitation d’objets",
    "incantation": "Wingardium leviosa",
    "description": "Permet de soulever un objet du sol et de contrôler sa trajectoire. Maximum : POU x 3 kg. Durée : volontaire Formule extrême : Poids de POUx4 kg",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "13": {
    "id": 13,
    "modifiers": {
      "primary": [
        8,
        0
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 1,
    "name": "Lévitation de corps",
    "incantation": "Mobilicorpus",
    "description": "Permet de faire léviter une personne (consciente ou non). Celui-ci suit ensuite le sorcier tant qu’il reste concentré sur le sortilège. Durée : Volontaire Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "14": {
    "id": 14,
    "modifiers": {
      "primary": [
        8,
        9
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 1,
    "name": "Purification",
    "incantation": "",
    "description": "Sépare des substances différentes (permet de trier ses lentilles, de retirer les impuretés d’une poudre, de retirer le sable de ses chaussures) Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "15": {
    "id": 15,
    "modifiers": {
      "primary": [
        9,
        0
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 1,
    "name": "Ralentissement",
    "incantation": "Leniter",
    "description": "Ralentit les déplacements de petites créatures (120 cm au maximum) pendant 1d4+1 rounds. Déplacements (vol, nage ou marche) divisé par 2. (Opposition : POU/DEX) Formule extrême : durée 2d4+2 rounds et vitesse divisée par 3",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "16": {
    "id": 16,
    "modifiers": {
      "primary": [
        9,
        6
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 1,
    "name": "Répare un objet simple",
    "incantation": "« Nom » reparo",
    "description": "Permet de réparer une petite cassure ou un petit trou sur un objet non magique. Durée : permanente. Formule extrême : répare des cassures et dégâts de moyenne à grande importance",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "17": {
    "id": 17,
    "modifiers": {
      "primary": [
        3,
        3
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 1,
    "name": "Rotation",
    "incantation": "Circumrota",
    "description": "Permet de faire pivoter des objets d’une taille maximale de POUx10 m3 Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "18": {
    "id": 18,
    "modifiers": {
      "primary": [
        7,
        2
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 1,
    "name": "Valise",
    "incantation": "Failamalle",
    "description": "Permet de faire que ses affaires se rangent toutes seules. Durée : 1 minute Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "19": {
    "id": 19,
    "modifiers": {
      "primary": [
        9,
        7
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 1,
    "name": "Ventilation",
    "incantation": "Anapneo",
    "description": "Libère instantanément les voies respiratoires d’une personne en train de s’étouffer. Durée : - Formule extrême : Fonctionne sur toutes les personnes dans un rayon de POUvoir mètres autour du sorcier",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "20": {
    "id": 20,
    "modifiers": {
      "primary": [
        4,
        7
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 2,
    "name": "Annuler une invocation",
    "incantation": "« Nom » evanesco",
    "description": "Permet de faire disparaître un objet, animal, végétal, crée par métamorphose, ou de lui rendre sa forme première (Opposition : POU/POU). Ne marche pas pour les Animagus! Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": false,
      "Plant": true
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "21": {
    "id": 21,
    "modifiers": {
      "primary": [
        2,
        0
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 2,
    "name": "Ascension",
    "incantation": "Ascencio",
    "description": "Permet de faire sauter le sorcier dans les airs (maximum POU/2 m) ou à la surface de l’eau. Durée : - Formule extrême : maximum POUvoir mètres",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "22": {
    "id": 22,
    "modifiers": {
      "primary": [
        8,
        2
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 2,
    "name": "Attraction",
    "incantation": "Accio + « nom »",
    "description": "Permet de faire venir un objet à soi. Opposition : POU/FOR. Maximum : POU x 10 m. Durée : - Remarque : De nombreux objets et lieux ont été protégés de ce sortilège. Formule extrême : maximum POUvoir x 15 mètres",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "23": {
    "id": 23,
    "modifiers": {
      "primary": [
        1,
        4
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 2,
    "name": "Chute lente",
    "incantation": "Aresto Momentum",
    "description": "Diminue grandement la vitesse de chute d’un animal, d’un objet, d’une personne ou d’un végétal. Celui-ci ne subit alors plus que 1d3-1 dégâts (minimum 1). Durée : - Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "24": {
    "id": 24,
    "modifiers": {
      "primary": [
        4,
        9
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Déplacement",
    "incantation": "Mobili « nom »",
    "description": "Permet de déplacer un objet ou une personne inconsciente par télékinésie. Maximum : POU x 5 kg. Durée : volontaire Formule extrême : POU x10 kg",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "25": {
    "id": 25,
    "modifiers": {
      "primary": [
        7,
        3
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 2,
    "name": "Désarmement",
    "incantation": "Expelliarmus",
    "description": "Fait sauter la baguette ou d’autres objets des mains de l’adversaire (Opposition : POU/POU). Durée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "26": {
    "id": 26,
    "modifiers": {
      "primary": [
        2,
        8
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 2,
    "name": "Descente",
    "incantation": "Descendo",
    "description": "Un sort permettant de faire descendre ou tomber un ou plusieurs objets.Durée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "27": {
    "id": 27,
    "modifiers": {
      "primary": [
        0,
        0
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 2,
    "name": "Discrétion",
    "incantation": "Sonus evanesco",
    "description": "Diminue considérablement les sons émis par une personne. Effet : donne un bonus de 30 % à la discrétion. Durée : 1d4+2 heuresFormule extrême : +40% à la Discrétion et durée +1 heure",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "28": {
    "id": 28,
    "modifiers": {
      "primary": [
        8,
        1
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 2,
    "name": "Entrave",
    "incantation": "Impedimenta",
    "description": "Ralentit une personne, un animal ou un objet et l'empêche d'approcher. Effet : Mouvement = 1 et action = 3 rounds. Durée : 1d4+1 roundsFormule extrême : Action = 4 rounds et durée +2 rounds",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "29": {
    "id": 29,
    "modifiers": {
      "primary": [
        5,
        5
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 2,
    "name": "Equilibre",
    "incantation": "Equilibrium",
    "description": "Empêche le personnage d’être déséquilibré. Donne un bonus de 50% en Athlétisme pour escalader et 40% en acrobatie. Durée : 1d4+1 heures. Formule extrême : Bonus octroyés 60% en Athlétisme et 50% en Acrobatie et durée +1 heure",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "30": {
    "id": 30,
    "modifiers": {
      "primary": [
        2,
        0
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 2,
    "name": "Ficelage",
    "incantation": "Fulgaris",
    "description": "Contrairement au Sort de ligotage, le sortilège de ficelage ne bloque que les mains ou les poignets de la cible grâce à des liens dorés. Pour se libérer, la cible doit réussir un jet en opposition (POU/DEX). Durée : permanenteFormule extrême : le jet de DEX pour se libérer se fait avec un malus de 2 points",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "31": {
    "id": 31,
    "modifiers": {
      "primary": [
        2,
        6
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 2,
    "name": "Freinage",
    "incantation": "",
    "description": "Enchante les balais pour les aider à freiner. Plus le sortilège est maîtrisé et plus le balai freine avec efficacité. Durée : permanente.Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "32": {
    "id": 32,
    "modifiers": {
      "primary": [
        5,
        2
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Inversion",
    "incantation": "",
    "description": "Inverse la position de deux objets sur une distance maximale de POUx2 mètres. Durée : -Formule extrême : distance maximale de POUvoir x3 mètres",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "33": {
    "id": 33,
    "modifiers": {
      "primary": [
        5,
        2
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 2,
    "name": "Libération",
    "incantation": "Lashlabask",
    "description": "Ce maléfice sert à faire lâcher prise ou à ouvrir des liens, magiques ou non. Durée : -Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "34": {
    "id": 34,
    "modifiers": {
      "primary": [
        6,
        1
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Locomotion",
    "incantation": "Locomotor",
    "description": "Permet de faire déplacer des objets. Durée : Variable (rounds)Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "35": {
    "id": 35,
    "modifiers": {
      "primary": [
        6,
        4
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Montage",
    "incantation": "Erigo",
    "description": "Permet de monter une structure en pièce détachée comme une tente ou un échafaudageDurée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "36": {
    "id": 36,
    "modifiers": {
      "primary": [
        1,
        2
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 2,
    "name": "Ouvre-Caisse",
    "incantation": "Cistem Aperio",
    "description": "Il s’agit d’une incantation utilisée pour ouvrir des malles, des coffres, des boîtes ou d’autres récipients en faisant violemment sauter leur couvercle ou leur(s) porte(s). Durée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "37": {
    "id": 37,
    "modifiers": {
      "primary": [
        3,
        1
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 2,
    "name": "Porte-voix",
    "incantation": "Sonorus/ Sourdinam",
    "description": "Permet d’augmenter le volume de la voix d’une personne de façon très importante. Sourdinam permet de reprendre sa voix normale. Durée : volontaireFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "38": {
    "id": 38,
    "modifiers": {
      "primary": [
        1,
        1
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 2,
    "name": "Repoussetout",
    "incantation": "flipendo",
    "description": "Repousse la cible en arrière, lui causant 2 dégâts non létaux. Peut également être utilisé pour repousser de lourds objets (jusqu’à POUvoirx2 Kg). Ce sortilège émet un son semblable à une poêle frappant quelque chose quand il est lancé. Durée : -Formule extrême : Occasionne 3 dégâts non-létaux ; jusqu’à POUvoir x 3 Kg",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "39": {
    "id": 39,
    "modifiers": {
      "primary": [
        1,
        0
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 2,
    "name": "Répulsion",
    "incantation": "Repulso",
    "description": "Repousse un objet le plus loin possible du sorcier (Opposition : POU/FOR). Maximum : POU x 5 m. Durée : -Formule extrême : Maximum POUvoir x7 mètres",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "40": {
    "id": 40,
    "modifiers": {
      "primary": [
        7,
        8
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 2,
    "name": "Spirale de vent",
    "incantation": "Ventus",
    "description": "Provoque une rafale de vent violente en spirale qui repousse le sorcier, l’objet ou l’animal visé. (Opposition : POU/FOR). Durée : Variable (rounds). Effets :Déplacements divisés par 2.Formule extrême : Durée : Variable (round)+1. Effets : déplacements = 0",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Air",
    "secondaryElement": "Air"
  },
  "41": {
    "id": 41,
    "modifiers": {
      "primary": [
        0,
        4
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 2,
    "name": "Surdité",
    "incantation": "Assurdiato",
    "description": "Provoque un bourdonnement désagréable dans les oreilles de la cible, ce qui l’empêche d’entendre correctement ; malus de 50% en perception pour l’écoute. Durée : 1d4 heures. Opposition : POU/POUFormule extrême : Malus de 60% et durée +1 heure",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "42": {
    "id": 42,
    "modifiers": {
      "primary": [
        7,
        0
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Têtenbulle",
    "incantation": "",
    "description": "Permet de créer une bulle d’air pur autour de sa tête, permettant de respirer sous l’eau durant 1d4+1 heures ou de ne pas être incommodé par de mauvaises odeurs. Durée : 1d4+1 heuresFormule extrême : Durée +1 heure",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "43": {
    "id": 43,
    "modifiers": {
      "primary": [
        7,
        1
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 4,
    "name": "Lévitation de corps 2",
    "incantation": "Levicorpus/ Liberacorpus",
    "description": "Accroche la cheville de la victime en l’air retournant la personne d’une façon peu confortable. (Uniquement informulé). Durée : volontaireFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "44": {
    "id": 44,
    "modifiers": {
      "primary": [
        4,
        2
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 4,
    "name": "Mutisme",
    "incantation": "Silencio",
    "description": "Rend la cible muette de manière permanente, l’empêchant de lancer des sortilèges à moins qu’il ne s’agisse d’informulés. Durée : -Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "45": {
    "id": 45,
    "modifiers": {
      "primary": [
        1,
        7
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 4,
    "name": "Protection",
    "incantation": "Protego",
    "description": "Protège le lanceur d’un sort qui lui est jeté en divisant la valeur de POUvoir de l’assaillant par 2. Ce sort donne également droit à un jet d’opposition POU/POU pour les sorts qui n’y donnent normalement pas droit et protège des dégâts physiques en les diminuant de 2. (Exception : Avada kedavra). Durée : 1d8+2 heuresFormule extrême : Durée +2 heures et dégâts physique -3",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "46": {
    "id": 46,
    "modifiers": {
      "primary": [
        0,
        8
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 5,
    "name": "Altération météorologique",
    "incantation": "Meteorribilis recanto",
    "description": "Permet de modifier les conditions atmosphériques alentours pour quecelle-ci reviennent à la normale. Contre les effet de Meteorribilis.Durée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "47": {
    "id": 47,
    "modifiers": {
      "primary": [
        6,
        7
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 5,
    "name": "Extension",
    "incantation": "Capacious extremis",
    "description": "Augmente la capacité de stockage intérieure d'un objet sans en modifier l’extérieur et rend son contenu plus léger. Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "48": {
    "id": 48,
    "modifiers": {
      "primary": [
        1,
        3
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 5,
    "name": "Position initiale",
    "incantation": "Offero",
    "description": "Permet de faire revenir des objets dans leur position initiale, réparant ceux-ci par la même occasion. Fonctionne sur une zone donnée équivalente à POU/2 mètres Durée : -Formule extrême : POU mètres",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
  },
  "49": {
    "id": 49,
    "modifiers": {
      "primary": [
        4,
        9
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 5,
    "name": "Sectumsempra",
    "incantation": "Sectumsempra",
    "description": "Blesse violemment la partie du corps visée comme si celle-ci avait été tailladée par une épée. La cible perd alors rapidement son sang et peut mourir. Effet : perte de 1d4+1 points de vie puis 1 point de vie par round.Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "50": {
    "id": 50,
    "modifiers": {
      "primary": [
        3,
        7
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 5,
    "name": "Soin des blessures",
    "incantation": "Vulnera Sanentur",
    "description": "Permet de refermer les blessures d’une personne ou d’un animal à raison de 1 point de vie par round. Le sorcier lançant ce sortilège doit rester concentrer sur sa tâche pour ne pas risquer d’empirer les blessures. On peut ainsi remonter les points de vie jusqu’au ¾ de leurmaximum. Durée : Volontaire",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "51": {
    "id": 51,
    "modifiers": {
      "primary": [
        1,
        8
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 5,
    "name": "Tempête",
    "incantation": "Meteorribilis",
    "description": "Sortilège d'altération climatique permettant de créer une tempête miniature de POU mètres de rayon autour du lanceur. La tempête peut apparaître sous la forme de pluie ou de neige et peu blesser, immobiliser ou endommager les personnes et objets qui s’y trouvent. Durée : POU minutesFormule extrême : Portée de POUx2 mètres et durée de POUx2 minutes",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Eau"
  },
  "52": {
    "id": 52,
    "modifiers": {
      "primary": [
        8,
        1
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 5,
    "name": "Transplanage",
    "incantation": "",
    "description": "Permet de se téléporter dans un endroit connu et non protégé. Durée :- Remarque : le déplacement ne peut se faire que sur POUvoir x10 kilomètresFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "53": {
    "id": 53,
    "modifiers": {
      "primary": [
        8,
        5
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 6,
    "name": "Amnésie",
    "incantation": "Oubliettes",
    "description": "Efface instantanément la mémoire d’une personne. Durée :permanente, Opposition : POU/POU. Remarque : Un regard plus lointain et une expression d'indifférence rêveuse sont des symptômes d'une modification de la mémoire. Il est possible de contrer les effets d’un sortilège d’amnésie mais les conséquences pour la personne peuvent être terribles et endommager son esprit de manièreirrémédiable.",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Âme"
  },
  "54": {
    "id": 54,
    "modifiers": {
      "primary": [
        6,
        3
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 6,
    "name": "Brèche",
    "incantation": "Partis Temporus",
    "description": "Créer de manière temporaire une brèche dans une protection magique en place, permettant au sorcier de passer sans encombre. Durée : volontaireFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "55": {
    "id": 55,
    "modifiers": {
      "primary": [
        4,
        2
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 6,
    "name": "Vol sans balais",
    "incantation": "Volatus",
    "description": "Permet de voler sans l’aide de balai à une vitesse de 10 m/round. Durée : 1d10+2 heures.",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Corps"
  },
  "56": {
    "id": 56,
    "modifiers": {
      "primary": [
        2,
        0
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 1,
    "name": "Attelle",
    "incantation": "Ferula",
    "description": "Employé lors de fractures, ce sort fait apparaître une attelle et empêche la blessure de s'aggraver. Effet : Rend 1 point de vie. Durée : - Formule extrême : rend 2 points de vie",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Terre"
  },
  "57": {
    "id": 57,
    "modifiers": {
      "primary": [
        1,
        9
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 1,
    "name": "Objet en Oiseau",
    "incantation": "Avifors",
    "description": "Transforme un objet en oiseau vivant de même taille ou en une volée d’oiseaux. Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "58": {
    "id": 58,
    "modifiers": {
      "primary": [
        0,
        0
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 2,
    "name": "Animal en Animal",
    "incantation": "",
    "description": "Transforme un animal en un autre. Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "59": {
    "id": 59,
    "modifiers": {
      "primary": [
        2,
        9
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 2,
    "name": "Langue de Plomb",
    "incantation": "Mimble Wimble / Mutismus",
    "description": "Empêche la cible de parler en faisant des nœuds avec sa langue et inflige un malus de 80% à la magie. Remarque : Ce sortilège possède deux incantations Durée : 1d4+1 rounds.Formule extrême : durée +2 rounds",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "60": {
    "id": 60,
    "modifiers": {
      "primary": [
        4,
        9
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 3,
    "name": "Chauve-Furie",
    "incantation": "",
    "description": "Lance POU Chauves-Furies au visage d’un adversaire, qui se voit entravé dans ses mouvements. Les créatures sont capables de griffer et de mordre, mais dès la fin de l’enchantement, toute trace corporelle disparait. Durée : Variable (rounds)Formule extrême : permet de viser 2 adversaires et durée +2 rounds",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "61": {
    "id": 61,
    "modifiers": {
      "primary": [
        9,
        4
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 3,
    "name": "Crache-Limace",
    "incantation": "Limacius Eructo",
    "description": "Fait vomir des limaces à la cible lui occasionnant un malus de 50% à la magie et inflige des douleurs. Durée : 1d6+2 heures. (Jet de CON x3 pour faire un effort).Formule extrême : Malus de 70% à la magie et durée +2 heures",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "62": {
    "id": 62,
    "modifiers": {
      "primary": [
        2,
        6
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Diminution",
    "incantation": "Diminuedo",
    "description": "Diminue la taille de la cible jusqu’à ce qu’elle ne mesure plus qu’une trentaine de centimètres. Durée : POU minutesFormule extrême : diminue la taille de la cible jusqu’à 1 centimètre pour une durée de POUx 2 minutes.",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "63": {
    "id": 63,
    "modifiers": {
      "primary": [
        2,
        1
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 3,
    "name": "Objet en Animal",
    "incantation": "",
    "description": "Transforme un objet en animal. Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Terre"
  },
  "64": {
    "id": 64,
    "modifiers": {
      "primary": [
        6,
        0
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 3,
    "name": "Objet en Lapin",
    "incantation": "Draconifors",
    "description": "Transforme un objet en lapin vivant de même taille. Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "65": {
    "id": 65,
    "modifiers": {
      "primary": [
        0,
        4
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Personne en Animal",
    "incantation": "",
    "description": "Transforme quelqu’un en animal. (Opposition : POU/POU). Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "66": {
    "id": 66,
    "modifiers": {
      "primary": [
        5,
        1
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 4,
    "name": "Humanité",
    "incantation": "Homomorphus",
    "description": "Rend sa forme humaine à un animagus ou à un humain métamorphosé (Opposition : POU/POU). Durée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Corps"
  },
  "67": {
    "id": 67,
    "modifiers": {
      "primary": [
        3,
        0
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 4,
    "name": "Séduction",
    "incantation": "",
    "description": "Charme une cible et la rend amoureuse de soi durant 1d6+1 heures. Le sort ne peut plus être lancé pendant une période équivalente à celle passée sous le charme. (Opposition : APP/POU) Formule extrême : durée 2d6+2 heures",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Corps",
    "secondaryElement": "Âme"
  },
  "68": {
    "id": 68,
    "modifiers": {
      "primary": [
        1,
        1
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 0,
    "name": "Magie Domestique",
    "incantation": "",
    "description": "Magie employée à la maison qui permet de faire la vaisselle, recoudre un bouton, enlever des taches. Durée : 1d4+1 heures, Remarque : il existe vraisemblablement une multitude de sorts de magie domestique (un pour chaque tâche) mais ceux-ci sont tous réunis sous la même appellation.Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "69": {
    "id": 69,
    "modifiers": {
      "primary": [
        6,
        5
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 1,
    "name": "Surface miroir",
    "incantation": "Mirare",
    "description": "Fait apparaître une surface argentée sur un support, qui reflète tout ce qui passe devant. Durée : 2d4+2 heuresFormule extrême : durée 1d4+1 jours",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "70": {
    "id": 70,
    "modifiers": {
      "primary": [
        4,
        0
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 1,
    "name": "Étanchéité",
    "incantation": "Impervius",
    "description": "Enchante une surface. Repousse les substances qui s’y trouvent. Durée : variable (heures)Formule extrême : durée +3 heures",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "71": {
    "id": 71,
    "modifiers": {
      "primary": [
        8,
        9
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 1,
    "name": "Extinction",
    "incantation": "",
    "description": "Permet d’éteindre immédiatement un feu : Durée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Feu"
  },
  "72": {
    "id": 72,
    "modifiers": {
      "primary": [
        5,
        1
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 1,
    "name": "Hydrophobie",
    "incantation": "",
    "description": "Permet de rendre un objet hydrophobe durant un certain temps. Celui- ci repousse alors tous les liquides qui entrent en contact avec lui. Durée : Variable (heures)Formule extrême : Durée de 1d2 jour(s)",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "73": {
    "id": 73,
    "modifiers": {
      "primary": [
        3,
        2
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 1,
    "name": "Larmes",
    "incantation": "Lacrimare",
    "description": "Fait pleurer une personne, malus de 20% à tout ce qui implique la vision durant 1d4 heuresFormule extrême : Malus de 30% et durée +1 heure",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Corps"
  },
  "74": {
    "id": 74,
    "modifiers": {
      "primary": [
        0,
        5
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 1,
    "name": "Liquide vers Liquide",
    "incantation": "",
    "description": "Permet de métamorphoser un liquide en un autre. Durée : permanente.Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Eau"
  },
  "75": {
    "id": 75,
    "modifiers": {
      "primary": [
        2,
        4
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 1,
    "name": "Récurage",
    "incantation": "Récurvite",
    "description": "Nettoie la saleté en créant des bulles de savon, ou en la faisant disparaître. Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "76": {
    "id": 76,
    "modifiers": {
      "primary": [
        0,
        6
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 1,
    "name": "Refroidissement",
    "incantation": "Frigidus",
    "description": "Permet de faire refroidir un liquide ou un objet jusqu’à 5° C. Durée : -Formule extrême : diminution jusqu’à 0°C",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "77": {
    "id": 77,
    "modifiers": {
      "primary": [
        5,
        7
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 1,
    "name": "Remplissage",
    "incantation": "Aguamenti",
    "description": "Produit de l’eau qui sort à l’extrémité de la baguette. La puissance du jet est variable, et peut aussi bien servir à étancher la soif qu'à éteindre un incendie. Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "78": {
    "id": 78,
    "modifiers": {
      "primary": [
        6,
        8
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 2,
    "name": "Brouillard",
    "incantation": "Nebulus",
    "description": "Fait sortir du brouillard par l’extrémité de la baguette permettant de se camoufler. Zone : Ce brouillard se répand sur POUx2 mètres de rayon. Durée : Variable (heures). Effets : Observation = PERceptionx2 Formule extrême : Zone : POUx3 mètres de rayon. Durée : Variable (heures +2). Effets : Observation = PERceptionx1",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Air"
  },
  "79": {
    "id": 79,
    "modifiers": {
      "primary": [
        4,
        1
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 2,
    "name": "Cheveux drus",
    "incantation": "",
    "description": "Permet de faire pousser les cheveux de manière disproportionnée, gênant la vue de la cible. Jet d’observation = PERx2 (au lieu de PERx5). Durée : permanenteFormule extrême : Cheveux et poils poussent pour gêner le sorcier. JetD’observation PERx1 et malus de 10% aux actions de déplacement",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Corps"
  },
  "80": {
    "id": 80,
    "modifiers": {
      "primary": [
        7,
        2
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Empiffrement / Engorgement / Gavage",
    "incantation": "Amplificatum/ Reducio",
    "description": "Fait grandir un objet, un animal ou une plante et doublant sa taille durant 1d4+2 heures. Les effets du sort se dissipent ensuite d’eux- mêmes ou peuvent être dissipés par une contre-incantation. (POU/POU). Durée : 1d4+2 heures. Remarque : la contre-incantation pour annuler l’amplification de l’objet ou l’animal est ReducioFormule extrême : +2 heures",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": false,
      "Plant": true
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "81": {
    "id": 81,
    "modifiers": {
      "primary": [
        9,
        2
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 2,
    "name": "Huile glissante",
    "incantation": "Scandere",
    "description": "Recouvre une surface d’huile glissante. Jet de DEXtérité x2 pour se déplacer dessus. Durée : variable (heures)Formule extrême : DEXtérité x1 pour se déplacer",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "82": {
    "id": 82,
    "modifiers": {
      "primary": [
        7,
        8
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 2,
    "name": "Illisibilité",
    "incantation": "Illegibilus",
    "description": "Rend un texte illisible. Peut être levé par un sortilège Finite Incantatem.Durée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Eau"
  },
  "83": {
    "id": 83,
    "modifiers": {
      "primary": [
        1,
        6
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Crottes de nez",
    "incantation": "Mucus ad Nauseam",
    "description": "Ce sortilège – également connu sous le nom de maléfice du Morveux – fait abondamment couler le nez d’une personne, l’empêchant de respirer par le nez. Effets : impossible d’utiliser PERception (odorat) + malus de 10% pour toute activité liée à l’effort et à la communication. Durée : Variable (heures)Formule extrême : Malus de 25% à la magie et durée +2 heures",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Corps"
  },
  "84": {
    "id": 84,
    "modifiers": {
      "primary": [
        7,
        3
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 3,
    "name": "Glacius",
    "incantation": "Glacius",
    "description": "Fait apparaître un bloc de glace autour de l’objet ou de la créature visée afin de l’immobiliser. Il peut aussi permettre de geler des surfaces liquides, afin de pouvoir marcher dessus. Durée : 1d6+1 roundsFormule extrême : 1d6+1 heures",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "85": {
    "id": 85,
    "modifiers": {
      "primary": [
        5,
        6
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 3,
    "name": "Glu-Perpétuelle",
    "incantation": "-",
    "description": "Permet de garder un objet fixé de sorte que personne ne puisse l’enlever. Durée : permanenteFormule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "86": {
    "id": 86,
    "modifiers": {
      "primary": [
        8,
        5
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Grandes-Dents",
    "incantation": "Dentes augmento",
    "description": "Fait pousser les dents de manière démesurée infligeant un malus de 25% pour la magie et fait baisser l’APP de 2. Durée : variable (jours)Formule extrême : Malus de 40% et baisse l’APParence de 3",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Corps"
  },
  "87": {
    "id": 87,
    "modifiers": {
      "primary": [
        0,
        3
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 3,
    "name": "Herbivicus",
    "incantation": "Herbivicus",
    "description": "Accélère la croissance des plantes et fleurs Durée : Volontaire Remarque : Faire attention à ce que la plante ait suffisamment d’eau et de nourriture afin qu’elle ne meure pas.",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "88": {
    "id": 88,
    "modifiers": {
      "primary": [
        2,
        2
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 3,
    "name": "Impassibilité",
    "incantation": "Impassibilis",
    "description": "Empêche quoi que ce soit de passer à travers l’objet enchanté. Durée : variable (heures) Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "89": {
    "id": 89,
    "modifiers": {
      "primary": [
        6,
        8
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 3,
    "name": "Toboggan",
    "incantation": "Glisseo",
    "description": "Transforme un escalier en toboggan. Durée : Variable (heures)",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Terre"
  },
  "90": {
    "id": 90,
    "modifiers": {
      "primary": [
        3,
        7
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 4,
    "name": "Gèle-Flamme",
    "incantation": "",
    "description": "Rend les flammes visées inoffensives. Durée : variable (jours) Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Eau",
    "secondaryElement": "Feu"
  },
  "91": {
    "id": 91,
    "modifiers": {
      "primary": [
        6,
        9
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 1,
    "name": "Effroi petites créatures",
    "incantation": "« Nom » pesternomi",
    "description": "Fais fuir certains animaux fantastiques considérés comme de la vermine. Durée : 1d4+1 heures Formule extrême : 2d4+1 heures de durée",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "92": {
    "id": 92,
    "modifiers": {
      "primary": [
        1,
        0
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 2,
    "name": "Anti-Sort général",
    "incantation": "Finite incantatum",
    "description": "Supprime immédiatement les effets de tous les sortilèges (Opposition : POU / POU). Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "93": {
    "id": 93,
    "modifiers": {
      "primary": [
        4,
        0
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 1,
    "name": "Objets chantant",
    "incantation": "Cantis",
    "description": "Permet de faire chanter les objets enchantés durant 1 heure Durée : Volontaire Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Terre"
  },
  "94": {
    "id": 94,
    "modifiers": {
      "primary": [
        9,
        5
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 1,
    "name": "Quatre-Points",
    "incantation": "Pointe au nord",
    "description": "Ce sort agit comme une boussole et permet de savoir où est le nord. Durée : 1 round Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Air"
  },
  "95": {
    "id": 95,
    "modifiers": {
      "primary": [
        9,
        4
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 2,
    "name": "Annulation de métamorphose",
    "incantation": "Réparifagex",
    "description": "Sortilège qui annule un sortilège de métamorphose incomplet. Ne fonctionne cependant pas sur les métamorphoses complètes. Durée : - Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "96": {
    "id": 96,
    "modifiers": {
      "primary": [
        5,
        5
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Charmer",
    "incantation": "Delecto",
    "description": "Charme une cible et la rend amoureuse de soi durant 1d6+1 rounds. Le sort ne peut plus être lancé pendant une période équivalente à celle passée sous le charme. (Opposition : APP/POU) Formule extrême : durée 2d6+2",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "97": {
    "id": 97,
    "modifiers": {
      "primary": [
        8,
        6
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 2,
    "name": "Cherche propriétaire",
    "incantation": "Avensegium",
    "description": "Lancé sur un objet, ce sortilège permet de retrouver son propriétaire. l'objet visé par le sort indique alors la direction du propriétaire comme l'aiguille d'une boussole, puis se déplace dans sa direction jusqu'à sa destination. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Terre"
  },
  "98": {
    "id": 98,
    "modifiers": {
      "primary": [
        0,
        9
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 2,
    "name": "Confusion",
    "incantation": "Confundo",
    "description": "Plonge la cible dans la confusion, ce qui lui occasionne un malus de 50% à toutes les actions nécessitant de la réflexion, y compris la magie. Durée : Variable (rounds) Formule extrême : Malus de 70%",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "99": {
    "id": 99,
    "modifiers": {
      "primary": [
        5,
        3
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Danse endiablée",
    "incantation": "Tarentallegra",
    "description": "Fait danser de manière incontrôlable ce qui donne un malus de 40 % à toutes les actions, à l’exception de la magie qui a un malus de 20%. Durée : 1d4+2 rounds. Formule extrême : 50% de malus aux actions, magie -30% et durée +1  round",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "100": {
    "id": 100,
    "modifiers": {
      "primary": [
        3,
        5
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Riddikulus",
    "incantation": "Riddikulus",
    "description": "Rend un épouvantard ridicule aux yeux de celui qui en avait peur à l'origine, ce qui le rend inoffensif. (POU/POU). Durée : -Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "101": {
    "id": 101,
    "modifiers": {
      "primary": [
        9,
        0
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 3,
    "name": "Allégresse",
    "incantation": "Felicitas",
    "description": "Met une personne dans un état de bonheur intense où elle ne peut pas s’inquiéter durant 1d4+1 heures. (Opposition POU/POU) Formule extrême : Durée +2 heures",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "102": {
    "id": 102,
    "modifiers": {
      "primary": [
        6,
        8
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 3,
    "name": "Chatouillis",
    "incantation": "Rictusempera",
    "description": "Fait rire la cible de manière incontrôlée, ce qui lui inflige un malus de 60 % à toute ses actions, y compris le lancement de sorts. Durée : Variable (rounds) Formule extrême : Malus de 70% et durée +2 rounds",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "103": {
    "id": 103,
    "modifiers": {
      "primary": [
        5,
        5
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Contre- Enchantement",
    "incantation": "Surgito",
    "description": "Surgito est une incantation permettant de contrer les effets d’un enchantement ou d’un envoûtement. Effets : Met immédiatement fin aux effets d’un envoûtement magique ou des effets d’un enchantement. Durée : - Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "104": {
    "id": 104,
    "modifiers": {
      "primary": [
        4,
        9
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 3,
    "name": "Cridurut",
    "incantation": "Cridurut",
    "description": "Déclenche une alarme si une personne entre dans la zone d’effet du sortilège. Zone maximale POU mètres de diamètre. Durée : 1 jour Formule extrême : ne retentit que dans l’esprit de ceux qui sont dans la zone protégée",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Air"
  },
  "105": {
    "id": 105,
    "modifiers": {
      "primary": [
        5,
        9
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Déflexion",
    "incantation": "Flexus",
    "description": "Permet de dévier un sort de niveau 3 ou inférieur sur une autre cible (Opposition : Pou/Pou). Durée : - Formule extrême : permet de dévier un sort de niveau 4 ou inférieur",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Âme"
  },
  "106": {
    "id": 106,
    "modifiers": {
      "primary": [
        0,
        4
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 3,
    "name": "Empreintes",
    "incantation": "Appare Vestigium",
    "description": "Permet de faire apparaître les traces du passage d’une personne ou d’un animal, ainsi que les récentes activités magiques. Fait également apparaître une image des personnes, animaux et créatures qui ont croisé la piste. Les traces apparaissent dans le sillage d'une volute dorée Durée : volontaire Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Terre"
  },
  "107": {
    "id": 107,
    "modifiers": {
      "primary": [
        0,
        1
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 3,
    "name": "Lien",
    "incantation": "Protéiforme",
    "description": "Lie les objets entre eux de telle sorte que si l’un d’eux est modifié, tous les autres le sont également. Durée : permanent Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Terre"
  },
  "108": {
    "id": 108,
    "modifiers": {
      "primary": [
        9,
        6
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Repousse-Fantômes",
    "incantation": "Repello Umbrae",
    "description": "Empêche les fantômes de pénétrer dans la zone enchantée par ce sort (Opposition : POU/POU). Durée : 1 jour Formule extrême : durée +1 jour",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Air"
  },
  "109": {
    "id": 109,
    "modifiers": {
      "primary": [
        7,
        3
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Repousse-Moldus",
    "incantation": "Repello Moldum",
    "description": "Empêche les moldus de pénétrer dans la zone enchantée par ce sort. Durée : 1 jour Formule extrême : durée +1 jour",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Air"
  },
  "110": {
    "id": 110,
    "modifiers": {
      "primary": [
        8,
        6
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Réveil",
    "incantation": "Enervatum",
    "description": "Réveille toute personne endormie, par magie ou non, et toute personne touchée par le sort de Stupéfixion. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "111": {
    "id": 111,
    "modifiers": {
      "primary": [
        2,
        2
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Réversion",
    "incantation": "Reverte",
    "description": "Ce sortilège permet de ramener un objet dans sa position ou son état d'origine. Peut faire bouger l’objet ou le réparer. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Terre"
  },
  "112": {
    "id": 112,
    "modifiers": {
      "primary": [
        3,
        0
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 3,
    "name": "Soins",
    "incantation": "Episkey",
    "description": "Redonne 1d4+1 points de vie à une personne blessée et ressoude les os après les avoir remis en place. Une fois lancé, ce sortilège ne peut plus faire effet sur cette blessure. Durée : - Formule extrême : Redonne 1d4+2 points de vie",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "113": {
    "id": 113,
    "modifiers": {
      "primary": [
        5,
        8
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Stupéfixion",
    "incantation": "Stupefix",
    "description": "Paralyse la cible et la met dans un état de catatonie proche du coma. Durée : 2d4+2 heures Formule extrême : 1 jour",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "114": {
    "id": 114,
    "modifiers": {
      "primary": [
        6,
        5
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 4,
    "name": "Alarme",
    "incantation": "Cave Inimicum",
    "description": "Créer une bulle englobant le lanceur et les personnes proches (POU mètres) qui permet de se protéger contre des ennemis. Ceux qui sont de l’autre côté du bouclier ne pourront pas voir les personnes dans la bulle, les entendre. La bulle prend fin quand on jette un sort depuis l’intérieur Durée : POU heures Formule extrême : Empêche également d’être senti.",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Air"
  },
  "115": {
    "id": 115,
    "modifiers": {
      "primary": [
        3,
        7
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 4,
    "name": "Annulation de sort",
    "incantation": "Destructum",
    "description": "Sortilège permettant d'effacer les effets d'un autre sortilège. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Âme"
  },
  "116": {
    "id": 116,
    "modifiers": {
      "primary": [
        6,
        1
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 4,
    "name": "Attaque",
    "incantation": "Oppugno",
    "description": "Oblige des objet ou des animaux à attaquer une cible et à lui causer des dégâts. Occasionne 1d4 dégâts à une cible. DEXx3 pour ½ dégâts. (Minimum 1). Durée : - Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "117": {
    "id": 117,
    "modifiers": {
      "primary": [
        8,
        7
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 4,
    "name": "Détection",
    "incantation": "Hominium revelo",
    "description": "Révèle la présence de toutes personnes vivantes dans la zone du sort. Zone : POUx2 mètres de diamètre. Durée : - Formule extrême : Zone : POUx5 mètres",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Air"
  },
  "118": {
    "id": 118,
    "modifiers": {
      "primary": [
        2,
        9
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 4,
    "name": "Faux-Souvenir",
    "incantation": "",
    "description": "Ce sortilège permet de modifier, voir même d’ajouter de faux souvenirs dans la mémoire d’une personne. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "119": {
    "id": 119,
    "modifiers": {
      "primary": [
        2,
        7
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 4,
    "name": "Fidelitas",
    "incantation": "Fidelitas",
    "description": "Permet de cacher un secret au cœur d'une personne connue sous le nom de Gardien du Secret. Il est alors le seul à pouvoir divulguer ce secret. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "120": {
    "id": 120,
    "modifiers": {
      "primary": [
        1,
        4
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 4,
    "name": "Grandeur",
    "incantation": "Magistratus",
    "description": "Le lanceur s’entoure d’une aura de grandeur qui fait que les personnes alentours ont du mal à le regarder dans les yeux sans ressentir de la peur ou de l’attirance devant sa personne. Opposition : POU/POU. Durée : 1d10+2 heures Formule extrême : Durée +1d4+1 heures",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "121": {
    "id": 121,
    "modifiers": {
      "primary": [
        8,
        6
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 4,
    "name": "Renforcement",
    "incantation": "Fianto Duri",
    "description": "Fianto Duri est un sortilège qui est utilisé pour renforcer les protections magiques déjà existante. Une fois lancé, ce sortilège donne l’effet des formules extrêmes à un sortilège déjà lancé. Durée : Identique à la durée de la formule extrême du sortilège renforcé Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Âme"
  },
  "122": {
    "id": 122,
    "modifiers": {
      "primary": [
        7,
        5
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 4,
    "name": "Révélasort de Scarpin",
    "incantation": "Specialis revelio",
    "description": "Ce sort permet d'identifier les sorts jetés sur un objet ou les ingrédients d'une potion. Lancé une deuxième fois sur une potion, il permet de savoir si celle-ci a été correctement préparée. Durée : - Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Âme",
    "secondaryElement": "Terre"
  },
  "123": {
    "id": 123,
    "modifiers": {
      "primary": [
        6,
        0
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 5,
    "name": "Eveil d’objets",
    "incantation": "",
    "description": "Donne vie et une conscience temporaire à un objet qui obtient une valeur d’INTelligence de 6. Celui-ci obéit alors au sorcier. Durée : variable Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Terre"
  },
  "124": {
    "id": 124,
    "modifiers": {
      "primary": [
        4,
        2
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 5,
    "name": "Legilimens",
    "incantation": "Legimens",
    "description": "Permet d’entrer dans l’esprit d’une personne, de lire ses pensées et de parcourir ses souvenirs. Opposition : POU/(POUx1). Durée : volontaire Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Âme"
  },
  "125": {
    "id": 125,
    "modifiers": {
      "primary": [
        5,
        0
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 5,
    "name": "Remontée des sortilèges / Priori Incantatum",
    "incantation": "Prior Incanto",
    "description": "Sort qui sert à dévoiler la dernière action d'une baguette magique. Fait remonter les sortilèges en sens inverse. Durée : - Remarque : lorsque deux baguettes jumelles lancent un sort l'une contre l'autre, Priori Incantatem se lance de lui-même. Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Âme"
  },
  "126": {
    "id": 126,
    "modifiers": {
      "primary": [
        2,
        3
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 6,
    "name": "Guérisons magiques",
    "incantation": "",
    "description": "Regroupe tous les sorts capables de soigner une blessure grave d’origine magique ou non. Provoque une lente régénération du corps ou de l’esprit qui est douloureux et pas toujours efficace. Durée : en fonction des blessures.",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Corps"
  },
  "127": {
    "id": 127,
    "modifiers": {
      "primary": [
        1,
        5
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 6,
    "name": "Imperium",
    "incantation": "Impero",
    "description": "Oblige une personne à obéir au sorcier (Résister : POU x1).",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Âme",
    "secondaryElement": "Âme"
  },
  "128": {
    "id": 128,
    "modifiers": {
      "primary": [
        9,
        8
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 6,
    "name": "Recherches magiques",
    "incantation": "",
    "description": "Permet de développer une nouvelle application d’un sortilège existant ou de créer un sort original.",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Âme",
    "secondaryElement": "Âme"
  },
  "129": {
    "id": 129,
    "modifiers": {
      "primary": [
        0,
        4
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 1,
    "name": "Lumière/Obscurité",
    "incantation": "Lumos/Nox",
    "description": "Fait jaillir un faisceau de lumière de la baguette (longueur : 5 mètres). Durée : volontaire Formule extrême : Longueur 10 mètres",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "130": {
    "id": 130,
    "modifiers": {
      "primary": [
        5,
        6
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 1,
    "name": "Révélation",
    "incantation": "Aparecium",
    "description": "Fait apparaître quelque chose qui a été caché par magie ou non (Opposition : Niv / Niv). Durée : - Formule extrême : révèle tous les objets cachés dans un rayon de POUvoir mètres autour du sorcier",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "131": {
    "id": 131,
    "modifiers": {
      "primary": [
        1,
        1
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 1,
    "name": "Détonation",
    "incantation": "Badabam",
    "description": "Produit une violente détonation. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Air"
  },
  "132": {
    "id": 132,
    "modifiers": {
      "primary": [
        0,
        3
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 1,
    "name": "Éclat lumineux",
    "incantation": "Luminaria subitus",
    "description": "Inflige un malus de 50% à toutes les actions des personnages qui voient le flash. Durée : 1 round Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "133": {
    "id": 133,
    "modifiers": {
      "primary": [
        1,
        5
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 1,
    "name": "Explosion de serrure",
    "incantation": "Portaberto",
    "description": "Sortilège qui provoque l'explosion d'une serrure, la rendant inutilisable. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "134": {
    "id": 134,
    "modifiers": {
      "primary": [
        4,
        0
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 1,
    "name": "Flambois",
    "incantation": "",
    "description": "Sortilège faisant jaillir une intense lueur rouge de la baguette permettant de dessiner une marque enflammée.",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "135": {
    "id": 135,
    "modifiers": {
      "primary": [
        0,
        6
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 1,
    "name": "Oiseaux de lumière",
    "incantation": "",
    "description": "Permet de faire jaillir de petits oiseaux de lumière de sa baguette. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "136": {
    "id": 136,
    "modifiers": {
      "primary": [
        1,
        2
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 1,
    "name": "Réchauffement",
    "incantation": "Calefare",
    "description": "Permet de faire chauffer un objet de quelques degrés ou de faire bouillir une petite quantité de liquide (3L). Durée : - Formule extrême : Quantité jusqu’à 10l",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "137": {
    "id": 137,
    "modifiers": {
      "primary": [
        6,
        2
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 1,
    "name": "Sécheresse",
    "incantation": "",
    "description": "Permet d’assécher de petites étendues d’eau. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Eau"
  },
  "138": {
    "id": 138,
    "modifiers": {
      "primary": [
        4,
        9
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 1,
    "name": "Vermilious",
    "incantation": "Vermillious / Vermeil",
    "description": "Libère de petites étincelles rouges vermeils qui peuvent causer quelques dommages aux insectes et plantes qu’elles touchent. Effet : 1 dégât ; Durée : - ; Portée : 1,5m Formule extrême : 2 dégâts et portée de 3 mètres",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Feu",
    "secondaryElement": "Air"
  },
  "139": {
    "id": 139,
    "modifiers": {
      "primary": [
        9,
        4
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 2,
    "name": "Apparition d’objet",
    "incantation": "Inanimatus Apparitus",
    "description": "Permet de faire apparaître un objet invisible. Durée : permanente Formule extrême : révèle tous les objets invisibles dans un rayon de POUvoir mètres autour du sorcier",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Air"
  },
  "140": {
    "id": 140,
    "modifiers": {
      "primary": [
        9,
        2
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 2,
    "name": "Changement de couleur",
    "incantation": "Colovaria",
    "description": "Permet de changer la couleur d’un objet, d’un animal, d’une plante ou même de certaines parties du corps d’un sorcier. Durée : POU/2 heures Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "141": {
    "id": 141,
    "modifiers": {
      "primary": [
        0,
        0
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 2,
    "name": "Conjonctivite",
    "incantation": "Conjonctivitis",
    "description": "La cible voit ses yeux se couvrir de croûtes et devenir rouges. Effets : Jet de PERception (vue) = PERx1 au lieu de PERx5. Remarque : Particulièrement efficace sur les dragons. Durée : - Soins : Antidote : potion Oculus Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "142": {
    "id": 142,
    "modifiers": {
      "primary": [
        9,
        1
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 2,
    "name": "Cuisant",
    "incantation": "",
    "description": "Ce maléfice provoque une douleur cuisante et gonfle le visage de la cible pour le rendre méconnaissable. Effet : APP-5. Durée : Variable (heures) Formule extrême : APParence -6 et durée +1 heure",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "143": {
    "id": 143,
    "modifiers": {
      "primary": [
        0,
        2
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 2,
    "name": "Lumières de détresse",
    "incantation": "Periculum",
    "description": "Projette en l’air des étincelles rouges qui restent suspendues pour signaler sa position lorsqu’on est en danger. Durée : variable (rounds) Formule extrême : durée variable (minutes)",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Air"
  },
  "144": {
    "id": 144,
    "modifiers": {
      "primary": [
        2,
        4
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 2,
    "name": "Renversement",
    "incantation": "Everte Statum",
    "description": "Fait violemment trébucher la cible immobile en l’envoyant voler à une dizaine de mètres en arrière. Cause 1 point de dégât à la cible si elle ne réussit pas un jet de DEXx3. Durée : - Formule extrême : Cause 2 dégâts et repousse à 15 mètres.",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "145": {
    "id": 145,
    "modifiers": {
      "primary": [
        3,
        6
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 2,
    "name": "Repousse créature",
    "incantation": "« Nom » Exumai",
    "description": "Repousse instantanément un animal magique ou non le plus loin possible du sorcier. (Opposition : POU/FOR). Maximum : POU x 5 m. Durée : - Formule extrême : Maximum POUvoir x7 mètres",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "146": {
    "id": 146,
    "modifiers": {
      "primary": [
        5,
        8
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Catapultage",
    "incantation": "",
    "description": "Lancé sur un objet comme un balai magique par exemple, ce sortilège repousse violemment toute personne qui tente de s’en saisir. Opposition : FORx2. Durée : - Formule extrême : Opposition FORce x1",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "147": {
    "id": 147,
    "modifiers": {
      "primary": [
        1,
        8
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Découpe",
    "incantation": "Diffindo / Cracbadabum",
    "description": "Sectionne la matière en deux parties. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "148": {
    "id": 148,
    "modifiers": {
      "primary": [
        8,
        1
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 3,
    "name": "Désillusion",
    "incantation": "",
    "description": "Permet de cacher une personne ou une créature à la manière d’un caméléon. L’objet du sortilège se confond avec son environnement. Durée : variable (heures) Formule extrême : Durée + 2d4+2 heures",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "149": {
    "id": 149,
    "modifiers": {
      "primary": [
        7,
        3
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 3,
    "name": "Explosion d’objets",
    "incantation": "Bombarda",
    "description": "Détruit un petit objet magique ou non en le faisant exploser. Génère un puissant son d’explosion. Maximum 2dm3 (≈ 1 brique d’un litre de lait) Durée : - Formule extrême : Elimine 10dm3 de terre par minute",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "150": {
    "id": 150,
    "modifiers": {
      "primary": [
        9,
        4
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Furoncles",
    "incantation": "Furunculus",
    "description": "Répand sur le corps des furoncles et des pustules immondes. Fait perdre 2 points de vie et diminue l’APP de moitié. Les points de vie perdus ne peuvent être regagnés qu’en dissipant le sort et en se reposant. Durée : variable (heures) Formule extrême : Perte de 3 points de vie et diminue l’APParence de ¾.",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "151": {
    "id": 151,
    "modifiers": {
      "primary": [
        3,
        1
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Invisibilité (Animal)",
    "incantation": "Animalis evanesco",
    "description": "Un animal devient invisible. PERception x1 pour percer l’invisibilité. Effet : bonus de 60% en discrétion. Durée : 1 jour. Formule extrême : Bonus de 75% en Discrétion",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "152": {
    "id": 152,
    "modifiers": {
      "primary": [
        7,
        6
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 3,
    "name": "Invisibilité (Objet)",
    "incantation": "Objectum evanesco",
    "description": "Un objet devient invisible. PERception x1 pour percer l’invisibilité. Durée : 1 jour. Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "153": {
    "id": 153,
    "modifiers": {
      "primary": [
        8,
        0
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 3,
    "name": "Invisibilité (Plante)",
    "incantation": "Vegetus evanesco",
    "description": "Une plante devient invisible. PERception x1 pour percer l’invisibilité. Durée : 1 jour. Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": true
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "154": {
    "id": 154,
    "modifiers": {
      "primary": [
        7,
        1
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 3,
    "name": "Obscurité",
    "incantation": "Obscuro",
    "description": "Rend la personne ou l’objet visé noir ou l’empêche de voir. Durée : 1 heure Formule extrême : durée +3 heures",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "155": {
    "id": 155,
    "modifiers": {
      "primary": [
        2,
        4
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Terrassement",
    "incantation": "Defodio",
    "description": "Ce sort permet de creuser de profondes entailles sur une surface. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "156": {
    "id": 156,
    "modifiers": {
      "primary": [
        1,
        7
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 3,
    "name": "Waddiwasi",
    "incantation": "Waddiwasi",
    "description": "Permet d'envoyer un objet à un endroit à la vitesse d'une balle de fusil, peut détruire l’objet ou l’endommager. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "157": {
    "id": 157,
    "modifiers": {
      "primary": [
        0,
        7
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 4,
    "name": "Grande Explosion d’objets",
    "incantation": "Explodere",
    "description": "Détruit un objet magique ou non de grande taille (comme un mur par exemple) en le faisant exploser. Produit un gigantesque son d’explosion. Maximum 1m3 Durée : - Formule extrême : Maximum : 10m3",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "158": {
    "id": 158,
    "modifiers": {
      "primary": [
        4,
        0
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 4,
    "name": "Lumière solaire",
    "incantation": "Solar Lux",
    "description": "Fait jaillir un faisceau de lumière intense de la baguette sous la forme d’un arc de cercle sur une longueur de : POUvoir x2 mètres. Cette lumière éblouit la cible durant 1 round. Celle-ci subit alors un malus de 50% à toutes les actions nécessitant la vue. Effet secondaire : Blesse les créatures sensibles à la lumière en leur infligeant 1d4+1 dégâts Formule extrême : Longueur POUvoir x3 mètres et 1d4+2 dégâts",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "159": {
    "id": 159,
    "modifiers": {
      "primary": [
        8,
        7
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 4,
    "name": "Marque des ténèbres",
    "incantation": "Morsmordre",
    "description": "Fait apparaître la marque des ténèbres. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Air"
  },
  "160": {
    "id": 160,
    "modifiers": {
      "primary": [
        0,
        1
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 4,
    "name": "Mimétisme",
    "incantation": "Mimesis",
    "description": "La peau du personnage s’adapte à son environnement. Effet : bonus de 50% à la discrétion. Durée : 1d10+1 heures Formule extrême : Bonus de 75% et durée +3 heures",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "161": {
    "id": 161,
    "modifiers": {
      "primary": [
        1,
        1
      ],
      "secondary": [
        2,
        1
      ]
    },
    "level": 4,
    "name": "Patronus",
    "incantation": "Expecto Patronum / Spero patronum",
    "description": "Invoque un Patronus (Opposition : POUx2/POU) qui peut servir de bouclier contre certaines créatures maléfiques (Détraqueurs, Morenplis, etc.) ou faire office de messager. Durée : volontaire Remarque : Si ce sortilège est lancé par une personne qui ne possède pas un cœur pur, des asticots de lumière jaillissent de la baguette du sorcier pour venir le dévorer. Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Air"
  },
  "162": {
    "id": 162,
    "modifiers": {
      "primary": [
        1,
        3
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 4,
    "name": "Réduction",
    "incantation": "Reducto",
    "description": "Détruit des objets solides en les faisant tomber en poussière. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "163": {
    "id": 163,
    "modifiers": {
      "primary": [
        2,
        1
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 4,
    "name": "Reviviscence",
    "incantation": "Revigor",
    "description": "Permet de redonner de l'énergie à une personne très affaiblie, étourdie ou bien inconsciente. Bien qu'il soit efficace contre la plupart des sorts, il n'a pas d'effets concluants contre les actes de magie noire. Durée : Volontaire Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "164": {
    "id": 164,
    "modifiers": {
      "primary": [
        4,
        6
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 5,
    "name": "Aveuglement",
    "incantation": "",
    "description": "La personne devient invisible. Effet : octroie un bonus de 60% en discrétion. Durée : 1d4+1 heures Formule extrême : bonus de 75% en Discrétion et durée de 2d4+2 heures",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "165": {
    "id": 165,
    "modifiers": {
      "primary": [
        1,
        6
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 5,
    "name": "Brasier obscur",
    "incantation": "",
    "description": "L’enchantement de brasier obscur est employé pour protéger une zone en créant une barrière de flammes de couleur noire. Ces flammes empêchent une personne de passer à travers en lui causant de graves brûlures. Seul le lanceur peut retirer cette protection. Les sortilèges de dissipation ne fonctionnent pas sur le brasier obscur. Effet : occasionne 1d4+1 dégâts par round à toute personne tentant de traverser les flammes.Durée : POUvoir jours Sauvegarde : potion de protection contre le feu",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Feu"
  },
  "166": {
    "id": 166,
    "modifiers": {
      "primary": [
        2,
        5
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 5,
    "name": "Explosion",
    "incantation": "Confringo",
    "description": "Provoque un effet d’explosion qui détruit des objets (magiques ou non) et qui blesse les êtres vivants en leur infligeant 1d6+1 dégâts. Durée : - Formule extrême : dégâts 2d4+2",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "167": {
    "id": 167,
    "modifiers": {
      "primary": [
        2,
        5
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 5,
    "name": "Expulsion",
    "incantation": "Expulso",
    "description": "Provoque une violente explosion qui endommage les objet et peut causer de graves blessures aux êtres vivants. Possède suffisamment de puissante pour faire traverser à mur à une personne. Détruit les petits objets et endommage les grands. Cause 1d4+1 dégâts à un être vivant. Durée : - Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": true,
      "Person": true,
      "Plant": true
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "168": {
    "id": 168,
    "modifiers": {
      "primary": [
        6,
        2
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 5,
    "name": "Feu de Sempremais",
    "incantation": "",
    "description": "Les objets ensorcelés par un Feu de Sempremais brûlent pour toujours. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "169": {
    "id": 169,
    "modifiers": {
      "primary": [
        0,
        2
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 5,
    "name": "Flagrance",
    "incantation": "",
    "description": "Appliqué sur un objet, ce sortilège sert à le protéger du vol. Quand une personne tente de s’emparer de l’objet sans lever le sort, elle subit une brûlure de l’ordre de 1d4 dégâts. Le sort reste effectif tant qu’il n’est pas levé mais n’endommage pas l’objet. Durée : permanente Formule extrême : 2d4 dégâts infligés",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "170": {
    "id": 170,
    "modifiers": {
      "primary": [
        5,
        5
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 5,
    "name": "Voleur",
    "incantation": "",
    "description": "Lancé sur un objet, ce sort punit celui qui le garde trop longtemps sans l'acheter. Les effets peuvent varier en fonction des désirs de celui qui le lance. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "171": {
    "id": 171,
    "modifiers": {
      "primary": [
        1,
        8
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 6,
    "name": "Bouclier diabolique",
    "incantation": "Protego Diabolica",
    "description": "Crée un cercle de flammes bleues qui protège le sorcier contre les sortilèges. Seuls les alliés du sorcier peuvent traverser le cercle de flamme sans risque. Si une personne hostile envers le lanceur tente de traverser les flammes ou est touché par celles-ci, il est réduit en cendres.",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "172": {
    "id": 172,
    "modifiers": {
      "primary": [
        0,
        0
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 6,
    "name": "Brasier pourpre",
    "incantation": "",
    "description": "Une variation du brasier obscur qui est cependant bien plus compliquée à passer. Comme son homologue obscur, le brasier pourpre ne peut être dissipé que par celui qui a lancé le sortilège. De plus, ce brasier occasionne des dégâts plus importants à ceux et celles qui tente de le traverser soit 1d6+2 dégâts par round. Finalement, la potion de protection contre le feu classique ne fonctionne pas pour cet enchantement. Une potion particulière doit être préparée par le lanceur du sortilège. Durée : POUvoirx3 jours Sauvegarde : potion des flammes violettes",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Terre"
  },
  "173": {
    "id": 173,
    "modifiers": {
      "primary": [
        8,
        2
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 6,
    "name": "Doloris",
    "incantation": "Endoloris",
    "description": "Inflige un malus de 95% à toutes les actions de la cible sous l'effet de la douleur, peut rendre fou. Remarque : Pour que le sort fonctionne, il faut vouloir la souffrance de l'autre et y prendre du plaisir. Durée : Volontaire",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "174": {
    "id": 174,
    "modifiers": {
      "primary": [
        3,
        7
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 6,
    "name": "Mort",
    "incantation": "Avada kedavra",
    "description": "Ce sort tue une personne sur le coup, sans espoir de survie. Résistance : aucune",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Feu",
    "secondaryElement": "Corps"
  },
  "175": {
    "id": 175,
    "modifiers": {
      "primary": [
        9,
        4
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 0,
    "name": "Création temporaire",
    "incantation": "",
    "description": "Métamorphose mineure, ce sort permet de faire apparaître de petits objets (dés, verre, plume, etc.) qui disparaissent très rapidement. Durée : 2d4 minutes Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "176": {
    "id": 176,
    "modifiers": {
      "primary": [
        4,
        1
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 1,
    "name": "Arrache-gonds",
    "incantation": "Open Sesame",
    "description": "Sortilège permettant d’arracher une porte de ses gonds et qui était beaucoup utilisé avant l'importation du sortilège d’ouverture. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Air"
  },
  "177": {
    "id": 177,
    "modifiers": {
      "primary": [
        2,
        8
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 1,
    "name": "Combustion",
    "incantation": "Lacarnum Inflamarae",
    "description": "Permet de faire prendre feu à un objet inflammable. Durée : - Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Feu"
  },
  "178": {
    "id": 178,
    "modifiers": {
      "primary": [
        0,
        2
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 1,
    "name": "Fleur magique",
    "incantation": "Orchideus",
    "description": "Fait apparaître des fleurs à l'extrémité de la baguette. Durée : 2d4+2 heures Formule extrême : durée passe à 1d4+1 jours",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "179": {
    "id": 179,
    "modifiers": {
      "primary": [
        7,
        4
      ],
      "secondary": [
        1,
        2
      ]
    },
    "level": 1,
    "name": "Jambencoton",
    "incantation": "Locomotor Wibbly",
    "description": "Impose un malus de 50 % à toute action utilisant les jambes durant 1d4 heures Formule extrême : Malus de 60% et durée +1 heure",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "180": {
    "id": 180,
    "modifiers": {
      "primary": [
        7,
        9
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 1,
    "name": "Objet vers Objet",
    "incantation": "",
    "description": "Permet de métamorphoser un objet en un autre. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "181": {
    "id": 181,
    "modifiers": {
      "primary": [
        2,
        7
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 2,
    "name": "Animal en Objet",
    "incantation": "",
    "description": "Transforme un animal en objet. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "182": {
    "id": 182,
    "modifiers": {
      "primary": [
        3,
        3
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 2,
    "name": "Bloque-Jambe",
    "incantation": "Locomotor mortis",
    "description": "Permet de coller les jambes d’une personne l’une contre l’autre, ce qui l’empêche de bouger. Durée : variable (rounds) Formule extrême : durée variable (heures)",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "183": {
    "id": 183,
    "modifiers": {
      "primary": [
        6,
        9
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 2,
    "name": "Colle",
    "incantation": "Agglutino",
    "description": "Colle les pieds d’une personne ou les pattes d’un animal au sol. Ceux- ci doivent réussir un jet de FORx3 pour se libérer. Durée : Variable (heures). Formule extrême : FORx4 et durée +1 heure",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "184": {
    "id": 184,
    "modifiers": {
      "primary": [
        0,
        9
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 2,
    "name": "Coupe-Griffes",
    "incantation": "",
    "description": "Permet de couper les griffes d’une créature magique ou non. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "185": {
    "id": 185,
    "modifiers": {
      "primary": [
        9,
        8
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 2,
    "name": "Durcissement",
    "incantation": "Duro",
    "description": "Change les petits objets en pierre, Maximum 5dm3. Durée : 1d6+2 heures Formule extrême : 10dm3 et durée +1 heure",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "186": {
    "id": 186,
    "modifiers": {
      "primary": [
        0,
        8
      ],
      "secondary": [
        1,
        1
      ]
    },
    "level": 2,
    "name": "Ligotage",
    "incantation": "Incarcerem",
    "description": "Ligote la cible en faisant apparaître des cordes magiques qui l’emprisonnent fermement. Pour se libérer, la cible doit réussir un jet en opposition (POU/DEX). Durée : permanente Formule extrême : le jet de DEX pour se libérer se fait avec un malus de 2 points",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "187": {
    "id": 187,
    "modifiers": {
      "primary": [
        6,
        4
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 2,
    "name": "Objet en Prison",
    "incantation": "Incarcifos",
    "description": "Transforme un objet en prison de même taille. Durée : permanente Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "188": {
    "id": 188,
    "modifiers": {
      "primary": [
        4,
        8
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 3,
    "name": "Bouche soudée",
    "incantation": "Oscausi",
    "description": "Fait disparaître la bouche d’une personne ou d’un animal. La bouche semble alors n'avoir jamais existé, de la peau la recouvrant. Durée : Variable (heures) Effets : Mutisme Formule extrême : Durée : Variable (heures +2)",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "189": {
    "id": 189,
    "modifiers": {
      "primary": [
        3,
        8
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 3,
    "name": "Création d’objets simples",
    "incantation": "",
    "description": "Permet de créer des objets à partir d’une matière de base. Ces objets peuvent être des objets simples ou des morceaux d’objets plus volumineux (rouages par exemple). Durée : permanente. Remarque : nécessite une bonne connaissance de l’objet à créer car celui-ci doit être visualisé mentalement avant de lancer le sort. Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "190": {
    "id": 190,
    "modifiers": {
      "primary": [
        2,
        2
      ],
      "secondary": [
        0,
        1
      ]
    },
    "level": 3,
    "name": "Excavation",
    "incantation": "Defodio",
    "description": "Permet de creuser, par exemple d’élargir un tunnel. Élimine 1m3 de roche et de terre par minute. Durée : volontaire Formule extrême : Elimine 3m3 de terre par minute",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "191": {
    "id": 191,
    "modifiers": {
      "primary": [
        2,
        3
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Gemino",
    "incantation": "Gemino",
    "description": "Ce sortilège permet de créer une copie parfaite d’un objet. Cette copie n’est cependant parfaite qu’en apparence et ne possède pas les éventuelles propriétés magiques de l’original. Durée : permanente Effet secondaire : Ne peut être arrêté que par le lanceur, sans quoi l’objet continu de se dupliquer sans s’arrêter durant 1d4 jour(s). Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "192": {
    "id": 192,
    "modifiers": {
      "primary": [
        7,
        5
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 3,
    "name": "Maléfice du saucisson",
    "incantation": "Petrificus totalus",
    "description": "Immobilise totalement une personne ou un animal en liant ses mains et ses pieds ainsi qu’en lui bloquant la mâchoire. La personne peut cependant toujours voir et entendre ce qu’il se passe. (Opposition : POU/POU). Durée : variable (heures) Formule extrême : Durée : 1d4-1 jours",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "193": {
    "id": 193,
    "modifiers": {
      "primary": [
        6,
        8
      ],
      "secondary": [
        0,
        0
      ]
    },
    "level": 3,
    "name": "Pression",
    "incantation": "Deprimo",
    "description": "Exerce une forte pression sur une surface jusqu’à ce que celle-ci se creuse ou cède. La durée du sortilège dépend de la résistance des objets : POU/FOR. Durée : Volontaire Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "194": {
    "id": 194,
    "modifiers": {
      "primary": [
        9,
        9
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 3,
    "name": "Sort du tireur de flèche",
    "incantation": "Sagita lorem",
    "description": "Conjure une flèche partant de la baguette du lanceur. Populaire parmi les supporters des Flèches d’Appleby mais interdit lors de manifestation de Quidditch. (Opposition : POUxDEX) Effet : Perte de 1d4-1 points de vie. Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "195": {
    "id": 195,
    "modifiers": {
      "primary": [
        5,
        2
      ],
      "secondary": [
        1,
        0
      ]
    },
    "level": 4,
    "name": "Création d’objets complexes",
    "incantation": "",
    "description": "Permet de créer des objets complexes à partir d’une matière de base. Durée : permanente. Remarque : nécessite une excellente connaissance de l’objet à créer et de ses caractéristiques internes car celui-ci doit être visualisé mentalement avant de lancer le sort. Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  },
  "196": {
    "id": 196,
    "modifiers": {
      "primary": [
        3,
        9
      ],
      "secondary": [
        0,
        2
      ]
    },
    "level": 4,
    "name": "Immobilisation totale",
    "incantation": "Immobulus",
    "description": "Immobilise immédiatement jusqu’à POU créatures vivantes. Durée : Variable (heures) Formule extrême : POUx2 créatures vivantes",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "197": {
    "id": 197,
    "modifiers": {
      "primary": [
        3,
        8
      ],
      "secondary": [
        2,
        0
      ]
    },
    "level": 5,
    "name": "Anti-Transplanage",
    "incantation": "",
    "description": "Empêche une personne de se téléporter en utilisant le transplanage. Durée : Variable (heures) Formule extrême : durée variable (jours)",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Corps"
  },
  "198": {
    "id": 198,
    "modifiers": {
      "primary": [
        2,
        7
      ],
      "secondary": [
        2,
        2
      ]
    },
    "level": 6,
    "name": "Portoloin",
    "incantation": "Portus",
    "description": "Permet de changer un objet (généralement anodin et usagé pour ne pas attirer l’attention) en Portoloin. Il suffit alors de toucher d'un seul doigt le Portoloin à l'heure prévue par le lanceur de sort pour être transporté immédiatement à l'endroit prévu. Résistance : aucune",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Terre",
    "secondaryElement": "Terre"
  }
};