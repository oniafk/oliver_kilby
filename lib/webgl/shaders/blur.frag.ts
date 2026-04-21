export const blurFrag = /* glsl */`
uniform sampler2D tDiffuse;
uniform vec2 uTexelSize;
uniform vec2 uDir;
uniform float uSigma;
varying vec2 vUv;

void main() {
  // 9-tap Gaussian weights (sum = 1.0)
  const float w0 = 0.2270270270;
  const float w1 = 0.1945945946;
  const float w2 = 0.1216216216;
  const float w3 = 0.0540540541;
  const float w4 = 0.0162162162;

  vec2 step = uTexelSize * uSigma * uDir;
  vec4 color = texture2D(tDiffuse, vUv) * w0;
  color += texture2D(tDiffuse, vUv + step * 1.0) * w1;
  color += texture2D(tDiffuse, vUv - step * 1.0) * w1;
  color += texture2D(tDiffuse, vUv + step * 2.0) * w2;
  color += texture2D(tDiffuse, vUv - step * 2.0) * w2;
  color += texture2D(tDiffuse, vUv + step * 3.0) * w3;
  color += texture2D(tDiffuse, vUv - step * 3.0) * w3;
  color += texture2D(tDiffuse, vUv + step * 4.0) * w4;
  color += texture2D(tDiffuse, vUv - step * 4.0) * w4;
  gl_FragColor = color;
}
`;
