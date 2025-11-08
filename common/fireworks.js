(function () {
  const STYLE_ID = "common-fireworks-style";

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .common-fireworks-container {
        pointer-events: none;
        position: fixed;
        inset: 0;
        z-index: 9999;
        overflow: hidden;
        mix-blend-mode: screen;
      }

      .common-fireworks-particle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 9999px;
        opacity: 0;
        will-change: transform, opacity;
        box-shadow: 0 0 12px currentColor;
      }
    `;
    document.head.appendChild(style);
  }

  function createParticle(container, options) {
    const particle = document.createElement("span");
    particle.className = "common-fireworks-particle";
    particle.style.left = `${options.originX}%`;
    particle.style.top = `${options.originY}%`;
    particle.style.color = options.color;
    particle.style.background = options.color;

    const angle = options.angle + (Math.random() - 0.5) * (Math.PI / 12);
    const distance = options.spread * (0.6 + Math.random() * 0.4);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const duration = options.duration * (0.8 + Math.random() * 0.4);

    const keyframes = [
      { transform: "translate3d(0, 0, 0) scale(0.2)", opacity: 0 },
      { transform: `translate3d(${dx}px, ${dy}px, 0) scale(1)`, opacity: 0.95 },
      { transform: `translate3d(${dx * 1.2}px, ${dy * 1.2}px, 0) scale(0.1)`, opacity: 0 },
    ];

    const animation = particle.animate(keyframes, {
      duration,
      delay: options.delay,
      easing: "cubic-bezier(0.2, 0.5, 0.4, 1)",
      fill: "forwards",
    });

    animation.onfinish = () => {
      particle.remove();
    };

    container.appendChild(particle);
  }

  function launchFireworks({
    duration = 4000,
    bursts = 4,
    particlesPerBurst = 24,
    colors = ["#f97316", "#facc15", "#38bdf8", "#22c55e", "#e879f9"],
  } = {}) {
    if (typeof document === "undefined") {
      return;
    }

    ensureStyles();

    const container = document.createElement("div");
    container.className = "common-fireworks-container";
    document.body.appendChild(container);

    const baseSpread = Math.min(window.innerWidth, window.innerHeight) * 0.35;

    for (let burst = 0; burst < bursts; burst += 1) {
      const originX = 15 + Math.random() * 70;
      const originY = 20 + Math.random() * 50;
      const burstDelay = burst * (duration / bursts) * 0.35;

      for (let i = 0; i < particlesPerBurst; i += 1) {
        const angle = (Math.PI * 2 * i) / particlesPerBurst;
        createParticle(container, {
          originX,
          originY,
          angle,
          delay: burstDelay + Math.random() * 180,
          spread: baseSpread,
          duration: duration * 0.6,
          color: colors[(i + burst) % colors.length],
        });
      }
    }

    setTimeout(() => {
      container.remove();
    }, duration + 1200);
  }

  window.CommonFireworks = window.CommonFireworks || {};
  window.CommonFireworks.launch = launchFireworks;
})();
