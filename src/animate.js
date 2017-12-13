let num = {
  0: 0,
  1: 0,
};

let xWings = document.querySelector(".xwings-left .score");
let tieFighters = document.querySelector(".tiefighters-left .score");
let cameraBoidIndex = 0;
export default function animate(state, render) {
  num[0] = 0;
  num[1] = 0;
  if (window.animate) {
    window.animationId = window.requestAnimationFrame(animate.bind(null, state, render));

    const { controller, explosions, boids, spheres, scene, camera } = state;

    // Run iteration for each flock
    for (let i = 0; i < boids.length; i++) {
      boids[i].step(boids, spheres, explosions, scene);
      if (boids[i].alive) {
        num[boids[i].type] += 1;
      }

      if (boids[i].type && boids[i].alive) {
        cameraBoidIndex = i;
      }
    }

    for (let i = 0; i < explosions.length; i++) {
      if (explosions[i].alive) {
        explosions[i].update();
      }
    }

    if (controller.perspectiveCamera) {
      camera.position.fromArray(boids[cameraBoidIndex].position.toArray());
      camera.lookAt(boids[cameraBoidIndex].velocity);
    }

    if (controller.setInitial) {
      camera.position.set(0, 0, 1000);
      camera.lookAt(scene.position);
    }
    render();
  }
  xWings.innerHTML = num[1];
  tieFighters.innerHTML = num[0];
}
