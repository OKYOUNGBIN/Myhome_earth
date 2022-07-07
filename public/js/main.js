import * as THREE from "/three/build/three.module.js";
import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "/three/src/loaders/TextureLoader.js";
let scene, camera, renderer, canvas, light, pointLight;
let controls, raycaster, pointer;
let rotSpeed = 0.003;

raycaster = new THREE.Raycaster();
pointer = new THREE.Vector2();

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const texture = new THREE.TextureLoader().load("/images/earth_texture.jpg");

let geometry = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshPhongMaterial({
  map: texture,
});
let earthmesh = new THREE.Mesh(geometry, material);
scene.add(earthmesh);

scene.add(new THREE.AmbientLight(0x333333));

// light = new THREE.DirectionalLight(0xffffff);
// //lightHelper = new THREE.DirectionalLightHelper(light, 5);
// scene.add(light);

pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const sphereSize = 10;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

console.log(pointLightHelper);
camera.position.z = 2;
canvas = document.querySelector(".c");
renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);

controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

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
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {}
}

function animate() {
  renderer.render(scene, camera);

  earthmesh.rotation.x += rotSpeed;

  requestAnimationFrame(animate);
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateWorldMatrix();
  }
}
window.addEventListener("pointermove", onPointerMove);

window.requestAnimationFrame(render);
animate();
