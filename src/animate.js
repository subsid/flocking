let cameraBoidIndex = 0;
export default function animate(state, render) {
  if (window.animate) {
    window.animationId = window.requestAnimationFrame(animate.bind(null, state, render));

    const { controller, explosions, boids, spheres, scene, camera } = state;

    // Run iteration for each flock
    for (let i = 0; i < boids.length; i++) {
      boids[i].step(boids, spheres, explosions, scene);
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
}
