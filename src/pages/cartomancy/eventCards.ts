
export type CardType = 'combat' | 'knowledge' | 'social' | 'future';

export type EventCard = {
  title: string;
  description: string;
  condition?: string;
  drawback?: string;
  image?: CardType;
};

export const eventCards: EventCard[] = [
  {
    title: "Un air de déjà vu...",
    description: "Quelque chose ici me rappelle un vieux souvenir. Augmentez votre perception de 20% pendant une heure.",
    image: "knowledge",
  }, {
    title: "Mais pourquoi êtes-vous si méchant?",
    description: "Après un test de mentir/convaincre réussi faites perdre un tour d'action à votre opposant en lui faisant révéler son plan machiavélique.",
    image: "combat",
  }, {
    title: "Ah! Vous ici.",
    description: "Il y a une autre équipe par ici. Elle a ses propres objectifs, et n'est pas nécessairement prete à vous aider.",
  }, {
    title: "À trois on y va: Un...Deux...",
    description: "Jouez après la fin de votre tour pour vous donner immédiatement à vous-même ou à un autre coéquipier une action supplémentaire.",
    image: "combat",
  }, {
    title: "J'étais acrobate dans une autre vie...",
    description: "Lorsque vous êtes visé par une attaque à distance effectuez un jet d'Acrobatie. En cas de Réussite, l'attaque touche quelqu'un de votre choix le long du chemin. Si vous échouez, l'attaque vous touche et vous tombez au sol.",
    image: "combat",
  }, {
    title: "La meilleure défense c'est de ne pas se faire toucher!",
    description: "Vous et vos coéquipiers gagnez +20 en esquive jusqu'à ce que l'un d'entre vous soit touché.",
    image: "combat",
  }, {
    title: "Faites moi confiance ça va bien se passer...",
    description: "Un ennemi réagit bizarrement à votre présence. Tout pouvoir que vous réussissez à activer sur lui le rend vulnérable.",
    image: "social",
  }, {
    title: "Trop c'est trop!",
    description: "Doublez les dégats infligés.",
    image: "combat",
  }, {
    title: "On se connait non?",
    description: "Ajoutez 20% à tous vos jets mentir/convaincre pendant la durée de la scène en cours.",
    image: "social",
  }, {
    title: "Je me reléverais encore et encore!",
    description: "Ignorer les pénalités de Blessure ou de Fatigue jusqu'à la fin de la scène. Vous devez ensuite effectuer un jet de Vigueur (avec pénalités !) pour éviter de subir d'autre blessure ou un niveau supplémentaire de fatigue.",
    image: "combat",
  }, {
    title: "La meilleure défense c'est encore l'attaque",
    description: "Vous et tous vos coéquipiers ajoutez 20% à toutes les attaques et tests physiques jusqu'à ce que l'un d'entre vous soit touché.",
    image: "combat",
  }, {
    title: "Une main secourable.",
    description: "Lorsqu'un coéquipier fait un jet de compétence, ajoutez un D100 % à ses chances de réussites.",
    image: "social",
  }, {
    title: "Juste... un petit peu plus...",
    description: "À jouer lors d'un départ en voyage pour gagner 20% à tous les tests de prévention de la Fatigue.",
  }, {
    title: "Donne la papate, donne!",
    description: "Jouez pour que les animaux acceptent votre présence. Ils n'attaqueront pas si vous n'attaquez pas le premier.",
  }, {
    title: "Même pas mal!",
    description: "Lorsque vous recevez des dégâts divisez les par deux (arrondi à l'infèrieur).",
    image: "combat",
  }, {
    title: "J'ai ça dans le sac",
    description: "Vous fouillez un peu dans votre sac pour trouver un outil, une pièce de quincaillerie, un produit alimentaire ou autre, pour autant qu'il y ait la moindre chance qu'il soit là.",
  }, {
    title: "Tout est dans le manuel",
    description: "Lorsque vous rencontrez une nouvelle créature, un nouvel objet ou un nouvel endroit. Le MJ vous indique un détail important dont vous vous souvenez à son sujet.",
    image: "knowledge",
  }, {
    title: "J'ai lu quelque chose à ce sujet",
    description: "Vous avez lu quelque chose sur une créature que vous êtes en train de combattre. Vous connaissez l'une de ses faiblesses, ou si elle n'en a aucune, ajoutez désormais 20% à vos attaques contre ce type de créature.",
    image: "knowledge",
  }, {
    title: "Au suivant!",
    description: "Après avoir terrassé un ennemi avec une attaque à distance, vous pouvez immédiatement effectuer une autre attaque de ce type contre une nouvelle cible, en tant qu'action libre.",
    image: "combat",
  }, {
    title: "Parlons-en",
    description: "Faite un test de mentir/convaincre pour forcer la cible à prendre vos paroles au sérieux et à vous répondre.",
    image: "social",
  }, {
    title: "Je me suis justement renseigné avant de partir!",
    description: "Savoir ce que l'on sait sur une personne ou une organisation que vous avez récemment rencontrée. (limité par l'approbation du MJ)",
    image: "knowledge",
  }, {
    title: "Ma baguette me répond au doigt et à l'oeil",
    description: "Ce tour, vous n'avez aucune pénalité sur tous vos jets de sort.",
  }, {
    title: "Mon grand père me racontait cette histoire...",
    description: "Jouez cette carte pour que le MJ vous explique comment un groupe précédent a rencontré et résolu une situation similaire à celle à laquelle vous êtes confronté.",
    image: "knowledge",
  }, {
    title: "Un ami m'a appris cette astuce",
    description: "Jouez pour bénéficier de n'importe quel avantage, quelles que soient les exigences, pour le reste de la session.",
    image: "knowledge",
  }, {
    title: "Timing impecable",
    description: "Lors de ce tour de combat, vous agissez quand vous le désirez vous pouvez même interrompre l'action de quelqu'un d'autre pour réaliser votre action. Tous vos jets ont un bonus de 10%",
    image: "combat",
  }, {
    title: "Pfiou, c'était limite!",
    description: "Ignorez les dégâts d'une attaque. Votre baguette a subi le plus gros du choc, et vous effectuez des jets à -10% jusqu'à ce qu'elle soit réparée.",
    image: "combat",
  }, {
    title: "Je sais faire ça moi?",
    description: "Gagnez un nouveau pouvoir jusqu'à la fin de la scène.",
  }, {
    title: "Woho! On se calme...",
    description: "Lorsqu'une situation sociale devient hostile. Vous obtenez 20% sur un dernier jet de mentir/convaincre pour essayer d'empêcher l'escalade.",
    image: "social",
  }, {
    title: "Non ne meurt pas Boby, souvient toi quand on allait jouer ensemble dans la rivière...",
    description: "Empêchez quelqu'un de mourir. Elle reste dans un état stable, mais seulement pour une ou deux minutes de plus.",
  }, {
    title: "Des pouvoirs phénoménaux!!!",
    description: "Lorsque vous lancez un sort de destruction. Vous obtenez +20% à vos jets et vous infligez des dégâts doubles. Vous devez ensuite faire un jet de Vigueur ou prendre un niveau de Fatigue.",
    image: "combat",
  }, {
    title: "Vite fuyons!!!",
    description: "Vous pouvez déplacer vers n'importe quel endroit de la mélée, sans tenir compte de ce qui se trouve sur le chemin, et en ignorant le fait de se retirer de la mêlée.",
    image: "combat",
  }, {
    title: "Allez vas-y Jojo!!!",
    description: "Donnez un bonus de 20% à un coéquipier pour n'importe quel jet.",
    image: "social",
  }, {
    title: "Je me souviens, c'était dans le journal du 10 juin 1932...",
    description: "Vous vous souvenez de certaines rumeurs ou vous remarquez un indice sur le thème ou les piéges dans votre voisinage. Le MJ vous dira quoi",
    image: "knowledge",
  }, {
    title: "Vous m'en devez une!",
    description: "Lors d'une rencontre avec une personne d'importance. Cette personne doit une faveur à votre groupe de manière plus ou moins directs!",
    image: "social",
  }, {
    title: "Là ça devient ingérable...",
    description: "Pendant un conflit entre le groupe et certains ennemis faites apparaître et impliquer une tierce partie (au choix du MJ).",
    image: "combat",
  }, {
    title: "Le moment de briller est venue.",
    description: "Augmentez vos chances de réussites de 10% pour tous vos jets jusqu'à la fin de la scène.",
  }, {
    title: "Vous n'avez rien vu venir!",
    description: "Au début du combat déclarez qu'une créature que vous affrontez est touchée par l'un de vos sorts. Vous pouvez tirer et jouer une autre carte imédiatement.",
    image: "combat",
  }, {
    title: "Vous ne pouvez pas vous en prendre à quelqu'un de votre taille?",
    description: "Lorsqu'un coéquipier échoue à se défendre forcez l'ennemi à relancer, cette fois en vous ciblant. Si le jet est réussi personne ne reçoit de dégat, en cas d'échec chacun prend la moitié des dégâts.",
    image: "combat",
  }, {
    title: "Coup du sort.",
    description: "Après avoir obtenu un échec critique au lieu d'un échec vous réussissez l'action. Le MJ peut faire de même pour un de ses PNJ plus tard dans la session.",
  }, {
    title: "Surcharge de vitalité.",
    description: "Lorsque vous êtes sur le point de tomber inconscient, vous gagnez 20% sur tous les jets jusqu'à la fin de votre prochain tour avant de tomber.",
    image: "combat",
  }, {
    title: "Fais gaffe!",
    description: "lorsqu'un coéquipier proche est touché par une attaque pour s'interposer. Le jet de dégâts est effectué contre vous, avec un malus de -2.",
    image: "combat",
  }, {
    title: "Marché noir.",
    description: "En arrivant dans un nouvel endroit vous savez qu'il y a une boutique particulièrement intéressante. Celle-ci contient deux fois plus d'objets et ne connait aucune pénurie.",
    image: "knowledge",
  }, {
    title: "Bien équipé",
    description: "Obtenez un objet ou service auprès de quelqu'un sans avoir besoin de le convaincre ou de l'acheter.",
    image: "social",
  }, {
    title: "Tu ne devrais pas être au zoo toi?",
    description: "Une bête féroce apparait sur la scène et elle n'a pas l'air commode... Il va falloir réagir rapidement.",
  }, {
    title: "Défaut de conception",
    description: "Ce mur n'était pas si solide qu'il en avait l'air... Après une action d'un PJ ou PNJ sur ce mur celui-ci commence à s'éfondrer... Mieux vaut ne pas rester dans le coin.",
  }, {
    title: "J'ai glissé chef!",
    description: "Aggravez les choses : des renforts arrivent chez l'ennemi ; le pont s'effondre sous vous ; votre balai s'enflamme ; etc. C'est le MJ qui décide. Tous les joueurs reçoivent un bonus de 20%, et vous pouvez tirer et jouer une autre carte imédiatement.",
    image: "combat",
  }, {
    title: "On se croirait en Bretagne!",
    description: "La météo n'est vraiment pas de la partie. Un soudain évènement climatique perturbe la situation actuelle (Au MJ de décider laquelle)",
  }, {
    title: "Oups! J'avais oublié ce rendez-vous!",
    description: "Votre interlocuteur se souvient soudain d'un rendez-vous d'une grande importance et doit s'éclipser immédiatement.",
    image: "social",
  }, {
    title: "Tiens, c'est jolie cette fumée au dessus du volcan",
    description: "Une catastrophe naturelle d'envergure vient perturber la partie (Au MJ de décider laquelle). Il ne reste probablement qu'une seule alternative: la fuite.",
  }, {
    title: "Je le savais!",
    description: "L'avenir n'a pas de secret pour vous. Retournez 5 minutes en arrière dans le scénario, votre personnage est le seul à connaitre ce future qui se déroulera tel quel si vous ne trouvez rien qui pourrait enrayer le cours des évènements.",
    image: "future",
  }, {
    title: "Je le savais!",
    description: "L'avenir n'a pas de secret pour vous. Retournez 5 minutes en arrière dans le scénario, votre personnage est le seul à connaitre ce future qui se déroulera tel quel si vous ne trouvez rien qui pourrait enrayer le cours des évènements.",
    image: "future",
  }, {
    title: "Je le savais!",
    description: "L'avenir n'a pas de secret pour vous. Retournez 5 minutes en arrière dans le scénario, votre personnage est le seul à connaitre ce future qui se déroulera tel quel si vous ne trouvez rien qui pourrait enrayer le cours des évènements.",
    image: "future",
  }, {
    title: "Je le savais!",
    description: "L'avenir n'a pas de secret pour vous. Retournez 5 minutes en arrière dans le scénario, votre personnage est le seul à connaitre ce future qui se déroulera tel quel si vous ne trouvez rien qui pourrait enrayer le cours des évènements.",
    image: "future",
  }, {
    title: "Je le savais!",
    description: "L'avenir n'a pas de secret pour vous. Retournez 5 minutes en arrière dans le scénario, votre personnage est le seul à connaitre ce future qui se déroulera tel quel si vous ne trouvez rien qui pourrait enrayer le cours des évènements.",
    image: "future",
  }, {
    title: "Je le savais!",
    description: "L'avenir n'a pas de secret pour vous. Retournez 5 minutes en arrière dans le scénario, votre personnage est le seul à connaitre ce future qui se déroulera tel quel si vous ne trouvez rien qui pourrait enrayer le cours des évènements.",
    image: "future",
  }, {
    title: "Je le savais!",
    description: "L'avenir n'a pas de secret pour vous. Retournez 5 minutes en arrière dans le scénario, votre personnage est le seul à connaitre ce future qui se déroulera tel quel si vous ne trouvez rien qui pourrait enrayer le cours des évènements.",
    image: "future",
  }, {
    title: "Je le savais!",
    description: "L'avenir n'a pas de secret pour vous. Retournez 5 minutes en arrière dans le scénario, votre personnage est le seul à connaitre ce future qui se déroulera tel quel si vous ne trouvez rien qui pourrait enrayer le cours des évènements.",
    image: "future",
  }, 
];
