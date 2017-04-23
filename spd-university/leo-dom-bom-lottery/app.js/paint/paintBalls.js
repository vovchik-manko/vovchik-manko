function paintBalls(playedBalls) {
    let ballsField = document.createElement('div');
    ballsField.className = 'balls-container';

    playedBalls.forEach((_) => {
        let ball = document.createElement('span');

        ball.className = 'balls';
        ball.textContent = (_ < 10) ? `0${_}` : `${_}`;
        ballsField.appendChild(ball);
    });

    return ballsField;
}

function paintBallsTitle(playedBalls, progress) {
    let ballsTitle = document.createElement('h4');

    ballsTitle.textContent = `${progress || 'Finish! '} Balls (${playedBalls.length}): `;
    ballsTitle.className = 'balls-title';

    return ballsTitle;
}

export { paintBalls, paintBallsTitle};