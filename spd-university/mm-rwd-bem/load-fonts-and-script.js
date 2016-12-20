window.onload = function() {
    loadStylesheet('https://fonts.googleapis.com/css?family=Lato:300,400');
    loadStylesheet('https://fonts.googleapis.com/css?family=Montserrat:400,700');

    loadScript('blocks/feedback-list/feedback/enlargePhoto.js');

    function loadStylesheet(link){
        let a = document.createElement("link");

        a.rel = "stylesheet";
        a.href = link;
        document.getElementsByTagName("head")[0].appendChild(a);
    }

    function loadScript(src) {
        let a = document.createElement('script');

        a.src = src;
        document.getElementsByTagName("head")[0].appendChild(a);
    }
};
