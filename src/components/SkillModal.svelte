<script lang="ts">
  import { appState } from '../data/i18n.svelte';
  import type { TECHNICAL_SKILLS } from '../data/portfolioData';
  import OfficialIcon from './OfficialIcon.svelte';
  import { X, ArrowRight } from 'lucide-svelte';

  type SkillItem = typeof TECHNICAL_SKILLS[number];

  let { skill, onClose } = $props<{
    skill: SkillItem | null;
    onClose: () => void;
  }>();

  const handleJumpToProject = (slug: string) => {
    onClose();
    appState.navigateToProject(slug);
  };

  $effect(() => {
    if (skill) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  });
</script>

{#if skill}
  <!-- Solid Dark Overlay: NO TRANSPARENCY, NO BLUR (Instant 60fps) -->
  <div 
    class="skill-modal-overlay" 
    role="dialog" 
    aria-modal="true" 
    onclick={onClose} 
    onkeydown={(e) => e.key === 'Escape' && onClose()} 
    tabindex="-1"
  >
    <div 
      class="skill-modal-card" 
      role="document" 
      onclick={(e) => e.stopPropagation()} 
      onkeydown={(e) => e.stopPropagation()} 
      tabindex="-1"
    >
      
      <!-- Modal Header: Solid Opaque Dark Surface -->
      <div class="skill-modal-header">
        <div class="flex items-center gap-3">
          <div class="skill-modal-icon">
            <OfficialIcon name={skill.icon} size={22} color="#ffffff" />
          </div>
          <div>
            <h3 class="skill-modal-title font-mono">{skill.name}</h3>
            <span class="skill-modal-cat font-mono text-xs">{skill.category[appState.lang]}</span>
          </div>
        </div>

        <button type="button" class="btn-close" onclick={onClose} aria-label="Fermer la boîte de dialogue">
          <X size={18} />
        </button>
      </div>

      <!-- Modal Body: Solid High-Contrast Content -->
      <div class="skill-modal-body">
        
        <div class="spec-section">
          <h4 class="spec-subhead font-mono text-xs">UTILISATION & RÔLE TECHNIQUE</h4>
          <p class="spec-text font-sans">{skill.description[appState.lang]}</p>
        </div>

        {#if skill.usedIn && skill.usedIn.length > 0}
          <div class="spec-section">
            <h4 class="spec-subhead font-mono text-xs">PROJETS DE PRODUCTION ASSOCIÉS</h4>
            
            <div class="projects-jump-list">
              {#each skill.usedIn as p}
                <button 
                  type="button" 
                  class="project-jump-row"
                  onclick={() => handleJumpToProject(p.slug)}
                >
                  <div class="project-info">
                    <span class="project-name font-heading">{p.name}</span>
                    <span class="project-hint font-mono text-xs">
                      {appState.lang === 'fr' ? 'Consulter l’étude de cas complète' : 'View full case study'}
                    </span>
                  </div>

                  <div class="jump-arrow font-mono text-xs">
                    <span>{appState.lang === 'fr' ? 'Ouvrir' : 'Open'}</span>
                    <ArrowRight size={13} />
                  </div>
                </button>
              {/each}
            </div>
          </div>
        {/if}

      </div>

    </div>
  </div>
{/if}

<style>
  /* 100% Solid Overlay - ZERO BLUR, ZERO TRANSLUCENCY, ZERO LAG */
  .skill-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  /* Solid Opaque Card */
  .skill-modal-card {
    width: 100%;
    max-width: 520px;
    background: #0d0d12;
    border: 1px solid #2a2a38;
    border-radius: var(--radius-xs);
    overflow: hidden;
    color: #ffffff;
  }

  .skill-modal-header {
    padding: 1.25rem 1.5rem;
    background: #14141e;
    border-bottom: 1px solid #222230;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .skill-modal-icon {
    width: 38px;
    height: 38px;
    background: #08080d;
    border: 1px solid #333348;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    flex-shrink: 0;
  }

  .skill-modal-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff !important;
  }

  .skill-modal-cat {
    color: #a1a1aa;
    letter-spacing: 0.04em;
  }

  .btn-close {
    background: none;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    padding: 6px;
    display: flex;
    transition: color 80ms ease;
  }

  .btn-close:hover {
    color: #ffffff;
  }

  .skill-modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #0d0d12;
  }

  .spec-section {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .spec-subhead {
    letter-spacing: 0.08em;
    color: #a1a1aa;
    font-weight: 600;
  }

  .spec-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #e4e4e7;
  }

  .projects-jump-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  /* Instant rollover with solid colors - NO TRANSITION LAG */
  .project-jump-row {
    width: 100%;
    padding: 0.85rem 1.15rem;
    background: #14141e;
    border: 1px solid #252535;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    text-align: left;
    color: #ffffff;
  }

  .project-jump-row:hover {
    background: #202030;
    border-color: #ffffff;
  }

  .project-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .project-name {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff !important;
  }

  .project-hint {
    color: #a1a1aa;
  }

  .jump-arrow {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.65rem;
    background: #09090f;
    border: 1px solid #333348;
    color: #ffffff;
    font-weight: 500;
  }

  .project-jump-row:hover .jump-arrow {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }
</style>
