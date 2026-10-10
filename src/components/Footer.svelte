<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { appState } from '../data/i18n.svelte';
  import { DEVELOPER_PROFILE } from '../data/portfolioData';
  import CronosLogo from './CronosLogo.svelte';
  import OfficialIcon from './OfficialIcon.svelte';
  import { ExternalLink, Download, Mail } from 'lucide-svelte';

  let pixelCanvasRef: HTMLCanvasElement;
  let animId: number;

  onMount(() => {
    if (!pixelCanvasRef) return;
    const ctx = pixelCanvasRef.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const PIXEL_SIZE = 14; // Crisp retro-modern pixel art cell size

    // Precomputed color look-up table to eliminate string allocations in the animation loop
    const LUT_SIZE = 64;
    const fillLUT = new Array(LUT_SIZE);
    for (let i = 0; i < LUT_SIZE; i++) {
      const prog = i / (LUT_SIZE - 1);
      const lightness = Math.floor(25 + prog * 50);
      const alpha = Math.min(0.85, Math.max(0.1, prog * 0.75 + 0.1));
      fillLUT[i] = `rgba(${lightness + 20}, ${lightness + 20}, ${lightness + 30}, ${alpha.toFixed(3)})`;
    }

    const resize = () => {
      const parent = pixelCanvasRef.parentElement || document.body;
      width = parent.clientWidth;
      height = 112; // Exactly 8 rows of 14px pixel squares
      pixelCanvasRef.width = width;
      pixelCanvasRef.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let isVisible = false;
    let isRunning = false;

    const render = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }
      isRunning = true;
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / PIXEL_SIZE);
      const rows = Math.ceil(height / PIXEL_SIZE);

      for (let r = 0; r < rows; r++) {
        // Vertical gradient factor: Top is nearly transparent, bottom denser
        const rowProgress = r / rows;

        for (let c = 0; c < cols; c++) {
          // Pixel noise & smooth wave pattern
          const noise = Math.sin(c * 0.25 + time * 0.6) * Math.cos(r * 0.4 - time * 0.4);
          const threshold = 1 - rowProgress * 0.85;

          // Pseudorandom dither pattern based on coordinates
          const dither = ((c * 17 + r * 31) % 11) / 10;

          if (dither + noise * 0.35 > threshold) {
            const rawProgress = Math.max(0, Math.min(1, rowProgress + (noise + 1) * 0.15));
            const lutIndex = Math.floor(rawProgress * (LUT_SIZE - 1));

            ctx.fillStyle = fillLUT[lutIndex];
            ctx.fillRect(c * PIXEL_SIZE, r * PIXEL_SIZE, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isRunning && isVisible) {
        animId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
      isRunning = false;
    };

    // IntersectionObserver to only animate footer when scrolled into view
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startAnimation();
          } else {
            stopAnimation();
          }
        },
        { threshold: 0.02 }
      );
      observer.observe(pixelCanvasRef);
    }

    return () => {
      stopAnimation();
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      window.removeEventListener('resize', resize);
    };
  });

  onDestroy(() => {
    if (animId) cancelAnimationFrame(animId);
  });
</script>

