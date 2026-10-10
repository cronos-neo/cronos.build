<script lang="ts">
  const PROJECT = {
    title: 'Zenith',
    image: '/assets/projects/zenith_hero.png'
  };
</script>

<!-- Clean, Sober, High-Precision Laptop Hardware Mockup (Zero Slop) -->
<div class="laptop-showcase-wrap" role="img" aria-label="Aperçu du projet {PROJECT.title} dans un ordinateur portable">
  
  <div class="laptop-chassis">
    <!-- Screen Lid (Anodized Space Black Aluminum) -->
    <div class="screen-lid">
      <!-- Minimalist Top Bezel with Discrete Camera Sensor -->
      <div class="lid-bezel-top">
        <span class="camera-dot"></span>
      </div>

      <!-- Native Project Viewport (Full 1024x570 resolution, zero cropping, zero fake titlebars) -->
      <div class="screen-display">
        <img 
          src={PROJECT.image} 
          alt="{PROJECT.title} Interface" 
          class="screen-img"
          loading="eager"
          draggable="false"
        />
        <div class="screen-glare" aria-hidden="true"></div>
      </div>
    </div>

    <!-- Base Chassis with Precision Opening Lip Notch -->
    <div class="base-chassis">
      <div class="base-notch"></div>
    </div>
  </div>

  <!-- Soft, Natural Floor Contact Shadow -->
  <div class="floor-shadow" aria-hidden="true"></div>

</div>

<style>
  .laptop-showcase-wrap {
    position: relative;
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin-left: auto;
    background: transparent;
    padding-block: 1rem;
  }

  .laptop-chassis {
    position: relative;
    width: 100%;
    z-index: 2;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.95));
  }

  /* -------------------------------------------
     SCREEN LID
     ------------------------------------------- */
  .screen-lid {
    background: #0f0f14;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 12px 12px 2px 2px;
    padding: 7px 7px 9px 7px;
    box-shadow: 
      inset 0 1px 1px rgba(255, 255, 255, 0.25),
      inset 0 -1px 2px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(0, 0, 0, 0.9);
    position: relative;
    box-sizing: border-box;
  }

  .lid-bezel-top {
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .camera-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #040407;
    border: 0.8px solid rgba(255, 255, 255, 0.25);
    box-shadow: inset 0 0 2px #38bdf8;
  }

  /* Screen Display Viewport */
  .screen-display {
    width: 100%;
    aspect-ratio: 1024 / 570;
    background: #000000;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.9);
  }

  .screen-img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    image-rendering: -webkit-optimize-contrast;
  }

  .screen-glare {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.06) 0%,
      rgba(255, 255, 255, 0.015) 35%,
      transparent 65%
    );
    pointer-events: none;
  }

  /* -------------------------------------------
     BASE CHASSIS
     ------------------------------------------- */
  .base-chassis {
    width: 103%;
    height: 14px;
    margin-left: -1.5%;
    background: linear-gradient(180deg, #22222c 0%, #111116 100%);
    border-radius: 0 0 14px 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-top: 1px solid rgba(255, 255, 255, 0.28);
    display: flex;
    justify-content: center;
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.8),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 3;
    margin-top: -1px;
  }

  .base-notch {
    width: 68px;
    height: 4.5px;
    background: #08080c;
    border-radius: 0 0 4px 4px;
    border-inline: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  /* -------------------------------------------
     NATURAL FLOOR SHADOW
     ------------------------------------------- */
  .floor-shadow {
    width: 90%;
    height: 30px;
    margin-top: -6px;
    background: radial-gradient(
      ellipse at 50% 50%,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.5) 45%,
      transparent 75%
    );
    filter: blur(10px);
    pointer-events: none;
  }

  /* -------------------------------------------
     RESPONSIVE BREAKPOINTS
     ------------------------------------------- */
  @media (max-width: 1240px) {
    .laptop-showcase-wrap {
      max-width: 520px;
    }
  }

  @media (max-width: 1080px) {
    .laptop-showcase-wrap {
      max-width: 480px;
      margin-inline: auto;
    }
  }
</style>
