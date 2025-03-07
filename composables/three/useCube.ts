import * as THREE from 'three';

const vertexShader = `
varying vec3 vPosition;
void main() {
  vec3 pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  // varying
  vPosition = position;
}
`;
const fragmentShader = `
#include <common>
varying vec3 vPosition;
uniform vec3 uRot;
uniform float uScale;
uniform float uThreshold;

mat3 Rotate(vec3 angle) {
  float cx = cos(angle.x);
  float sx = sin(angle.x);
  float cy = cos(angle.y);
  float sy = sin(angle.y);
  float cz = cos(angle.z);
  float sz = sin(angle.z);
  
  return mat3 (
    cx*cy, cx*sy*sz-sx*cz, cx*sy*cz+sx*sz,
    sx*cy, sx*sy*sz+cx*cz, sx*sy*cz-cx*sz,
    -sy, cy*sz, cy*cz
  );
}

void main() {
  vec3 rotPos = vPosition.xyz * Rotate(uRot * 2.0 * PI);
  vec4 color = (fract(rotPos.x * (uScale + 1.0)) < uThreshold) ? vec4(0.0) : vec4(1.0);
  gl_FragColor = color;
}
`;

export const useCube = () => {
  // geo
  const geometry = new THREE.BoxGeometry(4, 4, 4, 2, 2, 2);
  // material
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      uRot: { value: new THREE.Vector3(Math.random(), Math.random(), Math.random()) },
      uScale: { value: 1.0 },
      uThreshold: { value: 0.5 },
    },
  });
  // mesh
  const mesh = new THREE.Mesh(geometry, shaderMaterial);

  // parameter
  let time = 0.0;
  let seed = 0.0;

  // update animation
  const update = (delta: number) => {
    time += delta;
    shaderMaterial.uniforms.uThreshold.value = 0.5 * (time - Math.floor(time)) + 0.5;
    if (seed != Math.floor(time)) {
      seed = Math.floor(time);
      shaderMaterial.uniforms.uRot.value.set(Math.random(), Math.random(), Math.random());
      shaderMaterial.uniforms.uScale.value = 5.0 * Math.random();
    }
  };

  return {
    mesh,
    update,
  };
};