<footer class="modern-pixel-footer" id="contact">
  
  <!-- Pixel Art Gradient Transition Strip -->
  <div class="pixel-art-strip" aria-hidden="true">
    <canvas bind:this={pixelCanvasRef} class="pixel-art-canvas"></canvas>
  </div>

  <div class="container footer-content">
    
    <div class="footer-layout">
      
      <!-- Brand & Direct Info -->
      <div class="footer-brand-col">
        <div class="footer-brand-title font-heading flex items-center gap-2">
          <CronosLogo size={24} />
          <span>Cronos</span>
        </div>
        <p class="footer-desc font-sans text-sm">
          {appState.lang === 'fr' 
            ? 'Développeur Full-Stack en Terminale Bac Pro CIEL (Île-de-France). Projets réels, interfaces réactives en SvelteKit et services backend légers en Rust sur Linux.' 
            : 'Full-stack developer in CIEL senior year (Paris region). Shipping reactive SvelteKit frontends and lean concurrent Rust services on Linux.'}
        </p>

        <div class="footer-direct-channel font-mono text-xs">
          <a href="mailto:{DEVELOPER_PROFILE.email}" class="direct-email-btn">
            <Mail size={13} />
            <span>{DEVELOPER_PROFILE.email}</span>
          </a>
          <span class="location-badge text-muted">{DEVELOPER_PROFILE.location[appState.lang]}</span>
        </div>
      </div>

      <!-- Links Grid -->
      <div class="footer-links-grid font-mono text-xs">
        
        <div class="footer-col">
          <span class="col-title text-muted">{appState.lang === 'fr' ? 'RÉALISATIONS' : 'PROJECTS'}</span>
          <ul class="col-list">
            <li>
              <a href="https://zenithbot.app" target="_blank" rel="noreferrer" class="footer-link">
                <span>Zenith</span>
                <ExternalLink size={10} class="text-muted" />
              </a>
            </li>
            <li>
              <a href="https://lamaisondeless.org/" target="_blank" rel="noreferrer" class="footer-link">
                <span>La Maison de l'ESS</span>
                <ExternalLink size={10} class="text-muted" />
              </a>
            </li>
            <li>
              <a href="https://studio.xn--znith-bsa.fr/" target="_blank" rel="noreferrer" class="footer-link">
                <span>Studio UTy</span>
                <ExternalLink size={10} class="text-muted" />
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <span class="col-title text-muted">{appState.lang === 'fr' ? 'RÉSEAUX & CONTACT' : 'CONNECT'}</span>
          <ul class="col-list">
            <li>
              <a href="mailto:{DEVELOPER_PROFILE.email}" class="footer-link">
                <Mail size={12} />
                <span>Email</span>
              </a>
            </li>
            <li>
              <a href={DEVELOPER_PROFILE.discordUrl} target="_blank" rel="noreferrer" class="footer-link">
                <OfficialIcon name="discord" size={12} />
                <span>Discord (@{DEVELOPER_PROFILE.discordTag})</span>
              </a>
            </li>
            <li>
              <a href={DEVELOPER_PROFILE.githubUrl} target="_blank" rel="noreferrer" class="footer-link">
                <OfficialIcon name="github" size={12} />
                <span>GitHub (cronos-hub)</span>
              </a>
            </li>
            <li>
              <a href="/cv-cronos.pdf" download="CV-Cronos.pdf" class="footer-link">
                <Download size={12} />
                <span>CV (PDF)</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

    </div>

    <!-- Sub-footer Bar -->
    <div class="footer-bottom-bar font-mono text-xs">
      <div class="copyright-group text-muted">
        <span>© 2026 Cronos · Terminale Bac Pro CIEL</span>
        <span class="separator">·</span>
        <span>SvelteKit & Rust</span>
      </div>

      <button type="button" class="lang-switch-btn" onclick={() => appState.toggleLang()}>
        {appState.lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
      </button>
    </div>

  </div>
</footer>

<style>
  .modern-pixel-footer {
    position: relative;
    background: #040406;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  .pixel-art-strip {
    width: 100%;
    height: 112px;
    position: relative;
    overflow: hidden;
    pointer-events: none;
    background: linear-gradient(180deg, #000000 0%, #040406 100%);
  }

  .pixel-art-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .footer-content {
    padding-top: 3.5rem;
    padding-bottom: 7rem;
  }

  .footer-layout {
    display: flex;
    justify-content: space-between;
    gap: 4rem;
    flex-wrap: wrap;
    padding-bottom: 3.5rem;
  }

  .footer-brand-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 440px;
  }

  .footer-brand-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .footer-desc {
    color: #e4e4e7;
    line-height: 1.65;
  }

  .footer-direct-channel {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding-top: 0.25rem;
  }

  .direct-email-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.75rem;
    background: #14141c;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--radius-xs);
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-fast);
  }

  .direct-email-btn:hover {
    background: #20202e;
    border-color: #ffffff;
  }

  .location-badge {
    color: #d4d4d8;
  }

  .footer-links-grid {
    display: flex;
    gap: 5rem;
    flex-wrap: wrap;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .col-title {
    letter-spacing: 0.08em;
    color: #ffffff;
    font-weight: 700;
  }

  .col-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .footer-link {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    color: #f4f4f5;
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .footer-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    flex-wrap: wrap;
    gap: 1rem;
  }

  .copyright-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #d4d4d8;
  }

  .separator {
    color: #52525b;
  }

  .lang-switch-btn {
    background: none;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    transition: color var(--transition-fast);
    padding: 0;
  }

  .lang-switch-btn:hover {
    color: #ffffff;
  }
</style>
