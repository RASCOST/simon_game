let randomNumber = 0
const buttonColours = ['red', 'blue', 'green', 'yellow']
let randomChosenColour = ''
let gamePattern = []
let userClickedPattern = []
let isGameStarted = false
let level = 0

buttonColours.forEach( btn => {
  $('#' + btn).click(btnClicked)
})

function btnClicked (evt) {
  let userChosenColour = evt.target.id

  if (isGameStarted) {
    playSound(userChosenColour)
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour)

    if (isGameStarted && (userClickedPattern.length === gamePattern.length)) {
      checkAnswer()
    }
  }
  
}

function nextSequence () {
  const audio = new Audio()

  $('h1').text('Level ' + level)
  level++

  randomNumber = Math.floor((Math.random() * 4) + 1)
  randomChosenColour = buttonColours[randomNumber - 1]
  gamePattern.push(randomChosenColour)

  $('#' + randomChosenColour).fadeOut(150).fadeIn(150)

  playSound(randomChosenColour)
}

function playSound(name) {
  const audio = new Audio()

  audio.src = './sounds/' + name + '.mp3'
  audio.play()
}

function animatePress (currentColour) {
  $('#' + currentColour).addClass('pressed')
  setTimeout(() => $('#' + currentColour).removeClass('pressed'), 100)
}

$(document).keypress(() => {
  if (!isGameStarted) {
    $('h1').text('Level ' + level)
    isGameStarted = true
    nextSequence()
  }
})

function checkAnswer () {
  for (let i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      isGameStarted = false
      playSound('wrong')
      $('h1').text('Game Over, Press Any Key to Restart')
      $('body').addClass('game-over')
      setTimeout(() => $('body').removeClass('game-over'), 200)
      reset()
    }
  }

  userClickedPattern = []

  if (isGameStarted) {
    setTimeout(() => nextSequence(), 1000)
  }
}

function reset () {
  gamePattern = []
  isGameStarted = false
  level = 0
}