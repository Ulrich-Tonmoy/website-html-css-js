import * as Three from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new Three.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new Three.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new Three.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new Three.IcosahedronGeometry(1, 2);
const mat = new Three.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new Three.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new Three.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new Three.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemisphereLight = new Three.HemisphereLight(0x0099ff, 0xaa5500, 1);
scene.add(hemisphereLight);

function animate(t = 0) {
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}

animate();
