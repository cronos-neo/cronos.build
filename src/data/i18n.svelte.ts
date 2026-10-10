export type Language = 'fr' | 'en';

class AppState {
  lang = $state<Language>('fr');
  isTerminalOpen = $state(false);
  isResumeOpen = $state(false);
  activeProjectSlug = $state<string | null>(null);
  toasts = $state<{ id: string; message: string; type: 'info' | 'success' | 'warn' }[]>([]);

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('folio_lang') as Language;
      if (saved === 'fr' || saved === 'en') {
        this.lang = saved;
      }

      // Read initial route on mount
      this.handleRouteChange();
      window.addEventListener('popstate', () => this.handleRouteChange());
      window.addEventListener('hashchange', () => this.handleRouteChange());
    }
  }

  private handleRouteChange() {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path.startsWith('/project/')) {
      const slug = path.replace('/project/', '').replace(/\/$/, '').trim();
      this.activeProjectSlug = slug || null;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (hash.startsWith('#/project/')) {
      const slug = hash.replace('#/project/', '').replace(/\/$/, '').trim();
      this.activeProjectSlug = slug || null;
      // Upgrade legacy hash route to clean URL
      history.replaceState({ slug }, '', `/project/${slug}`);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      this.activeProjectSlug = null;
      // Clean up any ugly trailing hashes like `cronos.build/#`, `cronos.build/#top`, etc.
      if (hash) {
        history.replaceState(null, '', path || '/');
      }
    }
  }

  navigateToProject(slug: string) {
    this.activeProjectSlug = slug;
    if (typeof window !== 'undefined') {
      history.pushState({ slug }, '', `/project/${slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navigateToHome() {
    this.activeProjectSlug = null;
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/' || window.location.hash) {
        history.pushState(null, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleLang() {
    this.lang = this.lang === 'fr' ? 'en' : 'fr';
    if (typeof window !== 'undefined') {
      localStorage.setItem('folio_lang', this.lang);
    }
  }

  openTerminal() {
    this.isTerminalOpen = true;
  }

  closeTerminal() {
    this.isTerminalOpen = false;
  }

  toggleTerminal() {
    this.isTerminalOpen = !this.isTerminalOpen;
  }

  openResume() {
    this.isResumeOpen = true;
  }

  closeResume() {
    this.isResumeOpen = false;
  }

  showToast(message: string, type: 'info' | 'success' | 'warn' = 'success') {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts = [...this.toasts, { id, message, type }];
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 3500);
  }
}

export const appState = new AppState();
