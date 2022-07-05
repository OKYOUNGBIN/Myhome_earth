import * as THREE from "/three/build/three.module.js";
import { TextureLoader } from "/three/src/loaders/TextureLoader.js";
let scene, camera, renderer, canvas;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const texture = new THREE.TextureLoader().load("/images/earth_texture.jpg");

let geometry = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshBasicMaterial({ map: texture });
let earthmesh = new THREE.Mesh(geometry, material);
scene.add(earthmesh);

scene.add(new THREE.AmbientLight(0x333333));

let light = new THREE.DirectionalLight(0xffffff);
let helper = new THREE.DirectionalLightHelper(light, 5);
scene.add(helper);

camera.position.z = 2;

canvas = document.querySelector(".c");
renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);

function resizeRendererToDisplaySize(renderer) {
  canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;

  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateWorldMatrix();
  }
}

animate();
