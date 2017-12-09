import * as T from 'three';

import Boid from './Boid';
import { getRandInRange } from './random';
import { planetLocations } from '../src/ships';


const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const windowDepth = 1000;
const maxWidth = windowWidth / 2;
const maxHeight = windowHeight / 2;
const maxDepth = windowDepth / 2;

function setupLights(scene) {
  const lightAmb = new T.AmbientLight(0x999999, 1);

  const lightHem = new T.HemisphereLight(0xFFFFCC, 0x222200, 1);
  lightHem.position.setY(20);

  const lightDir = new T.DirectionalLight();

  scene.add(lightAmb, lightDir);
}

function setupFlock(numA, numB, vMax, boids, scene) {
  // Popoulate X-Boid ships
  let i = 0;
  while (i < numA) {
    boids[i] = new Boid(1, vMax, scene);
    i += 1;
  }

  while (i < numA + numB) {
    boids[i] = new Boid(0, vMax, scene);
    i += 1;
  }
}

function setupAsteroidField(num, spheres, scene) {
  const asteroidGeometry = new T.DodecahedronGeometry(15);
  const asteroidMaterial = new T.MeshPhongMaterial({
    map: T.ImageUtils.loadTexture('./assets/images/asteroid.jpeg'),
    bumpMap: T.ImageUtils.loadTexture('./assets/images/asteroidbump.jpg'),
    bumpScale: 10,
  });

  for (let i = 0; i < num; i++) {
    const asteroidMesh = new T.Mesh(asteroidGeometry, asteroidMaterial);
    asteroidMesh.position.add(new T.Vector3(
      getRandInRange(-300, 300),
      getRandInRange(70, 300),
      getRandInRange(-100, 100),
    ));
    scene.add(asteroidMesh);
    spheres.push(asteroidMesh);
  }
}

function setupPlanet(position, texturePath, spheres, scene) {
  const geometry = new T.SphereGeometry(50, 30, 30);
  const material = new T.MeshPhongMaterial({
    map: T.ImageUtils.loadTexture(texturePath),
  });

  const mesh = new T.Mesh(geometry, material);
  mesh.position.add(new T.Vector3(...position));

  spheres.push(mesh);
  scene.add(mesh);
}

function setupPlanets(spheres, scene) {
  const starFieldGeometry = new T.SphereGeometry(maxWidth, 32, 32);
  const starFieldMaterial = new T.MeshPhongMaterial({
    map: T.ImageUtils.loadTexture('./assets/images/galaxy_starfield.png'),
    side: T.BackSide,
  });
  const starFieldMesh = new T.Mesh(starFieldGeometry, starFieldMaterial);
  starFieldMesh.position.add(new T.Vector3(-50, 0, 0));

  scene.add(starFieldMesh);

  setupPlanet(planetLocations.earth, './assets/images/earthmap1k.jpg', spheres, scene);
  setupPlanet(planetLocations.hoth1, './assets/images/hothmap1k.jpg', spheres, scene);
  setupPlanet(planetLocations.hoth2, './assets/images/hothmap1k.jpg', spheres, scene);
  setupPlanet(planetLocations.hoth3, './assets/images/hothmap1k.jpg', spheres, scene);
  setupPlanet(planetLocations.hoth4, './assets/images/hothmap1k.jpg', spheres, scene);
  setupPlanet(planetLocations.yavin1, './assets/images/yavinmap.jpg', spheres, scene);
  setupPlanet(planetLocations.yavin2, './assets/images/yavinmap.jpg', spheres, scene);
  setupPlanet(planetLocations.yavin3, './assets/images/yavinmap.jpg', spheres, scene);
  setupPlanet(planetLocations.yavin4, './assets/images/yavinmap.jpg', spheres, scene);
}

export default function init(controller) {
  const h = 0.2;
  const clock = new T.Clock();
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(200, 300, 800);
  camera.lookAt(scene.position);

  const boids = [];
  const spheres = [];

  setupLights(scene);
  setupFlock(controller.xWings, controller.tieFighters, controller.vMax, boids, scene);
  setupPlanets(spheres, scene);
  setupAsteroidField(controller.asteroids, spheres, scene);

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
