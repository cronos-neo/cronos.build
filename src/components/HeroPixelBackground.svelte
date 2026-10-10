<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let canvasRef: HTMLCanvasElement;
  let animId: number;

  onMount(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const PIXEL_SIZE = 24; // Crisp, well-proportioned pixel art squares

    // Precomputed color look-up tables to completely eliminate string allocations in the animation loop
    const LUT_SIZE = 64;
    const fillLUT = new Array(LUT_SIZE);
    const strokeLUT = new Array(LUT_SIZE);
    for (let i = 0; i < LUT_SIZE; i++) {
      const energyNormalized = i / (LUT_SIZE - 1); // 0.0 to 1.0 (corresponds to energy from -1 to 1)
      const energyVal = energyNormalized * 2 - 1;
      const lightness = Math.floor(22 + (energyVal + 1) * 26);
      const alpha = Math.min(0.75, Math.max(0.12, 0.2 + (energyVal + 1) * 0.22));
      fillLUT[i] = `rgba(${lightness + 15}, ${lightness + 15}, ${lightness + 25}, ${alpha.toFixed(3)})`;
      strokeLUT[i] = `rgba(255, 255, 255, ${(alpha * 0.35).toFixed(3)})`;
    }

    const resize = () => {
      const parent = canvasRef.parentElement || document.body;
      width = parent.clientWidth;
      height = parent.clientHeight;
      // Pixel art with 24px blocks is razor-sharp at native 1x DPR, saving ~25MB of RAM backing store
      canvasRef.width = width;
      canvasRef.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let isVisible = true;
    let isRunning = false;

    const render = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }
      isRunning = true;
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / PIXEL_SIZE);
      const rows = Math.ceil(height / PIXEL_SIZE);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Traveling rhythmic waves across the pixel grid
          const wave1 = Math.sin(c * 0.14 + time * 0.5) * Math.cos(r * 0.14 - time * 0.4);
          const wave2 = Math.sin((c + r) * 0.08 - time * 0.3);
          const energy = (wave1 + wave2) * 0.5;

          // Ordered dither matrix (stable, attractive retro pattern)
          const dither = ((c * 17 + r * 31) % 11) / 10;

          // Distinct, clearly visible pixel art squares
          if (dither + energy * 0.5 > 0.35) {
            const x = c * PIXEL_SIZE;
            const y = r * PIXEL_SIZE;

            // Use zero-allocation precomputed lookup table
            const lutIndex = Math.max(0, Math.min(LUT_SIZE - 1, Math.floor((energy + 1) * 0.5 * (LUT_SIZE - 1))));

            ctx.fillStyle = fillLUT[lutIndex];
            ctx.fillRect(x, y, PIXEL_SIZE - 2, PIXEL_SIZE - 2);

            // Crisp retro highlight border on accent pixels
            if (energy > 0.15) {
              ctx.strokeStyle = strokeLUT[lutIndex];
              ctx.lineWidth = 1;
              ctx.strokeRect(x + 0.5, y + 0.5, PIXEL_SIZE - 3, PIXEL_SIZE - 3);
            }
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

    // Pause RAF when scrolled past the hero section
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
        { threshold: 0.05 }
      );
      observer.observe(canvasRef);
    } else {
      startAnimation();
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

<div class="hero-pixel-wrapper" aria-hidden="true">
  <canvas bind:this={canvasRef} class="hero-pixel-canvas"></canvas>
  <!-- Balanced radial vignette to maintain crystal clear contrast for text & 3D laptop -->
  <div class="hero-pixel-mask"></div>
</div>

<style>
  .hero-pixel-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .hero-pixel-canvas {
    width: 100%;
    height: 100%;
    display: block;
    image-rendering: pixelated;
  }

  .hero-pixel-mask {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 52% 48%,
      rgba(3, 3, 5, 0.45) 0%,
      rgba(3, 3, 5, 0.65) 55%,
      rgba(0, 0, 0, 0.85) 85%,
      #000000 100%
    );
    pointer-events: none;
  }
</style>
