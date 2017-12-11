import * as T from 'three';

export default function Bullet(position, velocity, scene) {
  this.position = new T.Vector3(...position);
  this.velocity = new T.Vector3(...velocity);
  this.velocity.normalize().multiplyScalar(20);

  this.age = 0;
  this.deathAge = 5;
  this.alive = true;
  this.clock = new T.Clock();

  const material = new T.MeshPhongMaterial();
  const geometry = new T.SphereGeometry(3);

  const mesh = new T.Mesh(geometry, material);
  this.material = material;
  this.geometry = geometry;
  this.obj = mesh;
  this.obj.position.set(this.position.x, this.position.y, this.position.z);
  scene.add(mesh);
}

Bullet.prototype.step = function () {
  this.age += this.clock.getDelta();
  if (this.age > this.deathAge) {
    this.alive = false;
    return;
  }
  this.update();
  this.obj.position.set(this.position.x, this.position.y, this.position.z);
};

Bullet.prototype.update = function () {
  this.position.add(this.velocity);
};

