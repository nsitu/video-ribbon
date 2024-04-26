import * as THREE from "three"
// given an array of ThreeJS ShapePath objects as we might get from an SVG file
// via SVGLoader https://threejs.org/docs/#examples/en/loaders/SVGLoader
// create a corresponding array of ThreeJS CatmullRomCurve3 objects

const pathsToCurves =  (paths, scaleFactor) => { 
    let curves = []
    paths.forEach((path) => {  
        const shapes = path.toShapes(true)
        shapes.forEach((shape) => {   
            let points = [] 
            // TODO: clarify if there is some customizable resolution
            // at play for these extracted points
            // do some testing to see if a larger SVG gives you more points. 
            shape.extractPoints().shape.forEach(vec2 => {
                points.push(new THREE.Vector3(vec2.x * scaleFactor, -vec2.y * scaleFactor, 0))
            }) 
            // make sure there's enough points to create a curve
            if(points.length > 2){ 
                const curve = new THREE.CatmullRomCurve3( points )
                // for polygons and paths that end in Z,
                // the shape will be closed automatically
                curve.closed =  path.currentPath.autoClose
                curves.push(curve )
            } 
        })
    })  
    return curves 

}

export {pathsToCurves}