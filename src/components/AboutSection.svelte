<script lang="ts">
  import { appState } from '../data/i18n.svelte';
  import { LayoutTemplate, Code2, Globe, ArrowDown, GraduationCap, MapPin } from 'lucide-svelte';

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
</script>

<section class="about-editorial-section" id="about">
  <div class="container about-content-wrap">
    
    <div class="about-editorial-grid">
      
      <!-- Left Column: Story, Identity & Philosophy -->
      <div class="about-story-col">
        <span class="about-kicker font-mono text-xs">
          {appState.lang === 'fr' ? 'À PROPOS DE MOI' : 'ABOUT ME'}
        </span>
        
        <h2 class="about-editorial-title font-heading">
          {appState.lang === 'fr'
            ? 'L’exigence de l’ergonomie et des projets concrets.'
            : 'Focusing on clean ergonomics and shipped tools.'}
        </h2>

        <div class="about-bio-text font-sans">
          <p>
            {appState.lang === 'fr'
              ? "Je m'appelle Cronos. Je conçois des applications web et des outils logiciels avec un intérêt marqué pour la qualité des interfaces utilisateur : qu'elles soient lisibles, intuitives et naturelles dès la première prise en main."
              : 'My name is Cronos. I build web applications and software tools with a deep dedication to user interface quality: making interactions intuitive, legible, and immediately accessible.'}
          </p>

          <p>
            {appState.lang === 'fr'
              ? "Mon approche est pragmatique : plutôt que d'empiler des couches inutiles, je m'attache à concevoir des projets qui fonctionnent réellement. Qu'il s'agisse d'un panneau d'administration interactif, d'une plateforme associative de réservation ou d'un outil de traduction collaborative, chaque écran est pensé pour être clair et immédiatement utile."
              : 'My approach is practical: rather than piling unnecessary complexity, I focus on building tools that solve real problems. Whether it is an interactive management panel, a community booking platform, or a collaborative localization tool, every view is designed to be purposeful.'}
          </p>
        </div>

        <!-- Academic & Regional Grounding -->
        <div class="about-meta-row font-mono text-xs">
          <div class="meta-tag">
            <GraduationCap size={13} class="text-white shrink-0" />
            <span class="text-muted">FORMATION :</span>
            <span class="text-white font-medium">Terminale Bac Pro CIEL</span>
          </div>
          <div class="meta-tag">
            <MapPin size={13} class="text-white shrink-0" />
            <span class="text-muted">RÉGION :</span>
            <span class="text-white font-medium">Île-de-France</span>
          </div>
        </div>
      </div>

      <!-- Right Column: The 3 Guiding Pillars + Innovative ASCII / Pixel Art Portal -->
      <div class="about-principles-col">
        
        <div class="principles-header font-mono text-xs">
          <span>{appState.lang === 'fr' ? 'CE QUE JE CONÇOIS' : 'CORE FOCUS'}</span>
        </div>

        <div class="principles-stack">
          
          <!-- Pillar 1: UI & Ergonomics -->
          <div class="principle-item">
            <div class="principle-icon-wrap">
              <LayoutTemplate size={18} class="text-white" />
            </div>
            <div class="principle-content">
              <h3 class="principle-title font-heading">
                {appState.lang === 'fr' ? 'Interfaces & Ergonomie UI' : 'Interfaces & UX Design'}
              </h3>
              <p class="principle-desc font-sans text-sm">
                {appState.lang === 'fr'
                  ? 'Conception d’interfaces réactives et vivantes avec SvelteKit. Priorité à la clarté visuelle, à l’affordance des boutons et au confort de navigation.'
                  : 'Crafting reactive, lightweight user interfaces with SvelteKit. Prioritizing visual clarity, strong button affordance, and effortless navigation.'}
              </p>
            </div>
          </div>

          <!-- Pillar 2: Logic & Architecture -->
          <div class="principle-item">
            <div class="principle-icon-wrap">
              <Code2 size={18} class="text-white" />
            </div>
            <div class="principle-content">
              <h3 class="principle-title font-heading">
                {appState.lang === 'fr' ? 'Développement Logique & Backend' : 'Logic & Backend Engineering'}
              </h3>
              <p class="principle-desc font-sans text-sm">
                {appState.lang === 'fr'
                  ? 'Développement d’outils fiables et performants en Rust et TypeScript. Des architectures stables, des APIs réactives et un code sans lenteurs superflues.'
                  : 'Developing reliable, fast backends and services with Rust and TypeScript. Clean architectures, responsive APIs, and zero bloated overhead.'}
              </p>
            </div>
          </div>

          <!-- Pillar 3: Real Shipped Projects -->
          <div class="principle-item">
            <div class="principle-icon-wrap">
              <Globe size={18} class="text-white" />
            </div>
            <div class="principle-content">
              <h3 class="principle-title font-heading">
                {appState.lang === 'fr' ? 'Mise en Ligne & Projets Concrets' : 'Deployment & Real Deliverables'}
              </h3>
              <p class="principle-desc font-sans text-sm">
                {appState.lang === 'fr'
                  ? 'Capacité éprouvée à mener une réalisation de A à Z et à l’exploiter en conditions réelles, avec plusieurs plateformes déjà déployées et utilisées.'
                  : 'Proven track record of taking projects from idea to live deployment, with multiple production applications currently operating online.'}
              </p>
            </div>
          </div>

        </div>

        <!-- Innovative ASCII / Pixel Art Portal to Projects -->
        <button 
          type="button" 
          class="projects-ascii-portal" 
          onclick={scrollToProjects}
          aria-label="Accéder aux études de cas détaillées"
        >
          <div class="portal-frame-top font-mono text-xs">
            <span class="portal-ascii-corner">┌──[ 02 // PROJETS EN PRODUCTION ]</span>
            <span class="portal-ascii-rule"></span>
            <span class="portal-ascii-tag">[ 3 ÉTUDES DE CAS ]──┐</span>
          </div>

          <div class="portal-content">
            <div class="portal-left">
              <div class="portal-title-row">
                <span class="portal-pixel-dot" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="0" y="4" width="4" height="4" fill="#ffffff" />
                    <rect x="4" y="0" width="4" height="4" fill="#ffffff" />
                    <rect x="4" y="8" width="4" height="4" fill="#ffffff" />
                    <rect x="8" y="4" width="4" height="4" fill="#ffffff" />
                  </svg>
                </span>
                <span class="portal-title-text font-heading">
                  {appState.lang === 'fr' ? 'Consulter les réalisations' : 'Explore production projects'}
                </span>
              </div>
              <p class="portal-sub font-sans text-xs">
                Zenith (Discord) · La Maison de l’ESS · Studio UTy (Undertale Yellow)
              </p>
            </div>

            <div class="portal-action-pill font-mono text-xs">
              <span>{appState.lang === 'fr' ? 'Voir études de cas' : 'View case studies'}</span>
              <span class="portal-arrow"><ArrowDown size={13} /></span>
            </div>
          </div>

          <div class="portal-frame-bottom font-mono text-xs">
            <span class="portal-ascii-corner">└──</span>
            <span class="portal-ascii-rule"></span>
            <span class="portal-ascii-corner">[ CLIQUEZ POUR DESCENDRE ↓ ]──┘</span>
          </div>
        </button>

      </div>

    </div>

  </div>
</section>

<style>
  .about-editorial-section {
    padding-top: 5rem;
    padding-bottom: 5.5rem;
    position: relative;
    background-color: #030306;
    z-index: 2;
  }

  .about-content-wrap {
    position: relative;
    z-index: 1;
  }

  .about-editorial-grid {
    display: grid;
    grid-template-columns: 1.15fr 1.05fr;
    gap: 5rem;
    align-items: start;
  }

  @media (max-width: 1040px) {
    .about-editorial-grid {
      grid-template-columns: 1fr;
      gap: 3.5rem;
    }
  }

  /* Left Column */
  .about-story-col {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .about-kicker {
    letter-spacing: 0.1em;
    color: #e4e4e7;
    font-weight: 600;
  }

  .about-editorial-title {
    font-size: clamp(2.2rem, 3.8vw, 3.2rem);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .about-bio-text {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    color: #d4d4d8;
    line-height: 1.75;
    font-size: 1.02rem;
  }

  .about-meta-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding-top: 0.5rem;
  }

  .meta-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.85rem;
    background: #09090e;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-xs);
  }

  /* Right Column */
  .about-principles-col {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .principles-header {
    letter-spacing: 0.08em;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    color: #e4e4e7;
    font-weight: 600;
  }

  .principles-stack {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .principle-item {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
  }

  .principle-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-xs);
    background: #0d0d14;
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 0.15rem;
  }

  .principle-content {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .principle-title {
    font-size: 1.12rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  .principle-desc {
    color: #a1a1aa;
    line-height: 1.6;
    font-size: 0.9rem;
  }

  /* Innovative ASCII / Pixel Art Portal */
  .projects-ascii-portal {
    display: flex;
    flex-direction: column;
    background: #08080d;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: var(--radius-xs);
    padding: 0.85rem 1rem;
    cursor: pointer;
    text-align: left;
    width: 100%;
    margin-top: 0.5rem;
    transition: all var(--transition-fast);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
  }

  .projects-ascii-portal:hover {
    background: #0e0e16;
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 255, 255, 0.05);
  }

  .portal-frame-top,
  .portal-frame-bottom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #52525b;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    user-select: none;
  }

  .projects-ascii-portal:hover .portal-frame-top,
  .projects-ascii-portal:hover .portal-frame-bottom {
    color: #a1a1aa;
  }

  .portal-ascii-rule {
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  .projects-ascii-portal:hover .portal-ascii-rule {
    background: rgba(255, 255, 255, 0.2);
  }

  .portal-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0.25rem;
    flex-wrap: wrap;
  }

  .portal-left {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .portal-title-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .portal-title-text {
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
  }

  .portal-sub {
    color: #a1a1aa;
  }

  .portal-action-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.8rem;
    background: #181824;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-xs);
    color: #ffffff;
    font-weight: 600;
    transition: all var(--transition-fast);
  }

  .projects-ascii-portal:hover .portal-action-pill {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }

  .portal-arrow {
    display: flex;
    align-items: center;
    transition: transform 150ms ease;
  }

  .projects-ascii-portal:hover .portal-arrow {
    transform: translateY(2px);
  }
</style>
