import getImg from './getImg';

export default function (game) {
    let ticket = document.createElement('div'),
        logoContainer = document.createElement('div');

    const LIGHTGREEN = '#c0d6c0';
    const LIGHTCORAL = '#f1c0ac';
    let cellColors = ['lavender', 'lemonchiffon', LIGHTGREEN, LIGHTCORAL, 'lightblue'];

    ticket.classList.add('ticket');
    logoContainer.className = 'ticket__logo-container';
    ticket.appendChild(logoContainer);
    logoContainer.appendChild(getImg({
        src: '../app.js/img/ticket-logo.jpg',
        className: 'ticket__logo',
        alt: 'Zabava ticket'
    }));

    game.ticket.forEach((field, fieldNumber) => {
        let ticketField = document.createElement('div');
        ticketField.className = 'ticket__field';

        field.forEach((row, rowNumber) => {
            let ticketRow = document.createElement('div');
            ticketRow.className = 'ticket__row';

            row.map( (cell, i) => {
                let ticketCell = document.createElement('div');

                ticketCell.className = 'ticket__cell';
                ticketCell.style.backgroundColor = cellColors[i];

                ticketCell.textContent = cell === 'HORSESHOE' ? '𝞨' : (cell < 10 ? ' ' + cell : cell);
                if (game.progress[fieldNumber][rowNumber].length == 0 ) {
                    if (ticketCell.textContent !== '𝞨')
                        ticketCell.classList.add('is-crossed', 'is-highlighted');
                    else
                        ticketCell.classList.add('is-highlighted');
                }

                ticketRow.appendChild(ticketCell);
            });

            ticketField.appendChild(ticketRow);
        });
        ticket.appendChild(ticketField);
    });

    return ticket;
};