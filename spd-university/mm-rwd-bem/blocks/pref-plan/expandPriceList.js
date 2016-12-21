(function () {
    var prefPlans = document.querySelectorAll('.pref-plan__content'),
        priceList = document.getElementsByClassName('price-list')[0],
        prefPlanEx = document.querySelector('.pref-plan__title_exclusive'),
        widthForCarousel = '(max-width: 389px)';

    triggerCarousel(widthForCarousel);

    window.addEventListener('resize', function() {
        triggerCarousel(widthForCarousel);
    });

    function triggerCarousel(media) {
        if (window.matchMedia(media).matches) {
            expandList(prefPlanEx);

            priceList.addEventListener('click', function(event) {
                var target = event.target;

                if (target.className.indexOf('pref-plan__title') === -1) return;
                expandList(target);
            });
        } else {
            for (var i = 0; i < prefPlans.length; i++) {
                if (prefPlans[i].hasAttribute('hidden'))
                    prefPlans[i].removeAttribute('hidden');
            }
        }
    }

    function expandList(el) {
        for (var i = 0; i < prefPlans.length; i++) {
            if (prefPlans[i] === el.nextElementSibling) continue;
            prefPlans[i].setAttribute('hidden', '');
            prefPlans[i].previousElementSibling.setAttribute('left-pointer', '◄');
        }

        if (el.nextElementSibling.hasAttribute('hidden')) {
            el.nextElementSibling.removeAttribute('hidden');
            el.removeAttribute('left-pointer');
        }
    }
})();
