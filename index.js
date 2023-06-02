const words = [
  {question: 'гарнир', answers: ['side dish']},
  {question: 'болтливый', answers: ['talkative']},
  {question: 'ипотека', answers: ['mortgage']},
  {question: 'заем', answers: ['loan']},
  {question: 'наследовать', answers: ['inherit']},
  {question: 'выставлять счет', answers: ['charge']},
  {question: 'акции', answers: ['shares', 'stocks' ]},
  {question: 'имущество', answers: ['possessions', 'belongings']},
  {question: 'тень', answers: ['shade']},
  {question: 'приходить, появляться, объявиться', answers: ['turn up', 'show up']},
  {question: 'многолетний, вечный', answers: ['perennial']},
  {question: 'живой, яркий', answers: ['vivid']},
  {question: 'сужение, ограничение', answers: ['stricture']},
  {question: 'проникать, пропитывать', answers: ['permeate, pervade']},
  {question: 'оправдание, реабилитация', answers: ['exculpation']},
  // {en: 'by the method of exception', ru: 'методом исключения'},
  // {en: 'gym', ru: 'спортзал'},
  // {en: 'garlic', ru: 'чеснок'},
  // {en: 'the same', ru: 'одинаковый'},
]
const WORDS_AMOUNT = words.length
const STUDENT_NAME = 'YOU GET 1 POINT!'

const elements = {
  field: document.getElementById('field'),
  question: document.getElementById('question'),
  writeTranslation: document.getElementById('write-translation'),
  hint: document.getElementById('hint'),
  next: document.getElementById('next'),
  checkit: document.getElementById('checkit'),
  meta: document.getElementById('meta'),
  score: document.getElementById('score'),
  congrats: document.getElementById('congrats'),
  names: document.querySelectorAll('.js-name')
}

const state = {
  currentIndex: null,
  isAlreadyGivesAnswer: false,
  isNoMoreWords: false,
  isEnterPressed: false,
  score: 0
}

const getRandomWordIndex = function() {
  return Number(Math.random() * (words.length - 1)).toFixed(0)
}

const showCompletedState = function() {
  elements.hint.innerText = 'There are no more words'
  elements.writeTranslation.classList.add('is-hidden')
  elements.checkit.classList.add('is-hidden')
  elements.next.classList.add('is-hidden')
  elements.field.classList.add('is-hidden')
  elements.names.forEach(el => {
    el.innerText = STUDENT_NAME
  })
  elements.congrats.classList.add('is-visible')
}

const showInitialState = function(question) {
  elements.meta.innerText = ((words.length - 1) + ' of ' + WORDS_AMOUNT)
  elements.field.value = ''
  elements.field.removeAttribute('disabled')
  elements.field.focus()
  elements.next.setAttribute('disabled', 'true')
  elements.checkit.removeAttribute('disabled')
  elements.question.innerText = question
  elements.hint.innerText = ''
}

const showCorrectState = function() {
  elements.score.innerText = state.score
  elements.hint.innerText = 'YOU ARE AWESOME! ' + STUDENT_NAME
  elements.field.setAttribute('disabled', 'true')
  elements.next.removeAttribute('disabled')
  elements.checkit.setAttribute('disabled', 'true')
}

const showIncorrectState = function(correctWords) {
  elements.field.setAttribute('disabled', 'true')
  elements.checkit.setAttribute('disabled', 'true')
  elements.next.removeAttribute('disabled')
  elements.hint.innerHTML = 'Wrong, it is <em>' + correctWords.join(', ') + '</em>'
}

const checkAnswer = function() {
  state.isAlreadyGivesAnswer = true
  const userAnswer = elements.field.value.toLowerCase().replaceAll('ё', 'e')
  const correctAnswers = words[state.currentIndex].answers
  words.splice(state.currentIndex, 1)
  if (correctAnswers.includes(userAnswer)) {
    state.score += 1
    showCorrectState()
  } else {
    showIncorrectState(correctAnswers)
  }
}

const nextQuestion = function() {
  state.isAlreadyGivesAnswer = false
  state.currentIndex = getRandomWordIndex()
  const word = words[state.currentIndex]
  if (!word) {
    state.isNoMoreWords = true
    showCompletedState()
    return
  }
  showInitialState(word.question)
}

document.addEventListener('keydown', function(event) {
  if (event.key !== 'Enter' || state.isNoMoreWords || state.isEnterPressed) {
    return
  }

  // double-tap protection
  state.isEnterPressed = true
  setTimeout(function() {
    state.isEnterPressed = false
  }, 100)

  if (state.isAlreadyGivesAnswer) {
    nextQuestion()
    return
  }

  checkAnswer()
})


elements.next.addEventListener('click', function() {
  nextQuestion()
})

elements.checkit.addEventListener('click', function() {
  checkAnswer()
})

nextQuestion()


