import QuizEngine from '../Modul/src/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn')
  const quizContainer = document.getElementById('quiz-container')
  const startContainer = document.getElementById('start-container')

  quizContainer.style.display = 'none'

  const quiz = new QuizEngine()
  quiz.addQuestion('What year did ABBA win Eurovision?', ['1972', '1973', '1974', '1975'], 2)
  quiz.addQuestion('Which famous artist is known for creating the album The Wall?', ['David Bowie', 'Pink Floyd', 'The Who', 'Genesis'], 1)
  quiz.addQuestion('Which composer is known for his symphonies and was deaf?', ['Mozart', 'Bach', 'Beethoven', 'Chopin'], 2)
  quiz.addQuestion('Which composer wrote the opera Don Giovanni?', ['Mozart', 'Bach', 'Beethoven', 'Verdi'], 0)
  quiz.addQuestion('Which band released the album Dark Side of the Moon?', ['The Beatles', 'Pink Floyd', 'Led Zeppelin', 'Queen'], 1)
  quiz.addQuestion('Who is known as the "King of Pop"?', ['Elvis Presley', 'Michael Jackson', 'Prince', 'Freddie Mercury'], 1)


  startBtn.addEventListener('click', () => {
    startContainer.style.display = 'none'
    quizContainer.style.display = 'block'
    quiz.startQuiz(3, 10)
    nextQuestion()
  })

  function nextQuestion() {
    const question = quiz.getNextQuestion()
    const questionText = document.getElementById('question-text')

    questionText.textContent = question.text
  }
})
