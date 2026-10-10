<script lang="ts">
  import { appState } from '../data/i18n.svelte';
  import { TECHNICAL_SKILLS } from '../data/portfolioData';
  import OfficialIcon from './OfficialIcon.svelte';
  import SkillModal from './SkillModal.svelte';
  import PixelIntersectionPattern from './PixelIntersectionPattern.svelte';

  type SkillItem = typeof TECHNICAL_SKILLS[number];
  let selectedSkill = $state<SkillItem | null>(null);

  const openSkill = (s: SkillItem) => {
    selectedSkill = s;
  };

  const closeSkill = () => {
    selectedSkill = null;
  };
</script>

<section class="section-wrapper" id="skills">
  <div class="container skills-container">
    
    <div class="skills-heading-block">
      <div class="section-label font-mono text-xs flex items-center gap-2">
        <PixelIntersectionPattern size="sm" />
        <span>{appState.lang === 'fr' ? 'ARSENAL TECHNIQUE' : 'TECHNICAL STACK'}</span>
      </div>
      <h2 class="section-title">
        {appState.lang === 'fr' ? 'Compétences Éprouvées' : 'Battle-Tested Stack'}
      </h2>
      <p class="section-description font-sans">
        {appState.lang === 'fr'
          ? 'Technologies maîtrisées et mises en œuvre sur des projets en production. Cliquez sur une compétence pour inspecter ses cas d’usage réels.'
          : 'Technologies mastered and leveraged across production applications. Click any skill to inspect where it was battle-tested.'}
      </p>
    </div>

    <!-- Clean Ultra-Smooth Grid (No Saccades, 60fps) -->
    <div class="skills-grid-clean">
      {#each TECHNICAL_SKILLS as skill}
        <button 
          type="button" 
          class="skill-card text-left" 
          onclick={() => openSkill(skill)}
          aria-label="Inspecter {skill.name}"
        >
          <div class="skill-top">
            <div class="skill-icon-wrap">
              <OfficialIcon name={skill.icon} size={20} />
            </div>
            <div class="skill-name-col">
              <h3 class="skill-name font-mono">{skill.name}</h3>
              <span class="skill-tag font-mono text-xs">{skill.category[appState.lang]}</span>
            </div>
          </div>

          <p class="skill-desc font-sans">{skill.description[appState.lang]}</p>
          
          <div class="skill-action-row font-mono text-xs">
            <span>{appState.lang === 'fr' ? 'Détails & Cas d’usage' : 'Details & Use Cases'}</span>
            <span class="skill-arrow">→</span>
          </div>
        </button>
      {/each}
    </div>

  </div>
</section>

<!-- Detailed Modal without Broken Favicons -->
<SkillModal skill={selectedSkill} onClose={closeSkill} />

<style>
  .section-wrapper {
    position: relative;
    background-color: #030306;
    padding-top: 5rem;
    padding-bottom: 5.5rem;
  }

  .skills-container {
    position: relative;
    z-index: 1;
  }

  .skills-heading-block {
    margin-bottom: 2.5rem;
  }

  .skills-grid-clean {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    .skills-grid-clean {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .skills-grid-clean {
      grid-template-columns: 1fr;
    }
  }

  /* Ultra-smooth hardware-accelerated cards with crisp high-contrast */
  .skill-card {
    padding: 1.65rem 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #0b0b10;
    border: 1px solid #20202e;
    border-radius: var(--radius-xs);
    cursor: pointer;
    transition: transform 90ms ease, border-color 90ms ease, background 90ms ease;
    transform: translateZ(0);
    will-change: transform;
    width: 100%;
    color: #ffffff;
  }

  .skill-card:hover {
    border-color: #ffffff;
    background: #151520;
    transform: translateY(-2px) translateZ(0);
  }

  .skill-top {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .skill-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: var(--radius-xs);
    background: #14141e;
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    flex-shrink: 0;
  }

  .skill-name-col {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .skill-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: #ffffff;
  }

  .skill-tag {
    color: #a1a1aa;
    letter-spacing: 0.02em;
  }

  .skill-desc {
    color: #d4d4d8;
    line-height: 1.6;
    font-size: 0.9rem;
    flex: 1;
  }

  .skill-action-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    color: #a1a1aa;
    font-size: 0.78rem;
  }

  .skill-arrow {
    color: #ffffff;
    transition: transform 120ms ease;
  }

  .skill-card:hover .skill-arrow {
    transform: translateX(3px);
  }
</style>
