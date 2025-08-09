const images = [
    "https://i.postimg.cc/2ypJ1WSR/Yogi-Blueberry-Cream-Stick-32g-4.png",
    "https://i.postimg.cc/fWXp688w/Yogi-Cookies-Cream-Stick-36g.png",
    "https://i.postimg.cc/MpRnR2DC/Amore-Oat-Cookies-Blackcurrant-Chocolate-Chips-162g-1.png",
    "https://i.postimg.cc/dtg7Lt8R/Amore-Oat-Cookies-Blackcurrant-162g-1.png",
    "https://i.postimg.cc/KY2RDqpR/Amore-Oat-Cookies-Chocolate-Chips-162g-1.png",
    "https://i.postimg.cc/W3c6rwgn/NOI-Cassava-Chips-Salted-85g.png",
    "https://i.postimg.cc/bvt9sBDr/NOI-Cassava-Chips-Seaweed-Wasabi-85g.png"
];

// Duplicate array to make pairs
let gameImages = [...images, ...images];

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(gameImages);

const gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let lockBoard = false;

// Create cards
gameImages.forEach(src => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${src}" alt="card image">
            </div>
            <div class="card-back"></div>
        </div>
    `;
    card.addEventListener('click', () => flipCard(card, src));
    gameBoard.appendChild(card);
});

function flipCard(card, src) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = { card, src };
    } else {
        if (firstCard.src === src) {
            // Match found
            firstCard = null;
        } else {
            // No match - flip back
            lockBoard = true;
            setTimeout(() => {
                card.classList.remove('flipped');
                firstCard.card.classList.remove('flipped');
                firstCard = null;
                lockBoard = false;
            }, 1000);
        }
    }
}
