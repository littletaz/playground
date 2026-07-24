import * as THREE from 'three';

export function createLights() {
  const ambient = new THREE.AmbientLight(0xffffff, 1);

  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(10, 18, 6);

  return [ambient, sun];
}