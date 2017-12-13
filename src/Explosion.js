import * as T from 'three';

const movementSpeed = 10;
const totalObjects = 100;
const objectSize = 4;
const dirs = [];
const xwingColors = 0xFFFFFF;
const tieFigherColors = 0x5ab3fc;

export default function ExplodeAnimation(position, type, scene) {
  const geometry = new T.Geometry();
  this.clock = new T.Clock();
  this.scene = scene;

  for (let i = 0; i < totalObjects; i++) {
    const vertex = (new T.Vector3()).fromArray(position);

    geometry.vertices.push(vertex);
    dirs.push(
      {
        x: (Math.random() * movementSpeed) - (movementSpeed / 2),
        y: (Math.random() * movementSpeed) - (movementSpeed / 2),
        z: (Math.random() * movementSpeed) - (movementSpeed / 2),
      });
  }
  const material = new T.PointsMaterial({
    size: objectSize,
    color: type ? xwingColors : tieFigherColors,
  });
  const particles = new T.Points(geometry, material);

  this.object = particles;
  this.alive = true;

  this.xDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
  this.yDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
  this.zDir = (Math.random() * movementSpeed) - (movementSpeed / 2);

  scene.add(this.object);
}

ExplodeAnimation.prototype.update = function () {
  if (this.clock.getElapsedTime() < 4) {
    let pCount = totalObjects;

    while (pCount) {
      pCount -= 1;
      const particle = this.object.geometry.vertices[pCount];
      particle.y += dirs[pCount].y;
      particle.x += dirs[pCount].x;
      particle.z += dirs[pCount].z;
    }
    this.object.geometry.verticesNeedUpdate = true;
  } else {
    this.alive = false;
    this.scene.remove(this.object);
  }
};
