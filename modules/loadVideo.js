// videoElementCache.js

// Cache object to store video elements by their source
const videoCache = {};

function loadVideo(src) {
    // Check if video already exists in cache
    if (videoCache[src]) {
        // console.log(`Using cached video element for source: ${src}`);
        return videoCache[src];
    }

    // If not in cache, create a new video element
    const video = document.createElement('video');
    video.src = src;
    video.loop = true;
    video.muted = true; // Necessary for autoplay without user interaction
    video.autoplay = true; // Autoplay the video

    document.querySelector('#play').addEventListener('click', () => {
        video.play()
            .catch(error => console.error("Video play failed for source: " + src, error))
            .finally(() => {
                document.querySelector('#overlay').style.display = 'none'
            })

    })
    // video.play() // Attempt to play the video


    // Store the new video element in cache
    videoCache[src] = video;
    console.log(`Created and cached new video element for source: ${src}`);

    return video;
}

export { loadVideo };
