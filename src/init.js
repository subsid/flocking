import * as T from 'three';
import Boid from './Boid';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const windowDepth = 1000;
const maxWidth = windowWidth / 2;
const maxHeight = windowHeight / 2;
const maxDepth = windowDepth / 2;

function setupLights(scene) {
  const lightAmb = new T.AmbientLight(0x999999, 1);

  const lightHem = new T.HemisphereLight(0xFFFFCC, 0x222200, 1);
  lightHem.position.setY(15);

  const lightDir = new T.DirectionalLight();

  scene.add(lightAmb, lightHem, lightDir);
}

function setupFlock(numA, boids, scene) {
  // Popoulate X-Boid ships
  let i = 0;
  while (i < numA) {
    boids[i] = new Boid(1, scene);
    i += 1;
  }
}

function setupPlanets(spheres, scene) {
  const earthGeometry = new T.SphereGeometry(10, 30, 30);
  const earthMaterial = new T.MeshPhongMaterial();
  const earthMesh = new T.Mesh(earthGeometry, earthMaterial);
  earthMesh.position.add(new T.Vector3(-50, 0, 0));
  scene.add(earthMesh);
  spheres.push(earthMesh);

  const marsGeometry = new T.SphereGeometry(50, 30, 30);
  const marsMaterial = new T.MeshPhongMaterial();
  const marsMesh = new T.Mesh(marsGeometry, marsMaterial);
  marsMesh.position.add(new T.Vector3(-200, 0, 0));
  spheres.push(marsMesh);

  scene.add(marsMesh);
}

export default function init() {
  const h = 0.2;
  const clock = new T.Clock();
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, 450);
  camera.lookAt(scene.position);

  const boids = [];
  const spheres = [];

  setupLights(scene);
  setupFlock(10, boids, scene);
  setupPlanets(spheres, scene);

  return {
    h,
    boids,
    spheres,
    scene,
    camera,
    clock,
    dim: {
      windowWidth,
      windowHeight,
      windowDepth,
      maxWidth,
      maxHeight,
      maxDepth,
    },
  };
}
