import * as THREE from "three"
// materialManager.js
class MaterialManager {
    constructor() {
      this.materials = [];
    }
  
    addMaterial(material) {
      this.materials.push(material);
    }
  
    getMaterials() {
      return this.materials;
    }
  
    updateVideoTextures() {
      this.materials.forEach(m => {
        if (m.map instanceof THREE.VideoTexture) {
          // If the video is ready to play, update the material texture
          if (m.map.source.data.readyState === m.map.source.data.HAVE_ENOUGH_DATA){
            m.map.needsUpdate = true;
          }
        }
      });
    }
  }
  
  // Export an instance so that the same instance is used across the application
  export const materialManager = new MaterialManager();
  