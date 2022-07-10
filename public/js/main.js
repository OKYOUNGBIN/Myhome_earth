import * as THREE from "/three/build/three.module.js";
import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "/three/src/loaders/TextureLoader.js";
import { FontLoader } from "/three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "/three/examples/jsm/geometries/TextGeometry.js";

let scene, camera, renderer, canvas, light, spotLight;
let controls, raycaster, pointer, textMesh1;
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

light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const fontLoader = new FontLoader();

fontLoader.load(
  "/three/examples/fonts/helvetiker_bold.typeface.json",
  function (font) {
    const textGeo = new TextGeometry("Hello three.js!", {
      font: font,
      size: 80,
      height: 10,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    var textMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      specular: 0xffffff,
    });

    var mesh = new THREE.Mesh(textGeo, textMaterial);

    scene.add(mesh);
    console.log(mesh);
  }
);

// const fontLoader = new THREE.FontLoader();
// fontLoader.load(
//   "/three/examples/fonts/helvetiker_bold.typeface.json",
//   function (font) {
//     var textGeometry = new THREE.TextGeometry("text", {
//       font: font,

//       size: 50,
//       height: 10,
//       curveSegments: 12,

//       bevelThickness: 1,
//       bevelSize: 1,
//       bevelEnabled: true,
//     });

//     var textMaterial = new THREE.MeshPhongMaterial({
//       color: 0xff0000,
//       specular: 0xffffff,
//     });

//     var mesh = new THREE.Mesh(textGeometry, textMaterial);

//     scene.add(mesh);
//   }
// );

// light = new THREE.DirectionalLight(0xffffff);
// //lightHelper = new THREE.DirectionalLightHelper(light, 5);
// scene.add(light);

spotLight = new THREE.SpotLight(0x78ff00, 0.5, 30, Math.PI * 0.1, 0.1, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

spotLight.target.position.x = -0.75;
scene.add(spotLight.target);

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
