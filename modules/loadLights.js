
import * as THREE from "three"
import { scene, renderer } from './setup.js'

// set some helpful defaults for the dimensions of the shadow
const shadowCamera = {
    left: -250, right: 250, top: 250, bottom: -250, near: 0.5, far: 250
}

// helper function to configure the shadow camera
const configureShadows = (light ) => {
    light.shadow.camera.left = shadowCamera.left;
    light.shadow.camera.right = shadowCamera.right;
    light.shadow.camera.top = shadowCamera.top;
    light.shadow.camera.bottom = shadowCamera.bottom;
    light.shadow.camera.near = shadowCamera.near;
    light.shadow.camera.far = shadowCamera.far;   
    light.shadow.mapSize.width = 8192; // Higher values give better shadow detail
    light.shadow.mapSize.height = 8192; 
    light.castShadow = true; 
    light.shadow.camera.updateProjectionMatrix();
}

// Load lights
const loadLights = () => { 

    
    
    // Enable shadows in the renderer
    // renderer.shadowMap.type = THREE.VSMShadowMap;  // more precise shadows

    
     scene.add(new THREE.AmbientLight(0xffffff,1))   

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White, full intensity
    directionalLight.position.set(5, 5, 50); 
    configureShadows(directionalLight);   
    scene.add(directionalLight); 
    // scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));


    const spotlight = new THREE.SpotLight(0xffffff, 1); // White, full intensity
    spotlight.position.set(5, 5, 150); 
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 1;
    spotlight.decay = 0;
    spotlight.distance = 200;
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 8192;
    spotlight.shadow.mapSize.height = 8192;
    spotlight.shadow.camera.near = 1;
    spotlight.shadow.camera.far = 200;
    spotlight.shadow.focus = 1; 
    spotlight.shadow.camera.updateProjectionMatrix();
    scene.add(spotlight); 
    // scene.add(new THREE.SpotLightHelper(spotlight));
    // scene.add(new THREE.CameraHelper(spotlight.shadow.camera));



    
    
  

}

export {loadLights}
