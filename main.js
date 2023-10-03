const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
};

const imageDisplay = (base, firstNum, lastNum) => {
    this.images = [];
    this.doubleImages = [];
    for (let i = firstNum; i <= lastNum; i++) {
        imageObj = {
            name: `Image${i}`,
            img: `${base}${i}.png`
        }

        this.images.push(imageObj);
    }

    for (let i = 0; i < images.length; i++) {
        doubleImages.push(images[i]);
        doubleImages.push(images[i]);
    }
    images = doubleImages
    shuffle(images);
    return images;
}


const cardImages = imageDisplay('images/img/card',1,6);

const cardContainer = document.querySelector('.card__container');


const cardPost = () => {
    cardContainer.innerHTML = '';
    cardImages.map((postData, i) => {
        const postCard = document.createElement('div');
        postCard.className = 'card';
        const CardInner = document.createElement('div');
        CardInner.className = 'card__inner';
        const CardFront = document.createElement('div');
        CardFront.className = 'card__face card__face--front';
        const frontImg  = document.createElement('img');
        frontImg.setAttribute('src',
        'images/js_logo.png');

        const CardBack = document.createElement('div');
        CardBack.className = 'card__face card__face--back';

        const CardBackBody = document.createElement('div');
        CardBackBody.className = 'card__body'
        const CardBackImg = document.createElement('img');
        CardBackImg.className = 'back__image';
        CardBackImg.setAttribute('src',
        postData.img);
        CardBackImg.setAttribute('data-id', i);

        cardContainer.appendChild(postCard);
        postCard.appendChild(CardInner);
        CardFront.appendChild(frontImg);
        CardBack.appendChild(CardBackBody);
        CardBackBody.appendChild(CardBackImg);
        CardInner.appendChild(CardFront);
        CardInner.appendChild(CardBack);
    })
}

cardPost()

const cards = document.querySelectorAll('.card__inner');
const counterElement = document.querySelector('.counter');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

const flipCard = () => {
    cards.forEach(card => card.addEventListener('click', function (e) {
        if (!card.classList.contains('is-flipped') && cardsChosen.length < 2) {
            card.classList.add('is-flipped')
    
            const backImage = card.querySelector('.back__image');
            const cardId = backImage.getAttribute('data-id');
            cardsChosen.push(cardImages[cardId].name);
            cardsChosenId.push(cardId);
            console.log(cardsChosen);
    
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 300);
            }
        }
    }))
}


const checkForMatch = () => {
    const backImages = document.querySelectorAll('.back__image');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (backImages[optionOneId] && backImages[optionTwoId]) {
        if (cardsChosen[0] === cardsChosen[1] && optionOneId != optionTwoId) {
            alert('You found a match!');
            backImages[optionOneId].setAttribute('src', 'images/mark.png');
            backImages[optionTwoId].setAttribute('src', 'images/mark.png');

            cardsWon.push(cardsChosen);

        } else {
            alert('Sorry, try again');
            cards[optionOneId].classList.remove('is-flipped');
            cards[optionTwoId].classList.remove('is-flipped');
        }

    }

    cardsChosen = [];
    cardsChosenId = [];

    counterElement.textContent = cardsWon.length
    if (cardsWon.length === images.length/2) {
        counterElement.textContent = 'Congratulations';
    }
}

flipCard();

checkForMatch();






