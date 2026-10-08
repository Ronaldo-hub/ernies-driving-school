class K53App {
  constructor() {
    this.questions = typeof K53_QUESTION_BANK !== 'undefined' ? K53_QUESTION_BANK : [];
    this.currentIndex = 0;
    this.animFrame = null;
    this.carX = -50;
    this.init();
  }

  init() {
    if (this.questions.length === 0) {
      document.getElementById('questionText').innerHTML = "<span style='color:red;'>⚠️ No questions loaded.</span>";
      return;
    }
    this.load(this.currentIndex);
  }

  load(index) {
    if (index < 0 || index >= this.questions.length) return;
    this.currentIndex = index;
    const q = this.questions[index];

    document.getElementById('questionCounter').innerText = `QUESTION ${index + 1} OF ${this.questions.length} - ${q.vehicle_code}`;
    document.getElementById('questionText').innerText = q.question_text;

    const feedback = document.getElementById('feedbackPanel');
    feedback.className = 'feedback';
    feedback.innerHTML = '';

    const optsContainer = document.getElementById('optionsContainer');
    optsContainer.innerHTML = '';

    q.options.forEach((optText, i) => {
      let label = optText;
      if (!/^[A-Z]\)/.test(label)) label = `${String.fromCharCode(65 + i)}) ${label}`;

      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerText = label;
      btn.onclick = () => this.checkAnswer(btn, label, q.correct_answer, q.explanation);
      optsContainer.appendChild(btn);
    });

    this.runAnimation(q.sceneType);
  }

  checkAnswer(btn, selectedText, correctText, explanation) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    const isCorrect = selectedText.charAt(0).toUpperCase() === correctText.charAt(0).toUpperCase();
    const feedback = document.getElementById('feedbackPanel');

    feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `<strong>${isCorrect ? '✔ CORRECT' : '❌ INCORRECT'}</strong><br/>${explanation || ''}`;
  }

  next() { if (this.currentIndex < this.questions.length - 1) this.load(this.currentIndex + 1); }
  prev() { if (this.currentIndex > 0) this.load(this.currentIndex - 1); }

  runAnimation(scene) {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    this.carX = -50;

    const draw = () => {
      ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#334155'; ctx.fillRect(0, 100, canvas.width, 100);

      ctx.strokeStyle = '#F59E0B'; ctx.lineWidth = 4; ctx.setLineDash([20, 20]);
      ctx.beginPath(); ctx.moveTo(0, 150); ctx.lineTo(canvas.width, 150); ctx.stroke(); ctx.setLineDash([]);

      ctx.fillStyle = '#EF4444'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`SCENARIO: ${scene}`, 15, 25);

      ctx.fillStyle = '#10B981'; ctx.fillRect(this.carX, 115, 60, 30);
      ctx.fillStyle = '#FFF'; ctx.fillText('EGO', this.carX + 15, 135);

      this.carX += 2; if (this.carX > canvas.width) this.carX = -80;
      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }
}
window.onload = () => { window.app = new K53App(); };
