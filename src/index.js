import * as T from 'three';
import OrbitControls from 'three-orbitcontrols';

import './style/style.css';
import init from './init';
import animate from './animate';

// Limit max forces
T.Vector3.prototype.limit = function (max) {
  if (this.length() > max) {
    this.normalize();
    this.multiplyScalar(max);
  }
};

function component() {
  const element = document.createElement('div');

  element.classList.add = 'render';

  return element;
}

function Renderer(state) {
  const r = new T.WebGLRenderer({ canvas: document.getElementById('my-canvas') });
  r.setPixelRatio(window.devicePixelRatio);
  r.setSize(window.innerWidth, window.innerHeight);

  r.setClearColor(0x111111);
  r.setSize(state.dim.windowWidth, state.dim.windowHeight);

  return r;
}

function mkRender(renderer, { scene, camera }) {
  return () => {
    renderer.render(scene, camera);
  };
}

function start(controller) {
  if (window.animationId !== null) {
    cancelAnimationFrame(window.animationId);
  }

  const state = init(controller);
  const renderer = Renderer(state);
  const controls = new OrbitControls(state.camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  // controls.enableZoom = false;
  state.controls = controls;

  window.animate = true;
  animate(state, mkRender(renderer, state));
}

function main() {
  document.body.appendChild(component());
  const gui = new window.dat.GUI();
  const controller = {
    xWings: 10,
    tieFighters: 0,
    vMax: 1,
    perspectiveCamera: false,
    setInitial: false,
  };

  const obj = {
    start() {
      window.animate = false;
      start(controller);
    },
  };
  obj.start();

  gui.add(obj, 'start');
  gui.add(controller, 'perspectiveCamera');
  gui.add(controller, 'setInitial');
  gui.add(controller, 'xWings', 0, 100).step(1);
  gui.add(controller, 'tieFighters', 0, 100).step(1);
  gui.add(controller, 'vMax', 1, 100).step(1);
  gui.close();
}

main();
