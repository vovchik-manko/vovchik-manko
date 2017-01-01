(function () {
    var prefPlans = document.querySelectorAll('.pref-plan__content'),
        priceList = document.getElementsByClassName('price-list')[0],
        prefPlanEx = document.querySelector('.pref-plan__title_exclusive'),
        widthForAccordion = '(max-width: 420px)';

    triggerAccordion(widthForAccordion);

    window.addEventListener('resize', function() {
        triggerAccordion(widthForAccordion);
    });

    function triggerAccordion(media) {
        if (window.matchMedia(media).matches) {
            expandList(prefPlanEx);

            priceList.addEventListener('click', expandListIfTitleClicked);
        } else {
            priceList.removeEventListener('click', expandListIfTitleClicked);
            for (var i = 0; i < prefPlans.length; i++) {
                if (prefPlans[i].hasAttribute('hidden'))
                    prefPlans[i].removeAttribute('hidden');
            }
        }
    }

    function expandListIfTitleClicked(event) {
        var target = event.target;

        if (target.className.indexOf('pref-plan__title') === -1) return;
        expandList(target);
    }

    function expandList(el) {
        for (var i = 0; i < prefPlans.length; i++) {
            if (prefPlans[i] === el.nextElementSibling) continue;
            prefPlans[i].setAttribute('hidden', '');
            prefPlans[i].previousElementSibling.setAttribute('js-pointer', '\u25C0'); // ◄
        }

        el.setAttribute('js-pointer', '\u25BC'); // ▼

        if (el.nextElementSibling.hasAttribute('hidden')) {
            el.nextElementSibling.removeAttribute('hidden');
        }
    }
})();
