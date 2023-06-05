import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';

function Three2() {
  let camera, scene, renderer, bulbLight, bulbMat, hemiLight, stats;
  let ballMat, cubeMat, floorMat;

  const container = document.body;

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.x = -4;
  camera.position.z = 4;
  camera.position.y = 2;

  scene = new THREE.Scene();

  const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
  bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);

  bulbMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000,
  });
  bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(0, 2, 0);
  bulbLight.castShadow = true;
  scene.add(bulbLight);

  floorMat = new THREE.MeshStandardMaterial({
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 0.0005,
  });

  const floorGeometry = new THREE.PlaneGeometry(20, 20);
  const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
  floorMesh.receiveShadow = true;
  floorMesh.rotation.x = -Math.PI / 2.0;
  scene.add(floorMesh);

  renderer = new THREE.WebGLRenderer();
  renderer.useLegacyLights = false;
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  return <div id="container"></div>;
}

export default Three2;
