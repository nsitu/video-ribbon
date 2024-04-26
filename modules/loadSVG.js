import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { pathsToCurves } from './pathsToCurves.js';
import { curveToRibbon } from './curveToRibbon.js';
import { scene, floatOffsetIncrement } from './setup.js';

const loadSVG = (file, videoPath) => {
    return new Promise((resolve, reject) => {
        const loader = new SVGLoader();
        let floatOffset = 2 // initial offset for the ribbons

        // Callback to process SVG data and add the ribbons to the scene
        const processData = (data) => {

            const [x, y, w, h] = data.xml.getAttribute('viewBox').split(' ').map(Number)
            const targetWidth = 400
            const targetHeight = 400
            const scaleFactor = Math.min(targetWidth / w, targetHeight / h);

            pathsToCurves(data.paths, scaleFactor)
                .map(curve => curveToRibbon(curve, videoPath))
                .forEach(ribbon => {
                    floatOffset = floatOffset + floatOffsetIncrement
                    // center on the paper; take the viewbox into account
                    ribbon.translateY((h * scaleFactor / 2) - (y * scaleFactor));
                    ribbon.translateX((-w * scaleFactor / 2) + (x * scaleFactor));
                    ribbon.translateZ(floatOffset)
                    scene.add(ribbon)
                });
            resolve(); // Resolve the promise once all ribbons are added
        };

        // If the string ends in '.svg', assume it's a filename and load asynchronously
        if (file.slice(-4).toLowerCase() === '.svg') {
            loader.load(file, processData, undefined, reject); // Reject the promise on error
        } else {
            // For direct SVG content, parse synchronously but maintain promise structure
            try {
                const data = loader.parse(file);
                processData(data);
            } catch (error) {
                reject(error); // Reject the promise if parsing fails
            }
        }
    });
};

export { loadSVG };
