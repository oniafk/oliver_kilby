import * as THREE from "three";
import { MAX_DPR } from "./constants";

/**
 * Module-level singleton. React StrictMode deliberately double-mounts effects
 * in development. Keeping the renderer at module scope (rather than a component
 * ref) means the second mount reuses the same GPU context that the first mount
 * set up, instead of allocating a new renderer on top of the old one.
 *
 * Lifecycle:
 *   getRenderer(canvas) -> creates on first call, returns existing thereafter.
 *   destroyRenderer()   -> disposes and nulls the instance. Next getRenderer()
 *                          call re-creates it.
 */
let rendererInstance: THREE.WebGLRenderer | null = null;

export function getRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  if (!rendererInstance) {
    rendererInstance = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    rendererInstance.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
    rendererInstance.setSize(window.innerWidth, window.innerHeight);
    rendererInstance.setClearColor(0x000000, 0);
  }
  return rendererInstance;
}

export function destroyRenderer(): void {
  if (rendererInstance) {
    rendererInstance.dispose();
    rendererInstance = null;
  }
}

/**
 * Test/diagnostic accessor. Returns the current instance without creating one.
 * Not used by production code paths; included for completeness.
 */
export function peekRenderer(): THREE.WebGLRenderer | null {
  return rendererInstance;
}
