const imagesLoaded = require('imagesloaded');

/**
 * Preload images
 * @param {String} selector - Selector/scope from where images need to be preloaded. Default is 'img'
 */
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
};

const shuffleArray = (e) => {
    for (let t = e.length - 1; t > 0; t--) {
        const o = Math.floor(Math.random() * (t + 1));
        [e[t], e[o]] = [e[o], e[t]];
    }
    return e;
}

const goTop = () => {
    window.scrollTo(0, 0);
}


export {
    preloadImages,
    shuffleArray,
    goTop
};