<script lang="ts">
  import { appState } from '../data/i18n.svelte';
  import { PROJECTS_DATA } from '../data/portfolioData';
  import OfficialIcon from './OfficialIcon.svelte';
  import PixelIntersectionPattern from './PixelIntersectionPattern.svelte';
  import { ArrowRight, ArrowUpRight } from 'lucide-svelte';
</script>

<section class="section-wrapper" id="projects">
  <div class="container projects-container">
    
    <div class="projects-heading-block">
      <div class="section-label font-mono text-xs flex items-center gap-2">
        <PixelIntersectionPattern size="sm" />
        <span>{appState.lang === 'fr' ? 'RÉALISATIONS DÉTAILLÉES' : 'DETAILED CASE STUDIES'}</span>
      </div>
      <h2 class="section-title">
        {appState.lang === 'fr' ? 'Études de Cas' : 'Featured Projects'}
      </h2>
      <p class="section-description font-sans">
        {appState.lang === 'fr'
          ? 'Analyse approfondie des architectures, défis techniques et solutions déployées sur chaque projet.'
          : 'In-depth breakdown of architecture, technical challenges, and production engineering across projects.'}
      </p>
    </div>

    <!-- 3-Column Widescreen Visual Grid -->
    <div class="widescreen-projects-grid">
      {#each PROJECTS_DATA as project}
        <article class="project-card-wide card-clean">
          
          <!-- Image Preview (Clickable) -->
          <button 
            type="button" 
            class="project-image-box"
            onclick={() => appState.navigateToProject(project.slug)}
            aria-label="Ouvrir l'étude de cas de {project.title}"
          >
            <img 
              src={project.images.hero} 
              alt="{project.title} interface capture" 
              class="project-screenshot-img"
              loading="lazy"
              draggable="false"
            />
          </button>

          <!-- Project Information -->
          <div class="project-body">
            <div class="project-meta-strip font-mono text-xs">
              <span class="project-period-tag text-white font-bold">{project.period}</span>
              <span class="project-badge-tag text-muted">({project.badge[appState.lang]})</span>
            </div>

            <h3 class="project-card-title font-heading">
              <button 
                type="button" 
                class="title-btn"
                onclick={() => appState.navigateToProject(project.slug)}
              >
                {project.title}
              </button>
            </h3>

            <p class="project-card-desc">{project.summary[appState.lang]}</p>

            <!-- Tech Stack Icons -->
            <div class="project-card-stack">
              {#each project.stack as tech}
                <div class="stack-chip font-mono text-xs" title={tech.name}>
                  <OfficialIcon name={tech.icon} size={14} />
                  <span>{tech.name}</span>
                </div>
              {/each}
            </div>

            <!-- Card Actions -->
            <div class="project-card-actions">
              <button 
                type="button" 
                class="btn btn-primary btn-sm font-mono" 
                onclick={() => appState.navigateToProject(project.slug)}
              >
                <span>{appState.lang === 'fr' ? 'Étude de cas complète' : 'Full case study'}</span>
                <ArrowRight size={13} />
              </button>

              {#if project.url}
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  class="btn btn-secondary btn-sm font-mono"
                >
                  <span>{appState.lang === 'fr' ? 'Visiter le site' : 'Live site'}</span>
                  <ArrowUpRight size={13} />
                </a>
              {/if}
            </div>

          </div>

        </article>
      {/each}
    </div>

    <!-- Section bottom pixel art divider -->
    <div class="projects-bottom-divider">
      <PixelIntersectionPattern size="divider" />
    </div>

  </div>
</section>

<style>
  .projects-bottom-divider {
    margin-top: 4rem;
  }
  .projects-heading-block {
    margin-bottom: 2.5rem;
  }

  .widescreen-projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  @media (max-width: 1100px) {
    .widescreen-projects-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  .project-card-wide {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
  }

  .project-card-wide:hover {
    transform: translateY(-3px);
    border-color: #333333;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
  }

  .project-image-box {
    width: 100%;
    aspect-ratio: 16 / 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    border: none;
    border-bottom: 1px solid var(--border-subtle);
    cursor: pointer;
    overflow: hidden;
    padding: 0;
  }

  .project-screenshot-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .project-body {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  .project-meta-strip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .project-period-tag {
    font-size: 0.8rem;
  }

  .project-badge-tag {
    font-size: 0.75rem;
  }

  .project-card-title {
    font-size: 1.45rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .title-btn {
    background: none;
    border: none;
    color: #ffffff;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }

  .title-btn:hover {
    text-decoration: underline;
  }

  .project-card-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-secondary);
    flex: 1;
  }

  .project-card-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding-block: 0.25rem;
  }

  .stack-chip {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.55rem;
    background: #121212;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xs);
    color: #e5e5e5;
  }

  .section-wrapper {
    position: relative;
    background-color: #050508;
    padding-top: 5rem;
    padding-bottom: 5.5rem;
  }

  .projects-container {
    position: relative;
    z-index: 1;
  }

  .project-card-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-subtle);
    flex-wrap: wrap;
  }
</style>
