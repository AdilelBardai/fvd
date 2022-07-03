
//als de pagina laad dan word deze code gestart en als die niet of al laad dan voert die de functie uit
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

//bron: https://www.youtube.com/watch?v=YeFzkC2awTM&t=983s
function ready() {
    var verwijderWinkelwagenItemsButtons = document.getElementsByClassName('verwijder-button')
    //starten op 0 is kleiner dan de lengte of het aantal knoppen en voegt telkens toe (i is array)
    for (var i = 0; i < verwijderWinkelwagenItemsButtons.length; i++) {
        var button = verwijderWinkelwagenItemsButtons[i]
        button.addEventListener('click', verwijderWinkelwagenItem)
    }

    var visAantalInputs = document.getElementsByClassName('vis-aantal-input')
    for (var i = 0; i < visAantalInputs.length; i++) {
        var input = visAantalInputs[i]
        input.addEventListener('change', visAantalVeranderd)
    }

    var voegToeBtn = document.getElementsByClassName('voegtoe-button')
    for (var i = 0; i < voegToeBtn.length; i++) {
        var button = voegToeBtn[i]
        button.addEventListener('click', visGekochtClicked)
    }

    document.getElementsByClassName('koop-button')[0].addEventListener('click', kopenClicked)
}

function kopenClicked() {
    alert('Veel plezier met je visjes')
    var winkelWagenItems = document.getElementsByClassName('winkelwagen-items')[0]
    //word gekeken of er een boolean waarde is, als die er is worden die verwijderd na het klikken.    
    while (winkelWagenItems.hasChildNodes()) {
        winkelWagenItems.removeChild(winkelWagenItems.firstChild)
    }
    updateVisTotaal()
}

function verwijderWinkelwagenItem(event) {
    //event refereert naar een object de gehele parent van de html word verwijderd uit de winkelwagen
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateVisTotaal()
}

function visAantalVeranderd(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { //als het Not a Number is toont het 
        input.value = 1
    }
    updateVisTotaal()
}

function visGekochtClicked(event) {
    var soundEffectBuy = new Audio();
    soundEffectBuy.src = "sound-effect/click-effect.mp3"; //bron van de sound: https://mixkit.co/free-sound-effects/bubbles/
    soundEffectBuy.play();
    var button = event.target
    var vis = button.parentElement.parentElement
    var title = vis.getElementsByClassName('vis-naam')[0].innerText
    var prijs = vis.getElementsByClassName('vis-prijs')[0].innerText
    var imageSrc = vis.getElementsByClassName('vis-image')[0].src
    addItemToWinkelwagen(title, prijs, imageSrc)
    updateVisTotaal()
}

function addItemToWinkelwagen(title, prijs, imageSrc) {
    var winkelWagen = document.createElement('div')
    winkelWagen.classList.add('winkelwagen')
    var winkelWagenItems = document.getElementsByClassName('winkelwagen-items')[0]
    var winkelWagenItemNaam = winkelWagenItems.getElementsByClassName('winkelwagen-item-naam')
    for (var i = 0; i < winkelWagenItemNaam.length; i++) {
        if (winkelWagenItemNaam[i].innerText == title) {
            alert('Dit zit al in je winkelwagen')
            return
        }
    }
    var winkelWagenContent = `
        <div class="winkelwagen-item winkelwagen-column">
            <img class="winkelwagen-item-image" src="${imageSrc}" width="100" height="100">
            <span class="winkelwagen-item-naam">${title}</span>
        </div>
        <span class="vis-prijs winkelwagen-column">${prijs}</span>
        <div class="vis-aantal winkelwagen-column">
            <input class="vis-aantal-input" type="number" value="1">
            <button class="verwijder-button" type="button">VERWIJDER</button>
        </div>`
    winkelWagen.innerHTML = winkelWagenContent
    winkelWagenItems.append(winkelWagen)
    winkelWagen.getElementsByClassName('verwijder-button')[0].addEventListener('click', verwijderWinkelwagenItem)
    winkelWagen.getElementsByClassName('vis-aantal-input')[0].addEventListener('change', visAantalVeranderd)
}

function updateVisTotaal() {
    var winkelwagenItemContainer = document.getElementsByClassName('winkelwagen-items')[0] //eertse item uit de array binnen de container
    var winkelWagens = winkelwagenItemContainer.getElementsByClassName('winkelwagen')
    var totaal = 0
    for (var i = 0; i < winkelWagens.length; i++) { //starten op 0 is kleiner dan de lengte of het aantal knoppen en voegt telkens toe (i is array)
        var winkelWagen = winkelWagens[i]
        var visPrijs = winkelWagen.querySelector('.vis-prijs')
        var visAantal = winkelWagen.getElementsByClassName('vis-aantal-input')[0]
        var prijs = parseFloat(visPrijs.innerText.replace('$', '')) //parsefloat (zwevend getal) omdat het een nummer is en geen string, elke text in dat element dollar teken word vervangen met niks
        var aantal = visAantal.value
        totaal = totaal + (prijs * aantal) //prijs word berekent op het aantal x de prijs per stuk
    }
    totaal = Math.round(totaal * 100) / 100 //hiermee word het een rond getal gemaakt
    document.getElementsByClassName('vis-totaal-prijs')[0].innerText = '$' + totaal //de prijs = dollar teken + de totaalprijs
}

var cartButton = document.getElementById("cart");
var closeButton = document.getElementById("close");

cartButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);

function openMenu() {
    document.getElementsByClassName('container')[0].style.display = 'block';
}

function closeMenu() {
    document.getElementsByClassName('container')[0].style.display = 'none';
}