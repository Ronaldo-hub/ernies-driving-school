
    const WORDLESS_SVGS = {
      "DISTANCE": `<svg viewBox="0 0 120 160">
        <rect x="35" y="20" width="50" height="30" fill="#e62e2e" rx="4"/>
        <line x1="60" y1="65" x2="60" y2="105" stroke="#fff" stroke-width="3" stroke-dasharray="6 6"/>
        <rect x="35" y="110" width="50" height="30" fill="#a0a0a0" rx="4"/>
      </svg>`,
      "INTERSECTION": `<svg viewBox="0 0 120 160">
        <rect x="40" y="0" width="40" height="160" fill="#222"/>
        <rect x="0" y="60" width="120" height="40" fill="#222"/>
        <line x1="60" y1="0" x2="60" y2="160" stroke="#facc15" stroke-width="2" stroke-dasharray="8 8"/>
        <line x1="0" y1="80" x2="120" y2="80" stroke="#facc15" stroke-width="2" stroke-dasharray="8 8"/>
        <circle cx="20" cy="40" r="12" fill="#e62e2e"/>
      </svg>`,
      "HEADLIGHTS": `<svg viewBox="0 0 120 160">
        <rect x="40" y="100" width="40" height="50" fill="#a0a0a0" rx="4"/>
        <polygon points="50,105 10,20 110,20 70,105" fill="#facc15" opacity="0.4"/>
      </svg>`,
      "SIGNS": `<svg viewBox="0 0 120 160">
        <polygon points="60,30 90,60 90,100 30,100 30,60" fill="#e62e2e"/>
        <circle cx="60" cy="65" r="24" fill="none" stroke="#fff" stroke-width="4"/>
      </svg>`,
      "GENERAL": `<svg viewBox="0 0 120 160">
        <rect x="25" y="0" width="8" height="160" fill="#facc15" />
        <line x1="75" y1="0" x2="75" y2="160" stroke="#fff" stroke-width="4" stroke-dasharray="15 15" />
      </svg>`
    };

    class QuizApp {
      constructor() {
        this.questions = typeof K53_DATA !== 'undefined' ? K53_DATA : [];
        this.currentIndex = 0;
        this.init();
      }

      init() {
        if (this.questions.length === 0) {
          document.getElementById('q-text').innerHTML = "<span style='color:red;'>⚠️ No questions loaded.</span>";
          return;
        }
        this.load(this.currentIndex);
      }

      load(index) {
        if (index < 0 || index >= this.questions.length) return;
        this.currentIndex = index;
        const q = this.questions[index];

        document.getElementById('q-counter').innerText = `QUESTION ${index + 1} OF ${this.questions.length}`;
        document.getElementById('svg-container').innerHTML = WORDLESS_SVGS[q.scene] || WORDLESS_SVGS["GENERAL"];
        document.getElementById('q-text').innerText = q.question;

        const feedback = document.getElementById('feedback-panel');
        feedback.className = 'feedback-panel';
        feedback.innerText = '';

        const optsContainer = document.getElementById('options-container');
        optsContainer.innerHTML = '';

        q.options.forEach((optText, i) => {
          const letter = String.fromCharCode(65 + i);
          const cleanOpt = optText.replace(/^[A-Z]\)\s*/, '');

          const btn = document.createElement('button');
          btn.className = 'option-btn';
          btn.innerHTML = `<span class="option-letter">${letter}</span> <span>${cleanOpt}</span>`;
          btn.onclick = () => this.checkAnswer(btn, letter, q.correct_answer);
          optsContainer.appendChild(btn);
        });

        // Update Next button text on last question
        const nextBtn = document.getElementById('next-btn');
        if (index === this.questions.length - 1) {
          nextBtn.innerText = "FINISH";
        } else {
          nextBtn.innerHTML = "NEXT &#9654;";
        }
      }

      checkAnswer(btn, selectedLetter, correctString) {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const correctLetter = correctString.charAt(0).toUpperCase();
        const isCorrect = selectedLetter === correctLetter;

        const feedback = document.getElementById('feedback-panel');
        feedback.className = `feedback-panel ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.innerText = isCorrect ? '✔ CORRECT' : '❌ INCORRECT';
      }

      next() {
        if (this.currentIndex < this.questions.length - 1) {
            this.load(this.currentIndex + 1);
        } else {
            document.getElementById('quiz-card').innerHTML = `<h2 style="text-align:center; color:#2ecc71;">Test Complete!</h2><p style="text-align:center;">You have reached the end of the demo.</p>`;
        }
      }
      prev() {
        if (this.currentIndex > 0) this.load(this.currentIndex - 1);
      }
    }

    window.onload = () => { window.app = new QuizApp(); };
    