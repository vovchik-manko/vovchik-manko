export default function(playerName) {
    let player = document.createElement('li');

    player.className = 'winners-list__item';
    player.textContent = playerName;
    player.setAttribute('js-pointer', '►');

    return player;
};
