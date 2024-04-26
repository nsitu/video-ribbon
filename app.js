import { scene, camera, renderer } from './modules/setup.js';
import { loadLights } from './modules/loadLights.js';
import { loadPaper } from './modules/loadPaper.js'
import { loadSVG } from './modules/loadSVG.js';
import { dragAndDrop } from './modules/dragAndDrop.js';
import { materialManager } from './modules/materialManager.js';


Promise.all([
  loadLights(),
  loadPaper('paper'),
  loadSVG('fifty.svg', 'crosswalk.mp4'),
  dragAndDrop()
]).then(() => {
  animate();
}).catch(error => {
  console.error('Error during initialization', error);
});


const animate = () => {
  requestAnimationFrame(animate)
  materialManager.updateVideoTextures()
  renderer.render(scene, camera)
}








