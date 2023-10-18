export const fumbles = [
  {
    name: "Faux mouvement !",
    description : "le personnage s’est luxé l’épaule. La douleur lancinante le lance et le gêne, jusqu’à ce qu’il soit soigné.",
    effets : "+10 à tous ses jets",
  },{
    name: "Cheville tordue !",
    description : "le personnage s’est foulé la cheville.",
    effets : "Il est ralenti.",
  },{
    name: "Et merde !",
    description : "Le personnage trébuche sur un \"truc\" par terre (un os dans un cimetière, une racine dans une forêt, etc.)  ou s’emmêle les pinceaux.",
    effets : "Il doit réussir un jet d’athlétisme ou tomber à terre.",
  },{
    name: "Aaaaaaaaah !",
    description : "Le personnage trébuche sur un \"truc\" par terre (un os dans un cimetière, une racine dans une forêt, etc.) ou se fait un croche pied et titube en voulant reprendre son équilibre.",
    effets : "Il bouge d’un nombre égal à sa vitesse dans une direction totalement aléatoire (jet D4 [Avant, Arrière, Gauche, Droite]) puis doit réussir un jet d’athlétisme pour ne pas tomber à terre.",
  },{
    name: "Oups ! Désolé…",
    description : "Emporté par son élan, le personnage frappe l’un de ses compagnons !",
    effets : "Le personnage refait un jet d’attaque. S’il réussit, il inflige des dégâts normaux à un allié proche (détermine de façon aléatoire si besoin).",
  },{
    name: "Putain, mais fais gaffe !",
    description : "Emporté par son élan, le personnage gêne l’un de ses camarades, ce qui annule l’action (simple ou de mouvement) qu’aurait voulu entreprendre ce dernier.",
    effets : "-",
  },{
    name: "Eh ho, le boulet ! Tu peux pas faire attention ?",
    description : "Emporté par son élan, le personnage gêne et distrait l’un de ses camarades, ce qui confère l’avantage de combat (+10) à tous les adversaires de ce camarade, que ce soit au corps-à-corps ou à distance.",
    effets : "-",
  },{
    name: "C’était quoi, ça ???",
    description : "Emporté par son élan, le personnage fait un mouvement aussi ample que ridicule.",
    effets : "Ledit mouvement confère l’avantage de combat (-10) à tous les ennemis présents sur le champ de bataille. Ses amis, gênés par tant de bouffonnerie, subissent un malus de +10 à leurs actions.",
  },{
    name: "Qui a éteint la lumière ?",
    description : "Le personnage est momentanément aveuglé. Son casque lui est tombé sur les yeux. Sa visière s’est rabattue. Sa cape s’est enroulée autour de sa tête. Il a pris un coup dans les yeux. Etc.",
    effets : "Il est aveuglé.",
  },{
    name: "Par le tourbillon de Wazaa !",
    description : "Dans un geste ample et théâtral, le personnage lâche son arme qui vole dans les airs. Quelle étrange technique martiale !",
    effets : "l’arme parcourt une distance de 2D4 mètres dans une direction aléatoire (jet D4 [Avant, Arrière, Gauche, Droite]). Si quelqu’un se trouve sur la trajectoire, il doit réussir un jet de réflexe ou prendre l’objet en pleine poire.",
  },{
    name: "poutainmaisvasybordeltouletouletoule !",
    description : "l’adrénaline booste notre héros qui en perd son latin. Ses propos sont totalement incompréhensibles.",
    effets : "Il ne peut plus communiquer pendant ce tour complet avec ses compagnons, ni en tant que personnage ni en tant que joueur (\"tu devrais te décaler d’une case sur ta droite\"). Si c’est un lanceur de sorts, il bafouille, s’énerve et n’arrive pas à prononcer ses incantations, formules magiques.",
  },{
    name: "Maman, j’veux pas mourir !",
    description : "le personnage est abasourdi par la fureur du combat. Tout ce sang partout. Toute cette violence ! Mais pourquoi tant de haine dans le monde… Bref, il est tétanisé.",
    effets : "état préjudiciable hébété pendant ce tour uniquement",
  },{
    name: "Non mais, t’as vu ce naze ?",
    description : "Le personnage fait une manœuvre tellement ridicule, incroyable, pathétique que tous ceux qui le voient sont interloqués, amis comme ennemis.",
    effets : "quiconque voit le personnage en action se retrouve distrait",
  },{
    name: "Hein ?",
    description : "Quelque chose attire l’attention du personnage : une tête qui vole (\"oooooh, il a été décapité\"), un ange qui passe, un lapin/rat/hobbit qui rentre dans son terrier, n’importe quoi !",
    effets : "Il est distrait et passe son tour.",
  },{
    name: "Tu vas voir de quoi je suis capaaable !",
    description : "Le personnage fait des mouvements tellement larges, tellement étendus qu’on voit venir son attaque à 10 km.",
    effets : "Sa cible bénéficie d’un bonus de -10 à toutes ses défenses pendant 1D6 tours.",
  },{
    name: "VOUS allez voir ce dont je suis capaaable !",
    description : "Le personnage fait des mouvements tellement larges, tellement étendus qu’on voit venir son attaque à 20 km ! C’est la \"loose\".",
    effets : "cette fois, ce sont tous les ennemis qui voient le personnage qui gagnent un bonus de -10 à toutes leurs défenses pendant 1D6 tours.",
  },{
    name: "Et hop !",
    description : "Quelle prestance ! Quelle audace ! Le personnage se dévoile, il ouvre les bras, écarte son bouclier, fait voler sa cape au vent (s’il en a une)… Bref, il fait une cible magnifique.",
    effets : "Tous les ennemis qui le voient ont -10 pendant ce tour pour le toucher.",
  },{
    name: "Si on chantait (x 3), la-lalala",
    description : "pour se donner du courage, le personnage se met à chanter fort et faux, ce qui déconcentre les lanceurs de sort (y compris le barde). Si le personnage est un lanceur de sort, la chanson lui revient en mémoire et tourne en boucle dans sa tête",
    effets : "+10 à tous les sortilèges, pendant 1D6 rounds.",
  },{
    name: "Qu’est-ce que tu dis ?",
    description : "Le personnage est tellement concentré sur son combat qu’il n’écoute pas ce que lui disent ses compagnons.",
    effets : "Au début de chaque tour, le joueur écrit au MJ ce que fait son perso. Puis il remet le papier au MJ qui en prend connaissance. Enfin, les autres joueurs entreprennent leurs actions, indépendamment du personnage",
  },{
    name: "Vous z’êtes où, les copains ?",
    description : "Emporté par le fracas de la bataille, ballotté en tous sens, le personnage est perdu. Il y a du monde partout qui crie et s’agite dans tous les sens. Ca court, il y a du liquide tout rouge qui fait glisser sur le sol… Mais où sont ses amis ?",
    effets : "Pas d’actions de groupe (ex : prise en tenaille) ni d’aide à un compagnon (boost, sort de soins) pendant 1D4 rounds.",
  },{
    name: "Zlip !",
    description : "Les mains du héros sont moites, glissantes. Sa prise est mal assurée.",
    effets : "+10 à ses tests de combat pendant 1d4 rounds",
  },{
    name: "We’re all brothers !",
    description: "Au moment de porter son coup, le personnage s’arrête. Pourquoi se battre ? Pourquoi tant de violence ? Regarde, ton sang est rouge, comme le mien (quoique !).",
    effets: "le personnage n’a plus le cœur à attaquer son ennemi. –20% à tous ses jets d’attaque contre cet ennemi seulement pour le reste de la rencontre."
  },{
    name: "We’re all brothers !",
    description: "Au moment de porter son coup, le personnage s’arrête. Pourquoi se battre ? Pourquoi tant de violence ? Regarde, ton sang est rouge, comme le mien (quoique !).",
    effets: "le personnage n’a plus le cœur à attaquer son ennemi. –20% à tous ses jets d’attaque contre cet ennemi seulement pour le reste de la rencontre. Effet annulé si: l’ennemi en question blesse le personnage. Ca remet les idées en place. Ou alors l’ennemi décède."
  },{
    name: "Aaargl !",
    description: "Le prochain coup réussi du héros sera tellement affreux, tellement gore (artère touchée, os brisés, burnes concassées) qu’il en concevra une vive horreur, épouvanté par son geste.",
    effets: "le personnage ne peut plus attaquer pendant 1D4 round."
  },{
    name: "Laissez-moi seul !",
    description: "Le stress, la promiscuité oppressent le personnage. Il se sent cerné de toutes parts, gêné par ses lourdauds de compagnons, etc.",
    effets: "Le personnage s’éloigne de ses compagnons. Il fait tout pour se tenir à l’écart, d’au moins une case d’eux. Ce qui fait tomber à l’eau toutes tentatives de travail en équipe, naturellement. De plus, étant isolé, il fait une très belle cible."
  },{
    name: "Laissez-moi seul !",
    description: "Le stress, la promiscuité oppressent le personnage. Il se sent cerné de toutes parts, gêné par ses lourdauds de compagnons, etc.",
    effets: "Le personnage s’éloigne de ses compagnons. Il fait tout pour se tenir à l’écart, d’au moins une case d’eux. Ce qui fait tomber à l’eau toutes tentatives de travail en équipe, naturellement. De plus, étant isolé, il fait une très belle cible. Effet annulé si: Ses compagnons réussissent une épreuve de diplomatie (3 succès)."
  },{
    name: "Non ! Pitié, pas frapper !",
    description: "l’ennemi du personnage est tellement hideux et menaçant que notre héros, effrayé, en perd tous ses moyens.",
    effets: "Le personnage se met en défense totale pendant 1D4 rounds. Il ne peut entreprendre aucune action offensive."
  },{
    name: "Comment qu’on fait déjà ?",
    description: "Rendu confus par le chaos de la bataille, le personnage perd ses moyens, hésite et connaît un trou de mémoire au moment le plus inopportun.",
    effets: "Le personnage ne se souvient plus de la manœuvre ni des enchaînements nécessaires pour : Utiliser l’un de ses pouvoirs de rencontre (déterminé aléatoirement) Ou pour faire une manœuvre de combat (aider quelqu’un, prendre en tenaille, faire une attaque sournoise)"
  },{
    name: "Comment ça marche, ce truc ?",
    description: "Victime d’un trou de mémoire, le personnage ne se souvient plus comment utiliser l’un de ses objets magiques (parchemin de soins, baguette de sorcier, objet magique à activer, etc.). Si c’est un lanceur de sort, c’est l’un de ses sorts qui lui échappe.",
    effets: "-"
  },{
    name: "Si on discutait ? Euh… Moi, ami, toi",
    description: "tout à coup, l’aventurier a l’idée saugrenue de vouloir entamer le dialogue avec le monstre qui lui fait face (même un monstre dénué d’intelligence, comme un cube gélatineux !).",
    effets: "Le personnage fait des jets de diplomatie, de bluff ou d’intimidation au lieu d’attaquer. Il ne tente aucune action offensive. Par contre, il a le droit de se mettre en défense totale. Le personnage renonce à son idée au bout d’1D6 tentatives de diplomaties, réussies ou non (quel entêtement !)."
  },{
    name: "Ecoucou- Ecoucou- Ecoucoutez-moi !",
    description: "est-ce l’adrénaline ? L’exultation sauvage qui naît du fracas des batailles ? Toujours est-il que le personnage bégaie, sa voix semble peu assurée, voire fluette.",
    effets: "toute action liée à la voix (intimider, négocier, pousser un cri de guerre, etc.) n’est plus possible. Pour les jeteurs de sorts, malus de +20 à toutes leurs actions magiques pendant 2D4 tours."
  },{
    name: "Oh z’y va bouffon !",
    description: "Un ennemi raille le personnage de façon fort méprisante et énervante. Celui-ci en perd son sang-froid.",
    effets: "L’aventurier, furieux, s’en prend à cet ennemi, même si c’est à son désavantage (par ex, il y a un autre ennemi plus près, ou plus dangereux, etc.). Si l’aventurier est un guerrier, il tente une charge, au mépris du danger et des attaques d’opportunité !"
  },{
    name: "Crac !",
    description: "le personnage vient de se faire une hernie discale. Ouh, ça fait mal !",
    effets: "Il subit l’état préjudiciable immobilisé jusqu’à ce qu’il soit soigné. Un sort de soins est inévitable. Si le personnage ne prend pas en plus un repos prolongé, il conservera un malus de +10."
  },{
    name: "Aïe, mon pied !",
    description: "La mêlée est tellement furieuse que quelqu’un (ami ? Ennemi ?) marche sur le gros orteil du personnage. S’il est tout seul dans son coin ? Eh bien, il se fait mal tout seul comme un grand ! Sans l’aide de personne.",
    effets: "Il est ralenti, sa vitesse de déplacement est divisée par 2. Annulation: Repos prolongé. Retirer sa botte. Faire les soins appropriés (tout ça à la fois, à peu près dans cet ordre)."
  },{
    name: "Aïe, mon pied !",
    description: "La mêlée est tellement furieuse que quelqu’un (ami ? Ennemi ?) marche sur le gros orteil du personnage. S’il est tout seul dans son coin ? Eh bien, il se fait mal tout seul comme un grand ! Sans l’aide de personne.",
    effets: "Il est ralenti, sa vitesse de déplacement est divisée par 2. Annulation: Repos prolongé. Retirer sa botte. Faire les soins appropriés (tout ça à la fois, à peu près dans cet ordre)."
  },{
    name: "C’est d’la merde, ce truc !",
    description: "Un objet non-magique en possession du personnage se casse.",
    effets: "-"
  },{
    name: "C’est d’la merde, ce truc !",
    description: "Un objet non-magique en possession du personnage se casse.",
    effets: "-"
  },{
    name: "Merde ! Mon sac",
    description: "un mauvais coup heurte violemment le sac à dos/la besace du personnage. Un objet à l’intérieur est cassé : miroir, potion de soins, flasque d’huile (dont le contenu se répand dans le sac), bouteille de vin, tonnelet de bière, etc.",
    effets: "-"
  },{
    name: "Merde ! Mon sac",
    description: "un mauvais coup heurte violemment le sac à dos/la besace du personnage. Un objet à l’intérieur est cassé : miroir, potion de soins, flasque d’huile (dont le contenu se répand dans le sac), bouteille de vin, tonnelet de bière, etc.",
    effets: "-"
  },{
    name: "C’était quoi ce bruit ?",
    description: "Une pièce d’armure du PJ se casse, se fendille, s’ébrèche. S’il ne porte pas d’armure, c’est son vêtement qui se déchire, laissant voir une partie de son anatomie.",
    effets: "Perd 10 points en défense"
  },{
    name: "Mmmm… T’es bien gaulé(e), toi",
    description: "Le vêtement du personnage se déchire à un certain endroit, dévoilant une partie de son anatomie et laissant deviner sous les couches de tissu, de cuir et de fer, sa musculature saillante, son corps d’Adonis (ou d’Aphrodite) et ses courbes voluptueuses.",
    effets: "y a une bonne et une mauvaise nouvelle... Bonne nouvelle : Tous les jets de compétence sociale (sauf intimider) sont minorés d’un bonus de -10 (à condition d’avoir un modificateur de charisme qui ne soit pas négatif). Mauvaise nouvelle : toute attaque visée qui cible la partie mise à nu et qui touche est minorée d’un bonus de -2D6."
  },{
    name: "Mmmm… T’es bien gaulé(e), toi",
    description: "Le vêtement du personnage se déchire à un certain endroit, dévoilant une partie de son anatomie et laissant deviner sous les couches de tissu, de cuir et de fer, sa musculature saillante, son corps d’Adonis (ou d’Aphrodite) et ses courbes voluptueuses.",
    effets: "y a une bonne et une mauvaise nouvelle... Bonne nouvelle : Tous les jets de compétence sociale (sauf intimider) sont minorés d’un bonus de -10 (à condition d’avoir un modificateur de charisme qui ne soit pas négatif). Mauvaise nouvelle : toute attaque visée qui cible la partie mise à nu et qui touche est minorée d’un bonus de -2D6."
  },{
    name: "A l’assauuuuuuuuuuuuuuuut !",
    description: "Le personnage veut pousser un cri de guerre, je ne sais pas quoi au juste. Finalement, il beugle plus fort que Johnny Halliday au Parc des Princes. C’est horrible !",
    effets: "Toute personne dans un rayon de 10 métres est assourdie jusqu’à la fin de la rencontre."
  },{
    name: "A l’assauuuuuuuuuuuuuuuut !",
    description: "Le personnage veut pousser un cri de guerre, je ne sais pas quoi au juste. Finalement, il beugle plus fort que Johnny Halliday au Parc des Princes. C’est horrible !",
    effets: "Toute personne dans un rayon de 10 métres est assourdie jusqu’à la fin de la rencontre."
  },{
    name: "On se connaît ?",
    description: "l’aventurier est décontenancé par un ennemi qui lui fait face. Soit parce qu’il est particulièrement laid/beau, soit parce qu’il lui rappelle un parent défunt (\"tante Ursule ? C’est toi ?\"), soit parce qu’il est de la même race (\"Un tieffelin ? Dans ces ruines ?\"), soit parce qu’il porte un symbole religieux du même dieu, etc.",
    effets: "Quoiqu’il en soit, le personnage est surpris pour le reste de la rencontre."
  },{
    name: "Tu vas mouriiiiir !",
    description: "l’ennemi en face du PJ le marque pour le reste de la rencontre.",
    effets: "-"
  },{
    name: "Tu ne sais pas à qui tu as affaire !",
    description: "le personnage se blesse lui-même avec son arme ou bien avec son sort qui lui revient en pleine figure. Ne me demandez pas comment il a pu faire un truc pareil !",
    effets: "Dégâts normaux, à déterminer en lançant les dés (ce n’est pas un coup critique)."
  },{
    name: "Prends ça !",
    description: "Le personnage fait une attaque particulièrement réussie… Qui blesse l’un de ses camarades.",
    effets: "un personnage allié adjacent (déterminé de façon aléatoire si besoin) prend l’attaque. Les dégâts sont déterminés normalement (ce n’est pas un coup critique)."
  },{
    name: "Contemple ma puissance !",
    description: "Le personnage fait une attaque imparable, irrésistible, redoutable ! Un coup de maître ! Une botte qui restera dans les annales… Et qui blesse grièvement l’un de ses camarades.",
    effets: "un personnage adjacent (déterminé de façon aléatoire si besoin) prend l’attaque avec dégâts maximum (c’est un coup critique)."
  },{
    name: "Arrrgh ! La… Douleur… Est une… Ouille ! … Information",
    description: "le personnage se blesse lui-même avec son arme ou bien avec son sort qu’il envoie sur lui. Ne me demandez pas comment il a pu faire un truc pareil ! Encore un coup de ces maudits Dieux sombres du Chaos Indicible et Maléfique ! Ah, les fourbes !",
    effets: "Dégâts max (c’est un coup critique)."
  }
];