'use strict'

// Render the cinema (7x15 with middle path)
// implement the Seat selection flow
// Popup shows the seat identier - e.g.: 3-5 or 7-15
// Popup should contain seat price (for now 4$ to all) 
// TODO: allow booking the seat ('S', 'X', 'B')
// TODO: Uplift your model - each seat should have its own price... 
// TODO: in seat details, show available seats around 
// TODO: Upload to GitHub Pages

var gElSelectedSeat = null
const gCinema = createCinema()
renderCinema()

function createCinema() {
    const cinema = []
    for (var i = 0; i < 7; i++) {
        cinema[i] = []
        for (var j = 0; j < 15; j++) {
            cinema[i][j] = (j === 7) ? 'X' : 'S'
        }
    }
    return cinema
}

function renderCinema() {
    var strHTML = ''
    for (var i = 0; i < gCinema.length; i++) {
        strHTML += `<tr class="cinema-row" >\n`
        for (var j = 0; j < gCinema[0].length; j++) {
            const cell = gCinema[i][j]
            
            // For cell of type SEAT add seat class
            var className = (cell === 'S')? 'seat' : ''
            if (cell === 'B') className = 'booked'
            // TODO: for cell that is booked add booked class
            // Add a seat title: `Seat: ${i}, ${j}`

            strHTML += `\t<td class="cell ${className}" title="Seat: ${i+1}, ${j+1}" 
                            onclick="cellClicked(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    // console.log(strHTML)

    const elSeats = document.querySelector('.cinema-seats')
    elSeats.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
    const cell = gCinema[i][j]
    // TODO: ignore none seats and booked
    if (cell === 'X' || cell === 'B') return
    console.log('Cell clicked: ', elCell, i, j)
    
    // Support selecting a seat
    elCell.classList.add('selected')
    if (gElSelectedSeat) {
        gElSelectedSeat.classList.remove('selected')
    }

    // Only a single seat should be selected
    gElSelectedSeat = (gElSelectedSeat === elCell)? null : elCell

    // When seat is selected a popup is shown
    if (gElSelectedSeat) showSeatDetails({i:i, j:j})
    else hideSeatDetails()
}

function showSeatDetails(pos) {
    const elPopup = document.querySelector('.popup')
    const seat = gCinema[pos.i][pos.j]
    elPopup.querySelector('h2 span').innerText = `${pos.i+1}-${pos.j+1}`
    elPopup.querySelector('h3 span').innerText = `$4`
    const elBtn = elPopup.querySelector('button')
    elBtn.dataset.i = pos.i
    elBtn.dataset.j = pos.j
    elPopup.hidden = false
}

function hideSeatDetails() {
    document.querySelector('.popup').hidden = true
}

function bookSeat(elBtn) {
    console.log('Booking seat, button: ', elBtn)
    const i = +elBtn.dataset.i
    const j = +elBtn.dataset.j

    //book the seat
    gCinema[i][j] = 'B'
    renderCinema()
    unSelectSeat()
}

function unSelectSeat() {
    hideSeatDetails()
    gElSelectedSeat.classList.remove('selected')
    gElSelectedSeat = null
}