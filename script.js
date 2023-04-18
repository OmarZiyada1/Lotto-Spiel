const numberContainer = document.getElementById('number-container');
const playButton = document.getElementById('play-button');
const result = document.getElementById('result');
let selectedNumbers = [];

function createNumbers() {
    for (let i = 1; i <= 49; i++) {
        const number = document.createElement('div');
        number.classList.add('number');
        number.textContent = i;
        number.addEventListener('click', selectNumber);
        numberContainer.appendChild(number);
    }
}

function selectNumber() {
    if (selectedNumbers.length < 6 && !this.classList.contains('selected')) {
        this.classList.add('selected');
        selectedNumbers.push(parseInt(this.textContent));
        if (selectedNumbers.length === 6) {
            playButton.disabled = false;
        }
    }
}

playButton.addEventListener('click', () => {
    const drawnNumbers = drawNumbers();
    const matches = getMatches(selectedNumbers, drawnNumbers);
    displayResults(drawnNumbers, matches);
});

function drawNumbers() {
    const drawnNumbers = [];
    while (drawnNumbers.length < 6) {
        const randomNumber = Math.floor(Math.random() * 49) + 1;
        if (!drawnNumbers.includes(randomNumber)) {
            drawnNumbers.push(randomNumber);
        }
    }
    return drawnNumbers.sort((a, b) => a - b);
}

function getMatches(selectedNumbers, drawnNumbers) {
    return selectedNumbers.filter(number => drawnNumbers.includes(number));
}

function displayResults(drawnNumbers, matches) {
    result.innerHTML = drawnNumbers
        .map(number => {
            if (matches.includes(number)) {
                return ` <span>${number}</span>`;
            } else {
                return number;
            }
        })
        .join(' ');

    let message = '';
    switch (matches.length) {
        case 0:
            message = 'Schade';
            break;
        case 1:
            message = 'Ein Treffer';
            break;
        case 2:
            message = 'Zwei Treffer';
            break;

        case 3:
            message = 'Die hälfte Richtig ;)';
            break;
        case 4:
            message = 'Vier Treffer';
            break;
        case 5:
            message = 'Herzlichen Glückwunsch';
            break;
        case 6:
            message = 'UNGLAUBLICH!';
            break;
    }
    result.innerHTML += `<br>${message}`;
}

createNumbers();