import QuizEngine from '../Modul/src/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn')
  const quizContainer = document.getElementById('quiz-container')
  const startContainer = document.getElementById('start-container')

  quizContainer.style.display = 'none'

  startBtn.addEventListener('click', () => {
    startContainer.style.display = 'none'
    quizContainer.style.display = 'block'
  })
})
