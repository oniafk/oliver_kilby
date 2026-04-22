"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useWebGLState } from "@/lib/webgl/WebGLContext";
import { CAMERA_FOV, CAMERA_Z, FRUSTUM_H, MODEL_SCALE_FACTOR, OBJECTS_DISTANCE } from "@/lib/webgl/constants";

THREE.Cache.enabled = true;

interface ModelViewerProps {
  modelPath: string;
  sectionIndex: number;
}

export default function ModelViewer({ modelPath, sectionIndex }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scene } = useWebGLState();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let model: THREE.Group | null = null;
    let naturalSize = 0;
    let cancelled = false;

    let stableW = window.innerWidth;
    let stableH = window.innerHeight;
    let cachedRect = container.getBoundingClientRect();

    const computeModelScale = () => {
      const frustumW = FRUSTUM_H * (stableW / stableH);
      return (frustumW * MODEL_SCALE_FACTOR) / naturalSize;
    };

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      if (cancelled) return;
      model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      naturalSize = Math.max(size.x, size.y, size.z);

      const scale = computeModelScale();
      model.scale.setScalar(scale);
      model.position.copy(center).multiplyScalar(-scale);

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              const l = 0.299 * mat.color.r + 0.587 * mat.color.g + 0.114 * mat.color.b;
              mat.color.setScalar(l);
            }
          });
        }
      });

      // Pre-position before adding to scene — prevents one-frame flash at world origin
      {
        const halfH = Math.tan((CAMERA_FOV / 2) * (Math.PI / 180)) * CAMERA_Z;
        const halfW = halfH * (stableW / stableH);
        const sectionScrollCenter = sectionIndex * stableH;
        const scrollDelta = window.scrollY - sectionScrollCenter;
        const normalizedDist = Math.max(-1, Math.min(1, scrollDelta / stableH));
        const ndcX = ((cachedRect.left + cachedRect.width / 2) / stableW) * 2 - 1;
        const targetX = ndcX * halfW;
        const t = (1 - Math.cos(normalizedDist * Math.PI)) / 2;
        const offScreenX = halfW + 1.5;

        model.position.x = targetX + (offScreenX - targetX) * t;
        model.position.y = -sectionIndex * OBJECTS_DISTANCE;
        model.rotation.z = (Math.PI / 2) * normalizedDist;
        model.rotation.x = -(Math.PI / 2) * normalizedDist;
        model.rotation.y = (Math.PI / 2) * normalizedDist;
      }

      scene.add(model);
    });

    let cachedWidth = stableW;
    const handleResize = () => {
      const rw = window.innerWidth;
      if (rw <= 1024 && rw === cachedWidth) return;
      cachedWidth = rw;
      stableW = rw;
      stableH = window.innerHeight;
      cachedRect = container.getBoundingClientRect();
      if (model && naturalSize > 0) model.scale.setScalar(computeModelScale());
    };
    window.addEventListener("resize", handleResize);

    let raf = 0;
    const tick = () => {
      if (model) {
        // frustum half-extents at z=0
        const halfH = Math.tan((CAMERA_FOV / 2) * (Math.PI / 180)) * CAMERA_Z;
        const halfW = halfH * (stableW / stableH);

        // Y: section index maps directly to world Y — same formula as camera scroll
        // section i center = -i * OBJECTS_DISTANCE
        const targetY = -sectionIndex * OBJECTS_DISTANCE;

        // scroll progress: 0 = section centered, ±1 = one viewport away
        // normalized to OBJECTS_DISTANCE range so ±1 = enter/exit threshold
        const sectionScrollCenter = sectionIndex * stableH;
        const scrollDelta = window.scrollY - sectionScrollCenter;
        const normalizedDist = Math.max(-1, Math.min(1, scrollDelta / stableH));

        // X target: right column center → NDC → world (DOM-based, stable for y-scroll)
        const ndcX = ((cachedRect.left + cachedRect.width / 2) / stableW) * 2 - 1;
        const targetX = ndcX * halfW;

        // cosine ease: 0 at center → 1 at edges
        const t = (1 - Math.cos(normalizedDist * Math.PI)) / 2;
        const offScreenX = halfW + 1.5;

        model.position.x = targetX + (offScreenX - targetX) * t;
        model.position.y = targetY;

        model.rotation.z = (Math.PI / 2) * normalizedDist;
        model.rotation.x = -(Math.PI / 2) * normalizedDist;
        model.rotation.y = (Math.PI / 2) * normalizedDist;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
      if (model) scene.remove(model);
    };
  }, [modelPath, sectionIndex, scene]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
