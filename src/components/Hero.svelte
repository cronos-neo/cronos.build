<script lang="ts">
  import { appState } from '../data/i18n.svelte';
  import { DEVELOPER_PROFILE } from '../data/portfolioData';
  import HeroLaptopShowcase from './HeroLaptopShowcase.svelte';
  import HeroPixelBackground from './HeroPixelBackground.svelte';
  import { Download, Mail, Check, ExternalLink, ChevronDown } from 'lucide-svelte';

  let copiedEmail = $state(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
      copiedEmail = true;
      appState.showToast(`Email copié : ${DEVELOPER_PROFILE.email}`);
      setTimeout(() => (copiedEmail = false), 2500);
    } catch {
      window.location.href = `mailto:${DEVELOPER_PROFILE.email}`;
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
</script>

<section class="hero-section" id="top">
  <!-- Large Pixel Art Dither Wave Canvas Background -->
  <HeroPixelBackground />

  <div class="container hero-grid">
    
    <!-- Left Column: Direct & Pure Presentation -->
    <div class="hero-left">
      
      <!-- Main Identity -->
      <div class="hero-heading-group">
        <h1 class="hero-name font-heading">Cronos</h1>
        <p class="hero-role font-mono">
          {appState.lang === 'fr' 
            ? 'Développeur Full-Stack · SvelteKit & Rust' 
            : 'Full-Stack Developer · SvelteKit & Rust'}
        </p>
      </div>

      <!-- Concise, Direct Pitch -->
      <p class="hero-lead font-sans">
        {DEVELOPER_PROFILE.pitch[appState.lang]}
      </p>

      <!-- Action Buttons -->
      <div class="hero-actions-row">
        <!-- 1. Primary Action -->
        <button 
          type="button" 
          class="btn btn-primary font-mono" 
          onclick={copyEmail}
          title="Copier mon adresse email"
        >
          {#if copiedEmail}
            <Check size={14} class="text-emerald" />
            <span>Email copié</span>
          {:else}
            <Mail size={14} />
            <span>Me contacter</span>
          {/if}
        </button>

        <!-- 2. Secondary Action -->
        <a 
          href="/cv-cronos.pdf" 
          download="CV-Cronos.pdf" 
          class="btn btn-secondary font-mono"
        >
          <Download size={14} />
          <span>CV (PDF)</span>
        </a>

        <!-- Inline Social Links -->
        <div class="hero-inline-links font-mono text-xs">
          <a href={DEVELOPER_PROFILE.githubUrl} target="_blank" rel="noreferrer" class="inline-link">
            <span>GitHub</span>
            <ExternalLink size={10} />
          </a>
          <span class="link-divider">·</span>
          <a href={DEVELOPER_PROFILE.discordUrl} target="_blank" rel="noreferrer" class="inline-link">
            <span>Discord</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

    </div>

    <!-- Right Column: Bespoke 3D Perspective Hardware Showcase -->
    <div class="hero-right">
      <HeroLaptopShowcase />
    </div>

  </div>

  <!-- Mobile Scroll Invitation (Shown only on mobile to invite scrolling down) -->
  <div class="mobile-scroll-invite-wrap">
    <button 
      type="button" 
      class="mobile-scroll-btn font-mono text-xs" 
      onclick={scrollToAbout}
      aria-label="Faire défiler vers le bas"
    >
      <span>{appState.lang === 'fr' ? 'Découvrir le profil & les projets' : 'Explore profile & projects'}</span>
      <ChevronDown size={14} class="scroll-chevron-anim" />
    </button>
  </div>

</section>

<style>
  .hero-section {
    min-height: 92vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #000000;
    overflow: hidden;
    padding-top: 5rem;
    padding-bottom: 2.5rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: 3.5rem;
    align-items: center;
    width: 100%;
    position: relative;
    z-index: 2;
  }

  .hero-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    min-width: 0;
  }

  .mobile-scroll-invite-wrap {
    display: none;
  }

  /* Medium screens (768px to 1140px, including laptop windows & DevTools dock): PC is centered below text */
  @media (max-width: 1140px) and (min-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr;
      max-width: 640px;
      margin-inline: auto;
      gap: 2.5rem;
      text-align: center;
    }

    .hero-left {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero-actions-row {
      justify-content: center;
    }

    .hero-right {
      display: flex !important;
      justify-content: center;
      width: 100%;
    }
  }

  /* Small Mobile screens (< 768px phones): PC hidden for lightning performance */
  @media (max-width: 767px) {
    .hero-right {
      display: none !important; /* PC hidden on phones */
    }

    .hero-grid {
      grid-template-columns: 1fr;
      max-width: 580px;
      margin-inline: auto;
      gap: 1.5rem;
    }

    .hero-section {
      min-height: 84vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 5.5rem;
      padding-bottom: 2.5rem;
    }

    .mobile-scroll-invite-wrap {
      display: flex;
      justify-content: center;
      width: 100%;
      padding-top: 2rem;
      position: relative;
      z-index: 5;
    }

    .mobile-scroll-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.15rem;
      background: #0d0d14;
      border: 1px solid #28283c;
      border-radius: var(--radius-xs);
      color: #e4e4e7;
      cursor: pointer;
      font-weight: 600;
      letter-spacing: 0.03em;
      transition: all 150ms ease;
    }

    .mobile-scroll-btn:hover, .mobile-scroll-btn:active {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
    }

    :global(.scroll-chevron-anim) {
      animation: bounceDown 1.6s infinite ease-in-out;
    }

    @keyframes bounceDown {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(3px); }
    }
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .hero-heading-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .hero-name {
    font-size: clamp(3.4rem, 6.8vw, 5.2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #ffffff;
    line-height: 1.05;
  }

  .hero-role {
    font-size: 1.15rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .hero-lead {
    font-size: 1.05rem;
    line-height: 1.65;
    color: #c4c4cc;
    max-width: 520px;
  }

  .hero-actions-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding-top: 0.5rem;
  }

  .hero-inline-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-left: 0.5rem;
  }

  .inline-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .inline-link:hover {
    color: #ffffff;
  }

  .link-divider {
    color: #444450;
  }

  .hero-right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

</style>
