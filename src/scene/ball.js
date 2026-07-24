import * as THREE from 'three';
import { createBeachBallMaterial, createOutlineMaterial } from './materials.js';

export function createBall(radius = 1.4) {
  // A smooth SphereGeometry (not the icosahedron) reads much better as a ball
  // once it has a striped texture — flat facets would distort the panels.
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = createBeachBallMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = radius; // sit on top of the floor, not floating

  // Outline: a slightly bigger copy of the ball, rendered inside-out (BackSide).
  // Its inner surface peeks out just past the real ball's edges, reading as a
  // thin, clean black outline all the way around.
  const outlineGeometry = new THREE.SphereGeometry(radius * 1.015, 32, 32);
  const outlineMaterial = createOutlineMaterial();
  const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);
  outlineMesh.position.copy(mesh.position);

  // Flat, fully opaque, hard-edged shadow shape — matching a flat-illustration
  // style rather than a physically-simulated soft shadow.
  const shadowGeometry = new THREE.CircleGeometry(radius * 1.1, 32);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    fog: false,
  });
  const contactShadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.02;

  return { mesh, outlineMesh, contactShadow };
}