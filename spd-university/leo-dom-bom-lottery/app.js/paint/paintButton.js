export default function(text) {
    let btn = document.createElement('button');

    btn.className = 'btn btn_start';
    btn.textContent = text;

    return btn;
};