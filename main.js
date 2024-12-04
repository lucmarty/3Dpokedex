import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);

// Configuration de la caméra
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;
camera.position.y = 0.5;

// Initialisation du renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Initialisation des contrôles OrbitControls après le renderer
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0); // La cible des contrôles est au centre de l'objet
controls.update(); // Nécessaire pour appliquer les changements
controls.enablePan = false; // Désactive le "pan"
controls.enableDamping = true; // Active le lissage des mouvements de caméra

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

// Fonction d'animation
function animate() {
  // Mettre à jour les contrôles à chaque frame
  controls.update(); // Nécessaire pour que les contrôles fonctionnent correctement avec "enableDamping"

  // Rotation automatique du modèle 3D
  scene.traverse((object) => {
    if (object.isMesh) {
      object.rotation.y += 0.01; // Fait tourner le modèle
    }
  });

  renderer.render(scene, camera);
}
