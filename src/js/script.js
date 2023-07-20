import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

// BASIC RAW CODE-1
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 30, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// MOVEMENT IN MOUSE 
let controls = new OrbitControls(camera, renderer.domElement);

// directional LIGHT
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(-30, 50, 0);
scene.add(directionalLight);


// SUNTEXTURE-1
const sunTexture = new THREE.TextureLoader().load('./img/sun.jpg');

const sunGeo = new THREE.SphereGeometry(16,30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if(ring){
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius ,
      ring.outerRadius,
      32);
      const ringMat = new THREE.MeshBasicMaterial({
        map: ring.ringTexture,
        side: THREE.DoubleSide,
      });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5* Math.PI; 
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj };
}

const mercuryTexture = new THREE.TextureLoader().load('./img/mercury.jpg');
const mercury = createPlanete(3.2, mercuryTexture, 28);

// SATURNTEXTURE-3
const saturnTexture = new THREE.TextureLoader().load('./img/saturn.jpeg');
const uranusTexture = new THREE.TextureLoader().load('./img/uranus.jpg');
const saturnRingTexture = new THREE.TextureLoader().load('./img/ring2.jpg');
const uranusRingTexture = new THREE.TextureLoader().load('./img/ring2.jpg');

const venusTexture = new THREE.TextureLoader().load('./img/venus.jpg');
const venus = createPlanete(5.8, venusTexture, 44);

const earthTexture = new THREE.TextureLoader().load('./img/earth.jpeg');
const earth = createPlanete(6, earthTexture, 62);

const marsTexture = new THREE.TextureLoader().load('./img/mars.jpg');
const mars = createPlanete(4, marsTexture, 78);

const jupiterTexture = new THREE.TextureLoader().load('./img/jupiter.jpg');
const jupiter = createPlanete(12, jupiterTexture, 100);

const saturn = createPlanete(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  ringTexture: saturnRingTexture,
});

const neptuneTexture = new THREE.TextureLoader().load('./img/neptune.jpg');
const neptune = createPlanete(7, neptuneTexture, 200);

const plutoTexture = new THREE.TextureLoader().load('./img/pluto.jpg');
const pluto = createPlanete(2.8, plutoTexture, 216);

const uranus = createPlanete(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  ringTexture: uranusRingTexture,
});

// SUN'S LIGHT
const pointLight = new THREE.PointLight(0xFFFFFF, 2,300);
scene.add(pointLight);


// RENDER
function animate() {
  requestAnimationFrame(animate);
  
  // Self- rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  saturn.mesh.rotateY(0.038);
  jupiter.mesh.rotateY(0.04);
  mars.mesh.rotateY(0.018);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);
  
  // Around-sun-rotation
  mercury.obj.rotateY(0.030);
  saturn.obj.rotateY(0.0009);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});