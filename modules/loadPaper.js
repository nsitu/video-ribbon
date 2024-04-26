import * as THREE from 'three';
import { scene } from './setup.js';

function loadPaper(textureName = 'paper') {
    return new Promise((resolve, reject) => {
        const textureLoader = new THREE.TextureLoader();

        // PBR texture maps
        const maps = {
            map: "color",
            displacementMap: "disp",
            normalMap: "norm",
            aoMap: "occ",
            roughnessMap: "rough"
        };

        // Load all textures and wait for them to finish
        const texturePromises = Object.entries(maps).map(([type, fileName]) => {
            const fileBaseName = `./textures/${textureName}/${fileName}`;
            const jpg = `${fileBaseName}.jpg`;
            const png = `${fileBaseName}.png`;

            return new Promise((textureResolve, textureReject) => {
                textureLoader.load(jpg, texture => {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(2, 2);
                    textureResolve({ type, texture });
                }, undefined, () => {
                    textureLoader.load(png, texture => {
                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(2, 2);
                        textureResolve({ type, texture });
                    }, undefined, () => {
                        textureReject(`No texture found for map: ${type}`);
                    });
                });
            });
        });

        Promise.all(texturePromises).then(results => {
            const textures = {};
            results.forEach(({ type, texture }) => {
                textures[type] = texture;
            });

            // Now that all textures are loaded, create the material
            const planeMaterial = new THREE.MeshStandardMaterial({
                ...textures,
                displacementScale: 0.5,
                side: THREE.DoubleSide
            });

            // Create the plane geometry and mesh
            const planeGeometry = new THREE.PlaneGeometry(500, 500);
            const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

            planeMesh.receiveShadow = true; // Allow the plane to receive shadows 

            planeMesh.position.z = -1; // Position the plane
            scene.add(planeMesh); // Add the mesh to the scene

            resolve(); // Resolve the outer promise once everything is done
        }).catch(error => {
            console.error(error);
            reject(error); // Reject the outer promise if there's an error
        });
    });
}

export { loadPaper };
