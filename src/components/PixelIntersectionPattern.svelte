<script lang="ts">
  type PatternSize = 'sm' | 'md' | 'lg' | 'cross' | 'divider';

  interface Props {
    size?: PatternSize;
    class?: string;
  }

  let { size = 'md', class: className = '' }: Props = $props();
</script>

{#if size === 'cross'}
  <!-- Small Precision Crosshair / Pixel Intersection Marker -->
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    class="pixel-pattern pixel-cross {className}"
    aria-hidden="true"
  >
    <rect x="7" y="0" width="2" height="16" fill="rgba(255, 255, 255, 0.25)" />
    <rect x="0" y="7" width="16" height="2" fill="rgba(255, 255, 255, 0.25)" />
    <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
  </svg>

{:else if size === 'sm'}
  <!-- Small Corner / Rosette Cluster (24x24) -->
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    class="pixel-pattern pixel-sm {className}"
    aria-hidden="true"
  >
    <!-- Stepped Pixel Corner -->
    <rect x="0" y="0" width="4" height="4" fill="#ffffff" />
    <rect x="4" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.7)" />
    <rect x="8" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.35)" />
    <rect x="12" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.15)" />

    <rect x="0" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.7)" />
    <rect x="4" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.5)" />
    <rect x="8" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.2)" />

    <rect x="0" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.35)" />
    <rect x="4" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.2)" />
    
    <rect x="0" y="12" width="4" height="4" fill="rgba(255, 255, 255, 0.15)" />
  </svg>

{:else if size === 'md'}
  <!-- Medium Dither Cluster (48x24) -->
  <svg 
    width="48" 
    height="24" 
    viewBox="0 0 48 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    class="pixel-pattern pixel-md {className}"
    aria-hidden="true"
  >
    <!-- Pixel Matrix Dither Wave -->
    <rect x="0" y="8" width="4" height="4" fill="#ffffff" />
    <rect x="4" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.85)" />
    <rect x="8" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.7)" />
    <rect x="8" y="12" width="4" height="4" fill="rgba(255, 255, 255, 0.7)" />
    <rect x="12" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.9)" />
    <rect x="16" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.5)" />
    <rect x="16" y="12" width="4" height="4" fill="rgba(255, 255, 255, 0.5)" />
    <rect x="20" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.75)" />
    <rect x="24" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
    <rect x="24" y="12" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
    <rect x="28" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.6)" />
    <rect x="32" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.3)" />
    <rect x="32" y="12" width="4" height="4" fill="rgba(255, 255, 255, 0.3)" />
    <rect x="36" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
    <rect x="40" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.25)" />
    <rect x="44" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.12)" />
  </svg>

{:else if size === 'lg'}
  <!-- Large Architectural Node / Corner Ornament (64x32) -->
  <svg 
    width="64" 
    height="32" 
    viewBox="0 0 64 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    class="pixel-pattern pixel-lg {className}"
    aria-hidden="true"
  >
    <rect x="0" y="0" width="4" height="4" fill="#ffffff" />
    <rect x="4" y="0" width="4" height="4" fill="#ffffff" />
    <rect x="8" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.8)" />
    <rect x="12" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.6)" />
    <rect x="16" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
    <rect x="20" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.25)" />
    <rect x="24" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.15)" />

    <rect x="0" y="4" width="4" height="4" fill="#ffffff" />
    <rect x="4" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.6)" />
    <rect x="8" y="4" width="4" height="4" fill="rgba(255, 255, 255, 0.3)" />

    <rect x="0" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.8)" />
    <rect x="4" y="8" width="4" height="4" fill="rgba(255, 255, 255, 0.3)" />

    <rect x="0" y="12" width="4" height="4" fill="rgba(255, 255, 255, 0.6)" />
    <rect x="0" y="16" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
    <rect x="0" y="20" width="4" height="4" fill="rgba(255, 255, 255, 0.25)" />
    <rect x="0" y="24" width="4" height="4" fill="rgba(255, 255, 255, 0.15)" />
    
    <!-- Central Accent cluster -->
    <rect x="28" y="14" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
    <rect x="32" y="14" width="4" height="4" fill="#ffffff" />
    <rect x="36" y="14" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
    <rect x="32" y="10" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
    <rect x="32" y="18" width="4" height="4" fill="rgba(255, 255, 255, 0.4)" />
  </svg>

{:else if size === 'divider'}
  <!-- Prominent, High-Visibility Architectural Pixel Divider -->
  <div class="pixel-section-divider {className}" aria-hidden="true">
    <div class="divider-line left-line"></div>
    <div class="divider-cluster">
      <svg width="160" height="16" viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Center diamond -->
        <rect x="76" y="0" width="8" height="8" fill="#ffffff" />
        <rect x="76" y="8" width="8" height="8" fill="#ffffff" />
        <rect x="68" y="4" width="8" height="8" fill="#ffffff" />
        <rect x="84" y="4" width="8" height="8" fill="#ffffff" />

        <!-- Flanking stepped wings -->
        <rect x="60" y="4" width="6" height="8" fill="rgba(255, 255, 255, 0.85)" />
        <rect x="94" y="4" width="6" height="8" fill="rgba(255, 255, 255, 0.85)" />
        <rect x="52" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.65)" />
        <rect x="102" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.65)" />
        <rect x="44" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.45)" />
        <rect x="110" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.45)" />
        <rect x="36" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.3)" />
        <rect x="118" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.3)" />
        <rect x="28" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.2)" />
        <rect x="126" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.2)" />
        <rect x="20" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.1)" />
        <rect x="134" y="6" width="6" height="4" fill="rgba(255, 255, 255, 0.1)" />
      </svg>
    </div>
    <div class="divider-line right-line"></div>
  </div>
{/if}

<style>
  .pixel-pattern {
    display: inline-block;
    flex-shrink: 0;
    image-rendering: pixelated;
    pointer-events: none;
    vertical-align: middle;
  }

  .pixel-section-divider {
    display: flex;
    align-items: center;
    width: 100%;
    margin-block: 3.5rem;
    gap: 1.5rem;
    pointer-events: none;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(
      90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.25) 50%, 
      transparent 100%
    );
  }

  .divider-cluster {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 1rem;
    background: #050508;
  }
</style>
