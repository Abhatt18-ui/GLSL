import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

// BASIC RAW CODE-1
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 12);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// MOVEMENT IN MOUSE 
let controls = new OrbitControls(camera, renderer.domElement);

const uniforms = {
  u_time: { type: 'f', value: 0.0 },
  u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)
  .multiplyScalar(window.devicePixelRatio) },
  u_mouse: {type: 'v2', value: new THREE.Vector2(0.0,0.0)}
};

window.addEventListener('mousemove', function (e) {
  uniforms.u_mouse.value.set(e.screenX / window.innerWidth, 1 - e.screenY/ window.innerHeight);
});

const geometry = new THREE.PlaneGeometry(10, 10, 30, 30);
const material = new THREE.ShaderMaterial({
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
  wireframe: true,
  uniforms: uniforms,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const clock = new THREE.Clock();

// RENDER
function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value = clock.getElapsedTime();

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});