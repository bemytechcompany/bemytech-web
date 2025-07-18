/**
 * HexagonTransition.js - GSAP-powered hexagon transition refactorizado
 * Usa el GSAP Manager para evitar conflictos entre componentes
 */

import { gsapManager, gsap, ScrollTrigger } from './gsapManager';

const HEXAGON_CONTEXT = 'hexagon-transition';
let isInitialized = false;

export async function initHexagonTransition(options = {}) {
  const {
    heroSelector = '#hero',
    servicesSelector = '#services',
    hexagonSelector = '#hexagon-transition'
  } = options;

  try {
    // Prevenir inicialización múltiple
    if (isInitialized) {
      console.warn('Hexagon transition already initialized');
      return;
    }

    // Verificar reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('Reduced motion detected - skipping hexagon transition');
      fallbackTransition(heroSelector, servicesSelector);
      return;
    }

    // Crear contexto GSAP
    gsapManager.createContext(HEXAGON_CONTEXT);

    // Obtener elementos DOM
    const heroSection = document.querySelector(heroSelector);
    const servicesSection = document.querySelector(servicesSelector);
    const hexagonContainer = document.querySelector(hexagonSelector);

    if (!heroSection || !servicesSection || !hexagonContainer) {
      console.warn('Required elements not found');
      fallbackTransition(heroSelector, servicesSelector);
      return;
    }

    setupHexagonTransition(heroSection, servicesSection, hexagonContainer);
    isInitialized = true;
    
    console.log('Hexagon transition initialized');

  } catch (error) {
    console.error('Failed to initialize hexagon transition:', error);
    fallbackTransition(heroSelector, servicesSelector);
  }
}

