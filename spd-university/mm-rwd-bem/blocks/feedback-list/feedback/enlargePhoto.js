(function () {
    let img = document.createElement('img'),
        shadowField = document.createElement('div'),
        support = document.getElementById('support');

    support.onclick = function (event) {
        let target = event.target;

        if (window.matchMedia("(min-width: 480px)").matches) {

            if (target.className.indexOf('feedback__avatar') !== -1 || target.className.indexOf('feedback__avatar-link') !== -1) {
                event.preventDefault();
                if (target.tagName !== 'IMG') getFullPhoto(target.href);
            }
        } else event.preventDefault();
    };

    function getFullPhoto(url) {
        shadowField.className = 'lock-screen';
        img.className = 'align-img';
        img.src = url;
        shadowField.appendChild(img);
        document.body.appendChild(shadowField);
        shadowField.onclick = function() { closeImg(); }
    }

    function closeImg() {
        shadowField.className += ' hide';
        img.className += ' hide';
        img.src = '';
    }
})();
