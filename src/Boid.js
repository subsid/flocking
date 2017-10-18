import * as T from 'three';
import { getRandInRange } from './random';
import { XShip, OShip } from './ships';

export default function Boid(type, scene) {
  this.type = type;

  // Initial movement vectors
  this.position = (type) ?
    new T.Vector3(getRandInRange(80, 100), getRandInRange(-10, 10), 0) :
    new T.Vector3(getRandInRange(-80, -100), getRandInRange(-10, 10), 0);
  this.velocity = new T.Vector3(
    getRandInRange(-1, 1),
    getRandInRange(-1, 1),
    getRandInRange(-1, 1),
  );

  this.acceleration = new T.Vector3(0, 0, 0);
  this.mass = (type) ? 1 : 15;

  // Type determines boid geometry, home location, and starting position
  this.obj = (type) ? new XShip() : new OShip();
  this.home = (type) ? new T.Vector3(-50, 0, 0) : new T.Vector3(50, 0, 0);

  scene.add(this.obj.mesh);
}

// Run an iteration of the flock
Boid.prototype.step = function (flock) {
  this.accumulate(flock);
  this.update();
  this.obj.mesh.position.set(this.position.x, this.position.y, this.position.z);
};

// Apply Forces
Boid.prototype.accumulate = function (flock) {
  const separation = this.separate(flock).multiplyScalar(0.02 * this.mass);
  const alignment = this.align(flock).multiplyScalar(0.05);
  const cohesion = this.cohesion(flock).multiplyScalar(0.01);
  const centering = this.steer(this.home).multiplyScalar(0.0001);
  centering.multiplyScalar(
    this.position.distanceTo(this.home) * this.mass,
  );

  this.acceleration.add(separation);
  this.acceleration.add(alignment);
  this.acceleration.add(cohesion);
  this.acceleration.add(centering);
  this.acceleration.divideScalar(this.mass);
};

// Update Movement Vectors
Boid.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.set(0, 0, 0); // reset each iteration
  // X-Boids point in their direction of travel, O-Boids point in their direction of acceleration
  const pointAt = (this.type) ? this.position.clone() : this.velocity.clone();
  this.obj.mesh.lookAt(pointAt);
};

// Separation Function (personal space)
Boid.prototype.separate = function (flock) {
  const minRange = 60;
  let currBoid;
  const total = new T.Vector3(0, 0, 0);
  let count = 0;
  // Find total weight of separation
  for (let i = 0; i < flock.length; i++) {
    currBoid = flock[i];
    const dist = this.position.distanceTo(currBoid.position);
    // Apply weight if too close
    if (dist < minRange && dist > 0) {
      const force = this.position.clone();
      force.sub(currBoid.position);
      force.normalize();
      force.divideScalar(dist);
      total.add(force);
      count += 1;
    }
  }
  // Average out total weight
  if (count > 0) {
    total.divideScalar(count);
    total.normalize();
  }
  return total;
};

// Alignment Function (follow neighbours)
Boid.prototype.align = function (flock) {
  const neighborRange = 100;
  let currBoid;
  const total = new T.Vector3(0, 0, 0);
  let count = 0;
  // Find total weight for alignment
  for (let i = 0; i < flock.length; i++) {
    currBoid = flock[i];
    const dist = this.position.distanceTo(currBoid.position);
    // Apply force if near enough
    if (dist < neighborRange && dist > 0) {
      total.add(currBoid.velocity);
      count += 1;
    }
  }
  // Average out total weight
  if (count > 0) {
    total.divideScalar(count);
    total.limit(1);
  }
  return total;
};

// Cohesion Function (follow whole flock)
Boid.prototype.cohesion = function (flock) {
  const neighborRange = 100;
  let currBoid;
  const total = new T.Vector3(0, 0, 0);
  let count = 0;
  // Find total weight for cohesion
  for (let i = 0; i < flock.length; i++) {
    currBoid = flock[i];
    const dist = this.position.distanceTo(currBoid.position);
    // Apply weight if near enough
    if (dist < neighborRange && dist > 0) {
      total.add(currBoid.position);
      count += 1;
    }
  }
  // Average out total weight
  if (count > 0) {
    total.divideScalar(count);
    // Find direction to steer with
    return this.steer(total);
  }

  return total;
};

Boid.prototype.steer = function (target) {
  const steer = new T.Vector3(0, 0, 0);
  const des = new T.Vector3().subVectors(target, this.position);
  const dist = des.length();
  if (dist > 0) {
    des.normalize();
    steer.subVectors(des, this.velocity);
  }
  return steer;
};

