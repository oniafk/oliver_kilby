import * as THREE from "three";
import { blurVert } from "@/lib/webgl/shaders/blur.vert";
import { blurFrag } from "@/lib/webgl/shaders/blur.frag";

export class GaussianBlur {
  private rtA: THREE.WebGLRenderTarget;
  private rtB: THREE.WebGLRenderTarget;
  private hScene: THREE.Scene;
  private vScene: THREE.Scene;
  private cam: THREE.OrthographicCamera;
  private hMat: THREE.ShaderMaterial;
  private vMat: THREE.ShaderMaterial;

  constructor(width: number, height: number) {
    const rtOpts = { depthBuffer: false };
    this.rtA = new THREE.WebGLRenderTarget(width, height, rtOpts);
    this.rtB = new THREE.WebGLRenderTarget(width, height, rtOpts);
    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geo = new THREE.PlaneGeometry(2, 2);

    this.hMat = new THREE.ShaderMaterial({
      vertexShader: blurVert,
      fragmentShader: blurFrag,
      uniforms: {
        tDiffuse: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / width, 1 / height) },
        uDir: { value: new THREE.Vector2(1, 0) },
        uSigma: { value: 1.0 },
      },
    });
    const hMesh = new THREE.Mesh(geo, this.hMat);
    hMesh.frustumCulled = false;
    this.hScene = new THREE.Scene();
    this.hScene.add(hMesh);

    this.vMat = new THREE.ShaderMaterial({
      vertexShader: blurVert,
      fragmentShader: blurFrag,
      uniforms: {
        tDiffuse: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / width, 1 / height) },
        uDir: { value: new THREE.Vector2(0, 1) },
        uSigma: { value: 1.0 },
      },
    });
    const vMesh = new THREE.Mesh(geo, this.vMat);
    vMesh.frustumCulled = false;
    this.vScene = new THREE.Scene();
    this.vScene.add(vMesh);
  }

  render(
    renderer: THREE.WebGLRenderer,
    inputTexture: THREE.Texture,
    sigma: number
  ): void {
    this.hMat.uniforms.tDiffuse.value = inputTexture;
    this.hMat.uniforms.uSigma.value = sigma;
    renderer.setRenderTarget(this.rtA);
    renderer.clear();
    renderer.render(this.hScene, this.cam);

    this.vMat.uniforms.tDiffuse.value = this.rtA.texture;
    this.vMat.uniforms.uSigma.value = sigma;
    renderer.setRenderTarget(this.rtB);
    renderer.clear();
    renderer.render(this.vScene, this.cam);

    renderer.setRenderTarget(null);
  }

  get output(): THREE.Texture {
    return this.rtB.texture;
  }

  setSize(width: number, height: number): void {
    this.rtA.setSize(width, height);
    this.rtB.setSize(width, height);
    this.hMat.uniforms.uTexelSize.value.set(1 / width, 1 / height);
    this.vMat.uniforms.uTexelSize.value.set(1 / width, 1 / height);
  }

  dispose(): void {
    this.rtA.dispose();
    this.rtB.dispose();
    this.hMat.dispose();
    this.vMat.dispose();
  }
}
