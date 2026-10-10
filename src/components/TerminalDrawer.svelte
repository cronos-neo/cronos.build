<script lang="ts">
  import { appState } from '../data/i18n.svelte';
  import { PROJECTS_DATA, TECHNICAL_SKILLS, DEVELOPER_PROFILE, TERMINAL_HELP } from '../data/portfolioData';
  import { Terminal, X, CornerDownLeft } from 'lucide-svelte';

  interface HistoryItem {
    command: string;
    output: string;
    isError?: boolean;
  }

  const ASCII_BANNER = ` ██████╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗
██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝
██║     ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗
██║     ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║
╚██████╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║
 ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝`;

  const getSystemBanner = () => {
    return `${ASCII_BANNER}

cronos.build // Terminal Système (bash v5.2)
Hôte: Île-de-France · Terminale Bac Pro CIEL
Stack: SvelteKit · Rust · TypeScript · Linux
Tapez 'help' pour afficher les commandes disponibles.`;
  };

  const AVAILABLE_COMMANDS = ['help', 'projects', 'skills', 'contact', 'cv', 'neofetch', 'clear', 'whoami', 'cat'];

  let commandInput = $state('');
  let history = $state<HistoryItem[]>([
    {
      command: 'neofetch',
      output: getSystemBanner()
    }
  ]);

  // Command navigation history
  let commandHistory = $state<string[]>([]);
  let historyIndex = $state<number>(-1);

  let terminalContainer = $state<HTMLDivElement>();
  let inputRef = $state<HTMLInputElement>();

  $effect(() => {
    if (appState.isTerminalOpen) {
      setTimeout(() => inputRef?.focus(), 80);
    }
  });

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to navigation history
    commandHistory = [...commandHistory, trimmed];
    historyIndex = -1;

    const cmd = trimmed.toLowerCase();

    if (cmd === 'clear') {
      history = [];
      commandInput = '';
      return;
    }

    if (cmd === 'cv') {
      window.open('/cv-cronos.pdf', '_blank');
      history = [...history, {
        command: trimmed,
        output: appState.lang === 'fr' 
          ? 'Téléchargement du CV officiel (cv-cronos.pdf)...' 
          : 'Opening official CV (cv-cronos.pdf)...'
      }];
      commandInput = '';
      scrollToBottom();
      return;
    }

    if (cmd === 'neofetch' || cmd === 'banner') {
      history = [...history, {
        command: trimmed,
        output: getSystemBanner()
      }];
      commandInput = '';
      scrollToBottom();
      return;
    }

    if (cmd === 'whoami') {
      history = [...history, {
        command: trimmed,
        output: `cronos (Élève en Terminale Bac Pro CIEL · Développeur Full-Stack SvelteKit & Rust)`
      }];
      commandInput = '';
      scrollToBottom();
      return;
    }

    if (cmd === 'projects' || cmd === 'ls') {
      const list = PROJECTS_DATA.map((p, i) => `  [0${i+1}] ${p.slug.padEnd(12)} -> ${p.title} (${p.category[appState.lang]} · ${p.year})`).join('\n');
      history = [...history, {
        command: trimmed,
        output: `${appState.lang === 'fr' ? 'PROJETS EN PRODUCTION :' : 'PRODUCTION PROJECTS :'}\n${list}\n\nAstuce: tapez 'open <slug>' (ex: 'open zenith') pour ouvrir la fiche.`
      }];
      commandInput = '';
      scrollToBottom();
      return;
    }

    if (cmd === 'skills') {
      const list = TECHNICAL_SKILLS.map(s => `  • ${s.name.padEnd(22)} : ${s.description[appState.lang]}`).join('\n');
      history = [...history, {
        command: trimmed,
        output: `${appState.lang === 'fr' ? 'COMPÉTENCES TECHNIQUES :' : 'TECHNICAL SKILLS :'}\n${list}`
      }];
      commandInput = '';
      scrollToBottom();
      return;
    }

    if (cmd === 'contact') {
      history = [...history, {
        command: trimmed,
        output: `CANAUX OFFICIELS :\n  • Email   : contact@cronos.build\n  • Site    : https://cronos.build\n  • GitHub  : https://github.com/cronos-hub\n  • Discord : @cronos (${DEVELOPER_PROFILE.discordUrl})\n  • CV PDF  : /cv-cronos.pdf`
      }];
      commandInput = '';
      scrollToBottom();
      return;
    }

    if (cmd.startsWith('open ')) {
      const target = cmd.replace('open ', '').trim();
      const proj = PROJECTS_DATA.find(p => p.slug === target || p.slug.includes(target));
      if (proj) {
        appState.navigateToProject(proj.slug);
        appState.closeTerminal();
        return;
      }
    }

    const helpOutput = TERMINAL_HELP[appState.lang];
    history = [...history, { 
      command: trimmed, 
      output: cmd === 'help' ? helpOutput : `${appState.lang === 'fr' ? 'Commande non reconnue' : 'Unknown command'}: "${trimmed}".\n\n${helpOutput}`,
      isError: cmd !== 'help'
    }];
    commandInput = '';
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (terminalContainer) {
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
      }
    }, 40);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Arrow Up: Previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIndex === -1) {
        historyIndex = commandHistory.length - 1;
      } else if (historyIndex > 0) {
        historyIndex--;
      }
      commandInput = commandHistory[historyIndex] || '';
      return;
    }

    // Arrow Down: Next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        commandInput = commandHistory[historyIndex] || '';
      } else {
        historyIndex = -1;
        commandInput = '';
      }
      return;
    }

    // Tab: Auto-completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const current = commandInput.trim().toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find(c => c.startsWith(current));
      if (match) {
        commandInput = match;
      }
    }
  };

  const handleCommandSubmit = (e: Event) => {
    e.preventDefault();
    executeCommand(commandInput);
  };

  $effect(() => {
    if (appState.isTerminalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  });
</script>

{#if appState.isTerminalOpen}
  <div 
    class="terminal-overlay" 
    role="dialog" 
    aria-modal="true" 
    onclick={() => appState.closeTerminal()} 
    onkeydown={(e) => e.key === 'Escape' && appState.closeTerminal()} 
    tabindex="-1"
  >
    <div 
      class="terminal-window" 
      role="document" 
      onclick={(e) => e.stopPropagation()} 
      onkeydown={(e) => e.stopPropagation()} 
      tabindex="-1"
    >
      
      <!-- Window Titlebar with UNIX-style dots -->
      <div class="terminal-titlebar">
        <div class="flex items-center gap-2">
          <div class="terminal-dots" aria-hidden="true">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="font-mono text-xs text-white font-bold tracking-tight">cronos@build:~$ (bash)</span>
        </div>

        <button 
          type="button"
          class="terminal-close-btn" 
          onclick={() => appState.closeTerminal()}
          title="Fermer (Esc)"
          aria-label="Fermer le terminal"
        >
          <X size={15} />
        </button>
      </div>

      <!-- Terminal Body -->
      <div class="terminal-body font-mono" bind:this={terminalContainer}>
        
        <!-- History Stream -->
        {#each history as item}
          <div class="terminal-entry">
            <div class="terminal-prompt-line">
              <span class="prompt-user">cronos@build</span>
              <span class="prompt-symbol">:~$</span>
              <span class="prompt-cmd">{item.command}</span>
            </div>
            <pre class="terminal-output" class:terminal-error={item.isError}>{item.output}</pre>
          </div>
        {/each}

        <!-- Active Input Line -->
        <form class="terminal-input-form" onsubmit={handleCommandSubmit}>
          <span class="prompt-user">cronos@build</span>
          <span class="prompt-symbol">:~$</span>
          <input 
            type="text" 
            bind:value={commandInput}
            bind:this={inputRef}
            onkeydown={handleKeyDown}
            class="terminal-input" 
            placeholder="Tapez 'help', 'projects', 'skills'..."
            autocomplete="off"
            spellcheck="false"
          />
          <button type="submit" class="submit-cmd-btn" aria-label="Exécuter la commande">
            <CornerDownLeft size={13} />
          </button>
        </form>

      </div>

    </div>
  </div>
{/if}

<style>
  .terminal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.88);
    backdrop-filter: blur(10px);
    z-index: 250;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
  }

  .terminal-window {
    width: 100%;
    max-width: 820px;
    height: 520px;
    background: #050508;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-sm);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 255, 255, 0.04);
  }

  .terminal-titlebar {
    padding: 0.75rem 1.25rem;
    background: #0a0a10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  .terminal-dots {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-right: 0.5rem;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .dot-red { background: #ef4444; opacity: 0.8; }
  .dot-yellow { background: #eab308; opacity: 0.8; }
  .dot-green { background: #22c55e; opacity: 0.8; }

  .terminal-close-btn {
    cursor: pointer;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    color: #a1a1aa;
    border-radius: var(--radius-xs);
    transition: color 150ms ease, background 150ms ease;
  }

  .terminal-close-btn:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }

  .terminal-body {
    flex: 1;
    padding: 1.25rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    font-size: 0.84rem;
    background: #050508;
    cursor: text;
  }

  .terminal-entry {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .terminal-prompt-line {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .prompt-user {
    color: #38bdf8;
    font-weight: 700;
  }

  .prompt-symbol {
    color: #a1a1aa;
  }

  .prompt-cmd {
    color: #ffffff;
    font-weight: 600;
  }

  .terminal-output {
    white-space: pre-wrap;
    color: #d4d4d8;
    line-height: 1.55;
    margin: 0;
    padding: 0.2rem 0;
  }

  .terminal-error {
    color: #fca5a5;
  }

  .terminal-input-form {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  .terminal-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #ffffff;
    font-family: var(--font-mono);
    font-size: 0.84rem;
    caret-color: #ffffff;
  }

  .submit-cmd-btn {
    color: #71717a;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 150ms ease;
  }

  .submit-cmd-btn:hover {
    color: #ffffff;
  }
</style>
