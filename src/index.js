import QuizEngine from '../Modul/src/index.js'

class QuizApp {
  constructor(quiz, elements) {
    this.quiz = quiz
    this.elements = elements
    this.timerInterval = null
  }

  startQuiz() {
    this.elements.startContainer.style.display = 'none'
    this.elements.quizContainer.style.display = 'block'
    this.quiz.startQuiz(5, 10)
    this.#nextQuestion()
    this.quiz.timer.start()
  }

  getNextQuestion() {
    this.elements.nextBtn.style.display = 'none'
    this.#nextQuestion()
  }

  #nextQuestion() {
    const question = this.quiz.getNextQuestion()
    const timer = this.elements.timer
    this.quiz.timer.start()

    if (!question) {
      this.#handleQuizEnd()
      return
    }

    this.#displayQuestion(question)
    this.#handleTimer(timer)
  }

  #displayQuestion(question) {
    const questionText = this.elements.questionText
    const answerBtns = this.elements.answerBtns
    questionText.textContent = question.text
    answerBtns.innerHTML = ''

    question.answers.forEach((answer, index) => {
      const btn = document.createElement('button')
      btn.classList.add('answer-btn')
      btn.textContent = answer
      
      btn.addEventListener('click', () => {
        const correctAnswer = this.quiz.checkAnswer(index)
        btn.classList.add(correctAnswer ? 'correct' : 'wrong')
        this.elements.nextBtn.style.display = 'block'
        clearInterval(this.timerInterval)
        
        document.querySelectorAll('.answer-btn').forEach(btn => {
          btn.disabled = true
        })
      })
      answerBtns.appendChild(btn)
    })
  }

  #handleTimer(timer) {
    this.timerInterval = setInterval(() => {
      const timeLeft = this.quiz.timer.getTimeLeft()
      timer.textContent = `Time left: ${timeLeft}s`

      if (this.quiz.timer.isExpired()) {
        clearInterval(this.timerInterval)
        timer.textContent = 'Time is up!'
        timer.style.color = 'tomato'
        this.elements.nextBtn.style.display = 'block'
        this.quiz.checkAnswer()

        document.querySelectorAll('.answer-btn').forEach(btn => {
          btn.disabled = true
          btn.classList.add('timeExpired')
        })
      }
    })
  }

  #handleQuizEnd() {
    const stats = this.quiz.getStats()
    this.elements.quizContainer.style.display = 'none'
    this.elements.endContainer.style.display = 'block'
    this.elements.endContainer.innerHTML = `
      <div>
      <h1>Results:</h1>
      <h2>Points: ${this.quiz.score} / ${this.quiz.activeQuestions.length} </h2>
      <h3> Exact answer stats:</h3>
      <p>Time expired: ${stats.timeExpired}</p>
      <p>Correct answers: ${stats.correct}</p>
      <p>Wrong answers: ${stats.wrong}</p>
      </div>
      <button id="restart-btn">Restart</button>
      `

      document.getElementById('restart-btn').addEventListener('click', () => {
        this.quiz.resetQuiz()
        this.elements.endContainer.style.display = 'none'
        this.elements.startContainer.style.display = 'block'
      })
      console.log(this.quiz.getStats())
      console.log(this.quiz.summary())
      console.log(this.quiz.getAnswerLog())
      return
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    startBtn: document.getElementById('start-btn'),
    quizContainer: document.getElementById('quiz-container'),
    startContainer: document.getElementById('start-container'),
    endContainer: document.getElementById('end-container'),
    nextBtn: document.getElementById('next-btn'),
    questionText: document.getElementById('question-text'),
    answerBtns: document.getElementById('answer-btns'),
    timer: document.getElementById('timer')
  }

  elements.endContainer.style.display = 'none'
  elements.quizContainer.style.display = 'none'
  elements.nextBtn.style.display = 'none'

  const quiz = new QuizEngine()

  quiz.addQuestion('What year did ABBA win Eurovision?', ['1972', '1973', '1974', '1975'], 2)
  quiz.addQuestion('Which composer is known for his symphonies and was deaf?', ['Mozart', 'Bach', 'Beethoven', 'Chopin'], 2)
  quiz.addQuestion('Which composer wrote the opera Don Giovanni?', ['Mozart', 'Bach', 'Beethoven', 'Verdi'], 0)
  quiz.addQuestion('Which band released the album Dark Side of the Moon?', ['The Beatles', 'Pink Floyd', 'Led Zeppelin', 'Queen'], 1)
  quiz.addQuestion('Who is known as the "King of Pop"?', ['Elvis Presley', 'Michael Jackson', 'Prince', 'Freddie Mercury'], 1)
  quiz.addQuestion('Which artist sings the song "Jolene"?', ['Dolly Parton', 'Reba McEntire', 'Carrie Underwood', 'Miranda Lambert'], 0)
  quiz.addQuestion('What city in the UK does the band The Beatles originate from?', ['London', 'Liverpool', 'Manchester', 'Birmingham'], 1)
  quiz.addQuestion('What is eminem also known as?', ['Slim Shady', 'E', 'Shady', 'Em'], 0)
  quiz.addQuestion('Which Spice girl was known as "Sporty Spice"?', ['Mel B', 'Mel C', 'Emma Bunton', 'Geri Halliwell'], 1)
  quiz.addQuestion('Which famous artist made the song "Uncover" at 15?', ['Zara Larsson', 'Tove Lo', 'Robyn', 'Lykke Li'], 0)

  const app = new QuizApp(quiz, elements)

  elements.startBtn.addEventListener('click', () => app.startQuiz())
  elements.nextBtn.addEventListener('click', () => app.getNextQuestion())
}) 
