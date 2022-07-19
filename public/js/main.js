import * as THREE from "/three/build/three.module.js";

let scene, camera, renderer, canvas;

window.addEventListener("scroll", function () {
  let header = this.document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

canvas = document.getElementById("c");
renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
document.body.appendChild(renderer.domElement);

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

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

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  requestAnimationFrame(animate);
  if (resizeRendererToDisplaySize(renderer)) {
    canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateWorldMatrix();
  }

  renderer.render(scene, camera);
}

animate();
