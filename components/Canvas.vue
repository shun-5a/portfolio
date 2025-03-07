<template>
  <div id="canvas_container">
    <canvas
      id="canvas"
      ref="threeCanvas"
    />
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const { useCube } = await import('@/composables/three/useCube');
const { useNetwork } = await import('@/composables/three/useNetwork');
const { useBlock } = await import ('@/composables/three/useBlock');

// DOM ref
const threeCanvas = ref<HTMLCanvasElement>();

// parameter
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer, effectComposer: EffectComposer, unrealBloomPass: UnrealBloomPass;

// window resize
const onWindowResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(1);
  renderer.setSize(width, height);
  effectComposer.setSize(width, height);
  unrealBloomPass.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

onMounted(() => {
  if (!threeCanvas.value) return;

  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // camera
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 2;
  // camera control
  const controls = new OrbitControls(camera, threeCanvas.value);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.enableZoom = false;
  controls.enablePan = false;

  // create render pass
  // renderer
  renderer = new THREE.WebGLRenderer({
    canvas: threeCanvas.value,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  // post process
  effectComposer = new EffectComposer(renderer);
  unrealBloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.5, // strength
    0.2, // radius
    0, // threshold
  );
  effectComposer.addPass(new RenderPass(scene, camera));
  effectComposer.addPass(unrealBloomPass);

  // objects
  const cube = useCube();
  const cubeMesh = cube.mesh;
  const network = useNetwork();
  const networkMesh = network.mesh;
  const block = useBlock();
  const blockMesh = block.mesh;

  scene.add(cubeMesh);
  scene.add(networkMesh);
  scene.add(blockMesh);

  // animation loop
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    // time control
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    const loopTime = elapsedTime % 30.0;
    // update
    if (loopTime < 10.0) {
      cube.update(delta);
      cubeMesh.visible = true;
      networkMesh.visible = false;
      blockMesh.visible = false;
    }
    else if (loopTime < 20.0) {
      network.update(delta);
      cubeMesh.visible = false;
      networkMesh.visible = true;
      blockMesh.visible = false;
    }
    else {
      block.update(delta);
      cubeMesh.visible = false;
      networkMesh.visible = false;
      blockMesh.visible = true;
    }

    // render
    effectComposer.render();
  };
  animate();

  // window resize
  onWindowResize();
  window.addEventListener('resize', onWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  renderer.dispose();
});
</script>

<style scoped>
#canvas_container {
  overflow: hidden;
  margin: 0;
  opacity: 0.8;
}

#canvas {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: block;
}
</style>
