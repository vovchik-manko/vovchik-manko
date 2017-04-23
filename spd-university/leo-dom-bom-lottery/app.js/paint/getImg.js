export default function(options) {
    let img = document.createElement('img');

    img.src = options.src;
    img.className = options.className;
    img.alt = options.alt;

    return img;
}

