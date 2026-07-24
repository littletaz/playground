import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './scene/camera.js';
import { createLights } from './scene/lights.js';
import { createFloor } from './scene/floor.js';
import { createBall } from './scene/ball.js';
import { palette } from './scene/materials.js';

// --- Scene ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(palette.background);
scene.fog = new THREE.Fog(palette.background, 20, 45);

// --- Camera ---
const { camera, frustumSize } = createCamera();

// --- Renderer ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// --- Controls: locked pitch keeps the isometric feel, free rotation around the map ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0, 0);
controls.minPolarAngle = controls.maxPolarAngle = Math.atan(Math.SQRT1_2);
controls.minZoom = 0.5;
controls.maxZoom = 2.5;
controls.enablePan = false;

// --- Assemble the scene from our building blocks ---
const lights = createLights();
lights.forEach((light) => scene.add(light));

const { floor, grid } = createFloor();
scene.add(floor, grid);

const { mesh, outlineMesh, contactShadow } = createBall();
scene.add(mesh, outlineMesh, contactShadow);

// --- Handle window resize ---
window.addEventListener('resize', () => {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = (-frustumSize * aspect) / 2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Animation loop ---
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  mesh.rotation.y = elapsed * 0.25;
  outlineMesh.rotation.y = mesh.rotation.y;

  controls.update();
  renderer.render(scene, camera);
}

animate();