import * as T from 'three';

const movementSpeed = 10;
const totalObjects = 100;
const objectSize = 3;
const dirs = [];
const colors = [0xFF0FFF, 0xCCFF00, 0xFF000F, 0x996600, 0xFFFFFF];

export default function ExplodeAnimation(position, scene) {
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
    color: colors[Math.round(Math.random() * colors.length)],
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
