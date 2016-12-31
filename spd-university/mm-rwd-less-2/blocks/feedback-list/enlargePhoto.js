(function () {
    var img = document.createElement('img'),
        shadowField = document.createElement('div'),
        support = document.getElementById('support');

    support.onclick = function (event) {
        var target = event.target;

        if (target.className.indexOf('feedback-list__avatar') !== -1 || target.className.indexOf('feedback-list__link') !== -1) {
            event.preventDefault();

            if (!window.matchMedia) getFullPhoto(target.parentNode.href); // for IE9...


            if (window.matchMedia("(min-width: 390px) and (max-width: 1024px)").matches) {
                (target.tagName === 'A') ? getFullPhoto(target.href) : getFullPhoto(target.parentNode.href); // not to use in mobile apps (there is no hover) -> "if (target.tagName !== 'IMG')"
            }

            if (window.matchMedia("(max-width: 389px)").matches) {
                event.preventDefault();
                alert('Device screen is too narrow to enlarge photo!\nChange, please, screen orientation and repeat :)');
            }

            if (window.matchMedia("(min-width: 1025px)").matches) {
                if (target.tagName !== 'IMG') getFullPhoto(target.href); // click only on "zoom" picture ("a" tag);
            }
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
        shadowField.className += ' hidden';
        img.className += ' hidden';
        img.src = '';
    }
})();