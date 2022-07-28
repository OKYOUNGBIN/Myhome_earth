import * as maptalks from "/maptalks/dist/maptalks.min.js";
import * as THREE from "/three/build/three.module.js";
//plugin's classes should be imported directly like
//import { ThreeLayer } from "/maptalks.three/dist/maptalks.three.min.js";

let canvas = document.getElementById("c");
const map = new maptalks.Map(canvas, {
  center: [0, 0],
  zoom: 1,
});

const layer = new ThreeLayer("three");

// var threeLayer = new maptalks.ThreeLayer("t");
// threeLayer.prepareToDraw = function (gl, scene, camera) {
//   var light = new THREE.DirectionalLight(0xffffff);
//   light.position.set(0, -10, -10).normalize();
//   scene.add(light);

//   var material = new THREE.MeshPhongMaterial();
//   countries.features.forEach(function (g) {
//     //g is geojson Feature
//     var num = g.properties.population;

//     var extrudePolygon = threeLayer.toExtrudePolygon(
//       g,
//       { height: num },
//       material
//     );
//     threeLayer.addMesh(extrudePolygon);
//   });
// };
