import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Ajout de la lumière
const light = new THREE.AmbientLight(0xffffff, 1); // Lumière ambiante
scene.add(light);

// Chargement du modèle 3D
const loader = new GLTFLoader();
loader.load(
  './models/eevee.glb', // Chemin vers votre modèle
  (gltf) => {
    const model = gltf.scene;
    scene.add(model); // Ajout du modèle à la scène
    model.position.set(0, 0, 0); // Position du modèle
    model.scale.set(1, 1, 1); // Échelle (ajustez si nécessaire)
  },
  undefined,
  (error) => {
    console.error('Erreur lors du chargement du modèle :', error);
  }
);

camera.position.z = 5;

function animate() {
  // Animation éventuelle (par ex. rotation automatique)
  scene.traverse((object) => {
    if (object.isMesh) {
      object.rotation.y += 0.01; // Fait tourner le modèle
    }
  });

  renderer.render(scene, camera);
}
