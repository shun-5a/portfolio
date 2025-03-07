import * as THREE from 'three';

const vertexShader = `
varying vec3 vPosition;
void main() {
  vec3 pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  // varying
  vPosition = pos;
}
`;
const fragmentShader = `
  #include <common>
  varying vec3 vPosition;
  uniform vec3 uBlockScale;
  uniform vec3 uBlockOffset;

  float Random(vec3 seed) {
  return fract(sin(dot(seed, vec3(12.9898, 78.233, 42.283))) * 43758.5453123);
  }
  vec3 RandomVec3(vec3 seed) {
    return vec3(Random(seed), Random(seed + vec3(1983.378)), Random(seed + vec3(839.98)));
  }

  void main() {
    vec3 stretchPos = vPosition * uBlockScale + uBlockOffset;
    vec3 blockCenter = floor(stretchPos);
    vec3 localPos = (stretchPos - blockCenter) - vec3(0.5);
    int overCount = 0;
    for (int i=0; i<4; i++) {
      vec3 boxSize = RandomVec3(blockCenter * float(i)) * 0.5;
      vec3 boxOffset = (RandomVec3(boxSize) - vec3(0.5)) * 0.25;
      vec3 localPosOffset = abs(localPos + boxOffset);
      bool inBox = (localPosOffset.x < boxSize.x) && (localPosOffset.y < boxSize.y) && (localPosOffset.z < boxSize.z);
      overCount += inBox ? 1 : 0;
    }
    gl_FragColor = (overCount%2==1) ? vec4(1.0) :vec4(0.0);
  }
`;

export const useBlock = () => {
  // geo
  const geometry = new THREE.BoxGeometry(4, 4, 4, 2, 2, 2);
  // material
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      uBlockScale: { value: new THREE.Vector3(Math.random(), Math.random(), Math.random()) },
      uBlockOffset: { value: new THREE.Vector3(Math.random(), Math.random(), Math.random()) },
    },
  });
  // mesh
  const mesh = new THREE.Mesh(geometry, shaderMaterial);

  // parameter
  let time = 0.0;
  let seed = 0.0;
  const blockScale = 2;
  const offsetScale = 100;

  // update animation
  const update = (delta: number) => {
    time += delta * 16;
    if (seed != Math.floor(time)) {
      seed = Math.floor(time);
      shaderMaterial.uniforms.uBlockScale.value.set(blockScale * Math.random(), blockScale * Math.random(), blockScale * Math.random());
      shaderMaterial.uniforms.uBlockOffset.value.set(offsetScale * Math.random(), offsetScale * Math.random(), offsetScale * Math.random());
    }
  };

  return {
    mesh,
    update,
  };
};
