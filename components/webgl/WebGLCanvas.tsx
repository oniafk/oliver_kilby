"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useWebGLState } from "@/lib/webgl/WebGLContext";
import { destroyRenderer, getRenderer } from "@/lib/webgl/renderer";
import { CAMERA_Z, MAX_DPR, MOUSE_LENS_RADIUS, MOUSE_LENS_STRENGTH, OBJECTS_DISTANCE } from "@/lib/webgl/constants";
import { GaussianBlur } from "@/lib/webgl/postfx/GaussianBlur";
import { blurVert } from "@/lib/webgl/shaders/blur.vert";
import { compositeFrag } from "@/lib/webgl/shaders/composite.frag";

export default function WebGLCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { cursorRef, scene, camera, mouseScene, orthoCam } = useWebGLState();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = getRenderer(canvas);

    camera.position.set(0, 0, CAMERA_Z);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Global lighting — added once to the shared scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    const keyLight = new THREE.DirectionalLight(0xffffff, 3);
    keyLight.position.set(3, 5, 3);
    const fillLight = new THREE.DirectionalLight(0xffffff, 1);
    fillLight.position.set(-3, 0, -2);
    scene.add(ambientLight, keyLight, fillLight);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // FBO: render model scene into this target
    const modelRT = new THREE.WebGLRenderTarget(w, h, { depthBuffer: true });

    // Two-pass Gaussian blur
    const blur = new GaussianBlur(w, h);

    // Composite fullscreen plane in mouseScene
    const compositeGeo = new THREE.PlaneGeometry(2, 2);
    const compositeMat = new THREE.ShaderMaterial({
      vertexShader: blurVert,
      fragmentShader: compositeFrag,
      uniforms: {
        tModel: { value: null },
        uCursor: { value: new THREE.Vector2(0.5, 0.5) },
        uRadius: { value: MOUSE_LENS_RADIUS },
        uStrength: { value: MOUSE_LENS_STRENGTH },
        uAspect: { value: window.innerWidth / window.innerHeight },
      },
    });
    const compositeMesh = new THREE.Mesh(compositeGeo, compositeMat);
    compositeMesh.frustumCulled = false;
    mouseScene.add(compositeMesh);

    // Scroll velocity tracking — plain closure vars, no React refs
    let prevScrollY = window.scrollY;
    let blurSigma = 1.0;

    const handleResize = () => {
      const rw = window.innerWidth;
      const rh = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
      renderer.setSize(rw, rh);
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      modelRT.setSize(rw, rh);
      blur.setSize(rw, rh);
      compositeMat.uniforms.uAspect.value = rw / rh;
    };
    window.addEventListener("resize", handleResize);

    let rafHandle = 0;
    const tick = () => {
      // scroll velocity → blur sigma (exponential decay toward base 1.0)
      const scrollDelta =
        Math.abs(window.scrollY - prevScrollY) / window.innerHeight;
      prevScrollY = window.scrollY;
      blurSigma = blurSigma * 0.85 + scrollDelta * 15.0 + 1.0 * 0.15;
      blurSigma = Math.max(1.0, Math.min(blurSigma, 8.0));

      // camera scroll
      camera.position.y =
        -(window.scrollY / window.innerHeight) * OBJECTS_DISTANCE;

      compositeMat.uniforms.uCursor.value.set(
        cursorRef.current.x,
        cursorRef.current.y
      );
      compositeMat.uniforms.uAspect.value = window.innerWidth / window.innerHeight;

      // render model scene to FBO
      renderer.setRenderTarget(modelRT);
      renderer.clear();
      renderer.render(scene, camera);

      // two-pass Gaussian blur
      blur.render(renderer, modelRT.texture, blurSigma);

      // composite blurred model to screen via mouseScene
      compositeMat.uniforms.tModel.value = blur.output;
      renderer.setRenderTarget(null);
      renderer.render(mouseScene, orthoCam);

      rafHandle = window.requestAnimationFrame(tick);
    };
    rafHandle = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(rafHandle);
      scene.remove(ambientLight, keyLight, fillLight);
      mouseScene.remove(compositeMesh);
      compositeMat.dispose();
      compositeGeo.dispose();
      blur.dispose();
      modelRT.dispose();
      destroyRenderer();
    };
  }, [cursorRef, scene, camera, mouseScene, orthoCam]);

  return (
    <canvas
      ref={canvasRef}
      className="shader-canvas"
      style={{ zIndex: 100 }}
    />
  );
}
