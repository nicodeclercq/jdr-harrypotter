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
  score: number;
};

const cardsDefinition = {
  Attaque: [
    {
      title: ["Combat"],
      relatedSkill: "Combat",
      probability: "very-high",
    },
    {
      title: ["Coup de poing dans la mâchoire", "Coup de poing dans les côtes"],
      relatedSkill: "Combat",
      probability: "medium",
    },
    {
      title: ["Coup de pied dans le ventre", "Coup de pied dans les jambes"],
      relatedSkill: "Combat",
      probability: "medium",
    },
    {
      title: ["Coup dans les parties intimes"],
      relatedSkill: "Combat",
      probability: "medium",
    },
    {
      title: [
        "Utilisation d'une arme de corps à corps",
        "Utilisation d'une arme à distance",
      ],
      relatedSkill: "Combat",
      probability: "medium",
    },
    {
      title: ["Utiliser la magie"],
      relatedSkill: "Connaissances",
      probability: "medium",
    },
    {
      title: ["Athlétisme"],
      relatedSkill: "Athlétisme",
      probability: "very-high",
    },
    {
      title: ["Lancer d'objet"],
      relatedSkill: "Athlétisme",
      probability: "medium",
    },
    {
      title: ["Intimidation"],
      relatedSkill: "Intimidation",
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
      probability: "medium",
    },
    {
      title: ["Discrétion"],
      relatedSkill: "Discrétion",
      probability: "very-high",
    },
    {
      title: ["Attaque surprise", "Attaque dans le dos", "Attaque furtive"],
      relatedSkill: "Discrétion",
      probability: "medium",
    },
    {
      title: ["Subtiliser un objet", "Vol à la tire"],
      relatedSkill: "Discrétion",
      probability: "high",
    },
    {
      title: ["Riposte", "Contre-Attaque"],
      relatedSkill: "Survie / Instinct",
      condition: "En réaction d'une Attaque",
      probability: "high",
    },
    {
      title: ["Survie / Instinct"],
      relatedSkill: "Survie / Instinct",
      probability: "very-high",
    },
  ],
  Défense: [
    {
      title: ["Combat"],
      relatedSkill: "Combat",
      probability: "very-high",
    },
    {
      title: ["Parade", "Esquiver une Attaque", "Se protéger"],
      condition: "En réaction d'une Attaque sur le joueur",
      relatedSkill: "Combat",
      probability: "high",
    },
    {
      title: ["Bloquer une Attaque", "Dévier une Attaque"],
      condition: "En réaction d'une Attaque",
      relatedSkill: "Combat",
      probability: "high",
    },
  ],
  Déplacement: [
    {
      title: ["Retraite"],
      relatedSkill: "Survie / Instinct",
      probability: "medium",
    },
    {
      title: ["Regroupement"],
      relatedSkill: "Survie / Instinct",
      probability: "medium",
    },
    {
      title: ["Sauter par dessus un obstacle"],
      relatedSkill: "Athlétisme",
      probability: "medium",
    },
    {
      title: ["Gravir un mur", "Escalader un mur", "Grimper sur un objet"],
      relatedSkill: "Athlétisme",
      probability: "medium",
    },
    {
      title: ["Se précipiter"],
      relatedSkill: "Athlétisme",
      probability: "medium",
    },
    {
      title: ["Se cacher"],
      relatedSkill: "Discrétion",
      probability: "medium",
    },
    {
      title: ["Passe-passe"],
      relatedSkill: "Passe-passe",
      probability: "very-high",
    },
    {
      title: ["Dissimuler une arme"],
      relatedSkill: "Passe-passe",
      probability: "medium",
    },
    {
      title: ["Créer une diversion", "Lancer un objet pour distraire"],
      relatedSkill: "Passe-passe",
      probability: "medium",
    },
    {
      title: ["Sabotage"],
      relatedSkill: "Passe-passe",
      probability: "low",
    },
    {
      title: ["Bricolage"],
      relatedSkill: "Bricolage",
      probability: "very-high",
    },
    {
      title: ["Poser des pièges", "Créer un obstacle"],
      relatedSkill: "Bricolage",
      probability: "very-low",
    },
    {
      title: ["Récupérer un objet", "Fouiller un cadavre"],
      relatedSkill: "Passe-passe",
      probability: "high",
    },
  ],
  Parler: [
    {
      title: ["Convaincre"],
      relatedSkill: "Convaincre",
      probability: "very-high",
    },
    {
      title: ["Lancer un ordre", "Donner un conseil"],
      relatedSkill: "Convaincre",
      probability: "medium",
    },
    {
      title: ["Psychologie"],
      relatedSkill: "Psychologie",
      probability: "very-high",
    },
    {
      title: ["Insulte", "Moquerie", "Lancer un défi"],
      relatedSkill: "Psychologie",
      probability: "medium",
    },
    {
      title: ["Crier une alerte"],
      relatedSkill: "Survie / Instinct",
      condition: "Lors d'une Attaque surprise",
      probability: "medium",
    },
    {
      title: ["Négociation", "Marchandage", "Faire une proposition"],
      relatedSkill: "Convaincre",
      probability: "medium",
    },
    {
      title: ["Demander de l'aide", "Faire appel à un allié"],
      relatedSkill: "Convaincre",
      probability: "medium",
    },
    {
      title: ["Mentir"],
      relatedSkill: "Mentir",
      probability: "very-high",
    },
    {
      title: ["Feindre une rédition", "Demander une trêve"],
      relatedSkill: "Mentir",
      probability: "medium",
    },
    {
      title: ["Prétendre être un allié", "Se faire passer pour un autre"],
      relatedSkill: "Mentir",
      probability: "medium",
    },
    {
      title: ["Feindre la peur", "Se faire passer pour un lâche"],
      relatedSkill: "Mentir",
      probability: "low",
    },
    {
      title: ["Dissimuler ses forces"],
      relatedSkill: "Mentir",
      probability: "medium",
    },
    {
      title: [
        "Simuler une possession",
        "Se faire passer pour un fou",
        "Simuler une maladie contagieuse",
      ],
      relatedSkill: "Mentir",
      probability: "low",
    },
  ],
  Soin: [
    {
      title: ["Médecine"],
      relatedSkill: "Médecine",
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
      probability: "medium",
    },
    {
      title: ["Stabiliser un allié inconscient"],
      relatedSkill: "Médecine",
      probability: "very-low",
    },
    {
      title: ["Administrer un antidote", "Soigner un poison"],
      relatedSkill: "Médecine",
      probability: "low",
    },
    {
      title: ["Administrer un stimulant", "Réveiller un allié inconscient"],
      relatedSkill: "Médecine",
      probability: "low",
    },
    {
      title: ["Masquer la douleur", "Donner un second souffle"],
      relatedSkill: "Médecine",
      probability: "low",
    },
    {
      title: ["Retirer un objet planté"],
      relatedSkill: "Médecine",
      probability: "medium",
    },
  ],
  Création: [
    {
      title: ["Réparer un objet", "Rafistoler un objet"],
      relatedSkill: "Bricolage",
      probability: "medium",
    },
    {
      title: ["Improviser une arme"],
      relatedSkill: "Bricolage",
      probability: "high",
    },
    {
      title: ["Renforcer une structure"],
      relatedSkill: "Bricolage",
      probability: "medium",
    },
    {
      title: ["Fabriquer des munitions"],
      relatedSkill: "Bricolage",
      probability: "medium",
    },
  ],
  Analyse: [
    {
      title: ["Connaissances"],
      relatedSkill: "Connaissances",
      probability: "very-high",
    },
    {
      title: ["Force décuplée"],
      relatedSkill: "Survie / Instinct",
      condition: "Lorsque le joueur est blessé ou acculé",
      probability: "medium",
    },
    {
      title: ["Observer", "Analyser"],
      relatedSkill: "Survie / Instinct",
      probability: "medium",
    },
    {
      title: ["Calculer une trajectoire", "Estimer une distance"],
      relatedSkill: "Connaissances",
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
      probability: "low",
    },
    {
      title: ["Reconnaitre un subterfuge", "Déjouer un piège"],
      relatedSkill: "Connaissances",
      condition: "Lors d'une Attaque surprise",
      probability: "low",
    },
    {
      title: ["Prévoir une Attaque"],
      relatedSkill: "Connaissances",
      probability: "medium",
    },
    {
      title: ["Regain d'énergie", "Se ressaisir", "Motiver les troupes"],
      relatedSkill: "Psychologie",
      probability: "medium",
    },
    {
      title: ["Déduire la prochaine action de l'opposant"],
      relatedSkill: "Psychologie",
      condition: "Lors d'une Attaque",
      probability: "medium",
    },
    {
      title: ["Conivence", "Esprit d'équipe", "Coordination"],
      relatedSkill: "Psychologie",
      probability: "medium",
    },
    {
      title: ["Faire faire une action à son animal de compagnie"],
      relatedSkill: "dressage",
      probability: "medium",
    },
    {
      title: ["Trouver le point faible d'un vêtement"],
      relatedSkill: "rapiécer",
      probability: "medium",
    },
    {
      title: ["Exploser les fenêtres"],
      relatedSkill: "Vitrailliste",
      probability: "medium",
    },
    {
      title: ["Devenir antipathique pour attirer les ennemis"],
      relatedSkill: "Percepteur d'Impôts",
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
