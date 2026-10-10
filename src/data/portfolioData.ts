export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  badge: { fr: string; en: string };
  category: { fr: string; en: string };
  tagline: { fr: string; en: string };
  year: string;
  period: string;
  role: { fr: string; en: string };
  url?: string;
  clientOrContext: { fr: string; en: string };
  stack: { name: string; icon: string }[];
  images: {
    hero: string;
    gallery?: string[];
  };
  summary: { fr: string; en: string };
  whatIsIt: { fr: string; en: string };
  theProblem: { fr: string; en: string };
  theSolution: { fr: string[]; en: string[] };
  architecture: {
    frontend: string;
    backend: string;
    infrastructure: string;
    database: string;
  };
  keyTakeaways: { fr: string; en: string };
}

export const DEVELOPER_PROFILE = {
  pseudonym: 'Cronos',
  email: 'contact@cronos.build',
  discordTag: 'cronos',
  discordUrl: 'https://discord.com/users/835818643043385417',
  githubUser: 'cronos-neo',
  githubUrl: 'https://github.com/cronos-neo',
  age: 16,
  location: { fr: 'Île-de-France, France', en: 'Paris Region, France' },
  education: {
    fr: 'Terminale Bac Professionnel CIEL (Cybersécurité, Informatique et réseaux, Électronique)',
    en: 'Senior Year / Vocational Baccalaureate CIEL (Cybersecurity, IT & Networks, Electronics)'
  },
  headline: {
    fr: 'Développeur Full-Stack (SvelteKit & Rust)',
    en: 'Full-Stack Developer (SvelteKit & Rust)'
  },
  pitch: {
    fr: 'Développeur web et logiciel. Je conçois des interfaces soignées, ergonomiques et des outils fonctionnels pensés pour de vrais utilisateurs.',
    en: 'Web and software developer. Crafting clean, accessible user interfaces and reliable functional tools for real users.'
  },
  bio: {
    fr: `Élève en Terminale Bac Pro CIEL en Île-de-France, je m'intéresse au développement utile et fonctionnel. Je conçois des interfaces intuitives avec SvelteKit et des outils fiables en Rust et TypeScript.`,
    en: `Vocational high school senior in CIEL in Paris, focused on practical, high-impact development. Building intuitive interfaces with SvelteKit and reliable tools in Rust and TypeScript.`
  }
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'maison-ess',
    slug: 'maison-ess',
    title: "La Maison de l'ESS",
    badge: { fr: 'Production', en: 'Production' },
    category: { fr: 'Plateforme Web & Réservations', en: 'Web Platform & Bookings' },
    tagline: {
      fr: 'Plateforme numérique et module de réservation d’espaces pour l’Économie Sociale et Solidaire',
      en: 'Digital hub and space reservation platform for the Social and Solidarity Economy'
    },
    year: '2025',
    period: '2025',
    role: { fr: 'Développeur Web & Intégrateur (Stage d’un mois)', en: 'Web Developer & Integrator (1-month internship)' },
    clientOrContext: { fr: 'Pôle Territorial de Coopération Économique (PTCE)', en: 'Territorial Economic Cooperation Cluster' },
    url: 'https://lamaisondeless.org/',
    stack: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Svelte / HTML5', icon: 'svelte' },
      { name: 'TailwindCSS', icon: 'tailwind' },
      { name: 'Node.js', icon: 'nodejs' }
    ],
    images: {
      hero: '/assets/projects/maison_ess_showcase.webp'
    },
    summary: {
      fr: `Conception et développement de la plateforme web de La Maison de l'ESS. Le site permet aux créateurs, artisans et associations de découvrir et de réserver 6 modules d'espaces professionnels (Kiosque gourmand, Boutique solidaire, Bureaux partagés, Salles de réunion).`,
      en: `Designed and built the web platform for La Maison de l'ESS. The site enables local entrepreneurs, artisans, and non-profits to discover and book 6 professional space modules (Gourmet kiosk, Solidarity shop, Private offices, Meeting rooms).`
    },
    whatIsIt: {
      fr: `La Maison de l'Économie Sociale et Solidaire est un lieu d'accueil et d'incubation pour porteurs de projets engagés. La plateforme sert de vitrine officielle et d'outil central pour la gestion des demandes de créneaux et la présentation des services aux adhérents.`,
      en: `La Maison de l'ESS is an incubation and community hub for social entrepreneurs. The digital platform serves as the official portal and central booking request system for members and partners.`
    },
    theProblem: {
      fr: `L'association gérait les demandes de manière informelle, sans visibilité claire sur les équipements et les tarifs des différents espaces. Il fallait créer un portail accessible, transparent et fluide permettant aux visiteurs d'estimer et de soumettre leurs besoins en quelques clics.`,
      en: `The non-profit previously handled space requests manually without clear public visibility into pricing and equipment. They needed an accessible, transparent portal allowing visitors to review options and submit booking inquiries seamlessly.`
    },
    theSolution: {
      fr: [
        'Développement d’un catalogue interactif structuré pour les 6 typologies d’espaces avec fiches techniques et équipements.',
        'Intégration d’un formulaire de demande de réservation avec calcul des forfaits (demi-journée, journée, forfaits partenaires).',
        'Audit de performance, optimisation du rendu et mise en place de stratégies de mise en cache HTTP pour accélérer l’affichage.',
        'Conception d’une interface responsive pensée pour tous les profils d’utilisateurs (artisans, associations, grand public).'
      ],
      en: [
        'Built an interactive structured catalog for 6 space typologies with technical specs and amenities.',
        'Integrated a dynamic reservation inquiry funnel with automated plan calculations.',
        'Conducted performance audits and implemented HTTP caching strategies to ensure fast page loads.',
        'Crafted a fully responsive interface tailored for all user profiles (artisans, non-profits, general public).'
      ]
    },
    architecture: {
      frontend: 'Application web responsive avec découpage modulaire des composants',
      backend: 'Gestion des requêtes de réservation et routage des demandes',
      infrastructure: 'Hébergement Linux avec conteneurisation Docker',
      database: 'Stockage des configurations d’espaces et des formulaires de contact'
    },
    keyTakeaways: {
      fr: `Ce projet associatif en condition réelle m'a permis d'appréhender les attentes concrètes d'utilisateurs finaux non-techniques, la gestion du cycle de vie d'un projet client de A à Z, et a renforcé mon exigence sur la clarté de l'information.`,
      en: `This real-world non-profit mission strengthened my understanding of non-technical user needs, managing an end-to-end client deliverable, and prioritizing clear information architecture.`
    }
  },
  {
    id: 'zenith',
    slug: 'zenith',
    title: 'Zenith',
    badge: { fr: 'Production', en: 'Production' },
    category: { fr: 'Plateforme Web & Moteur Temps Réel', en: 'Web Platform & Real-Time Engine' },
    tagline: {
      fr: 'Plateforme de gestion et de protection automatisée pour serveurs Discord',
      en: 'Automated management and protection platform for Discord community servers'
    },
    year: '2025 / 2026',
    period: '2025 / 2026',
    role: { fr: 'Lead Architect & Développeur Full-Stack', en: 'Lead Architect & Full-Stack Developer' },
    clientOrContext: { fr: 'Projet SaaS indépendant déployé pour communautés Discord', en: 'Independent SaaS deployed for Discord communities' },
    url: 'https://zenithbot.app/',
    stack: [
      { name: 'SvelteKit', icon: 'svelte' },
      { name: 'Rust', icon: 'rust' },
      { name: 'Redis', icon: 'redis' },
      { name: 'PostgreSQL', icon: 'postgres' },
      { name: 'Prometheus', icon: 'prometheus' },
      { name: 'Grafana', icon: 'grafana' },
      { name: 'Linux', icon: 'linux' }
    ],
    images: {
      hero: '/assets/projects/zenith_hero.webp',
      gallery: ['/assets/projects/zenith_pricing.webp']
    },
    summary: {
      fr: `Zenith est une solution complète d'administration et de sécurité pour les communautés Discord. Elle associe une interface web réactive en SvelteKit (zenithbot.app) et un moteur événementiel en Rust tournant sur conteneurs Alpine Linux avec télémétrie Prometheus et Grafana.`,
      en: `Zenith is a complete administration and security solution for Discord communities, pairing a reactive SvelteKit web dashboard with a high-throughput Rust event core running on Alpine Linux containers with Prometheus and Grafana telemetry.`
    },
    whatIsIt: {
      fr: `Discord est une plateforme de messagerie et de salons vocaux utilisée par des millions de communautés. Zenith agit comme un gardien automatisé et un panneau d'administration : les administrateurs de serveurs se connectent sur le dashboard pour configurer la modération automatique, filtrer les spams, et surveiller l'activité de leur communauté en temps réel.`,
      en: `Discord is a real-time voice and chat platform powering millions of online communities. Zenith functions as an automated security shield and web management hub where server owners configure auto-moderation rules, spam filters, and monitor server activity in real time.`
    },
    theProblem: {
      fr: `Les bots Discord classiques écrits en langages interprétés (Node.js/Python) subissent des ralentissements majeurs et des pics de mémoire lors de vagues de spam massives ou de raids. Le projet nécessitait une architecture capable d'encaisser des milliers d'événements sans faillir et avec une consommation de ressources minimale.`,
      en: `Conventional Discord bots built with interpreted runtimes frequently experience performance degradation and memory spikes during heavy spam waves. The project required an ultra-lean architecture capable of handling high event velocity with zero memory leakage.`
    },
    theSolution: {
      fr: [
        'Développement du moteur temps réel en Rust (Tokio) : multithreading asynchrone sécurisé sans ramasse-miettes (Garbage Collector).',
        'Dashboard web moderne en SvelteKit : chargement instantané, synchronisation des rôles et configuration modulaire.',
        'Moteur de sécurité réactif : détection de vélocité de messages, analyse regex, blocage des liens malveillants et sanctions automatiques.',
        'Déploiement sur Alpine Linux dans des conteneurs légers avec télémétrie Prometheus et dashboards Grafana.'
      ],
      en: [
        'Engineered the event core in Rust (Tokio) for fearless asynchronous multithreading with zero GC overhead.',
        'Crafted a responsive SvelteKit dashboard with instant role synchronization and module controls.',
        'Multi-layer security engine: message velocity detection, regex filtering, malicious link blocking, and auto-sanctions.',
        'Deployed on lightweight Alpine Linux containers monitored via Prometheus and Grafana dashboards.'
      ]
    },
    architecture: {
      frontend: 'SvelteKit + TypeScript (Dashboard de gestion, graphiques, configuration des règles)',
      backend: 'Rust Tokio (Traitement des WebSockets Discord, workers asynchrones)',
      infrastructure: 'Conteneurs Alpine Linux légers + Observabilité Prometheus & Grafana',
      database: 'PostgreSQL (Données persistantes) + Redis (Cache mémoire des états de serveurs)'
    },
    keyTakeaways: {
      fr: `La construction de Zenith m'a apporté une expertise approfondie des systèmes distribués en Rust, de la gestion de flux asynchrones haute cadence et de la supervision de charge en production réelle.`,
      en: `Building Zenith gave me deep expertise in distributed Rust systems, high-cadence asynchronous event processing, and real-time production monitoring.`
    }
  },
  {
    id: 'studio-uty',
    slug: 'studio-uty',
    title: 'Studio UTy',
    badge: { fr: 'Production', en: 'Production' },
    category: { fr: 'Plateforme de Localisation & Outillage Web', en: 'Localization Platform & Web Tooling' },
    tagline: {
      fr: 'Plateforme collaborative de traduction pour Undertale Yellow et vérificateur physique de textes GameMaker',
      en: 'Collaborative translation platform for Undertale Yellow with GameMaker AST overflow checking'
    },
    year: '2024 / 2025',
    period: '2024 / 2025',
    role: { fr: 'Co-Lead & Développeur Principal (Équipe UTY FR)', en: 'Co-Lead & Lead Developer (UTY FR Team)' },
    clientOrContext: { fr: 'Équipe de localisation française officielle du jeu Undertale Yellow', en: 'Official French localization team for Undertale Yellow' },
    url: 'https://studio.xn--znith-bsa.fr/',
    stack: [
      { name: 'SvelteKit', icon: 'svelte' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'TailwindCSS', icon: 'tailwind' },
      { name: 'Linux', icon: 'linux' }
    ],
    images: {
      hero: '/assets/projects/studio_uty_dashboard.webp',
      gallery: ['/assets/projects/studio_uty_files.webp']
    },
    summary: {
      fr: `Plateforme web sur-mesure conçue pour coordonner la traduction française officielle du jeu Undertale Yellow (9 865 répliques et 2 494 dialogues). L'outil intègre un parseur syntaxique AST pour extraire les textes du code GameMaker (.gml) et un vérificateur physique pour empêcher tout dépassement de boîte de dialogue en jeu.`,
      en: `Custom web platform built to orchestrate the official French translation of Undertale Yellow (9,865 lines across 2,494 dialogues). Includes a GameMaker AST parser to extract strings directly from .gml scripts and a physical boundary validator preventing text overflow in-game.`
    },
    whatIsIt: {
      fr: `Undertale Yellow est un jeu vidéo indépendant acclamé par la critique. Pour adapter le jeu en français sans introduire de bugs d'affichage, notre équipe avait besoin d'un outil collaboratif capable de guider les traducteurs et de garantir que chaque réplique s'affiche parfaitement dans les boîtes de dialogue 8-bit du jeu.`,
      en: `Undertale Yellow is a critically acclaimed indie RPG. To adapt the game into French without visual glitches, our team needed a collaborative portal that validates translated lines against the game's exact 8-bit bitmap font boundaries.`
    },
    theProblem: {
      fr: `Modifier directement les fichiers sources GameMaker (.gml) comporte d'immenses risques : erreurs de syntaxe de code et débordements de texte (le texte qui dépasse de la boîte et devient illisible pour le joueur). Les traducteurs n'étant pas des développeurs, il fallait une interface simple et infaillible.`,
      en: `Manually editing raw GameMaker scripts (.gml) carries high risks of syntax breakage and text clipping. Translators needed a simple, dedicated web environment that handled technical constraints automatically.`
    },
    theSolution: {
      fr: [
        'Analyseur syntaxique AST pour isoler les chaînes de dialogue sans toucher à la logique du moteur de jeu.',
        'Calcul en temps réel de la largeur en pixels des répliques selon la table des glyphes du jeu (limite stricte de 34 caractères/ligne et 3 lignes/bulle).',
        'Interface collaborative avec suivi de progression, relecture à deux niveaux et historique des modifications.',
        'Export automatique des patchs de jeu (.xdelta / .win) prêts à être distribués aux joueurs francophones.'
      ],
      en: [
        'Custom AST parser to extract dialog strings while safeguarding GameMaker source logic.',
        'Real-time pixel calculation verifying text width against the font table (34 chars/line, 3 lines max per bubble).',
        'Collaborative interface with file-by-file tracking, dual review stages, and change history.',
        'Automated build pipeline exporting ready-to-use distribution patches (.xdelta / .win).'
      ]
    },
    architecture: {
      frontend: 'SvelteKit + TypeScript (Rendu pixel-perfect, simulation de boîte de dialogue)',
      backend: 'Node.js + Parseur AST pour scripts GameMaker (.gml)',
      infrastructure: 'Serveur Linux conteneurisé',
      database: 'Base de données document avec contrôle des versions et permissions traducteurs'
    },
    keyTakeaways: {
      fr: `Une expérience forte de création d'outils logiciels ergonomiques pour des utilisateurs non-techniques, et une maîtrise concrète de l'analyse syntaxique et de la contrainte matérielle dans les moteurs de jeux.`,
      en: `A rewarding experience creating ergonomic tooling for non-technical users, mastering AST parsing, and building for strict in-game graphical constraints.`
    }
  }
  ,
  {
    id: 'undertale-fr',
    slug: 'undertale-fr',
    title: 'Undertale FR',
    badge: { fr: 'Open Source', en: 'Open Source' },
    category: { fr: 'Portail Web & Vitrine Communautaire', en: 'Web Portal & Community Hub' },
    tagline: {
      fr: 'Portail officiel des traductions françaises d\'Undertale Yellow et Red & Yellow',
      en: 'Official French localization web portal for Undertale Yellow & Red and Yellow'
    },
    year: '2025 / 2026',
    period: '2025 / 2026',
    role: { fr: 'Concepteur Web & Développeur Frontend', en: 'Web Designer & Frontend Developer' },
    clientOrContext: { fr: 'Communauté francophone Undertale', en: 'French Undertale Community' },
    url: 'https://undertale-fr.cronos.build/',
    stack: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5 / CSS3', icon: 'html5' },
      { name: 'Web Audio API', icon: 'audio' },
      { name: 'Linux & Steam Deck', icon: 'linux' }
    ],
    images: {
      hero: '/assets/projects/undertale_fr_showcase.webp',
      gallery: ['/assets/projects/undertale_fr_showcase.webp']
    },
    summary: {
      fr: `Portail communautaire officiel dédié à la diffusion des adaptations françaises d'Undertale Yellow et Undertale Red & Yellow. Présentation du lore, intégration de synthétiseurs audio 8-bit, distribution des paquets Linux / SteamOS et vérification d'intégrité SHA-256.`,
      en: `Official community hub distributing the French localizations for Undertale Yellow and Red & Yellow. Lore documentation, native 8-bit Web Audio synthesis, Linux/SteamOS distribution packages, and SHA-256 checksum integrity verification.`
    },
    whatIsIt: {
      fr: `Une plateforme complète conçue pour rassembler les joueurs francophones autour des fan-games et mods majeurs d'Undertale, avec téléchargement vérifié pour Windows, Linux natif et Steam Deck.`,
      en: `A dedicated hub created to unite French players around major Undertale fan-games and mods, offering verified direct downloads for Windows, native Linux, and Steam Deck.`
    },
    theProblem: {
      fr: `Les joueurs rencontraient des difficultés pour installer les patchs français, vérifier l'intégrité des fichiers sans risque de corruption et configurer les jeux sur SteamOS / Linux.`,
      en: `Players struggled to find clean, verified installation sources, check archive integrity without corruption, and set up the fan-games on Linux/Steam Deck.`
    },
    theSolution: {
      fr: [
        'Architecture web ultra-rapide avec zéro dépendance CDN externe et polices pixel-art Determination Mono auto-hébergées.',
        'Tableau d\'empreintes cryptographiques SHA-256 pour chaque archive et patch xdelta.',
        'Easter eggs interactifs (Bad Time Event de Sans, sprint de Toby Dog avec résidus de chien).',
        'Compatibilité responsive intégrale pour une consultation fluide sur mobile.'
      ],
      en: [
        'High-performance web architecture with zero external CDN dependencies and self-hosted Determination Mono pixel fonts.',
        'Cryptographic SHA-256 integrity lookup for every archive and xdelta patch.',
        'Interactive easter eggs (Sans Bad Time Event, Toby Dog rampage with dog residue).',
        'Full responsive design ensuring seamless mobile navigation.'
      ]
    },
    architecture: {
      frontend: 'HTML5 sémantique, CSS3 moderne sans framework, JavaScript ES6+',
      backend: 'Distribution statique Cloudflare avec politique de cache immuable',
      infrastructure: 'Hébergement haute disponibilité Cloudflare Pages',
      database: 'Index de versions et sommes de contrôle SHA-256 statiques'
    },
    keyTakeaways: {
      fr: `Création d'une identité visuelle rétro soignée, respect strict des contraintes pixel-art des jeux originaux et optimisation extrême des performances réseau.`,
      en: `Crafting an authentic retro visual identity, strictly adhering to original game pixel-art rules, and delivering optimal network performance.`
    }
  },
  {
    id: 'undertale-patcher',
    slug: 'undertale-patcher',
    title: 'Undertale FR Patcher',
    badge: { fr: 'Open Source', en: 'Open Source' },
    category: { fr: 'Logiciel Systèmes & Outil Multiplateforme', en: 'Systems Software & Tooling' },
    tagline: {
      fr: 'Patcher graphique autonome en Rust pour l\'application des traductions françaises',
      en: 'Standalone graphical Rust patcher applying non-destructive xdelta3 patches'
    },
    year: '2026',
    period: '2026',
    role: { fr: 'Architecte Logiciel & Développeur Rust', en: 'Software Architect & Rust Developer' },
    clientOrContext: { fr: 'Distribution open-source', en: 'Open-source Distribution' },
    url: 'https://github.com/cronos-neo/undertale-fr-patcher',
    stack: [
      { name: 'Rust', icon: 'rust' },
      { name: 'egui (Softbuffer)', icon: 'cpu' },
      { name: 'xdelta3', icon: 'binary' },
      { name: 'Linux / Steam Deck', icon: 'linux' }
    ],
    images: {
      hero: '/assets/projects/undertale_patcher_showcase.webp',
      gallery: ['/assets/projects/undertale_patcher_showcase.webp']
    },
    summary: {
      fr: `Utilitaire natif en Rust permettant d'appliquer de manière non-destructive les patchs de traduction française pour Undertale Yellow et Red & Yellow. Rendu CPU logiciel pur via softbuffer (zéro GPU requis), détection Steam automatique et contrôle SHA-256.`,
      en: `Native Rust utility applying non-destructive French localization patches for Undertale Yellow and Red & Yellow. Pure CPU software rendering via softbuffer (zero GPU required), automated Steam detection, and SHA-256 verification.`
    },
    whatIsIt: {
      fr: `Un utilitaire autonome multiplateforme conçu pour éviter aux utilisateurs les lignes de commande complexes en automatisant l'injection de patchs xdelta3 directement dans les fichiers de jeu originaux.`,
      en: `A cross-platform standalone GUI tool eliminating complex CLI steps by automating xdelta3 patch injection directly into original game files.`
    },
    theProblem: {
      fr: `L'application manuelle de patchs binaires xdelta3 provoque fréquemment des erreurs chez les utilisateurs débutants (fichiers sources incorrects, chemins introuvables, incompatibilités GPU sur Wine).`,
      en: `Manual xdelta3 patching regularly triggers user confusion and errors (wrong source files, missing paths, GPU rendering crashes under Wine/Proton).`
    },
    theSolution: {
      fr: [
        'Moteur graphique egui avec backend softbuffer : fonctionne sans GPU sur n\'importe quelle configuration ou VM.',
        'Détection heuristique instantanée des répertoires d\'installation Steam (Linux, SteamOS, Windows).',
        'Vérification cryptographique SHA-256 en amont pour éviter d\'altérer un jeu non compatible.',
        'Génération automatique des raccourcis et fichiers .desktop sur Linux et Steam Deck.'
      ],
      en: [
        'egui graphical engine with softbuffer backend: runs without GPU on any hardware or VM.',
        'Instant heuristic detection of Steam library folders (Linux, SteamOS, Windows).',
        'Pre-flight cryptographic SHA-256 check preventing patch application on mismatched versions.',
        'Automated .desktop entry and shortcut creation on Linux and Steam Deck.'
      ]
    },
    architecture: {
      frontend: 'egui 0.34 (Widgets personnalisés et thème Undertale rétro)',
      backend: 'Rust natif, minreq (HTTP synchrone avec rustls), sha2, xdelta3 runtime',
      infrastructure: 'Binaires autonomes sans dépendances dynamiques externes',
      database: 'Configuration distante versions.json synchronisée sur GitHub'
    },
    keyTakeaways: {
      fr: `Conception d'un binaire compact hautement optimisé (compilation opt-level = "z", LTO complet) assurant une robustesse maximale sur l'ensemble des systèmes d'exploitation desktop.`,
      en: `Building a compact, highly optimized native binary (opt-level = "z", full LTO) providing rock-solid reliability across all desktop platforms.`
    }
  }
];

