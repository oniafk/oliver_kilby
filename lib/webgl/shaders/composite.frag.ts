export const compositeFrag = /* glsl */`
uniform sampler2D tModel;
uniform vec2 uCursor;
uniform float uRadius;
uniform float uStrength;
uniform float uAspect;
varying vec2 vUv;

void main() {
  vec2 delta = vUv - uCursor;
  delta.x *= uAspect;
  float dist = length(delta);

  vec2 sampleUV = vUv;
  if (dist < uRadius) {
    float t = dist / uRadius;
    float warp = 1.0 - uStrength * (1.0 - t * t);
    delta.x /= uAspect;
    sampleUV = uCursor + delta * warp;
  }

  gl_FragColor = texture2D(tModel, sampleUV);
}
`;
