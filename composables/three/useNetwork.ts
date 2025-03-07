import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const vertexShader = `
varying vec2 vUv;
void main() {
  vec3 pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  
  // varying
  vUv = uv;
}
`;
const fragmentShader = `
#include <common>
varying vec2 vUv;
uniform float uTime;
void main() {
  float animation = abs((fract(-uTime + vUv.x) * 3.0 - 1.0) - vUv.y);
  float value = 1.0 - smoothstep(0.3, 0.4, animation);
  vec4 color = mix(vec4(4.0), vec4(0.1), value);
  if (value < 0.01) {
    discard;
  }
  gl_FragColor = vec4(color);
}
`;

export const useNetwork = () => {
  // material
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0.0 },
    },
  });

  // mesh
  const mesh = new THREE.Mesh();
  mesh.material = shaderMaterial;
  const loader = new GLTFLoader();
  loader.load('./model/boxNetwork.glb', (gltf) => {
    gltf.scene.traverse((child) => {
      if (((child) as THREE.Mesh).isMesh) {
        mesh.geometry = (child as THREE.Mesh).geometry;
      }
    });
  });

  // parameter
  let time = 0.0;

  // update animation
  const update = (delta: number) => {
    time += delta;
    shaderMaterial.uniforms.uTime.value = time * 0.2;
  };

  return {
    mesh,
    update,
  };
};
