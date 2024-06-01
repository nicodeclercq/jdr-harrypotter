import { v4 as uid } from "uuid";
import { comprehension } from "fp-ts/Array";

const categories = [
  "Attaque",
  "Défense",
  "Déplacement",
  "Parler",
  "Soin",
  "Création",
  "Analyse",
] as const;
type Category = (typeof categories)[number];
type CardDefinition = {
  title: string[];
  condition?: string;
  relatedSkill: string;
  consequences: string;
  probability: "very-low" | "low" | "medium" | "high" | "very-high";
};
const probability = {
  "very-low": 1,
  low: 2,
  medium: 5,
  high: 8,
  "very-high": 12,
} as const satisfies Record<CardDefinition["probability"], number>;

export type Card = {
  id: string;
  category: Category;
  title: string;
  condition: string;
  relatedSkill: string;
  consequences: string;
  score: number;
};

const cardsDefinition = {
  Attaque: [
    {
      title: ["Combat"],
      relatedSkill: "Combat",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Coup de poing dans la mâchoire", "Coup de poing dans les côtes"],
      relatedSkill: "Combat",
      consequences: "L'opposant est sonné et ne peut plus agir pendant 1 tour",
      probability: "medium",
    },
    {
      title: ["Coup de pied dans le ventre", "Coup de pied dans les jambes"],
      relatedSkill: "Combat",
      consequences: "L'opposant tombe au sol",
      probability: "medium",
    },
    {
      title: ["Coup dans les parties intimes"],
      relatedSkill: "Combat",
      consequences:
        "L'opposant se roule au sol et ne peux plus agir pendant 2 tours",
      probability: "medium",
    },
    {
      title: [
        "Utilisation d'une arme de corps à corps",
        "Utilisation d'une arme à distance",
      ],
      relatedSkill: "Combat",
      consequences:
        "L'opposant subit des dégâts équivalents à la puissance de l'arme",
      probability: "medium",
    },
    {
      title: ["Utiliser la magie"],
      relatedSkill: "Connaissances",
      consequences: "L'opposant subit les effets du sort",
      probability: "medium",
    },
    {
      title: ["Athlétisme"],
      relatedSkill: "Athlétisme",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Lancer d'objet"],
      relatedSkill: "Athlétisme",
      consequences:
        "En fonction de l'objet jeté, l'opposant subit des dégâts, tombe au sol, est sonné, ...",
      probability: "medium",
    },
    {
      title: ["Intimidation"],
      relatedSkill: "Intimidation",
      consequences: "",
      probability: "very-high",
    },
    {
      title: [
        "Moulinet avec une arme de corps à corps",
        "Lancer un cri de guerre",
        "Fixer l'opposant dans les yeux",
        "Se mettre en garde",
        "Se mettre en position de combat",
        "Exhiber une arme",
        "Faire preuve d'insensibilité",
      ],
      relatedSkill: "Intimidation",
      consequences:
        "L'opposant recule de 2 pas et ne peut plus attaquer pendant 1 tour",
      probability: "medium",
    },
    {
      title: ["Discrétion"],
      relatedSkill: "Discrétion",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Attaque surprise", "Attaque dans le dos", "Attaque furtive"],
      relatedSkill: "Discrétion",
      consequences:
        "L'opposant subit des dégâts équivalents à la puissance de l'arme",
      probability: "medium",
    },
    {
      title: ["Subtiliser un objet", "Vol à la tire"],
      relatedSkill: "Discrétion",
      consequences:
        "Le joueur récupère un objet sur l'opposant qui pourra être utilisé pour une action future. L'objet doit être petit et non tenue en main.",
      probability: "high",
    },
    {
      title: ["Riposte", "Contre-Attaque"],
      relatedSkill: "Survie / Instinct",
      condition: "En réaction d'une Attaque",
      consequences:
        "L'opposant subit des dégâts équivalents à la puissance de l'arme",
      probability: "high",
    },
    {
      title: ["Survie / Instinct"],
      relatedSkill: "Survie / Instinct",
      consequences: "",
      probability: "very-high",
    },
  ],
  Défense: [
    {
      title: ["Combat"],
      relatedSkill: "Combat",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Parade", "Esquiver une Attaque", "Se protéger"],
      condition: "En réaction d'une Attaque sur le joueur",
      relatedSkill: "Combat",
      consequences: "Le joueur ne subit aucun dégâts",
      probability: "high",
    },
    {
      title: ["Bloquer une Attaque", "Dévier une Attaque"],
      condition: "En réaction d'une Attaque",
      relatedSkill: "Combat",
      consequences: "La cible ne subit aucun dégâts",
      probability: "high",
    },
  ],
  Déplacement: [
    {
      title: ["Retraite"],
      relatedSkill: "Survie / Instinct",
      consequences:
        "Le joueur se retire du combat sans subir d'Attaque de la part de l'opposant",
      probability: "medium",
    },
    {
      title: ["Regroupement"],
      relatedSkill: "Survie / Instinct",
      consequences: "Le joueur rejoint l'un de ses compagnons",
      probability: "medium",
    },
    {
      title: ["Sauter par dessus un obstacle"],
      relatedSkill: "Athlétisme",
      consequences: "Le joueur se retrouve de l'autre côté de l'obstacle",
      probability: "medium",
    },
    {
      title: ["Gravir un mur", "Escalader un mur", "Grimper sur un objet"],
      relatedSkill: "Athlétisme",
      consequences: "Le joueur se retrouve en hauteur",
      probability: "medium",
    },
    {
      title: ["Se précipiter"],
      relatedSkill: "Athlétisme",
      consequences:
        "Le joueur se déplace rapidement et peut faire une seconde action dans la foulée",
      probability: "medium",
    },
    {
      title: ["Se cacher"],
      relatedSkill: "Discrétion",
      consequences:
        "Le joueur trouve un endroit où se cacher et s'y glisse sans être vu s'il est à portée",
      probability: "medium",
    },
    {
      title: ["Passe-passe"],
      relatedSkill: "Passe-passe",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Dissimuler une arme"],
      relatedSkill: "Passe-passe",
      consequences:
        "Le joueur cache discrétement une arme sur lui sans être vu s'il est à portée, il pourra l'utiliser lors d'une prochaine action qui deviendra une Attaque surprise",
      probability: "medium",
    },
    {
      title: ["Créer une diversion", "Lancer un objet pour distraire"],
      relatedSkill: "Passe-passe",
      consequences:
        "Le joueur attire l'attention de l'opposant sur un autre point que lui",
      probability: "medium",
    },
    {
      title: ["Sabotage"],
      relatedSkill: "Passe-passe",
      consequences:
        "Le joueur fragilise un objet ou une structure qui pourra être utilisé pour une action future",
      probability: "low",
    },
    {
      title: ["Bricolage"],
      relatedSkill: "Bricolage",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Poser des pièges", "Créer un obstacle"],
      relatedSkill: "Bricolage",
      consequences:
        "Le joueur pose un piège ou un obstacle qui ralentira ou blessera l'opposant",
      probability: "very-low",
    },
    {
      title: ["Récupérer un objet", "Fouiller un cadavre"],
      relatedSkill: "Passe-passe",
      consequences:
        "Le joueur récupère un objet sur place qui pourra être utilisé pour une action future",
      probability: "high",
    },
  ],
  Parler: [
    {
      title: ["Convaincre"],
      relatedSkill: "Convaincre",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Lancer un ordre", "Donner un conseil"],
      relatedSkill: "Convaincre",
      consequences:
        "Le joueur jouera une de ses cartes à la place d'un autre joueur qui réalisera l'action",
      probability: "medium",
    },
    {
      title: ["Psychologie"],
      relatedSkill: "Psychologie",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Insulte", "Moquerie", "Lancer un défi"],
      relatedSkill: "Psychologie",
      consequences:
        "L'opposant perd son sang-froid et ne peut qu'attaquer le personnage",
      probability: "medium",
    },
    {
      title: ["Crier une alerte"],
      relatedSkill: "Survie / Instinct",
      condition: "Lors d'une Attaque surprise",
      consequences:
        "Le joueur prévient ses compagnons d'un danger imminent, l'effet de surprise est annulé",
      probability: "medium",
    },
    {
      title: ["Négociation", "Marchandage", "Faire une proposition"],
      relatedSkill: "Convaincre",
      consequences:
        "Le joueur peut limiter l'action de l'opposant ou obtenir un avantage",
      probability: "medium",
    },
    {
      title: ["Demander de l'aide", "Faire appel à un allié"],
      relatedSkill: "Convaincre",
      consequences:
        "Le joueur fait venir à lui un allié qui l'aidera dans la suite de l'action (sans que celui-ci n'ai besoin de jouer une carte)",
      probability: "medium",
    },
    {
      title: ["Mentir"],
      relatedSkill: "Mentir",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Feindre une rédition", "Demander une trêve"],
      relatedSkill: "Mentir",
      consequences:
        "L'opposant n'attaquera pas le joueur tant qu'il lui obéit et qu'il n'Attaque plus",
      probability: "medium",
    },
    {
      title: ["Prétendre être un allié", "Se faire passer pour un autre"],
      relatedSkill: "Mentir",
      consequences:
        "L'opposant n'attaquera pas le joueur tant qu'il ne l'Attaque pas non plus et qu'il agit comme un allié (Ne fonctionne pas si l'opposant connait le joueur ou qu'il se méfie de lui)",
      probability: "medium",
    },
    {
      title: ["Feindre la peur", "Se faire passer pour un lâche"],
      relatedSkill: "Mentir",
      consequences:
        "L'opposant ne considère plus le joueur comme une menace et ne l'attaquera pas ou le sous-estimera",
      probability: "low",
    },
    {
      title: ["Dissimuler ses forces"],
      relatedSkill: "Mentir",
      consequences:
        "L'opposant ne connait pas les capacités du joueur et devient prudent",
      probability: "medium",
    },
    {
      title: [
        "Simuler une possession",
        "Se faire passer pour un fou",
        "Simuler une maladie contagieuse",
      ],
      relatedSkill: "Mentir",
      consequences: "L'opposant est déstabilisé et hésite à attaquer le joueur",
      probability: "low",
    },
  ],
  Soin: [
    {
      title: ["Médecine"],
      relatedSkill: "Médecine",
      consequences: "",
      probability: "very-high",
    },
    {
      title: [
        "Utilisation d'une potion de Soin",
        "Appliquer un bandage",
        "Appliquer un onguent",
        "Utiliser un kit de Soin",
      ],
      relatedSkill: "Médecine",
      consequences: "Le joueur regagne des points de vie",
      probability: "medium",
    },
    {
      title: ["Stabiliser un allié inconscient"],
      relatedSkill: "Médecine",
      consequences: "L'état de l'allié inconscient ne se dégrade plus",
      probability: "very-low",
    },
    {
      title: ["Administrer un antidote", "Soigner un poison"],
      relatedSkill: "Médecine",
      consequences: "L'allié ne subit plus de dégâts liés au poison",
      probability: "low",
    },
    {
      title: ["Administrer un stimulant", "Réveiller un allié inconscient"],
      relatedSkill: "Médecine",
      consequences: "L'allié regagne des points de vie et peut agir à nouveau",
      probability: "low",
    },
    {
      title: ["Masquer la douleur", "Donner un second souffle"],
      relatedSkill: "Médecine",
      consequences: "L'allié peut agir comme s'il n'avait pas de blessure",
      probability: "low",
    },
    {
      title: ["Retirer un objet planté"],
      relatedSkill: "Médecine",
      consequences: "L'allié ne subit plus de dégâts liés à l'objet",
      probability: "medium",
    },
  ],
  Création: [
    {
      title: ["Réparer un objet", "Rafistoler un objet"],
      relatedSkill: "Bricolage",
      consequences: "L'objet est de nouveau fonctionnel mais plus fragile",
      probability: "medium",
    },
    {
      title: ["Improviser une arme"],
      relatedSkill: "Bricolage",
      consequences: "L'objet devient une arme relativement efficace",
      probability: "high",
    },
    {
      title: ["Renforcer une structure"],
      relatedSkill: "Bricolage",
      consequences: "L'objet devient plus résistant",
      probability: "medium",
    },
    {
      title: ["Fabriquer des munitions"],
      relatedSkill: "Bricolage",
      consequences: "Le joueur récupère des munitions",
      probability: "medium",
    },
  ],
  Analyse: [
    {
      title: ["Connaissances"],
      relatedSkill: "Connaissances",
      consequences: "",
      probability: "very-high",
    },
    {
      title: ["Force décuplée"],
      relatedSkill: "Survie / Instinct",
      condition: "Lorsque le joueur est blessé ou acculé",
      consequences: "Le joueur gagne un bonus dans ses actions",
      probability: "medium",
    },
    {
      title: ["Observer", "Analyser"],
      relatedSkill: "Survie / Instinct",
      consequences:
        "Le joueur découvre une information sur l'environnement qui lui donnera un avantage lors d'une prochaine action",
      probability: "medium",
    },
    {
      title: ["Calculer une trajectoire", "Estimer une distance"],
      relatedSkill: "Connaissances",
      consequences:
        "Le joueur profite de son savoir pour ajuster son tir ou son déplacement",
      probability: "medium",
    },
    {
      title: [
        "Identifier une faiblesse",
        "Repérer un point faible",
        "Analyser les tactiques ennemies",
        "Reconnaitre les signes de fatigue",
      ],
      relatedSkill: "Connaissances",
      consequences:
        "Le joueur à un avantage sur l'opposant lors des prochaines actions",
      probability: "low",
    },
    {
      title: ["Reconnaitre un subterfuge", "Déjouer un piège"],
      relatedSkill: "Connaissances",
      condition: "Lors d'une Attaque surprise",
      consequences:
        "Le joueur évite un piège ou un subterfuge qui aurait pu lui être fatal",
      probability: "low",
    },
    {
      title: ["Prévoir une Attaque"],
      relatedSkill: "Connaissances",
      consequences:
        "Le joueur n'agit pas et prépare une double action lors du prochain tour",
      probability: "medium",
    },
    {
      title: ["Regain d'énergie", "Se ressaisir", "Motiver les troupes"],
      relatedSkill: "Psychologie",
      consequences:
        "Vous donnez de l'énergie à vos alliés qui peuvent jouer une carte supplémentaire",
      probability: "medium",
    },
    {
      title: ["Déduire la prochaine action de l'opposant"],
      relatedSkill: "Psychologie",
      condition: "Lors d'une Attaque",
      consequences:
        "Vous pouvez agir en réaction à l'opposant avant qu'il n'agisse",
      probability: "medium",
    },
    {
      title: ["Conivence", "Esprit d'équipe", "Coordination"],
      relatedSkill: "Psychologie",
      consequences:
        "Tous les joueurs agissent en même temps et peuvent jouer une carte supplémentaire",
      probability: "medium",
    },
  ],
} satisfies Record<Category, CardDefinition[]>;

const createCards = (card: CardDefinition, category: Category): Card[] =>
  new Array(probability[card.probability]).fill(null).flatMap(() =>
    card.title.map((title) => ({
      id: uid(),
      category,
      title,
      condition: card.condition ?? "-",
      relatedSkill: card.relatedSkill,
      consequences: card.consequences,
      score: 0,
    }))
  );

export const cards = comprehension(
  [
    Object.entries(cardsDefinition).reduce(function createCardsFromDefinition(
      acc,
      [category, cards]
    ) {
      cards.forEach((card) =>
        createCards(card, category as Category).forEach((card) =>
          acc.push(card)
        )
      );

      return acc;
    },
    [] as Card[]),
    [
      new Array(6).fill(1),
      new Array(5).fill(2),
      new Array(4).fill(3),
      new Array(3).fill(5),
      new Array(2).fill(8),
      new Array(1).fill(13),
    ].flat(),
  ],
  (card, score) => ({ ...card, id: `${card.id}${card.score}`, score })
).reduce(function groupCardsBySkill(acc, card) {
  if (!(card.relatedSkill in acc)) {
    acc[card.relatedSkill] = [];
  }
  acc[card.relatedSkill].push(card);

  return acc;
}, {} as Record<string, Card[]>);
