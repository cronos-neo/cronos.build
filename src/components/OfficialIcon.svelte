<script lang="ts">
  import {
    siSvelte,
    siRust,
    siTypescript,
    siPostgresql,
    siRedis,
    siPrometheus,
    siGrafana,
    siDocker,
    siLinux,
    siDiscord,
    siGithub,
    type SimpleIcon
  } from 'simple-icons';

  let { name, size = 16, color = 'currentColor', class: className = '' } = $props<{
    name: string;
    size?: number;
    color?: string;
    class?: string;
  }>();

  const iconMap: Record<string, SimpleIcon> = {
    svelte: siSvelte,
    rust: siRust,
    typescript: siTypescript,
    postgres: siPostgresql,
    postgresql: siPostgresql,
    redis: siRedis,
    prometheus: siPrometheus,
    grafana: siGrafana,
    docker: siDocker,
    linux: siLinux,
    discord: siDiscord,
    github: siGithub
  };

  const iconData = $derived(iconMap[name.toLowerCase()]);
</script>

{#if iconData}
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color === 'brand' ? `#${iconData.hex}` : (color || 'currentColor')}
    class={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={iconData.path} />
  </svg>
{/if}
