<script lang="ts">
  import { appState } from './data/i18n.svelte';
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import AboutSection from './components/AboutSection.svelte';
  import ProjectsSection from './components/ProjectsSection.svelte';
  import ProjectPage from './components/ProjectPage.svelte';
  import SkillsSection from './components/SkillsSection.svelte';
  import TerminalDrawer from './components/TerminalDrawer.svelte';
  import ResumeModal from './components/ResumeModal.svelte';
  import Footer from './components/Footer.svelte';

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        appState.toggleTerminal();
      }
      if (e.key === 'Escape') {
        if (appState.isTerminalOpen) appState.closeTerminal();
        if (appState.isResumeOpen) appState.closeResume();
      }
    });
  }
</script>

<!-- Top Navbar -->
<Navbar />

<main>
  {#if appState.activeProjectSlug}
    <!-- Dedicated Full Project Case Study Page -->
    <ProjectPage slug={appState.activeProjectSlug} />
  {:else}
    <!-- Main Home Page with Seamless, Elegant Atmospheric Transitions -->
    <Hero />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
  {/if}
</main>

<!-- Minimalist Footer -->
<Footer />

<!-- UNIX Terminal Drawer (CLI) -->
<TerminalDrawer />

<!-- Resume / CV Modal -->
<ResumeModal />

<!-- Notification Toasts -->
<div class="toast-container" aria-live="polite">
  {#each appState.toasts as toast (toast.id)}
    <div class="toast-item animate-fade-in font-mono text-xs">
      <span>{toast.message}</span>
    </div>
  {/each}
</div>

<style>
  main {
    position: relative;
    min-height: 80vh;
  }

  .toast-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 300;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
  }

  .toast-item {
    padding: 0.65rem 1rem;
    border-radius: var(--radius-xs);
    background: #141414;
    border: 1px solid var(--border-medium);
    color: #ffffff;
    pointer-events: auto;
  }
</style>
