import * as T from 'three';
import Boid from './Boid';
import {getRandInRange} from './random';


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

function setupPlanets(spheres, scene) {
  const starFieldGeometry = new T.SphereGeometry(maxWidth, 32, 32);
  const starFieldMaterial = new T.MeshPhongMaterial({
    map: T.ImageUtils.loadTexture('./assets/images/galaxy_starfield.png'),
    side: T.BackSide,
  });
  const starFieldMesh = new T.Mesh(starFieldGeometry, starFieldMaterial);
  starFieldMesh.position.add(new T.Vector3(-50, 0, 0));

  scene.add(starFieldMesh);

  const earthGeometry = new T.SphereGeometry(20, 30, 30);
  const earthMaterial = new T.MeshPhongMaterial({
    map: T.ImageUtils.loadTexture('./assets/images/earthmap1k.jpg'),
    bumpMap: T.ImageUtils.loadTexture('./assets/images/earthbump1k.jpg'),
    bumpScale: 1,
  });
  const earthMesh = new T.Mesh(earthGeometry, earthMaterial);
  earthMesh.position.add(new T.Vector3(-50, 0, 0));
  scene.add(earthMesh);
  spheres.push(earthMesh);

  const hothGeometry = new T.SphereGeometry(50, 30, 30);
  const hothMaterial = new T.MeshPhongMaterial({
    map: T.ImageUtils.loadTexture('./assets/images/hothmap1k.jpg'),
  });

  const hothMesh = new T.Mesh(hothGeometry, hothMaterial);
  hothMesh.position.add(new T.Vector3(-200, 0, 0));
  spheres.push(hothMesh);

  scene.add(hothMesh);

  const yavinGeometry = new T.SphereGeometry(50, 30, 30);
  const yavinMaterial = new T.MeshPhongMaterial({
    map: T.ImageUtils.loadTexture('./assets/images/yavinmap.jpg'),
  });

  const yavinMesh = new T.Mesh(yavinGeometry, yavinMaterial);
  yavinMesh.position.add(new T.Vector3(200, 0, 0));
  spheres.push(yavinMesh);

  scene.add(yavinMesh);
}

export default function init(controller) {
  const h = 0.2;
  const clock = new T.Clock();
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, 450);
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
