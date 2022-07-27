import * as THREE from "/three/build/three.module.js";
import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "/three/src/loaders/TextureLoader.js";
import { FontLoader } from "/three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "/three/examples/jsm/geometries/TextGeometry.js";

let scene, camera, renderer, canvas, light, spotLight;
let controls, raycaster, pointer, textMesh, textMaterial, textGeo, earthTexture;
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

earthTexture = new THREE.TextureLoader().load("/images/earth_texture.jpg");

textMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  specular: 0xffffff,
});

let earthGeometry = new THREE.SphereGeometry(1, 32, 32);
let earthMaterial = new THREE.MeshPhongMaterial({
  map: earthTexture,
});
let earthmesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthmesh);

light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

let fontLoader = new FontLoader();
fontLoader.load(
  "/three/examples/fonts/helvetiker_bold.typeface.json",
  function (font) {
    textGeo = new TextGeometry("Click Here!", {
      font: font,
      size: 1,
      height: 0.1,
      // curveSegments: 12,
      // bevelEnabled: true,
      // bevelThickness: 10,
      // bevelSize: 8,
      // bevelOffset: 0,
      // bevelSegments: 5,
    });
    textMesh = new THREE.Mesh(textGeo, textMaterial);
    scene.add(textMesh);
    textMesh.name = "link";
  }
);

spotLight = new THREE.SpotLight(0x78ff00, 0.5, 30, Math.PI * 0.1, 0.1, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

spotLight.target.position.x = -0.75;
scene.add(spotLight.target);

camera.position.z = 2;
canvas = document.querySelector("#c");
renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);

controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function resizeRendererToDisplaySize(renderer) {
  canvas = renderer.domElement;
  let width = window.innerWidth;
  let height = window.innerHeight;

  let canvasPixelWidth = canvas.width / window.devicePixelRatio;
  let canvasPixelHeight = canvas.height / window.devicePixelRatio;

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

function onPointerClick(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    let object = intersects[0].object;
    if (object.name == "link") {
      window.location.href = "/main";
    }
  }
}

function animate() {
  earthmesh.rotation.x += rotSpeed;

  requestAnimationFrame(animate);
  if (resizeRendererToDisplaySize(renderer)) {
    canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateWorldMatrix();
  }
  renderer.render(scene, camera);
}

window.addEventListener("click", onPointerClick);

animate();

export { scene, camera, renderer };
