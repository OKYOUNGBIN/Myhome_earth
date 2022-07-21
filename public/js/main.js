import * as THREE from "/three/build/three.module.js";

let scene, camera, renderer, canvas, raycaster, pointer, section;
let ambient, light, loader, urls;

window.addEventListener("scroll", function () {
  let header = this.document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

section = document.querySelector("section.book");

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);

light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 6);
scene.add(light);

loader = new THREE.TextureLoader();

urls = [
  "edge.png",
  "spine.png",
  "top.png",
  "bottom.png",
  "front.png",
  "back.png",
];

const materials = urls.map((url) => {
  return new THREE.MeshLambertMaterial({
    map: loader.load(),
  });
});

canvas = document.getElementById("c");
renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
section.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 6;

raycaster = new THREE.Raycaster();
pointer = new THREE.Vector2();

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

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
  //raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  //const intersects = raycaster.intersectObjects(scene.children);

  //for (let i = 0; i < intersects.length; i++) {
  //  intersects[i].object.material.color.set(0xff0000);
  //}

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
