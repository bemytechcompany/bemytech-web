/**
 * GSAP Manager - Sistema centralizado para gestionar animaciones GSAP
 * Previene conflictos entre componentes y mejora el rendimiento
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins una sola vez
gsap.registerPlugin(ScrollTrigger);

interface ComponentContext {
  id: string;
  timelines: gsap.core.Timeline[];
  scrollTriggers: ScrollTrigger[];
  eventListeners: Array<{
    element: Element | Window | Document;
    event: string;
    handler: EventListenerOrEventListenerObject;
    options?: AddEventListenerOptions;
  }>;
  isActive: boolean;
}

class GSAPManager {
  private static instance: GSAPManager;
  private contexts: Map<string, ComponentContext> = new Map();
  private globalResizeHandler: (() => void) | null = null;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  private constructor() {
    this.setupGlobalHandlers();
  }

  static getInstance(): GSAPManager {
    if (!GSAPManager.instance) {
      GSAPManager.instance = new GSAPManager();
    }
    return GSAPManager.instance;
  }

  /**
   * Crear un contexto para un componente
   */
  createContext(componentId: string): ComponentContext {
    if (this.contexts.has(componentId)) {
      console.warn(`Context ${componentId} already exists. Cleaning up first.`);
      this.cleanupContext(componentId);
    }

    const context: ComponentContext = {
      id: componentId,
      timelines: [],
      scrollTriggers: [],
      eventListeners: [],
      isActive: true
    };

    this.contexts.set(componentId, context);
    return context;
  }

  /**
   * Registrar un timeline en un contexto
   */
  registerTimeline(componentId: string, timeline: gsap.core.Timeline): void {
    const context = this.contexts.get(componentId);
    if (context) {
      context.timelines.push(timeline);
    }
  }

  /**
   * Registrar un ScrollTrigger en un contexto
   */
  registerScrollTrigger(componentId: string, trigger: ScrollTrigger): void {
    const context = this.contexts.get(componentId);
    if (context) {
      context.scrollTriggers.push(trigger);
    }
  }

  /**
   * Registrar un event listener en un contexto
   */
  registerEventListener(
    componentId: string,
    element: Element | Window | Document,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions
  ): void {
    const context = this.contexts.get(componentId);
    if (context) {
      element.addEventListener(event, handler, options);
      context.eventListeners.push({ element, event, handler, options });
    }
  }

  /**
   * Crear un timeline con auto-registro
   */
  createTimeline(componentId: string, vars?: gsap.TimelineVars): gsap.core.Timeline {
    const timeline = gsap.timeline(vars);
    this.registerTimeline(componentId, timeline);
    return timeline;
  }

  /**
   * Crear un ScrollTrigger con auto-registro
   */
  createScrollTrigger(componentId: string, vars: ScrollTrigger.Vars): ScrollTrigger {
    const trigger = ScrollTrigger.create(vars);
    this.registerScrollTrigger(componentId, trigger);
    return trigger;
  }

  /**
   * Pausar todas las animaciones de un contexto
   */
  pauseContext(componentId: string): void {
    const context = this.contexts.get(componentId);
    if (context) {
      context.isActive = false;
      context.timelines.forEach(tl => tl.pause());
      context.scrollTriggers.forEach(st => st.disable());
    }
  }

  /**
   * Reanudar todas las animaciones de un contexto
   */
  resumeContext(componentId: string): void {
    const context = this.contexts.get(componentId);
    if (context) {
      context.isActive = true;
      context.timelines.forEach(tl => tl.resume());
      context.scrollTriggers.forEach(st => st.enable());
    }
  }

  /**
   * Limpiar completamente un contexto
   */
  cleanupContext(componentId: string): void {
    const context = this.contexts.get(componentId);
    if (!context) return;

    // Limpiar timelines
    context.timelines.forEach(timeline => {
      timeline.kill();
    });

    // Limpiar ScrollTriggers
    context.scrollTriggers.forEach(trigger => {
      trigger.kill();
    });

    // Limpiar event listeners
    context.eventListeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });

    // Remover contexto
    this.contexts.delete(componentId);
  }

  /**
   * Refrescar todos los ScrollTriggers activos
   */
  refreshScrollTriggers(): void {
    ScrollTrigger.refresh();
  }

  /**
   * Pausar todas las animaciones (para performance)
   */
  pauseAll(): void {
    this.contexts.forEach((context) => {
      this.pauseContext(context.id);
    });
  }

  /**
   * Reanudar todas las animaciones
   */
  resumeAll(): void {
    this.contexts.forEach((context) => {
      this.resumeContext(context.id);
    });
  }

  /**
   * Verificar si reduced motion está activado
   */
  static shouldReduceMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Configurar handlers globales
   */
  private setupGlobalHandlers(): void {
    // Resize handler optimizado
    this.globalResizeHandler = () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        this.refreshScrollTriggers();
      }, 150);
    };

    window.addEventListener('resize', this.globalResizeHandler, { passive: true });

    // Cleanup automático en visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAll();
      } else {
        this.resumeAll();
        this.refreshScrollTriggers();
      }
    });

    // Cleanup antes de salir de la página
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  /**
   * Limpiar completamente el manager
   */
  cleanup(): void {
    // Limpiar todos los contextos
    Array.from(this.contexts.keys()).forEach(contextId => {
      this.cleanupContext(contextId);
    });

    // Limpiar handlers globales
    if (this.globalResizeHandler) {
      window.removeEventListener('resize', this.globalResizeHandler);
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    // Matar todos los ScrollTriggers restantes
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  /**
   * Obtener información de debug
   */
  getDebugInfo(): { activeContexts: number; totalTimelines: number; totalScrollTriggers: number } {
    let totalTimelines = 0;
    let totalScrollTriggers = 0;

    this.contexts.forEach(context => {
      totalTimelines += context.timelines.length;
      totalScrollTriggers += context.scrollTriggers.length;
    });

    return {
      activeContexts: this.contexts.size,
      totalTimelines,
      totalScrollTriggers
    };
  }
}

// Export singleton instance
export const gsapManager = GSAPManager.getInstance();
export { gsap, ScrollTrigger };
export type { ComponentContext }; 