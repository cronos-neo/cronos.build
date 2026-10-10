<div align="center">

# cronos.build

**Portfolio Officiel & Vitrine d'Ingénierie Logicielle (Svelte 5 / TypeScript / Vite)**

[cronos.build](https://cronos.build) · [Dépôt Source](https://github.com/cronos-neo/cronos.build) · [Profil GitHub](https://github.com/cronos-neo)

</div>

---

## Vue d'ensemble

Dépôt source du portfolio officiel de **Cronos**, développeur Full-Stack & Systèmes.

Le site est conçu selon une exigence stricte de légèreté, d'élégance ergonomique et d'efficience réseau :
- **Svelte 5** exploitant le système de réactivité par runes (`$state`, `$derived`, `$props`).
- **Autonomie Réseau Totale** : Polices Google Fonts (Inter, JetBrains Mono, Outfit, Press Start 2P) intégralement auto-hébergées au format WOFF2 local, éliminant les requêtes bloquantes et la latence DNS externe.
- **Optimisation des Médias** : Tous les visuels d'études de cas convertis et compressés en WebP haute fidélité (réduction d'empreinte de plus de 80%).
- **Rendu 3D Sobre** : Visualisation sphérique et modèle matériel avec Three.js et Draco compression.
- **Terminal Intégré** : Émulateur de terminal interactif permettant la navigation au clavier (`neofetch`, `projects`, `skills`, `contact`, `cv`).
- **Bilinguisme Natif** : Moteur i18n temps réel (Français / Anglais).

---

## Projets Présentés

| Projet | Catégorie | Stack Principale | Statut |
|---|---|---|---|
| **[Zenith](https://zenithbot.app)** | Plateforme de gestion & sécurité Discord | Rust (`tokio`, `axum`), SvelteKit, PostgreSQL, Redis | Production (500+ utilisateurs) |
| **[Undertale FR](https://undertale-fr.cronos.build)** | Portail communautaire & distribution | Vanilla HTML5 / CSS3, Web Audio API, Cloudflare | Open Source |
| **[Undertale FR Patcher](https://github.com/cronos-neo/undertale-fr-patcher)** | Patcher graphique multiplateforme | Rust, `egui` (softbuffer CPU), xdelta3, `sha2` | Open Source |
| **[Studio UTy](https://studio.zenith.fr)** | Outillage de traduction & parseur AST | SvelteKit, TypeScript, Parser AST GameMaker, SQLite | Production (9.8k répliques) |
| **[La Maison de l'ESS](https://lamaisondeless.org)** | Portail web & réservation d'espaces | Svelte, TypeScript, TailwindCSS, Node.js | Service partiel (PTCE) |

---

## Spécifications Techniques

| Composant | Technologie |
|---|---|
| **Framework Frontend** | Svelte 5.56+ avec TypeScript en mode strict |
| **Outil de Build** | Vite 8.2 avec minification CSS/JS optimisée |
| **Composants d'Icônes** | Lucide Svelte et Simple Icons |
| **Typographie** | Inter, JetBrains Mono, Outfit (auto-hébergement WOFF2 sans CDN) |
| **Déploiement** | Cloudflare Pages avec en-têtes HTTP de sécurité stricts |

---

## Développement & Compilation

### Prérequis
- Node.js 20+ ou Bun 1.1+

### Commandes

```bash
# Installation des dépendances
bun install
# ou
npm install

# Lancement du serveur de développement local
bun run dev

# Vérification de type statique
bun run check

# Compilation de production
bun run build

# Prévisualisation du bundle de production
bun run preview
```

Le bundle optimisé est généré dans le répertoire `dist/`.

---

## Licence

Code source sous licence MIT. Tous droits réservés sur les éléments d'identité graphique et marques associées.
