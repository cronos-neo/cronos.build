<script lang="ts">
  import { onMount } from 'svelte';
  import { appState } from '../data/i18n.svelte';
  import CronosLogo from './CronosLogo.svelte';
  import { Terminal, Download, Globe } from 'lucide-svelte';

  let scrolled = $state(false);
  let activeSection = $state('');

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;

      // Check if user is scrolled near bottom of page -> contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        activeSection = 'contact';
        return;
      }

      const sections = ['contact', 'skills', 'projects', 'about'];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          activeSection = id;
          return;
        }
      }
      activeSection = '';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const navLinks = $derived([
    { id: 'about', href: '#about', label: appState.lang === 'fr' ? 'À propos' : 'About' },
    { id: 'projects', href: '#projects', label: appState.lang === 'fr' ? 'Projets' : 'Projects' },
    { id: 'skills', href: '#skills', label: appState.lang === 'fr' ? 'Compétences' : 'Skills' },
    { id: 'contact', href: '#contact', label: 'Contact' },
  ]);
</script>

<header class="navbar" class:navbar-scrolled={scrolled}>
  <div class="container navbar-inner">
    
    <!-- Clean Brand without circle or hash -->
    <a 
      href="/" 
      class="brand-link" 
      onclick={(e) => {
        e.preventDefault();
        appState.navigateToHome();
      }} 
      aria-label="Accueil cronos.build"
    >
      <CronosLogo size={20} />
      <span class="brand-domain font-mono">cronos.build</span>
    </a>

    <!-- Nav Links with Real-Time Active State & Clean Smooth Scroll -->
    <nav class="nav-links">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="nav-link font-mono" 
          class:active={activeSection === link.id}
          onclick={(e) => {
            e.preventDefault();
            if (appState.activeProjectSlug) {
              appState.navigateToHome();
              setTimeout(() => {
                const el = document.getElementById(link.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 60);
            } else {
              const el = document.getElementById(link.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Actions -->
    <div class="nav-actions">
      <!-- Language Switcher -->
      <button 
        type="button"
        class="action-btn font-mono" 
        onclick={() => appState.toggleLang()}
        title={appState.lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
        aria-label="Changer de langue"
      >
        <Globe size={13} />
        <span>{appState.lang.toUpperCase()}</span>
      </button>

      <!-- Terminal Trigger -->
      <button 
        type="button"
        class="action-btn font-mono" 
        onclick={() => appState.openTerminal()}
        title="Ouvrir le terminal"
        aria-label="Ouvrir le terminal"
      >
        <Terminal size={13} />
        <span>CLI</span>
      </button>

      <!-- Resume Download -->
      <a 
        href="/cv-cronos.pdf" 
        download="CV-Cronos.pdf"
        class="btn btn-primary btn-sm font-mono nav-cv-btn"
        title="Télécharger le CV"
      >
        <Download size={13} />
        <span>CV<span class="cv-pdf-suffix"> (PDF)</span></span>
      </a>
    </div>

  </div>
</header>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding-block: 1.15rem;
    background: #000000;
    border-bottom: 1px solid #141414;
    transition: background 150ms ease, padding 150ms ease;
  }

  .navbar-scrolled {
    padding-block: 0.75rem;
    background: #000000;
    border-bottom: 1px solid var(--border-subtle);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .brand-link {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    text-decoration: none;
    color: #ffffff;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0.2rem 0;
    transition: opacity var(--transition-fast);
  }

  .brand-link:hover {
    opacity: 0.85;
  }

  .brand-domain {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 720px) {
    .nav-links {
      display: none;
    }
  }

  .nav-link {
    font-size: 0.82rem;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 0.35rem 0.65rem;
    border-bottom: 2px solid transparent;
    transition: color var(--transition-fast), border-color var(--transition-fast);
  }

  .nav-link:hover {
    color: #ffffff;
  }

  .nav-link.active {
    color: #ffffff;
    font-weight: 700;
    border-bottom-color: #ffffff;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .nav-cv-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    padding: 0.35rem 0.65rem;
    background: #0d0d0d;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xs);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    flex-shrink: 0;
  }

  .action-btn:hover {
    color: #ffffff;
    border-color: var(--border-medium);
  }

  @media (max-width: 640px) {
    .navbar-inner {
      gap: 0.5rem;
      padding-inline: 0.75rem;
    }

    .brand-domain {
      font-size: 0.88rem;
    }

    .nav-actions {
      gap: 0.35rem;
    }

    .action-btn {
      padding: 0.3rem 0.45rem;
      font-size: 0.7rem;
    }

    .nav-cv-btn {
      padding: 0.3rem 0.55rem;
      font-size: 0.75rem;
    }

    .cv-pdf-suffix {
      display: none;
    }
  }
</style>
