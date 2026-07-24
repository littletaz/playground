import * as THREE from 'three';

// Central place for your visual style: colors, shading approach, finishes.
// Change something here, and every object using it updates at once.

export const palette = {
  floor: 0xffffff,
  gridLines: 0x000000,
  background: 0xffffff,
  outline: 0x000000,
};

// A 3-step gradient (shadow / mid / highlight) is what gives MeshToonMaterial
// its flat, banded "cel-shaded" look instead of a smooth realistic gradient.
const toonGradient = new THREE.DataTexture(
  new Uint8Array([80, 80, 80, 255, 160, 160, 160, 255, 255, 255, 255, 255]),
  3,
  1,
  THREE.RGBAFormat
);
toonGradient.needsUpdate = true;

export function createToonMaterial(color) {
  return new THREE.MeshToonMaterial({
    color,
    gradientMap: toonGradient,
  });
}

export function createOutlineMaterial(color = palette.outline) {
  return new THREE.MeshBasicMaterial({
    color,
    side: THREE.BackSide, // renders only the inside of the mesh, so it peeks out as an outline
    fog: false,
  });
}

export function createFloorMaterial() {
  return new THREE.MeshStandardMaterial({
    color: palette.floor,
    roughness: 0.9,
    metalness: 0,
  });
}

// Draws vertical color panels on a canvas, like a classic beach ball,
// then wraps that canvas around a sphere as a texture.
export function createBeachBallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const colors = ['#1e5fff', '#ffffff', '#ffd400']; // blue, white, yellow
  const panels = 6; // repeating the 3 colors twice around the sphere
  const panelWidth = canvas.width / panels;

  for (let i = 0; i < panels; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(i * panelWidth, 0, panelWidth, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping; // wraps around the sphere's equator
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createBeachBallMaterial() {
  return new THREE.MeshToonMaterial({
    map: createBeachBallTexture(),
    gradientMap: toonGradient,
  });
}