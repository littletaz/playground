import * as THREE from 'three';

export function createCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = 14;

  const camera = new THREE.OrthographicCamera(
    (-frustumSize * aspect) / 2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    -frustumSize / 2,
    0.1,
    200
  );

  const isoDistance = 20;
  camera.position.set(isoDistance, isoDistance * 0.8165, isoDistance);
  camera.lookAt(0, 0, 0);

  return { camera, frustumSize };
}