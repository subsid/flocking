export default function animate(state, render) {
  if (window.animate) {
    window.animationId = window.requestAnimationFrame(animate.bind(null, state, render));

    const { explosions, boids, spheres, scene, camera } = state;

    // Run iteration for each flock
    for (let i = 0; i < boids.length; i++) {
      boids[i].step(boids, spheres, explosions, scene);
    }

    for (let i = 0; i < explosions.length; i++) {
      if (explosions[i].alive) {
        explosions[i].update();
      }
    }
    // camera.position.fromArray(boids[0].position.toArray());
    // camera.lookAt(boids[0].velocity.clone());
    render();
  }
}
