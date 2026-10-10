<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
  }

  let { size = 22, class: className = '' }: Props = $props();
</script>

<svg 
  width={size} 
  height={size} 
  viewBox="0 0 32 32" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  class="cronos-logo-svg {className}"
  aria-hidden="true"
  shape-rendering="geometricPrecision"
>
  <defs>
    <linearGradient id="cronosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#e4e4e7" />
      <stop offset="100%" stop-color="#71717a" />
    </linearGradient>
    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#a1a1aa" />
    </linearGradient>
  </defs>

  <!-- Outer Stylized Cybernetic 'C' Monogram with Chamfer Angles -->
  <path 
    d="M24 6H11L5 12V20L11 26H24V22H13L9 18V14L13 10H24V6Z" 
    fill="url(#cronosGrad)" 
  />

  <!-- Central Temporal Core Spark / Build Coordinate -->
  <rect x="18" y="14" width="4" height="4" fill="url(#coreGrad)" />
  <rect x="15" y="14.5" width="2" height="3" fill="#ffffff" opacity="0.9" />
  <rect x="23" y="14.5" width="2" height="3" fill="#ffffff" opacity="0.9" />
  <rect x="18.5" y="11" width="3" height="2" fill="#ffffff" opacity="0.9" />
  <rect x="18.5" y="19" width="3" height="2" fill="#ffffff" opacity="0.9" />
</svg>

<style>
  .cronos-logo-svg {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
    transition: transform 200ms ease, filter 200ms ease;
  }

  :global(.brand-link:hover) .cronos-logo-svg {
    transform: scale(1.06) rotate(3deg);
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
</style>
