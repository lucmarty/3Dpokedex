import React, { useEffect, useState } from "react";

import background from "../models/background/background.jpg";

import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { useParams } from "react-router-dom";

/**
 * The `Pokemon` component initializes a 3D scene using Three.js and loads an FBX model.
 *
 * @component
 * @example
 * return <Pokemon />
 *
 * @remarks
 * This component sets up a Three.js scene with a perspective camera, renderer, ambient light, and directional light.
 * It also includes orbit controls for camera manipulation and loads an FBX model of a Pokémon.
 *
 * @returns {null} This component does not render any JSX elements.
 *
 * @see https://threejs.org/ for more information about Three.js
 * @see https://threejs.org/docs/#examples/en/loaders/FBXLoader for more information about the FBXLoader
 */
const Pokemon: React.FC = () => {
  const { pokemon } = useParams<{ pokemon: string }>();
  const [modelPath, setModelPath] = useState<string | null>(null);

  useEffect(() => {
    if (pokemon) {
      // Importer le modèle dynamiquement
      import(`../assets/models/${pokemon}/${pokemon}.glb`)
        .then((module) => setModelPath(module.default))
        .catch((err) =>
          console.error("Erreur lors du chargement du modèle :", err)
        );
    }
  }, [pokemon]);

  useEffect(() => {
    if (!modelPath) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load(background);

    const camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0.5, 0.5, 2);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight2.position.set(-5, 5, 5);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight3.position.set(5, -5, 5);
    scene.add(directionalLight3);

    const directionalLight4 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight4.position.set(5, 5, -5);
    scene.add(directionalLight4);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 6;
    controls.enablePan = false;
    controls.update();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (glb) => {
        glb.scene.scale.set(0.01, 0.01, 0.01);
        glb.scene.position.y = -0.5;
        scene.add(glb.scene);

        const box = new THREE.Box3().setFromObject(glb.scene);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

        camera.position.z = cameraZ;

        const minZ = box.min.z;
        const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

        camera.far = cameraToFarEdge * 3;
        camera.updateProjectionMatrix();

        glb.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const material = mesh.material as THREE.MeshStandardMaterial;
            material.metalness = 0;
            material.roughness = 1;
            material.transparent = false;
            material.opacity = 1;
            material.depthWrite = true;
            material.alphaTest = 0.5;
          }
        });
      },
      undefined,
      (error) => {
        console.error("Erreur lors du chargement du FBX :", error);
      }
    );

    function animate() {
      requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [modelPath]);

  return null;
};

export default Pokemon;
