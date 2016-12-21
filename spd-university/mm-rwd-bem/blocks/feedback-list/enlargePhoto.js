(function () {
    var img = document.createElement('img'),
        shadowField = document.createElement('div'),
        support = document.getElementById('support');

    support.onclick = function (event) {
        var target = event.target;

        if (target.className.indexOf('feedback-list__avatar') !== -1 || target.className.indexOf('feedback-list__link') !== -1) {
            event.preventDefault();

            if (!window.matchMedia) getFullPhoto(target.parentNode.href); // for IE9...


            if (window.matchMedia("(min-width: 480px)").matches) {
                if (target.tagName !== 'IMG') getFullPhoto(target.href);
            } else event.preventDefault();
        }
    };

    function getFullPhoto(url) {
        shadowField.className = 'lock-screen';
        img.className = 'align-zoomed-img';
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