/**
 * GSAP Debug Utility
 * Herramienta para monitorear contextos activos y detectar conflictos
 */

import { gsapManager } from './gsapManager.js';

class GSAPDebugger {
  constructor() {
    this.isEnabled = false;
    this.logLevel = 'info'; // 'debug', 'info', 'warn', 'error'
    this.conflictDetection = true;
  }

  enable() {
    this.isEnabled = true;
    this.setupDebugPanel();
    this.startMonitoring();
    console.log('🎬 GSAP Debugger enabled');
  }

  disable() {
    this.isEnabled = false;
    this.removeDebugPanel();
    console.log('🎬 GSAP Debugger disabled');
  }

  setupDebugPanel() {
    if (typeof document === 'undefined') return;

    // Crear panel de debug flotante
    const debugPanel = document.createElement('div');
    debugPanel.id = 'gsap-debug-panel';
    debugPanel.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 12px;
        max-width: 300px;
        border: 1px solid #8BC53F;
        backdrop-filter: blur(10px);
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <strong style="color: #8BC53F;">🎬 GSAP Debugger</strong>
          <button id="gsap-debug-close" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 14px;
          ">×</button>
        </div>
        <div id="gsap-debug-content">
          <div>Initializing...</div>
        </div>
        <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #333;">
          <button id="gsap-debug-test" style="
            background: #8BC53F;
            color: black;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 11px;
          ">Test Hero + Hexagon</button>
        </div>
      </div>
    `;

    document.body.appendChild(debugPanel);

    // Botón para cerrar
    document.getElementById('gsap-debug-close')?.addEventListener('click', () => {
      this.disable();
    });

    // Botón para test
    document.getElementById('gsap-debug-test')?.addEventListener('click', () => {
      this.testHeroHexagonCompatibility();
    });

    // Hacer el panel arrastrable
    this.makeDraggable(debugPanel.firstElementChild);
  }

  makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.style.cursor = 'move';
    element.addEventListener('mousedown', (e) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      const dragMouseUp = () => {
        document.removeEventListener('mouseup', dragMouseUp);
        document.removeEventListener('mousemove', dragMouseMove);
      };
      
      const dragMouseMove = (e) => {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
        element.style.right = 'auto';
      };
      
      document.addEventListener('mouseup', dragMouseUp);
      document.addEventListener('mousemove', dragMouseMove);
    });
  }

  removeDebugPanel() {
    const panel = document.getElementById('gsap-debug-panel');
    if (panel) {
      panel.remove();
    }
  }

  startMonitoring() {
    this.updateInterval = setInterval(() => {
      this.updateDebugInfo();
    }, 1000);
  }

  updateDebugInfo() {
    if (!this.isEnabled) return;

    const debugInfo = gsapManager.getDebugInfo();
    const content = document.getElementById('gsap-debug-content');
    
    if (content) {
      content.innerHTML = `
        <div style="margin-bottom: 8px;">
          <strong style="color: #8BC53F;">Contextos activos:</strong> ${debugInfo.activeContexts}
        </div>
        <div style="margin-bottom: 8px;">
          <strong style="color: #6B7FFF;">Timelines:</strong> ${debugInfo.totalTimelines}
        </div>
        <div style="margin-bottom: 8px;">
          <strong style="color: #FF6B9D;">ScrollTriggers:</strong> ${debugInfo.totalScrollTriggers}
        </div>
        <div style="margin-bottom: 8px;">
          <strong style="color: #FFB366;">Performance:</strong> ${this.getPerformanceStatus()}
        </div>
        ${this.getConflictWarnings()}
      `;
    }
  }

  getPerformanceStatus() {
    const debugInfo = gsapManager.getDebugInfo();
    const totalAnimations = debugInfo.totalTimelines + debugInfo.totalScrollTriggers;
    
    if (totalAnimations > 50) {
      return '<span style="color: #FF6B6B;">High Load</span>';
    } else if (totalAnimations > 20) {
      return '<span style="color: #FFB366;">Medium Load</span>';
    } else {
      return '<span style="color: #6BCF7F;">Good</span>';
    }
  }

  getConflictWarnings() {
    if (!this.conflictDetection) return '';

    const warnings = [];
    const debugInfo = gsapManager.getDebugInfo();

    // Detectar posibles conflictos
    if (debugInfo.activeContexts > 5) {
      warnings.push('⚠️ Muchos contextos activos');
    }

    if (debugInfo.totalScrollTriggers > 10) {
      warnings.push('⚠️ Muchos ScrollTriggers');
    }

    // Verificar si Hero y HexagonTransition están activos
    const heroActive = document.querySelector('#hero') !== null;
    const hexagonActive = document.querySelector('#hexagon-transition') !== null;
    
    if (heroActive && hexagonActive && debugInfo.activeContexts >= 2) {
      return '<div style="margin-top: 8px; color: #6BCF7F; font-size: 11px;">✅ Hero + Hexagon OK</div>';
    }

    if (warnings.length > 0) {
      return `
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #333;">
          ${warnings.map(w => `<div style="color: #FFB366; font-size: 11px;">${w}</div>`).join('')}
        </div>
      `;
    }

    return '<div style="margin-top: 8px; color: #6BCF7F; font-size: 11px;">✅ Sin conflictos detectados</div>';
  }

  logContext(contextId, action, details = {}) {
    if (!this.isEnabled) return;

    const timestamp = new Date().toLocaleTimeString();
    const logStyle = this.getLogStyle(action);
    
    console.group(`🎬 GSAP Context: ${contextId}`);
    console.log(`%c${action} @ ${timestamp}`, logStyle, details);
    console.groupEnd();
  }

  getLogStyle(action) {
    const styles = {
      'created': 'color: #6BCF7F; font-weight: bold;',
      'cleaned': 'color: #FF6B6B; font-weight: bold;',
      'paused': 'color: #FFB366; font-weight: bold;',
      'resumed': 'color: #6B7FFF; font-weight: bold;',
      'timeline_added': 'color: #8BC53F;',
      'scrolltrigger_added': 'color: #FF6B9D;'
    };
    
    return styles[action] || 'color: #FFFFFF;';
  }

  // Test específico de compatibilidad Hero + HexagonTransition
  testHeroHexagonCompatibility() {
    console.group('🧪 Testing Hero + HexagonTransition Compatibility');
    
    const heroElement = document.querySelector('#hero');
    const hexagonElement = document.querySelector('#hexagon-transition');
    const servicesElement = document.querySelector('#services');
    
    if (!heroElement) {
      console.warn('❌ Hero element not found');
      console.groupEnd();
      return;
    }
    
    if (!hexagonElement) {
      console.warn('❌ HexagonTransition element not found');
      console.groupEnd();
      return;
    }
    
    if (!servicesElement) {
      console.warn('❌ Services element not found');
      console.groupEnd();
      return;
    }
    
    console.log('✅ All elements found');
    
    // Verificar contextos GSAP
    const debugInfo = gsapManager.getDebugInfo();
    console.log('Current GSAP state:', debugInfo);
    
    // Simular interacción
    console.log('🔄 Simulating scroll to trigger hexagon transition...');
    
    // Scroll al final del hero para activar transition
    const heroHeight = heroElement.offsetHeight;
    window.scrollTo({
      top: heroHeight - 200,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      const newDebugInfo = gsapManager.getDebugInfo();
      console.log('State after scroll:', newDebugInfo);
      
      if (newDebugInfo.activeContexts >= 2) {
        console.log('✅ Both Hero and HexagonTransition contexts are active');
      } else {
        console.warn('⚠️ Missing contexts - possible conflict');
      }
      
      // Scroll de vuelta al inicio
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        console.log('🔄 Scrolled back to top');
      }, 2000);
      
      console.groupEnd();
    }, 3000);
  }

  // Test de compatibilidad entre Nav y HexagonTransition (anterior)
  testNavHexagonCompatibility() {
    console.group('🧪 Testing Nav + HexagonTransition Compatibility');
    
    // Simular apertura de menú
    const navEvent = new CustomEvent('nav-open', { 
      detail: { timestamp: Date.now() } 
    });
    document.dispatchEvent(navEvent);
    
    setTimeout(() => {
      // Simular scroll que activa hexagon transition
      const hexEvent = new CustomEvent('hexagon-activate', { 
        detail: { timestamp: Date.now() } 
      });
      document.dispatchEvent(hexEvent);
      
      // Verificar estado después de 2 segundos
      setTimeout(() => {
        const debugInfo = gsapManager.getDebugInfo();
        console.log('Final state:', debugInfo);
        
        if (debugInfo.activeContexts >= 2) {
          console.log('✅ Both components coexist successfully');
        } else {
          console.warn('⚠️ Possible conflict detected');
        }
        
        console.groupEnd();
      }, 2000);
    }, 1000);
  }

  cleanup() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.removeDebugPanel();
  }
}

// Singleton instance
export const gsapDebugger = new GSAPDebugger();

// Auto-enable en desarrollo
if (typeof window !== 'undefined' && import.meta.env?.DEV) {
  gsapDebugger.enable();
  
  // Comandos globales para la consola
  window.gsapDebug = {
    enable: () => gsapDebugger.enable(),
    disable: () => gsapDebugger.disable(),
    test: () => gsapDebugger.testHeroHexagonCompatibility(),
    testNav: () => gsapDebugger.testNavHexagonCompatibility(),
    info: () => console.log(gsapManager.getDebugInfo())
  };
  
  console.log('🎬 GSAP Debug commands available:');
  console.log('- gsapDebug.enable()');
  console.log('- gsapDebug.disable()');
  console.log('- gsapDebug.test() // Test Hero + Hexagon');
  console.log('- gsapDebug.testNav() // Test Nav + Hexagon');
  console.log('- gsapDebug.info()');
}

export default gsapDebugger; 