export const TECHNICAL_SKILLS = [
  {
    name: 'Svelte 5 & SvelteKit',
    icon: 'svelte',
    category: { fr: 'Frontend & UI', en: 'Frontend & UI' },
    usedIn: [
      { slug: 'zenith', name: 'Zenith' },
      { slug: 'studio-uty', name: 'Studio UTy' }
    ],
    description: {
      fr: 'Développement d’interfaces réactives et légères avec le système de runes et le rendu SSR/SSG sans surcoût de Virtual DOM.',
      en: 'Building reactive, lightweight user interfaces using Svelte runes and SSR/SSG with zero Virtual DOM overhead.'
    }
  },
  {
    name: 'Rust & Tokio',
    icon: 'rust',
    category: { fr: 'Backend & Systèmes', en: 'Backend & Systems' },
    usedIn: [
      { slug: 'zenith', name: 'Zenith' }
    ],
    description: {
      fr: 'Conception de moteurs événementiels temps réel et d’APIs haute vélocité avec gestion mémoire stricte et sans fuite.',
      en: 'Engineering high-throughput asynchronous event engines and APIs with strict compile-time memory safety.'
    }
  },
  {
    name: 'TypeScript',
    icon: 'typescript',
    category: { fr: 'Langage & Architecture', en: 'Language & Architecture' },
    usedIn: [
      { slug: 'maison-ess', name: 'La Maison de l\'ESS' },
      { slug: 'zenith', name: 'Zenith' },
      { slug: 'studio-uty', name: 'Studio UTy' }
    ],
    description: {
      fr: 'Typage statique rigoureux pour fiabiliser le code frontend et les contrats d’API entre client et serveur.',
      en: 'Strict static typing ensuring software reliability and rock-solid API contracts between client and server.'
    }
  },
  {
    name: 'PostgreSQL & Redis',
    icon: 'postgres',
    category: { fr: 'Données & Cache', en: 'Data & Caching' },
    usedIn: [
      { slug: 'zenith', name: 'Zenith' }
    ],
    description: {
      fr: 'Persistance relationnelle structurée (PostgreSQL) et cache mémoire rapide pour sessions et files de tâches (Redis).',
      en: 'Structured relational persistence (PostgreSQL) and in-memory caching for real-time states and task queues (Redis).'
    }
  },
  {
    name: 'Prometheus & Grafana',
    icon: 'prometheus',
    category: { fr: 'Observabilité & DevOps', en: 'Observability & DevOps' },
    usedIn: [
      { slug: 'zenith', name: 'Zenith' }
    ],
    description: {
      fr: 'Supervision continue des métriques système, monitoring de charge et tableaux de bord de santé de production.',
      en: 'Continuous telemetry collection, server load monitoring, and real-time production health dashboards.'
    }
  },
  {
    name: 'Linux & Déploiement Web',
    icon: 'linux',
    category: { fr: 'Systèmes & Déploiement', en: 'Systems & Deployment' },
    usedIn: [
      { slug: 'zenith', name: 'Zenith' },
      { slug: 'maison-ess', name: 'La Maison de l\'ESS' }
    ],
    description: {
      fr: 'Administration et exploitation de serveurs Linux (Debian, Ubuntu), scripts de déploiement et configuration web.',
      en: 'Linux server administration (Debian, Ubuntu), automated deployment scripts, and web server configuration.'
    }
  }
];

export const TERMINAL_HELP = {
  fr: `Commandes disponibles :
  neofetch    - Spécifications du profil et environnement
  projects    - Liste des projets en production
  skills      - Arsenal technique Svelte & Rust
  contact     - Canaux de communication directs (Email, GitHub, Discord)
  cv          - Télécharger le CV officiel (PDF)
  clear       - Effacer le terminal`,
  en: `Available commands:
  neofetch    - Profile specifications and runtime environment
  projects    - List of production projects
  skills      - Svelte & Rust technical stack
  contact     - Direct contact channels (Email, GitHub, Discord)
  cv          - Download official CV (PDF)
  clear       - Clear terminal screen`
};
