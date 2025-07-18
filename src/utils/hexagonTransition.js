/**
 * HexagonTransition.js - GSAP-powered hexagon transition
 * Multiple hexagons merge into one, grow, and reveal services section
 */

let gsap, ScrollTrigger;
let transitionTimeline;
let scrollTriggerInstance;

export async function initHexagonTransition(options = {}) {
  const {
    heroSelector = '#hero',
    servicesSelector = '#services',
    hexagonSelector = '#hexagon-transition'
  } = options;

  try {
    // Import GSAP modules
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');

    gsap = gsapModule.gsap;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('Reduced motion detected - skipping transition');
      return;
    }

    // Get DOM elements
    const heroSection = document.querySelector(heroSelector);
    const servicesSection = document.querySelector(servicesSelector);
    const hexagonContainer = document.querySelector(hexagonSelector);
    const servicesMask = hexagonContainer.querySelector('[data-services-mask]');

    if (!heroSection || !servicesSection || !hexagonContainer) {
      console.warn('Required elements not found');
      return;
    }

    setupHexagonTransition(heroSection, servicesSection, hexagonContainer);
    console.log('Hexagon transition initialized');

  } catch (error) {
    console.error('Failed to initialize transition:', error);
    fallbackTransition(heroSelector, servicesSelector);
  }
}

function setupHexagonTransition(heroSection, servicesSection, hexagonContainer) {
  // Get elements
  const hexagonItems = hexagonContainer.querySelectorAll('[data-hexagon-item]');
  const unifiedHexagon = hexagonContainer.querySelector('[data-unified-hexagon]');
  const unifiedGlows = hexagonContainer.querySelectorAll('[data-unified-glow-1], [data-unified-glow-2], [data-unified-glow-3]');
  const unifiedParticles = hexagonContainer.querySelectorAll('[data-unified-particle]');
  const hexagonOverlay = hexagonContainer.querySelector('[data-hexagon-overlay]');
  const heroContent = heroSection.querySelectorAll('[data-hero-title], [data-hero-subtitle], [data-hero-cta]');
  const servicesMask = hexagonContainer.querySelector('[data-services-mask]');


  // Create timeline
  transitionTimeline = gsap.timeline({
    paused: true,
    defaults: { ease: 'none' }
  });

  // Set initial states
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
  // Ensure services styles
  servicesSection.style.visibility = 'visible';
  servicesSection.style.zIndex = '30';
  servicesSection.style.position = 'relative';

  // Phase 1: Hero fade out (0% - 20%)
  transitionTimeline
    .to(heroContent, {
      opacity: 0, y: -100, scale: 0.8, duration: 0.2, stagger: 0.03, ease: 'power2.out'
    }, 0)
    .to(hexagonContainer, { opacity: 1, duration: 0.05 }, 0.05);

  // Phase 2: Hexagons appear (20% - 35%)
  transitionTimeline.to(hexagonItems, {
    scale: 1, opacity: 1, rotation: 360, duration: 0.15, stagger: 0.02, ease: 'back.out(1.7)'
  }, 0.2);

  // Phase 3: Hexagons merge (35% - 55%)
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

  // Phase 4: Unified hexagon grows (55% - 70%)
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

  // Phase 5: Services appears (70% - 85%)
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

  // Phase 6: Hexagon disappears, services becomes normal (85% - 100%)
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
    // .to(hexagonContainer, {
    //   opacity: 0, duration: 0.04, ease: 'power2.in'
    // }, 0.98)
    .call(() => {
      // Make services normal scrollable section
      servicesSection.style.position = 'relative';
      servicesSection.style.zIndex = 'auto';
      servicesSection.style.visibility = 'visible';
      hexagonContainer.style.pointerEvents = 'none';
    }, [], 1.0);

  // Create ScrollTrigger
  scrollTriggerInstance = ScrollTrigger.create({
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

  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 100);
  });
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
  }
}

export function cleanupHexagonTransition() {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }
  if (transitionTimeline) {
    transitionTimeline.kill();
    transitionTimeline = null;
  }
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}

export function refreshHexagonTransition() {
  if (ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

// Auto-cleanup
// window.addEventListener('beforeunload', cleanupHexagonTransition);
// window.addEventListener('visibilitychange', () => {
//   if (document.hidden) cleanupHexagonTransition();
// });

export { setupHexagonTransition, resetHexagonState, resetSectionsState, fallbackTransition }; 