"use client";

import { useEffect, type RefObject } from "react";
import * as THREE from "three";
import { useWebGLState } from "@/lib/webgl/WebGLContext";
import { CAMERA_FOV, CAMERA_Z, OBJECTS_DISTANCE } from "@/lib/webgl/constants";

const COLS = 4;
const ROWS = 5;
const PLANE_W = 1.4;
const PLANE_H = 0.93;
const HALF_H = Math.tan((CAMERA_FOV / 2) * (Math.PI / 180)) * CAMERA_Z;

// Fade zone = one camera frustum half-height.
// Planes reach opacity=1 exactly when camera is HALF_H inside gallery bounds.
const FADE_ZONE = HALF_H;

interface Props {
  imagePath: string;
  sectionRef: RefObject<HTMLElement | null>;
}

function computeBounds(el: HTMLElement) {
  const windowH = window.innerHeight;
  const halfW = HALF_H * (window.innerWidth / windowH);
  const rect = el.getBoundingClientRect();
  const sectionTop = rect.top + window.scrollY;
  const worldYStart = -(sectionTop / windowH) * OBJECTS_DISTANCE;
  const worldYRange = (rect.height / windowH) * OBJECTS_DISTANCE;
  const worldYEnd = worldYStart - worldYRange;
  return { halfW, worldYStart, worldYRange, worldYEnd };
}

export default function GalleryViewer({ imagePath, sectionRef }: Props) {
  const { scene, camera } = useWebGLState();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const { halfW: initHalfW, worldYStart: initYStart, worldYRange: initYRange } =
      computeBounds(el);

    const cellW = (initHalfW * 2) / COLS;

    const normX: number[] = [];
    const normY: number[] = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cellCenterX = -initHalfW + cellW * (col + 0.5);
        const maxJitterX = Math.max(0, (cellW - PLANE_W) * 0.4);
        const jx = (Math.random() * 2 - 1) * maxJitterX;
        normX.push((cellCenterX + jx) / initHalfW);

        const baseFrac = (row + 0.5) / ROWS;
        const jy = (Math.random() * 2 - 1) * (0.3 / ROWS);
        normY.push(Math.min(Math.max(baseFrac + jy, 0.02), 0.98));
      }
    }

    const texture = new THREE.TextureLoader().load(imagePath);
    // Single shared material — opacity driven by camera Y each frame (Solution B)
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
    });

    const meshes: THREE.Mesh[] = [];

    for (let i = 0; i < COLS * ROWS; i++) {
      const geo = new THREE.PlaneGeometry(PLANE_W, PLANE_H);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        normX[i] * initHalfW,
        initYStart - normY[i] * initYRange,
        0,
      );
      scene.add(mesh);
      meshes.push(mesh);
    }

    let raf = 0;
    const tick = () => {
      const sectionEl = sectionRef.current;
      if (sectionEl) {
        const { halfW, worldYStart, worldYRange, worldYEnd } = computeBounds(sectionEl);

        // Update positions (Solution C: reactive to resize/mobile keyboard)
        meshes.forEach((mesh, i) => {
          mesh.position.x = normX[i] * halfW;
          mesh.position.y = worldYStart - normY[i] * worldYRange;
        });

        // Solution B: fade opacity at gallery entry/exit based on camera Y
        const topFade = (worldYStart - camera.position.y) / FADE_ZONE;
        const bottomFade = (camera.position.y - worldYEnd) / FADE_ZONE;
        mat.opacity = Math.min(
          Math.min(1, Math.max(0, topFade)),
          Math.min(1, Math.max(0, bottomFade)),
        );
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      meshes.forEach((m) => {
        scene.remove(m);
        m.geometry.dispose();
      });
      mat.dispose();
      texture.dispose();
    };
  }, [imagePath, sectionRef, scene, camera]);

  return null;
}
