import * as T from 'three';

// Planet locations
export const planetLocations = {
  hoth: [-200, 0, 0],
  yavin: [200, 0, 0],
  earth: [0, 0, 0],
};

// Color list
export const col = {
  red: 0xCC2200,
  blue: 0x333399,
  black: 0x222222,
  grey: 0x111133,
  white: 0xCCCCAA,
  green: 0x00FF00,
  void: 0x111111,
};

// Geometry types
const geom = {
  box: new T.BoxGeometry(1, 1, 1),
  ico: new T.IcosahedronGeometry(1, 0),
  tri: new T.CylinderGeometry(1, 1, 1, 3),
  taper: new T.CylinderGeometry(0.5, 1, 1, 4),
};

// Materials
const mat = {
  x_hull: new T.MeshStandardMaterial({ color: col.white }),
  o_hull: new T.MeshStandardMaterial({ color: col.grey, shading: T.FlatShading }),
  x_dec: new T.MeshStandardMaterial({ color: col.red }),
  o_dec: new T.MeshStandardMaterial({ color: col.blue }),
  x_pit: new T.MeshStandardMaterial({ color: col.black }),
  o_pit: new T.MeshStandardMaterial({ color: col.green }),
};

export function XShip() {
  const nose = new T.Mesh(geom.taper, mat.x_hull);
  nose.position.set(0, 0, 2);
  nose.scale.set(2, 3, 7);
  const beacon = new T.Mesh(geom.taper, mat.x_dec);
  beacon.position.set(0, 0.5, 1);
  beacon.scale.set(2, 3, 6);
  const pit = new T.Mesh(geom.taper, mat.x_pit);
  pit.position.set(0, 0, 3);
  pit.scale.set(2, 2, 7);
  const hull = new T.Mesh(geom.box, mat.x_hull);
  hull.scale.set(4, 3, 10);
  hull.position.set(0, 0, -3);
  const dorsal = new T.Mesh(geom.tri, mat.x_hull);
  dorsal.position.set(0, 0, -5);
  dorsal.rotateX(T.Math.degToRad(90));
  dorsal.rotateY(T.Math.degToRad(90));
  dorsal.rotateX(T.Math.degToRad(-90));
  dorsal.scale.set(6, 1, 8);
  const finUl = new T.Mesh(geom.box, mat.x_hull);
  finUl.position.set(0, 0, -4);
  finUl.rotateZ(T.Math.degToRad(30));
  finUl.scale.set(20, 0.5, 3);
  const finUr = new T.Mesh(geom.box, mat.x_hull);
  finUr.position.set(0, 0, -4);
  finUr.rotateZ(T.Math.degToRad(-30));
  finUr.scale.set(20, 0.5, 3);

  const xShip = new T.Group();
  xShip.add(nose, beacon, pit, hull, dorsal, finUl, finUr);
  xShip.castShadow = true;
  this.mesh = xShip;
  // scene.add(x_ship);
  // x_ship.position.set(-20,0,0);
}

export function OShip() {
  const nose = new T.Mesh(geom.ico, mat.o_hull);
  nose.scale.set(5, 5, 5);
  const hull = new T.Mesh(geom.taper, mat.o_hull);
  hull.position.set(0, 0, 1);
  hull.rotateX(T.Math.degToRad(90));
  hull.rotateY(T.Math.degToRad(45));
  hull.scale.set(5, 8, 5);
  const pit = new T.Mesh(geom.taper, mat.o_pit);
  pit.position.set(0, 0, 4);
  pit.rotateX(T.Math.degToRad(90));
  pit.scale.set(3.5, 2.5, 2.5);
  const wingL = new T.Mesh(geom.tri, mat.o_dec);
  wingL.position.set(4, -2, -1);
  wingL.rotateX(T.Math.degToRad(90));
  wingL.rotateZ(T.Math.degToRad(-30));
  wingL.scale.set(6, 1, 3);
  const wingR = new T.Mesh(geom.tri, mat.o_dec);
  wingR.position.set(-4, -2, -1);
  wingR.rotateX(T.Math.degToRad(90));
  wingR.rotateZ(T.Math.degToRad(30));
  wingR.scale.set(6, 1, 3);

  const finL = new T.Mesh(geom.tri, mat.o_dec);
  finL.position.set(4, 3, -2);
  finL.rotateZ(T.Math.degToRad(60));
  finL.rotateY(T.Math.degToRad(30));
  finL.scale.set(6, 1, 3);
  const finR = new T.Mesh(geom.tri, mat.o_dec);
  finR.position.set(-4, 3, -2);
  finR.rotateZ(T.Math.degToRad(-60));
  finR.rotateY(T.Math.degToRad(-30));
  finR.scale.set(6, 1, 3);

  const Oship = new T.Group();
  Oship.add(nose, hull, pit, wingL, finL, finR, wingR);
  Oship.castShadow = true;
  this.mesh = Oship;
  // scene.add(o_ship);
  // o_ship.position.set(20,0,0);
}

