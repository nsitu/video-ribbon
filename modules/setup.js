import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
const container = document.querySelector("#container")
const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(container.offsetWidth, container.offsetHeight)

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // softer shadows
renderer.physicallyCorrectLights = true

container.appendChild(renderer.domElement)

const showHelpers = false

if (showHelpers) {
    const gridHelper = new THREE.GridHelper(100, 10)   // GridHelper(size, divisions)
    scene.add(gridHelper)
    // Axes: X = red, Y = green,  Z = blue
    const axesHelper = new THREE.AxesHelper(100)   // AxesHelper(size)
    scene.add(axesHelper)

    // test cube
    const geometry = new THREE.BoxGeometry(5, 5, 5); // Create a 1x1x1 cube
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Create a standard material in red
    const cube = new THREE.Mesh(geometry, material); // Create a mesh with the geometry and material
    cube.position.set(0, 0, 0); // Set the cube's position in the scene
    cube.castShadow = true; // Allow the cube to cast shadows
    cube.receiveShadow = true; // Allow the cube to receive shadows 
    scene.add(cube); // Add the cube to the scene



}


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.set(0, 0, 500)





new OrbitControls(camera, renderer.domElement)

let floatOffsetIncrement = 0.5

export { scene, camera, renderer, floatOffsetIncrement }