<script lang="ts">
  import { appState } from '../data/i18n.svelte';
  import { DEVELOPER_PROFILE, PROJECTS_DATA, TECHNICAL_SKILLS } from '../data/portfolioData';
  import OfficialIcon from './OfficialIcon.svelte';
  import { X, Printer, Download, ExternalLink, FileText, Check } from 'lucide-svelte';

  const handlePrint = () => {
    window.print();
  };

  $effect(() => {
    if (appState.isResumeOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  });
</script>

{#if appState.isResumeOpen}
  <div 
    class="resume-overlay" 
    role="dialog" 
    aria-modal="true" 
    onclick={() => appState.closeResume()} 
    onkeydown={(e) => e.key === 'Escape' && appState.closeResume()} 
    tabindex="-1"
  >
    <div 
      class="resume-modal" 
      role="document" 
      onclick={(e) => e.stopPropagation()} 
      onkeydown={(e) => e.stopPropagation()} 
      tabindex="-1"
    >
      
      <!-- Top Action Bar (No Print) -->
      <div class="resume-toolbar no-print">
        <div class="flex items-center gap-2">
          <FileText size={16} class="text-white" />
          <span class="font-heading font-bold text-sm text-white">
            {appState.lang === 'fr' ? 'Dossier de Compétences : Cronos' : 'Developer Dossier : Cronos'}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <a 
            href="/cv-cronos.pdf" 
            download="CV-Cronos.pdf" 
            class="btn btn-primary btn-sm"
          >
            <Download size={13} />
            <span>{appState.lang === 'fr' ? 'Télécharger PDF' : 'Download PDF'}</span>
          </a>

          <button type="button" class="btn btn-secondary btn-sm" onclick={handlePrint}>
            <Printer size={13} />
            <span>{appState.lang === 'fr' ? 'Imprimer' : 'Print'}</span>
          </button>

          <button type="button" class="btn-close" onclick={() => appState.closeResume()} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>
      </div>

      <!-- Printable Resume Sheet Content -->
      <div class="resume-sheet">
        
        <!-- Sheet Header -->
        <header class="sheet-header">
          <div class="sheet-brand">
            <h1 class="sheet-name font-heading">{DEVELOPER_PROFILE.pseudonym}</h1>
            <p class="sheet-subtitle font-mono">
              {appState.lang === 'fr' 
                ? 'Développeur Full-Stack (SvelteKit & Rust) / Terminale Bac Pro CIEL' 
                : 'Full-Stack Developer (SvelteKit & Rust) / Senior Bac Pro CIEL'}
            </p>
          </div>

          <div class="sheet-contact-box font-mono text-xs text-muted">
            <div>{DEVELOPER_PROFILE.location[appState.lang]}</div>
            <div>Email : {DEVELOPER_PROFILE.email}</div>
            <div>Discord : @{DEVELOPER_PROFILE.discordTag}</div>
            <div>GitHub : github.com/{DEVELOPER_PROFILE.githubUser}</div>
          </div>
        </header>

        <!-- Profile & Education -->
        <section class="sheet-section">
          <h2 class="sheet-sec-title font-mono">{appState.lang === 'fr' ? 'PROFIL & FORMATION' : 'PROFILE & EDUCATION'}</h2>
          <p class="sheet-text font-bold mb-1">
            {DEVELOPER_PROFILE.education[appState.lang]}
          </p>
          <p class="sheet-text">
            {DEVELOPER_PROFILE.bio[appState.lang]}
          </p>
        </section>

        <!-- Projects -->
        <section class="sheet-section">
          <h2 class="sheet-sec-title font-mono">{appState.lang === 'fr' ? 'RÉALISATIONS & PROJETS' : 'PROJECTS & EXPERIENCE'}</h2>
          
          <div class="sheet-projects-list">
            {#each PROJECTS_DATA as proj}
              <div class="sheet-project-item">
                <div class="sheet-proj-header">
                  <div>
                    <strong class="sheet-proj-name font-heading">{proj.title}</strong>
                    <span class="sheet-proj-role font-mono text-xs"> / {proj.role[appState.lang]}</span>
                  </div>
                  <span class="sheet-proj-year font-mono">{proj.year}</span>
                </div>

                <p class="sheet-proj-desc">{proj.summary[appState.lang]}</p>

                <div class="sheet-highlights">
                  <ul>
                    {#each proj.theSolution[appState.lang].slice(0, 2) as hl}
                      <li>• {hl}</li>
                    {/each}
                  </ul>
                </div>

                <div class="sheet-stack font-mono text-xs">
                  <strong>Stack :</strong> {proj.stack.map(s => s.name).join(' / ')}
                </div>
              </div>
            {/each}
          </div>
        </section>

        <!-- Skills -->
        <section class="sheet-section">
          <h2 class="sheet-sec-title font-mono">{appState.lang === 'fr' ? 'COMPÉTENCES TECHNIQUES' : 'TECHNICAL SKILLS'}</h2>
          
          <div class="sheet-skills-grid font-mono text-xs">
            {#each TECHNICAL_SKILLS as skill}
              <div class="sheet-skill-col">
                <strong class="text-white">{skill.name}</strong>
                <p class="font-sans text-muted">{skill.description[appState.lang]}</p>
              </div>
            {/each}
          </div>
        </section>

        <footer class="sheet-footer font-mono text-xs text-muted">
          <span>Dossier de compétences : Cronos</span>
          <span>Fichier source : /cv-cronos.pdf</span>
        </footer>

      </div>

    </div>
  </div>
{/if}

<style>
  .resume-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.94);
    z-index: 260;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    overflow-y: auto;
  }

  .resume-modal {
    width: 100%;
    max-width: 820px;
    max-height: 90vh;
    background: #0a0a0a;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .resume-toolbar {
    padding: 0.75rem 1.5rem;
    background: #111111;
    border-bottom: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .btn-close {
    cursor: pointer;
    background: none;
    border: none;
    color: var(--text-muted);
    padding: 4px;
    display: flex;
    align-items: center;
  }

  .btn-close:hover {
    color: #ffffff;
  }

  .resume-sheet {
    padding: 2.25rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #0a0a0a;
    color: #ffffff;
  }

  .sheet-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid var(--border-subtle);
    padding-bottom: 1.15rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .sheet-name {
    font-size: 1.85rem;
    font-weight: 800;
    color: #ffffff;
  }

  .sheet-subtitle {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-top: 0.2rem;
  }

  .sheet-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sheet-sec-title {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #ffffff;
    border-bottom: 1px solid var(--border-subtle);
    padding-bottom: 0.25rem;
  }

  .sheet-text {
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .sheet-projects-list {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  .sheet-project-item {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .sheet-proj-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .sheet-proj-name {
    font-size: 0.98rem;
    color: #ffffff;
  }

  .sheet-proj-role {
    color: var(--text-secondary);
  }

  .sheet-proj-year {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .sheet-proj-desc {
    font-size: 0.84rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .sheet-highlights ul {
    list-style: none;
    font-size: 0.78rem;
    color: var(--text-secondary);
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin-left: 0.5rem;
  }

  .sheet-stack {
    color: #ffffff;
    margin-top: 0.15rem;
  }

  .sheet-skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }

  @media (max-width: 640px) {
    .sheet-skills-grid {
      grid-template-columns: 1fr;
    }
  }

  .sheet-skill-col {
    background: #050505;
    border: 1px solid var(--border-subtle);
    padding: 0.75rem;
    border-radius: var(--radius-xs);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .sheet-footer {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--border-subtle);
    padding-top: 0.85rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
