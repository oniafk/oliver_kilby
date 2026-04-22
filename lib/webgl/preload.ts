import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

THREE.Cache.enabled = true;

export function preloadGLB(url: string): void {
  new GLTFLoader().load(url, () => {});
}
