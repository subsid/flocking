import * as T from 'three';

// Color list
const col = {
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
  const fin_ul = new T.Mesh(geom.box, mat.x_hull);
  fin_ul.position.set(0, 0, -4);
  fin_ul.rotateZ(T.Math.degToRad(30));
  fin_ul.scale.set(20, 0.5, 3);
  const fin_ur = new T.Mesh(geom.box, mat.x_hull);
  fin_ur.position.set(0, 0, -4);
  fin_ur.rotateZ(T.Math.degToRad(-30));
  fin_ur.scale.set(20, 0.5, 3);

  const x_ship = new T.Group();
  x_ship.add(nose, beacon, pit, hull, dorsal, fin_ul, fin_ur);
  x_ship.castShadow = true;
  this.mesh = x_ship;
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
  const wing_l = new T.Mesh(geom.tri, mat.o_dec);
  wing_l.position.set(4, -2, -1);
  wing_l.rotateX(T.Math.degToRad(90));
  wing_l.rotateZ(T.Math.degToRad(-30));
  wing_l.scale.set(6, 1, 3);
  const wing_r = new T.Mesh(geom.tri, mat.o_dec);
  wing_r.position.set(-4, -2, -1);
  wing_r.rotateX(T.Math.degToRad(90));
  wing_r.rotateZ(T.Math.degToRad(30));
  wing_r.scale.set(6, 1, 3);

  const fin_l = new T.Mesh(geom.tri, mat.o_dec);
  fin_l.position.set(4, 3, -2);
  fin_l.rotateZ(T.Math.degToRad(60));
  fin_l.rotateY(T.Math.degToRad(30));
  fin_l.scale.set(6, 1, 3);
  const fin_r = new T.Mesh(geom.tri, mat.o_dec);
  fin_r.position.set(-4, 3, -2);
  fin_r.rotateZ(T.Math.degToRad(-60));
  fin_r.rotateY(T.Math.degToRad(-30));
  fin_r.scale.set(6, 1, 3);

  const o_ship = new T.Group();
  o_ship.add(nose, hull, pit, wing_l, fin_l, fin_r, wing_r);
  o_ship.castShadow = true;
  this.mesh = o_ship;
  // scene.add(o_ship);
  // o_ship.position.set(20,0,0);
}

