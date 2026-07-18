import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// --- Scene, camera, renderer ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0f);
scene.fog = new THREE.FogExp2(0x0a0a0f, 0.035);

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// --- Controls ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3;
controls.maxDistance = 15;

// --- Lighting ---
const ambient = new THREE.AmbientLight(0x404060, 1.2);
scene.add(ambient);

const keyLight = new THREE.PointLight(0x88aaff, 60, 20);
keyLight.position.set(4, 4, 4);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0xff6688, 40, 20);
rimLight.position.set(-4, -2, -4);
scene.add(rimLight);

// --- Main object: an icosahedron with a wireframe overlay ---
const geometry = new THREE.IcosahedronGeometry(1.6, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x556fff,
  metalness: 0.3,
  roughness: 0.25,
  flatShading: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const wireGeometry = new THREE.IcosahedronGeometry(1.62, 1);
const wireMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
  transparent: true,
  opacity: 0.15,
});
const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
scene.add(wireMesh);

// --- Starfield background particles ---
const starGeometry = new THREE.BufferGeometry();
const starCount = 800;
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 60;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.03,
  transparent: true,
  opacity: 0.6,
});
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// --- Handle window resize ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Animation loop ---
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  mesh.rotation.x = elapsed * 0.15;
  mesh.rotation.y = elapsed * 0.22;
  wireMesh.rotation.copy(mesh.rotation);

  stars.rotation.y = elapsed * 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
