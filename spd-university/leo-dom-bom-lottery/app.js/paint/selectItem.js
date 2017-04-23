export default function (event, ticket) {
    let target = event.target;
    let winners = document.querySelectorAll('.winners-list__item'),
        prevTicket;

    if (target.tagName !== 'LI') return;

    for (let i = 0; i < winners.length; i++) {
        if (winners[i] === target) {
            target.classList.toggle('is-selected');

            prevTicket = target.querySelector('.ticket');

            if (target.classList.contains('is-selected')) {
                target.setAttribute('js-pointer', '▼');
                target.appendChild(ticket);
            } else {
                target.setAttribute('js-pointer', '►');
                target.removeChild(prevTicket);
            }

            continue;
        }

        if (winners[i].classList.contains('is-selected')) {
            winners[i].classList.remove('is-selected');
            winners[i].setAttribute('js-pointer', '►');

            prevTicket = winners[i].querySelector('.ticket');
            if (prevTicket)
                winners[i].removeChild(prevTicket);
        }
    }
};