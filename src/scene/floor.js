import * as THREE from 'three';
import { createFloorMaterial, palette } from './materials.js';

export function createFloor(size = 30) {
  const floorGeometry = new THREE.PlaneGeometry(size, size);
  const floorMaterial = createFloorMaterial();
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;

  const grid = new THREE.GridHelper(size, size, palette.gridLines, palette.gridLines);
  grid.position.y = 0.01; // avoid z-fighting with the floor surface

  return { floor, grid };

}