"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR } from "./constants";

export interface CursorState {
  x: number;
  y: number;
}

export interface WebGLState {
  cursorRef: MutableRefObject<CursorState>;
  sectionIndexRef: MutableRefObject<number>;
  setSectionIndex: (index: number) => void;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mouseScene: THREE.Scene;
  orthoCam: THREE.OrthographicCamera;
}

const WebGLContext = createContext<WebGLState | null>(null);

export function WebGLStateProvider({ children }: { children: ReactNode }) {
  const cursorRef = useRef<CursorState>({ x: 0, y: 0 });
  const sectionIndexRef = useRef<number>(0);

  const setSectionIndex = useCallback((index: number) => {
    sectionIndexRef.current = index;
  }, []);

  // Created once per provider lifetime — never trigger re-renders
  const scene = useMemo(() => new THREE.Scene(), []);
  const camera = useMemo(
    () => new THREE.PerspectiveCamera(CAMERA_FOV, 1, CAMERA_NEAR, CAMERA_FAR),
    []
  );
  const mouseScene = useMemo(() => new THREE.Scene(), []);
  const orthoCam = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    []
  );

  const value = useMemo<WebGLState>(
    () => ({ cursorRef, sectionIndexRef, setSectionIndex, scene, camera, mouseScene, orthoCam }),
    [setSectionIndex, scene, camera, mouseScene, orthoCam]
  );

  return <WebGLContext.Provider value={value}>{children}</WebGLContext.Provider>;
}

export function useWebGLState(): WebGLState {
  const ctx = useContext(WebGLContext);
  if (!ctx) {
    throw new Error("useWebGLState must be used inside <WebGLStateProvider>");
  }
  return ctx;
}
