document.addEventListener('DOMContentLoaded', function() {
    
    let slideIndex = 1;

    if (document.getElementsByClassName("slide").length > 0) {
        showSlides(slideIndex);
    }

    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");
        
        if (slides.length === 0 || dots.length === 0) {
            return; 
        }
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }
    
    
    const quotes = [
        { text: "La felicidad es un cachorrito calentito.", author: "Lucy van Pelt" },
        { text: "He desarrollado una nueva filosofía... solo temo un día a la vez.", author: "Charlie Brown" },
        { text: "Sigue mirando hacia arriba... ese es el secreto de la vida.", author: "Snoopy" },
        { text: "A veces me acuesto por la noche y pregunto, '¿Dónde me equivoqué?'. Entonces una voz me dice, 'Esto va a tomar más de una noche'.", author: "Charlie Brown" },
        { text: "Todo lo que necesitas es amor. Pero un poco de chocolate de vez en cuando no hace daño.", author: "Lucy van Pelt" }
    ];

    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');
    const quoteContainer = document.getElementById('quote-container');
    let currentQuoteIndex = 0;

    function showNextQuote() {
        if (quoteTextEl && quoteAuthorEl && quoteContainer) {
            quoteContainer.style.opacity = 0;
            setTimeout(() => {
                const currentQuote = quotes[currentQuoteIndex];
                quoteTextEl.textContent = `"${currentQuote.text}"`;
                quoteAuthorEl.textContent = `– ${currentQuote.author}`;
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                quoteContainer.style.opacity = 1;
            }, 500);
        }
    }

    if (quoteTextEl && quoteAuthorEl && quoteContainer) {
        quoteContainer.style.opacity = 0; 
        const firstQuote = quotes[currentQuoteIndex];
        quoteTextEl.textContent = `"${firstQuote.text}"`;
        quoteAuthorEl.textContent = `– ${firstQuote.author}`;
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        setTimeout(() => {
            quoteContainer.style.opacity = 1;
        }, 500);
    }
    
    setInterval(showNextQuote, 4000); 

    
    const triviaContainer = document.getElementById('trivia-container');
    const resultsContainer = document.getElementById('trivia-results');

    const triviaQuestions = [
        {
            question: "¿Qué tipo de perro es Snoopy?",
            answers: { a: "Labrador", b: "Beagle", c: "Poodle" },
            correctAnswer: "b"
        },
        {
            question: "¿Qué personaje siempre lleva una mantita de seguridad?",
            answers: { a: "Charlie Brown", b: "Schroeder", c: "Linus van Pelt" },
            correctAnswer: "c"
        },
        {
            question: "¿Qué instrumento musical toca Schroeder?",
            answers: { a: "Un piano de juguete", b: "Una guitarra", c: "Un violín" },
            correctAnswer: "a"
        },
        {
            question: "¿Cuál es la famosa frase de Charlie Brown cuando algo sale mal?",
            answers: { a: "¡Caramba!", b: "¡Santo cielo!", c: "¡Rayos y centellas!" },
            correctAnswer: "a"
        }
    ];

    let numCorrect = 0;
    const totalQuestions = triviaQuestions.length;

    window.checkAnswer = function(event, questionNumber) {
        const clickedInput = event.target;
        const clickedLabel = clickedInput.parentElement;
        const userAnswer = clickedInput.value;
        
        const currentQuestion = triviaQuestions[questionNumber];
        const correctAnswer = currentQuestion.correctAnswer;
        
        const answerContainer = clickedLabel.parentElement;
        
        const correctAnswerLabel = answerContainer.querySelector(`input[value="${correctAnswer}"]`).parentElement;

        if (userAnswer === correctAnswer) {
            clickedLabel.classList.add('correct');
            numCorrect++;
        } else {
            clickedLabel.classList.add('incorrect');
            correctAnswerLabel.classList.add('correct');
        }
        
        const allInputs = answerContainer.querySelectorAll('input[type="radio"]');
        allInputs.forEach(input => {
            input.disabled = true;
        });

        const score = (numCorrect / totalQuestions) * 100;
        resultsContainer.innerHTML = `Puntaje: ${score.toFixed(0)}/100 (${numCorrect} de ${totalQuestions} correctas)`;
    }


    function buildTrivia() {
        const output = [];
        
        triviaQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (let letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}" onclick="checkAnswer(event, ${questionNumber})">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        });

        if (triviaContainer) {
            triviaContainer.innerHTML = output.join('');
        }
        
        if (resultsContainer) {
            resultsContainer.innerHTML = `Puntaje: 0/100 (0 de ${totalQuestions} correctas)`;
        }
    }

    if (triviaContainer && resultsContainer) {
        buildTrivia();
    }
});