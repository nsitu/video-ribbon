import * as THREE from "three"
import { loadVideo } from './loadVideo.js'
import { materialManager } from './materialManager.js';

// perlin noise generation library
import { createNoise2D } from 'simplex-noise';
const noise2D = createNoise2D();


// given a CatmullRomCurve3 object, 
// create a plane geometry and modify it 
// so as to describe a ribbon that follows the curve
// and apply a video texture to it

// Ribbon approach Inspired by Yuri Artiukh's Stream #14
// https://www.youtube.com/watch?v=87J8EhKMH6c
// Code via https://www.patreon.com/allyourhtml/

const curveToRibbon = (curve, videoPath) => {
  // curve.closed = true;    

  // the longer the curve, the more points we need to draw
  // lower number  = les points = less memory
  // try a range from 5 to 20
  let number = parseInt(curve.getLength() * 5)

  let biNormals = curve.computeFrenetFrames(number, true).binormals

  let rawSpacedPoints = curve.getSpacedPoints(number);
  let spacedPoints = rawSpacedPoints.map((point) => {
    // Perlin noise value for z-coordinate
    let zNoise = noise2D(point.x * 0.01, point.y * 0.01); // Scale noise to [-1, 1]
    return new THREE.Vector3(point.x, point.y, zNoise);
  })


  // let spacedPoints = curve.getSpacedPoints(number)
  // console.log(spacedPoints)
  let ribbonPoints = []
  let dimensions = [-8, 8]

  dimensions.forEach(d => {
    for (let i = 0; i <= number; i++) {
      let startingPoint = new THREE.Vector3().copy(spacedPoints[i])
      let binormalShift = new THREE.Vector3().add(biNormals[i]).multiplyScalar(d)
      let finalPoint = startingPoint.add(binormalShift)
      ribbonPoints.push(finalPoint)
    }
  })
  const ribbon = new THREE.PlaneGeometry(1, 1, number, 1).setFromPoints(ribbonPoints)

  const video = loadVideo(videoPath)

  // Create a texture from the video
  const texture = new THREE.VideoTexture(video);
  texture.wrapS = THREE.RepeatWrapping; // U - horizontal wrapping 
  // Longer curve => more repetition of textures
  // We ought to do some mapping here to ensure a 1:1 proportion
  // A larger number will make the texture smaller
  // A smaller number will make the texture larger
  texture.repeat.set(curve.getLength() * 0.001, 1);
  // texture.encoding = THREE.sRGBEncoding; // deprecated
  texture.colorSpace = THREE.SRGBColorSpace; // for accurate color representation 
  let material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  materialManager.addMaterial(material);

  let finalMesh = new THREE.Mesh(ribbon, material)

  ribbon.computeBoundingBox();
  ribbon.computeVertexNormals();

  let bbox = ribbon.boundingBox;
  let center = bbox.getCenter(new THREE.Vector3());

  finalMesh.castShadow = true;
  finalMesh.receiveShadow = true;

  return finalMesh

}

export { curveToRibbon }