function setupHexagonTransition(heroSection, servicesSection, hexagonContainer) {
  // Obtener elementos
  const hexagonItems = hexagonContainer.querySelectorAll('[data-hexagon-item]');
  const unifiedHexagon = hexagonContainer.querySelector('[data-unified-hexagon]');
  const unifiedGlows = hexagonContainer.querySelectorAll('[data-unified-glow-1], [data-unified-glow-2], [data-unified-glow-3]');
  const unifiedParticles = hexagonContainer.querySelectorAll('[data-unified-particle]');
  const hexagonOverlay = hexagonContainer.querySelector('[data-hexagon-overlay]');
  const heroContent = heroSection.querySelectorAll('[data-hero-title], [data-hero-subtitle], [data-hero-cta]');
  const servicesMask = hexagonContainer.querySelector('[data-services-mask]');

  // Crear timeline usando GSAP Manager
  const transitionTimeline = gsapManager.createTimeline(HEXAGON_CONTEXT, {
    paused: true,
    defaults: { ease: 'none' }
  });

  // Configurar estados iniciales
  gsap.set(hexagonContainer, { opacity: 0, scale: 1, pointerEvents: 'none', display: 'block' });
  gsap.set(hexagonItems, { scale: 0, opacity: 0, rotation: 0 });
  gsap.set(unifiedHexagon, { scale: 0, opacity: 0, rotation: 0 });
  gsap.set(unifiedParticles, { scale: 0, opacity: 0, rotation: 0 });
  gsap.set(hexagonOverlay, {
    opacity: 0,
    clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)'
  });
  gsap.set(servicesSection, { opacity: 0, y: 50, visibility: 'visible', zIndex: 30, position: 'relative' });
  gsap.set(servicesMask, {
    opacity: 1,
    pointerEvents: 'auto',
    clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
  });

  // Asegurar estilos de services
  servicesSection.style.visibility = 'visible';
  servicesSection.style.zIndex = '30';
  servicesSection.style.position = 'relative';

  // Fase 1: Hero fade out (0% - 20%)
  transitionTimeline
    .to(heroContent, {
      opacity: 0, y: -100, scale: 0.8, duration: 0.2, stagger: 0.03, ease: 'power2.out'
    }, 0)
    .to(hexagonContainer, { opacity: 1, duration: 0.05 }, 0.05);

  // Fase 2: Hexágonos aparecen (20% - 35%)
  transitionTimeline.to(hexagonItems, {
    scale: 1, opacity: 1, rotation: 360, duration: 0.15, stagger: 0.02, ease: 'back.out(1.7)'
  }, 0.2);

  // Fase 3: Hexágonos se mueven al centro (35% - 55%)
  hexagonItems.forEach((item, index) => {
    const bounds = item.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = centerX - (bounds.left + bounds.width / 2);
    const deltaY = centerY - (bounds.top + bounds.height / 2);

    transitionTimeline.to(item, {
      x: deltaX, y: deltaY, scale: 1.3, rotation: gsap.utils.random(180, 720),
      duration: 0.3, ease: 'power4.out'
    }, 0.35);
  });

  transitionTimeline
    .to(hexagonItems, {
      x: () => `${gsap.utils.random(-30, 30)}`,
      y: () => `${gsap.utils.random(-30, 30)}`,
      rotation: () => gsap.utils.random(-180, 180),
      scale: 1.1, duration: 0.15, stagger: 0.01, ease: 'power2.inOut'
    }, 0.48)
    .to(hexagonItems, {
      scale: 0, opacity: 0, duration: 0.1, stagger: 0.01, ease: 'back.in(2)'
    }, 0.52)
    .fromTo(unifiedHexagon, {
      scale: 0.5, opacity: 0, rotation: 0
    }, {
      opacity: 1, scale: 1.2, rotation: 180, duration: 0.15, ease: 'back.out(2)'
    }, 0.55);

  // Fase 4: Hexágono unificado crece (55% - 70%)
  transitionTimeline
    .to(unifiedHexagon, {
      scale: 2.5, rotation: 540, duration: 0.15, ease: 'power3.inOut'
    }, 0.55)
    .fromTo(unifiedGlows, {
      scale: 0.2, opacity: 0
    }, {
      scale: 1.5, opacity: 1, duration: 0.15, stagger: 0.03, ease: 'power1.inOut'
    }, 0.57)
    .to(unifiedParticles, {
      scale: 1, opacity: 0.8, rotation: 180, duration: 0.13, stagger: 0.01, ease: 'power2.out'
    }, 0.6);

  // Fase 5: Services aparece (70% - 85%)
  transitionTimeline
    .to(servicesMask, {
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      duration: 0.4,
      ease: 'power2.out'
    }, 0.70)
    .fromTo(servicesMask, {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(8px)'
    }, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power2.out'
    }, 0.73)
    .to(unifiedHexagon, {
      scale: 8, rotation: 1080, duration: 0.15, ease: 'power3.inOut'
    }, 0.74)
    .to(unifiedParticles, {
      scale: 3, opacity: 0.4, rotation: 540, duration: 0.12, stagger: 0.01, ease: 'power2.inOut'
    }, 0.76);

  // Fase 6: Hexágono desaparece, services se normaliza (85% - 100%)
  transitionTimeline
    .to(unifiedHexagon, {
      scale: 15, rotation: 1440, opacity: 0.2, duration: 0.15, ease: 'power3.inOut'
    }, 0.85)
    .to(unifiedParticles, {
      scale: 5, opacity: 0.1, rotation: 720, duration: 0.12, stagger: 0.005, ease: 'power2.out'
    }, 0.87)
    .to(unifiedHexagon, {
      scale: 25, opacity: 0, duration: 0.1, ease: 'power4.in'
    }, 0.92)
    .to(unifiedParticles, {
      scale: 0, opacity: 0, duration: 0.08, stagger: 0.002, ease: 'power3.in'
    }, 0.94)
    .to(hexagonOverlay, {
      opacity: 0, duration: 0.06, ease: 'power2.in'
    }, 0.96)
    .call(() => {
      // Normalizar services section
      servicesSection.style.position = 'relative';
      servicesSection.style.zIndex = 'auto';
      servicesSection.style.visibility = 'visible';
      hexagonContainer.style.pointerEvents = 'none';
    }, [], 1.0);

  // Crear ScrollTrigger usando GSAP Manager
  const scrollTriggerInstance = gsapManager.createScrollTrigger(HEXAGON_CONTEXT, {
    trigger: heroSection,
    start: 'bottom+=150 bottom',
    end: 'bottom+=150 top',
    pin: true,
    pinSpacing: false,
    scrub: 1.5,
    anticipatePin: 1,
    animation: transitionTimeline,
    onToggle: (self) => {
      if (self.isActive) {
        hexagonContainer.style.pointerEvents = 'none';
      } else {
        if (self.progress === 0) {
          resetSectionsState(heroSection, servicesSection);
          resetHexagonState(hexagonContainer);
          hexagonContainer.style.display = 'block';
        } else if (self.progress === 1) {
          gsap.set(heroContent, { opacity: 0, y: -100, scale: 0.8 });
          servicesSection.style.position = 'relative';
          servicesSection.style.zIndex = 'auto';
          servicesSection.style.opacity = '1';
          servicesSection.style.visibility = 'visible';
          servicesSection.style.transform = 'none';
          hexagonContainer.style.pointerEvents = 'none';
        }
      }
    },
    invalidateOnRefresh: true
  });

  // Debug info para desarrollo
  if (import.meta.env?.DEV) {
    console.log('Hexagon transition GSAP context:', gsapManager.getDebugInfo());
  }
}

