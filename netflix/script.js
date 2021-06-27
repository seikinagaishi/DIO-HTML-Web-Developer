// Barra de Pesquisa 
const searchButton  = document.querySelector('#search-button');
const bar           = document.querySelector('#search');

// Evento de clique
searchButton.addEventListener('click', () => {
    toggleSearchBar(searchButton);
})

// Fechar a barra ao clicar fora
document.querySelector('body').addEventListener('click', (e) => {
    let acceptedIDS = ['search-bar', 'search-button']
    if(document.querySelector('#search-bar').style.display == 'block' && !(acceptedIDS.find((id) => id == e.target.id))) {
        toggleSearchBar(searchButton, true);
    }
})

// Abrir e fechar a barra
function toggleSearchBar(icon, toggleOut = null) {
    let input = document.querySelector('#search input');
    
    if(bar.style.width == '244px' || toggleOut) {
        bar.style.width = '32px';
        input.style.display = 'none';
        input.style.paddingLeft = '0';
        icon.style.left = '4px';
    } else {
        input.style.display = 'block';

        setTimeout(function() {
            bar.style.width = '244px';
            input.style.paddingLeft = '35px';
            icon.style.left = '5px';
        }, 100);
    }
}

// Itens

const topicX = document.querySelector('#topic');
let leftActive = false;
let rightActive = true;
// var carouselRight = topicX.querySelector('#right');
// var carouselLeft;

let carousel = topicX.querySelector('section');

createArrowButton('right', '〉');

function moveScroll(button, direction) {
    let difference;

    switch(direction) {
        case 'right':
            difference = 250; 
            break;
        case 'left':
            difference = -250;
    }

    let aux = carousel.scrollLeft;
    carousel.scrollLeft += difference;

    if(aux == carousel.scrollLeft) {
        carousel.removeChild(button);

        if(direction == 'left') {
            leftActive = false;
        } else {
            rightActive = false;
        }
    }
}

function createArrowButton(direction, content) {
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.className = 'topic-arrow';
    button.id = direction;
    button.innerText = content;

    carousel.appendChild(button);

    if(direction == 'right') {
        let carouselRight = button;
        carouselRight.addEventListener('click', () => {
            console.log('tes');
            moveScroll(carouselRight, 'right');
            if(!leftActive) {
                createArrowButton('left', '〈');
                leftActive = true;
            }
        })
    } else {
        let carouselLeft = button;
        carouselLeft.addEventListener('click', () => {
            moveScroll(carouselLeft, 'left');
            if(!rightActive) {
                createArrowButton('right', '〉');
                rightActive = true;
            }
        })
    }
}