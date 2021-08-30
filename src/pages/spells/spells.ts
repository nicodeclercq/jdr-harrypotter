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
    "description": "Permet de rendre un objet ou obstacle moue (supprime les éventuels dégâts de collision). Durée : variable (heures) Formule extrême : -",
    "targets": {
      "Animal": false,
      "Object": true,
      "Person": false,
      "Plant": false
    },
    "primaryElement": "Air",
    "secondaryElement": "Terre"
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
    "description": "Permet de faire pivoter des objets d’une taille maximale de POU m3 Durée : - Formule extrême : -",
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
    "description": "Sort de ligotage, pour se libérer, la cible doit réussir un jet en opposition (POU/DEX). Durée : permanenteFormule extrême : le jet de DEX pour se libérer se fait avec un malus de 2 points",
    "targets": {
      "Animal": false,
      "Object": false,
      "Person": true,
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
    "incantation": "Inverto",
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
    "description": "Ce maléfice sert à faire lâcher prise par brulure. Durée : -Formule extrême : -",
    "targets": {
      "Animal": true,
      "Object": false,
      "Person": true,
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
    "description": "Permet de modifier les conditions atmosphériques alentours pour que celle-ci reviennent à la normale. Contre les effet de Meteorribilis.Durée : -Formule extrême : -",
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
      "Person": false,
      "Plant": true
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
};