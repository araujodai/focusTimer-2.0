const playButton = document.querySelector('.play')
const stopButton = document.querySelector('.stop')
const moreButton = document.querySelector('.more')
const lessButton = document.querySelector('.less')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const nature = document.querySelector('.nature')
const rain = document.querySelector('.rain')
const coffeeShop = document.querySelector('.coffee-shop')
const fireplace = document.querySelector('.fireplace')
let minutes = Number(minutesDisplay.textContent)
let timerTimeOut
let newMinutes
const natureSound = new Audio('./sounds/nature.wav')
const rainSound = new Audio('./sounds/rain.wav')
const coffeeShopSound = new Audio('./sounds/coffeeshop.wav')
const fireplaceSound = new Audio('./sounds/fireplace.wav')
let alertMessage = document.querySelector('.alert')

let iconNature = document.querySelector('.icon-nature')

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let endOfTime = minutes <= 0 && seconds <= 0

    if (endOfTime) {
      updateDisplay()
      bgReset()
      return
    }

    if (seconds <= 0) {
      seconds = 60
      --minutes
    }
    updateDisplay(minutes, String(seconds - 1))

    countdown()
  }, 1000)
}

function updateMinutes(newMinutes) {
  minutes = newMinutes
}
function showAlertMessage() {
  alertMessage.classList.remove('hide')
}
function lessFiveMinutes() {
  newMinutes = minutes - 5
  if (newMinutes < 5) {
    showAlertMessage()
    minutesDisplay.classList.add('minutesAlert')
    setTimeout(function () {
      alertMessage.classList.add('hide')
      minutesDisplay.classList.remove('minutesAlert')
    }, 2000)
    return
  }
  updateMinutes(newMinutes)
  updateDisplay(newMinutes, 0)
}

function moreFiveMinutes() {
  newMinutes = minutes + 5
  updateMinutes(newMinutes)
  updateDisplay(newMinutes, 0)
}

function reset() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function bgSound(sound) {
  sound.loop = true
  sound.play()
}
function bgSoundStop() {
  natureSound.pause()
  rainSound.pause()
  coffeeShopSound.pause()
  fireplaceSound.pause()
}
function bgReset() {
  nature.classList.remove('box-clicked')
  rain.classList.remove('box-clicked')
  coffeeShop.classList.remove('box-clicked')
  fireplace.classList.remove('box-clicked')
  bgSoundStop()
}

playButton.addEventListener('click', function () {
  countdown()
})

stopButton.addEventListener('click', function () {
  reset()
  bgReset()
})
moreButton.addEventListener('click', function () {
  moreFiveMinutes()
})
lessButton.addEventListener('click', function () {
  lessFiveMinutes()
})
function clicked(element) {
  element.classList.add('box-clicked')
}
nature.addEventListener('click', function () {
  bgReset()
  bgSound(natureSound)
  clicked(nature)
})
rain.addEventListener('click', function () {
  bgReset()
  bgSound(rainSound)
  clicked(rain)
})
coffeeShop.addEventListener('click', function () {
  bgReset()
  bgSound(coffeeShopSound)
  clicked(coffeeShop)
})
fireplace.addEventListener('click', function () {
  bgReset()
  bgSound(fireplaceSound)
  clicked(fireplace)
})
