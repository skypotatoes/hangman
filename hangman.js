'use strict'

const letterDiv = document.querySelector('.letter-div')
const resetButton = document.querySelector('.reset-btn')
const liveSpan = document.querySelector('.lives')
const wordDiv = document.querySelector('.word-div')
const notif = document.querySelector('.notif')
const notifContent = document.querySelector('.notif-content')
const notifSpan = document.querySelector('.notif-span')
const playAgain = document.querySelector('.notif-btn')
const hangman = document.querySelector('.hangman-div')

let letters

let lives
let select_word
const words = ['words', 'elephant', 'banana', 'snake', 'bamboo']

// get random word from word_list function
const getRandomWord = function (list) {
  return list[Math.floor(Math.random() * words.length)]
}

// const word = getRandomWord(words)
// wordDiv.innerHTML = word

const init = function (state) {
  wordDiv.innerHTML = ''
  if (state === 'start') {
    // putting all letters into html
    for (const i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="alpha">${i.toUpperCase()}</button>`
      letterDiv.insertAdjacentHTML('beforeend', html)
    }
  } else if (state === 'reset') {
    letters.forEach((btn) => {
      btn.classList.remove('disabled')
      notif.classList.add('hidden')
    })
    hangman.replaceChildren()
  }

  select_word = getRandomWord(words)
  lives = 6

  letters = document.querySelectorAll('.alpha')
  liveSpan.textContent = lives

  // putting selected word
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`
    wordDiv.insertAdjacentHTML('beforeend', html)
  }
}

init('start')

// show notification
const showNotif = function (msg) {
  notif.classList.remove('hidden')
  notifSpan.textContent = select_word
  notifContent.textContent = `You ${msg}`
  // lives = 3;
}

// decrease life
const decreaseLife = function () {
  lives--
  //   console.log(lives);
  liveSpan.textContent = lives
  if (lives === 5) {
    let head = document.createElement('div')
    head.setAttribute('class', 'head')

    hangman.append(head)
  }
  if (lives === 4) {
    let torso = document.createElement('div')
    torso.setAttribute('class', 'torso')
    hangman.append(torso)
  }

  if (lives === 3) {
    let leftarm = document.createElement('div')
    leftarm.setAttribute('class', 'leftarm')
    hangman.append(leftarm)
  }

  if (lives === 2) {
    let rightarm = document.createElement('div')
    rightarm.setAttribute('class', 'rightarm')
    hangman.append(rightarm)
  }

  if (lives === 1) {
    let leftleg = document.createElement('div')
    leftleg.setAttribute('class', 'leftleg')
    hangman.append(leftleg)
  }

  if (lives === 0) {
    let rightleg = document.createElement('div')
    rightleg.setAttribute('class', 'rightleg')
    hangman.append(rightleg)
    showNotif('lost')
  }
}

// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = function (letter) {
  let indexes = []
  ;[...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i
      indexes.push(index)
    }
  })
  //   console.log(indexes);
  return indexes
}

// check if we get complete word
const checkWord = function () {
  let val = true
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false
    }
  }
  return val
}

// letters event listener function
const letterPress = function () {
  const letter = this.textContent.toLowerCase()

  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter)
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent
    })
    if (checkWord()) showNotif('won')
  } else {
    decreaseLife()
  }
  this.classList.add('disabled')
}

// listening to letter buttons presses
letters.forEach((btn) => {
  btn.addEventListener('click', letterPress)
})

// listening to reset btn
resetButton.addEventListener('click', function () {
  init('reset')
})

// listening to play again button
playAgain.addEventListener('click', function () {
  init('reset')
})
