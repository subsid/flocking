export default function animate(state, render) {
  if (window.animate) {
    window.animationId = window.requestAnimationFrame(animate.bind(null, state, render));

    const { boids, spheres } = state;

    // Run iteration for each flock
    for (let i = 0; i < boids.length; i++) {
      boids[i].step(boids, spheres);
    }
    render();
  }
}
