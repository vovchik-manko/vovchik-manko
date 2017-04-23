import getImg from './getImg';

export default function () {
    let header = document.createElement('header');

    header.className = 'header';

    header.logoContainer = document.createElement('div');
    header.logoContainer.className = 'header__logo-container';
    header.appendChild(header.logoContainer);

    header.logoContainer.appendChild(getImg({
        src: "../app.js/img/logo.png",
        className: 'header__logo',
        alt: 'Loto zabava'
    }));

    return header;
};
