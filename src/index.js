import QuizEngine from '../Modul/src/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn')
  const quizContainer = document.getElementById('quiz-container')
  const startContainer = document.getElementById('start-container')
  const endContainer = document.getElementById('end-container')
  const nextBtn = document.getElementById('next-btn')
  
  endContainer.style.display = 'none'
  quizContainer.style.display = 'none'
  nextBtn.style.display = 'none'
  
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
  

  startBtn.addEventListener('click', () => {
    startContainer.style.display = 'none'
    quizContainer.style.display = 'block'
    quiz.startQuiz(5, 10)
    nextQuestion()
    quiz.timer.start()
  })

  nextBtn.addEventListener('click', () => {
    nextBtn.style.display = 'none'
    nextQuestion()
  })
  
  function nextQuestion() {
    
    let timerInterval
    const question = quiz.getNextQuestion()
    const questionText = document.getElementById('question-text')
    const answerBtns = document.getElementById('answer-btns')
    const timer = document.getElementById('timer')
    quiz.timer.start()
    
    if (!question) {
      quizContainer.style.display = 'none'
      endContainer.style.display = 'block'
      endContainer.innerHTML = `
      <div>
      <h1>Results:</h1>
      <h2>Points: ${quiz.score} / ${quiz.activeQuestions.length} </h2>
      <h3> Exact answer stats:</h3>
      <p>Time expired: ${quiz.getStats().timeExpired}</p>
      <p>Correct answers: ${quiz.getStats().correct}</p>
      <p>Wrong answers: ${quiz.getStats().wrong}</p>
      </div>
      <button id="restart-btn">Restart</button>
      `
      const restart = document.getElementById('restart-btn')
      restart.addEventListener('click', () => {
        quiz.resetQuiz()
        endContainer.style.display = 'none'
        startContainer.style.display = 'block'
      })
      console.log(quiz.getStats())
      console.log(quiz.summary())
      console.log(quiz.getAnswerLog())
      return
    }
    
    questionText.textContent = question.text
    answerBtns.innerHTML = ''
    
    timerInterval = setInterval(() => {
      const timeLeft = quiz.timer.getTimeLeft()
      timer.textContent = `Time left: ${timeLeft}s`
    
      if (quiz.timer.isExpired()) {
        clearInterval(timerInterval)
        timer.textContent = 'Time is up!'
        timer.style.color = 'tomato'
        nextBtn.style.display = 'block'

        quiz.checkAnswer()
        
        document.querySelectorAll('.answer-btn').forEach(btn => {
          btn.disabled = true
          btn.classList.add('timeExpired')
        })
      }
    })

    question.answers.forEach((answer, index) => {
      const btn = document.createElement('button')
      btn.classList.add('answer-btn')
      btn.textContent = answer
      
      btn.addEventListener('click', () => {
        const correctAnswer = quiz.checkAnswer(index)
        btn.classList.add(correctAnswer ? 'correct' : 'wrong')
        nextBtn.style.display = 'block'
        clearInterval(timerInterval)
        
        document.querySelectorAll('.answer-btn').forEach(btn => {
          btn.disabled = true
        })
      })
      answerBtns.appendChild(btn)
    })
  }
})

// DOKUMENTATION