/* L'utente indica un livello di difficoltà 
in base al quale viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
*/

let gridNumbers = [];
let arrayRandomNumber = [];

/**
 * 
 * @param {string} selector css selector
 * @param {string} tag_name a tag name
 * @param {string} class_name a class name
 */
function generateGrid(row_lenght, cols_lenght, selector, element_name, class_name) {
    const cellsElement = document.querySelector(selector)
    gridNumbers = []
    for (let i = 1; i <= row_lenght; i++) {
        const cell = document.createElement(element_name)
        cell.classList.add(class_name)
        cell.innerHTML += [i]

        cell.style.width = `calc(100% / ${cols_lenght})`
        cellsElement.append(cell)
        gridNumbers.push(i)
    }

    return gridNumbers;

}






function selectCells(selector) {
    const cells = document.querySelectorAll(selector)
    return cells
}



//Attivazione colore al click
function activateCell(selector, arrayRandomNumber) {
    const cells = selectCells(selector)
    const cella = document.querySelector(".cells")
    let element_n = cella.value;
    
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.addEventListener('click', function () {
            let elementoCella = i + 1;
            if (arrayRandomNumber.includes(elementoCella)) {
                cell.classList.add("bomb")
                cell.classList.remove("selected")
                cell.innerHTML = `<i class="fa-solid fa-bomb"></i>`
            } else {
                
                cell.classList.add("selected")
            }
            console.log(arrayRandomNumber);
        })
    }
}

/* GENERARE LE FUNCTION DOPO IL CLICK */

const elementButton = document.querySelector('.btn_genera');

elementButton.addEventListener("click", function () {
    let option_value = document.getElementById("mylist").value;

    if (option_value == 1) {
        row_lenght = 100;
        cols_lenght = 10;

        //Invoca la funzione per creare la griglia con i numeri
        generateGrid(row_lenght, cols_lenght, '.cells', "div", "cell")
        //Invoca la funzione per far colorare la cella di celeste
        activateCell('.cell', arrayRandomNumber)
        //Invoca la funzione per creare un array di numeri in base alla difficoltà scelta dall'utente
        arrayCreatedCasual(1, row_lenght)

        //console.log(controlNumberArray(1, row_lenght));

    } else if (option_value == 2) {
        row_lenght = 81;
        cols_lenght = 9;

        //Invoca la funzione per creare la griglia con i numeri
        generateGrid(row_lenght, cols_lenght, '.cells', "div", "cell")
        //Invoca la funzione per far colorare la cella di celeste
        activateCell('.cell', numeriRandomici)
        //Invoca la funzione per creare un array di numeri in base alla difficoltà scelta dall'utente
        arrayCreatedCasual(1, row_lenght)
    } else {
        row_lenght = 49;
        cols_lenght = 7;

        //Invoca la funzione per creare la griglia con i numeri
        generateGrid(row_lenght, cols_lenght, '.cells', "div", "cell")
        //Invoca la funzione per far colorare la cella di celeste
        activateCell('.cell', numeriRandomici)
        //Invoca la funzione per creare un array di numeri in base alla difficoltà scelta dall'utente
        arrayCreatedCasual(1, row_lenght)
    }
})

/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà 
prescelta: le bombe :bomba:.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e 
l'utente può continuare a cliccare sulle altre celle.
La partita termina quando:
 il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */


//Dobbiamo generare 16 numeri casuali in base al livello scelto

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function arrayCreatedCasual(min, max) {
    for (let i = 1; i <= 16; i++) {
        const randomNumber = getRandomInteger(min, max)

        //Unicità dei numeri nell'array
        if (!arrayRandomNumber.includes(randomNumber)) {
            arrayRandomNumber.push(randomNumber)
        }
    }

    return arrayRandomNumber;
}
