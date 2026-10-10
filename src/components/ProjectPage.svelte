<script lang="ts">
  import { appState } from '../data/i18n.svelte';
  import { PROJECTS_DATA, type ProjectItem } from '../data/portfolioData';
  import OfficialIcon from './OfficialIcon.svelte';
  import { ArrowLeft, ArrowUpRight, Check, ExternalLink, Image as ImageIcon } from 'lucide-svelte';

  let { slug } = $props<{ slug: string }>();

  const projectIndex = $derived(PROJECTS_DATA.findIndex(p => p.slug === slug));
  const project = $derived(PROJECTS_DATA[projectIndex] || PROJECTS_DATA[0]);

  const prevProject = $derived(
    projectIndex > 0 ? PROJECTS_DATA[projectIndex - 1] : null
  );
  const nextProject = $derived(
    projectIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[projectIndex + 1] : null
  );

  let activeImageIndex = $state(0);

  const imagesList = $derived([
    project.images.hero,
    ...(project.images.gallery || [])
  ]);
  let showEssWarning = $state(false);

  function handleVisitClick(e: MouseEvent) {
    if (project.id === 'maison-ess') {
      e.preventDefault();
      showEssWarning = true;
    }
  }
</script>

<div class="project-page-container animate-fade-in">
  <div class="container project-page-inner">
    
    <!-- 1. Sober, Elegant Back Action -->
    <nav class="project-nav-bar">
      <button 
        type="button" 
        class="back-btn font-mono text-xs" 
        onclick={() => appState.navigateToHome()}
        aria-label="Retour aux projets"
      >
        <ArrowLeft size={13} class="back-arrow" />
        <span>{appState.lang === 'fr' ? 'Retour aux projets' : 'Back to projects'}</span>
      </button>
    </nav>

    <!-- 2. Compact, Sophisticated Project Header -->
    <header class="project-header">
      <div class="project-headline-row">
        <div class="project-title-cluster">
          <h1 class="project-title font-heading">{project.title}</h1>
          <span class="project-status-tag font-mono text-xs">
            [ {project.badge[appState.lang].toUpperCase()} ]
          </span>
        </div>

        {#if project.url}
          <a 
            href={project.url} 
            target="_blank" 
            rel="noreferrer" 
            class="btn-visit-primary font-mono text-xs"
            title="Ouvrir {project.title} dans un nouvel onglet"
            onclick={handleVisitClick}
          >
            <span>{appState.lang === 'fr' ? 'Visiter le site en ligne' : 'Visit live site'}</span>
            <ArrowUpRight size={13} />
          </a>
        {/if}
      </div>

      <p class="project-tagline font-sans">{project.tagline[appState.lang]}</p>

      <!-- 3. Minimalist, Inline Specs (NO Heavy Box!) -->
      <div class="project-meta-inline font-mono text-xs">
        <div class="meta-item">
          <span class="meta-k">{appState.lang === 'fr' ? 'PÉRIODE :' : 'PERIOD :'}</span>
          <span class="meta-v">{project.period}</span>
        </div>
        <span class="meta-sep">•</span>
        <div class="meta-item">
          <span class="meta-k">{appState.lang === 'fr' ? 'CATÉGORIE :' : 'CATEGORY :'}</span>
          <span class="meta-v">{project.category[appState.lang]}</span>
        </div>
        <span class="meta-sep">•</span>
        <div class="meta-item">
          <span class="meta-k">{appState.lang === 'fr' ? 'RÔLE :' : 'ROLE :'}</span>
          <span class="meta-v">{project.role[appState.lang]}</span>
        </div>
        <span class="meta-sep">•</span>
        <div class="meta-item">
          <span class="meta-k">{appState.lang === 'fr' ? 'CONTEXTE :' : 'CONTEXT :'}</span>
          <span class="meta-v">{project.clientOrContext[appState.lang]}</span>
        </div>
      </div>
    </header>

    <!-- 4. Screenshot Showcase with Switcher -->
    <div class="project-showcase-frame">
      <div class="showcase-topbar font-mono text-xs">
        <div class="flex items-center gap-2">
          <ImageIcon size={14} class="text-white" />
          <span class="text-white font-bold">Capture {activeImageIndex + 1} / {imagesList.length}</span>
        </div>
        
        {#if imagesList.length > 1}
          <div class="showcase-switchers">
            {#each imagesList as _, i}
              <button 
                type="button" 
                class="switcher-tab" 
                class:active={activeImageIndex === i}
                onclick={() => activeImageIndex = i}
              >
                Vue {i + 1}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <div class="showcase-image-holder">
        <img 
          src={imagesList[activeImageIndex] || project.images.hero} 
          alt="{project.title} interface capture" 
          class="showcase-img"
          draggable="false"
        />
      </div>
    </div>

    <!-- 5. In-Depth Case Study Report (Widescreen 2-Col Grid) -->
    <div class="case-study-grid">
      
      <!-- Left Column: Story, Problem & Solutions -->
      <div class="case-left-col">
        
        <!-- Overview -->
        <section class="case-block">
          <h2 class="case-block-title font-heading">{appState.lang === 'fr' ? 'Présentation du Projet' : 'Project Overview'}</h2>
          <p class="case-block-text">{project.whatIsIt[appState.lang]}</p>
        </section>

        <!-- Problem -->
        <section class="case-block">
          <h2 class="case-block-title font-heading">{appState.lang === 'fr' ? 'Le Défi Technique' : 'The Technical Challenge'}</h2>
          <p class="case-block-text">{project.theProblem[appState.lang]}</p>
        </section>

        <!-- Engineering Solutions -->
        <section class="case-block">
          <h2 class="case-block-title font-heading">{appState.lang === 'fr' ? 'Solutions & Réalisations' : 'Engineering Solutions'}</h2>
          <div class="case-solutions-list">
            {#each project.theSolution[appState.lang] as item}
              <div class="solution-item font-sans">
                <div class="solution-check">
                  <Check size={14} class="text-white" />
                </div>
                <span>{item}</span>
              </div>
            {/each}
          </div>
        </section>

        <!-- Key Takeaways -->
        <section class="case-block">
          <h2 class="case-block-title font-heading">{appState.lang === 'fr' ? 'Bilan & Enseignements' : 'Key Takeaways'}</h2>
          <p class="case-block-text">{project.keyTakeaways[appState.lang]}</p>
        </section>

      </div>

      <!-- Right Column: Architecture & Technical Specs -->
      <div class="case-right-sidebar">
        
        <div class="sidebar-block">
          <h3 class="sidebar-heading font-mono text-xs text-muted">{appState.lang === 'fr' ? 'ARCHITECTURE SYSTÈME' : 'SYSTEM ARCHITECTURE'}</h3>
          
          <div class="arch-specs-list font-mono text-xs">
            <div class="arch-entry">
              <span class="arch-k">FRONTEND</span>
              <span class="arch-v">{project.architecture.frontend}</span>
            </div>
            <div class="arch-entry">
              <span class="arch-k">BACKEND</span>
              <span class="arch-v">{project.architecture.backend}</span>
            </div>
            <div class="arch-entry">
              <span class="arch-k">INFRASTRUCTURE</span>
              <span class="arch-v">{project.architecture.infrastructure}</span>
            </div>
            <div class="arch-entry">
              <span class="arch-k">DONNÉES & CACHE</span>
              <span class="arch-v">{project.architecture.database}</span>
            </div>
          </div>
        </div>

        <div class="sidebar-block">
          <h3 class="sidebar-heading font-mono text-xs text-muted">{appState.lang === 'fr' ? 'ARSENAL TECHNIQUE DÉPLOYÉ' : 'DEPLOYED TECH STACK'}</h3>
          
          <div class="tech-stack-list">
            {#each project.stack as tech}
              <div class="tech-stack-pill font-mono text-xs">
                <OfficialIcon name={tech.icon} size={14} />
                <span>{tech.name}</span>
              </div>
            {/each}
          </div>
        </div>

        {#if project.url}
          <a 
            href={project.url} 
            target="_blank" 
            rel="noreferrer" 
            class="sidebar-visit-btn font-mono text-xs"
            onclick={handleVisitClick}
          >
            <span>{appState.lang === 'fr' ? 'Visiter le site en ligne' : 'Visit Live Website'}</span>
            <ExternalLink size={13} />
          </a>
        {/if}

      </div>

    </div>

    <!-- 6. Bottom Navigation with Authentic Pixel Art Notch Accents -->
    <footer class="project-bottom-nav">
      {#if prevProject}
        <button 
          type="button" 
          class="nav-project-card prev-card text-left" 
          onclick={() => appState.navigateToProject(prevProject.slug)}
        >
          <!-- Pixel Art Stepped Corner Notch -->
          <div class="pixel-notch-tl" aria-hidden="true"></div>
          <div class="nav-card-sub font-mono text-xs flex items-center gap-1">
            <span class="nav-arrow">←</span>
            <span>{appState.lang === 'fr' ? 'PROJET PRÉCÉDENT' : 'PREVIOUS PROJECT'}</span>
          </div>
          <strong class="nav-proj-title font-heading">{prevProject.title}</strong>
          <span class="nav-proj-desc font-sans text-xs">{prevProject.category[appState.lang]}</span>
        </button>
      {:else}
        <div></div>
      {/if}

      {#if nextProject}
        <button 
          type="button" 
          class="nav-project-card next-card text-right" 
          onclick={() => appState.navigateToProject(nextProject.slug)}
        >
          <!-- Pixel Art Stepped Corner Notch -->
          <div class="pixel-notch-tr" aria-hidden="true"></div>
          <div class="nav-card-sub font-mono text-xs flex items-center justify-end gap-1">
            <span>{appState.lang === 'fr' ? 'PROJET SUIVANT' : 'NEXT PROJECT'}</span>
            <span class="nav-arrow">→</span>
          </div>
          <strong class="nav-proj-title font-heading">{nextProject.title}</strong>
          <span class="nav-proj-desc font-sans text-xs">{nextProject.category[appState.lang]}</span>
        </button>
      {/if}
    </footer>

  </div>

  {#if showEssWarning}
    <div class="ess-modal-backdrop" onclick={() => showEssWarning = false} onkeydown={(e) => e.key === 'Escape' && (showEssWarning = false)} role="dialog" aria-modal="true" tabindex="-1">
      <div class="ess-modal-window" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="document" tabindex="0">
        <div class="ess-modal-header">
          <span class="ess-modal-icon">⚠️</span>
          <div>
            <h3 class="ess-modal-title font-heading font-bold text-white">
              {appState.lang === 'fr' ? 'Avertissement — Projet en production partielle' : 'Notice — Partial Production Project'}
            </h3>
            <span class="font-mono text-xs text-amber-500">[ Statut : En exploitation ]</span>
          </div>
        </div>
        <p class="ess-modal-text font-sans">
          {appState.lang === 'fr'
            ? "Ce projet a été réalisé dans le cadre d'un stage d'un mois pour le PTCE. Bien qu'actuellement en service et que les ayants droit soient pleinement satisfaits des fonctionnalités de réservation délivrées, le développement n'a pas pu être finalisé à 100% par l'équipe, ce qui engendre des saccades et des ralentissements de rendu en production."
            : "This platform was built during a 1-month internship for the PTCE. While currently live in production and meeting stakeholder operational needs, development could not be fully finalized by the team, resulting in occasional rendering stutters."}
        </p>
        <div class="ess-modal-notice font-mono text-xs">
          {appState.lang === 'fr'
            ? "Il s'agit de problèmes connus d'optimisation frontend qui peuvent être résolus en un seul déploiement de refonte."
            : "These are known frontend optimization issues that can be resolved in a single deployment update."}
        </div>
        <div class="ess-modal-buttons font-mono text-xs">
          <button 
            type="button" 
            class="btn-ess-cancel"
            onclick={() => showEssWarning = false}
          >
            {appState.lang === 'fr' ? 'Annuler' : 'Cancel'}
          </button>
          <a 
            href={project.url} 
            target="_blank" 
            rel="noreferrer"
            class="btn-ess-proceed"
            onclick={() => showEssWarning = false}
          >
            <span>{appState.lang === 'fr' ? 'Continuer vers le site' : 'Proceed to site'}</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .project-page-container {
    padding-top: 6.5rem;
    padding-bottom: 5.5rem;
    min-height: 100vh;
    background-color: #030306;
    position: relative;
    overflow: hidden;
  }

  .project-page-inner {
    display: flex;
    flex-direction: column;
    gap: 2.25rem;
  }

  /* 1. Sober Back Button */
  .project-nav-bar {
    display: flex;
    align-items: center;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    background: none;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    padding: 0;
    transition: color 150ms ease;
  }

  .back-btn:hover {
    color: #ffffff;
  }

  :global(.back-arrow) {
    transition: transform 150ms ease;
  }

  .back-btn:hover :global(.back-arrow) {
    transform: translateX(-3px);
  }

  /* 2. Compact Project Header */
  .project-header {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  .project-headline-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .project-title-cluster {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .project-title {
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #ffffff;
    line-height: 1.1;
  }

  .project-status-tag {
    display: inline-block;
    padding: 0.25rem 0.55rem;
    background: #0d0d14;
    border: 1px solid #28283c;
    border-radius: 0;
    color: #ffffff;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .btn-visit-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1rem;
    background: #141420;
    border: 1px solid #333348;
    border-radius: 0;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    transition: background 100ms ease, color 100ms ease, border-color 100ms ease;
  }

  .btn-visit-primary:hover {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }

  .project-tagline {
    font-size: 1.15rem;
    color: #e4e4e7;
    line-height: 1.6;
    max-width: 920px;
  }

  /* 3. Minimalist Inline Metadata (NO Heavy Box) */
  .project-meta-inline {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .meta-item {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
  }

  .meta-k {
    color: #888899;
    white-space: nowrap;
  }

  .meta-v {
    color: #ffffff;
    font-weight: 600;
  }

  .meta-sep {
    color: #444455;
  }

  @media (max-width: 768px) {
    .project-headline-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .btn-visit-primary {
      width: 100%;
      justify-content: center;
      padding-block: 0.75rem;
    }

    .project-meta-inline {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 1rem;
      row-gap: 0.75rem;
      width: 100%;
      padding: 0.95rem 1.15rem;
      background: #09090f;
      border: 1px solid #1c1c28;
      border-radius: var(--radius-xs);
    }

    .meta-sep {
      display: none;
    }

    .meta-item {
      display: contents;
    }

    .meta-k {
      white-space: nowrap;
      color: #888899;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .meta-v {
      color: #ffffff;
      font-weight: 600;
      word-break: break-word;
      line-height: 1.4;
    }
  }

  /* 4. Showcase Frame */
  .project-showcase-frame {
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-sm);
    background: #08080c;
    overflow: hidden;
  }

  .showcase-topbar {
    padding: 0.75rem 1.25rem;
    background: #0e0e16;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .showcase-switchers {
    display: flex;
    gap: 0.4rem;
  }

  .switcher-tab {
    background: #181824;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #a1a1aa;
    padding: 0.25rem 0.65rem;
    border-radius: var(--radius-xs);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .switcher-tab.active, .switcher-tab:hover {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }

  .showcase-image-holder {
    position: relative;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .showcase-img {
    width: 100%;
    height: auto;
    max-height: 82vh;
    object-fit: contain;
    display: block;
    -webkit-user-drag: none;
    user-select: none;
  }

  /* 5. Case Study 2-Col Grid */
  .case-study-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  @media (max-width: 900px) {
    .case-study-grid {
      grid-template-columns: 1fr;
    }
  }

  .case-left-col {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .case-block {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .case-block-title {
    font-size: 1.45rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.015em;
  }

  .case-block-text {
    font-size: 1.02rem;
    line-height: 1.75;
    color: #d4d4d8;
  }

  .case-solutions-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .solution-item {
    display: flex;
    gap: 0.85rem;
    align-items: flex-start;
    color: #d4d4d8;
    font-size: 0.96rem;
    line-height: 1.6;
  }

  .solution-check {
    width: 22px;
    height: 22px;
    border-radius: var(--radius-xs);
    background: #181824;
    border: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 0.15rem;
  }

  .case-right-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .sidebar-block {
    background: #09090f;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: var(--radius-xs);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .sidebar-heading {
    letter-spacing: 0.08em;
    color: #a1a1aa;
    font-weight: 600;
  }

  .arch-specs-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .arch-entry {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .arch-k {
    color: #a1a1aa;
    font-size: 0.72rem;
  }

  .arch-v {
    color: #ffffff;
    font-size: 0.88rem;
    line-height: 1.45;
  }

  .tech-stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tech-stack-pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.65rem;
    background: #14141e;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-xs);
    color: #ffffff;
  }

  .sidebar-visit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem;
    background: #141420;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--radius-xs);
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition-fast);
  }

  .sidebar-visit-btn:hover {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }

  /* 6. Bottom Nav with Pixel Art Accents */
  .project-bottom-nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 1rem;
  }

  .nav-project-card {
    padding: 1.4rem 1.65rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    background: #09090f;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-xs);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }

  /* Pixel notch stepped pattern on corners */
  .pixel-notch-tl, .pixel-notch-tr {
    position: absolute;
    width: 12px;
    height: 12px;
    pointer-events: none;
  }

  .pixel-notch-tl {
    top: 0;
    left: 0;
    background: 
      linear-gradient(to bottom, #ffffff 4px, transparent 4px),
      linear-gradient(to right, #ffffff 4px, transparent 4px);
    opacity: 0.4;
  }

  .pixel-notch-tr {
    top: 0;
    right: 0;
    background: 
      linear-gradient(to bottom, #ffffff 4px, transparent 4px),
      linear-gradient(to left, #ffffff 4px, transparent 4px);
    opacity: 0.4;
  }

  .nav-project-card:hover {
    background: #12121c;
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  }

  .nav-project-card:hover .pixel-notch-tl,
  .nav-project-card:hover .pixel-notch-tr {
    opacity: 1;
  }

  .nav-card-sub {
    letter-spacing: 0.06em;
    color: #a1a1aa;
  }

  .nav-proj-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
  }

  .nav-proj-desc {
    color: #a1a1aa;
  }

  .nav-arrow {
    display: inline-block;
    transition: transform 150ms ease;
  }

  .prev-card:hover .nav-arrow {
    transform: translateX(-4px);
  }

  .next-card:hover .nav-arrow {
    transform: translateX(4px);
  }

  .ess-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
  .ess-modal-window {
    background: #09090e;
    border: 1px solid #27272a;
    border-radius: 12px;
    max-width: 520px;
    width: 100%;
    padding: 24px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
  }
  .ess-modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .ess-modal-icon {
    font-size: 1.5rem;
  }
  .ess-modal-title {
    font-size: 1.1rem;
    margin: 0;
  }
  .ess-modal-text {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #d4d4d8;
    margin-bottom: 16px;
  }
  .ess-modal-notice {
    background: #121218;
    border-left: 3px solid #f59e0b;
    padding: 10px 14px;
    color: #a1a1aa;
    margin-bottom: 24px;
    border-radius: 4px;
  }
  .ess-modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  .btn-ess-cancel {
    background: transparent;
    border: 1px solid #3f3f46;
    color: #e4e4e7;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
  }
  .btn-ess-cancel:hover {
    background: #18181b;
  }
  .btn-ess-proceed {
    background: #f59e0b;
    color: #000000;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
  }
  .btn-ess-proceed:hover {
    background: #fbbf24;
  }
</style>
