import { loadSVG } from './loadSVG.js';

const dragAndDrop = () => {
         
    // Check if browser supports file drag and drop
    if (typeof window.FileReader === 'undefined') {
        // notify users that browser does not support file drag and drop 
        let p = document.createElement('p')
        p.innerHTML = 'Sorry, drag and drop is not supported in your browser.';
        document.querySelector('body').appendChild(p);
    } else {
        // provide instructions for drag and drop. 
        // let p = document.createElement('p')
        // p.innerHTML += 'Drag and drop an .svg file here.';
        // document.querySelector('body').appendChild(p);
    }
            
    // hover styling for drag and drop
    document.ondragover = function() {
        this.className = 'hover';
        return false;
    }
    document.ondragend = function() {
        this.className = '';
        return false;
    }
    

    document.ondrop = function(e) {
        // TODO: check that file format is SVG
        this.className = '' 
        e.preventDefault()
        // https://developer.mozilla.org/en-US/docs/Web/API/FileReader 
        // FileReader asynchronously reads files (or raw data buffers) using File or Blob objects
        let file = e.dataTransfer.files[0]
        let reader = new FileReader()
        //console.log('ok');
        reader.onload = function(event) {  
            // pass along the uploaded SVG for rendering.
            loadSVG(event.target.result, 'trees.mp4')
        };
        reader.readAsText(file);
        return false;
    };
}

export {dragAndDrop}