function resetHexagonState(hexagonContainer) {
  const hexagonItems = hexagonContainer.querySelectorAll('[data-hexagon-item]');
  const unifiedHexagon = hexagonContainer.querySelector('[data-unified-hexagon]');
  const unifiedParticles = hexagonContainer.querySelectorAll('[data-unified-particle]');
  const unifiedGlows = hexagonContainer.querySelectorAll('[data-unified-glow-1], [data-unified-glow-2], [data-unified-glow-3]');
  const hexagonOverlay = hexagonContainer.querySelector('[data-hexagon-overlay]');
  const servicesMask = hexagonContainer.querySelector('[data-services-mask]');

  gsap.set(hexagonContainer, { opacity: 0, scale: 1, pointerEvents: 'none', display: 'block' });
  gsap.set(hexagonItems, { scale: 0, opacity: 0, rotation: 0, x: 0, y: 0 });
  gsap.set(unifiedHexagon, { scale: 0, opacity: 0, rotation: 0 });
  gsap.set(unifiedParticles, { scale: 0, opacity: 0, rotation: 0 });
  gsap.set(unifiedGlows, { scale: 1, opacity: 0 });
  gsap.set(hexagonOverlay, {
    opacity: 0,
    clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)'
  });
  gsap.set(servicesMask, {
    opacity: 0,
    clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)'
  });
}

function resetSectionsState(heroSection, servicesSection) {
  const heroContent = heroSection.querySelectorAll('[data-hero-title], [data-hero-subtitle], [data-hero-cta]');

  gsap.set(heroContent, { opacity: 1, y: 0, scale: 1 });
  gsap.set(servicesSection, { opacity: 0, y: 50, visibility: 'visible', zIndex: 30, position: 'relative' });

  servicesSection.style.visibility = 'visible';
  servicesSection.style.zIndex = '30';
  servicesSection.style.position = 'relative';
}

function fallbackTransition(heroSelector, servicesSelector) {
  const heroSection = document.querySelector(heroSelector);
  const servicesSection = document.querySelector(servicesSelector);

  if (heroSection && servicesSection) {
    heroSection.style.transition = 'opacity 0.5s ease';
    servicesSection.style.transition = 'opacity 0.5s ease';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === heroSection) {
          if (entry.intersectionRatio < 0.1) {
            heroSection.style.opacity = '0.5';
            servicesSection.style.opacity = '1';
          } else if (entry.intersectionRatio > 0.9) {
            heroSection.style.opacity = '1';
            servicesSection.style.opacity = '0.8';
          }
        }
      });
    }, { threshold: [0.1, 0.9] });

    observer.observe(heroSection);
    
    // Registrar observer en el contexto para cleanup
    if (isInitialized) {
      gsapManager.registerEventListener(HEXAGON_CONTEXT, heroSection, 'intersect', () => {
        observer.disconnect();
      });
    }
  }
}

export function cleanupHexagonTransition() {
  if (isInitialized) {
    gsapManager.cleanupContext(HEXAGON_CONTEXT);
    isInitialized = false;
    console.log('Hexagon transition cleaned up');
  }
}

export function refreshHexagonTransition() {
  if (isInitialized) {
    gsapManager.refreshScrollTriggers();
  }
}

// Exports para compatibilidad con la API anterior
export { setupHexagonTransition, resetHexagonState, resetSectionsState, fallbackTransition }; 