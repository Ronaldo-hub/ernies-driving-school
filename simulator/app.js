// K53 DUAL-PANE INTERACTIVE SIMULATOR ENGINE
class K53TrafficSimulator {
  constructor() {
    this.questions = typeof K53_QUESTION_BANK !== 'undefined' ? K53_QUESTION_BANK : [];
    this.currentIndex = 0;
    this.animFrameId = null;
    this.vehicleX = 50;
    this.initUI();
  }

  getEl(id) { return typeof document !== 'undefined' ? document.getElementById(id) : null; }

  initUI() {
    if (typeof document === 'undefined') return;
    if (this.questions.length === 0) {
      const qText = this.getEl('questionText');
      if (qText) qText.innerHTML = "<span style='color:red;'>⚠️ Error: No questions loaded. Check data.js.</span>";
      return;
    }
    this.loadQuestion(this.currentIndex);
  }

  loadQuestion(index) {
    if (index < 0 || index >= this.questions.length) return;
    this.currentIndex = index;
    const q = this.questions[index];

    if (typeof document !== 'undefined') {
      const qTextEl = this.getEl('questionText');
      const optionsEl = this.getEl('optionsContainer');
      const feedbackEl = this.getEl('feedbackPanel');
      const counterEl = this.getEl('questionCounter');

      if (counterEl) counterEl.innerText = `Question ${index + 1} of ${this.questions.length}`;
      if (qTextEl) qTextEl.innerText = `[${q.vehicle_code}] ${q.question_text}`;

      if (feedbackEl) {
        feedbackEl.style.display = 'none';
        feedbackEl.className = 'feedback';
      }

      if (optionsEl) {
        optionsEl.innerHTML = '';
        let opts = q.options;
        if (!Array.isArray(opts) && typeof opts === 'object') {
          opts = Object.entries(opts).map(([k, v]) => `${k}) ${v}`);
        }
        opts.forEach((optText, i) => {
          const letter = String.fromCharCode(65 + i);
          const btn = document.createElement('button');
          btn.className = 'option-btn';
          btn.innerText = typeof optText === 'string' ? optText : `${letter}) ${optText.text || optText}`;
          btn.onclick = () => this.handleAnswer(letter, q.correct_answer, q.explanation);
          optionsEl.appendChild(btn);
        });
      }
    }
    this.startAnimation(q.sceneType);
  }

  handleAnswer(selected, correct, explanation) {
    if (typeof document === 'undefined') return;
    const feedbackEl = this.getEl('feedbackPanel');
    const isCorrect = selected.trim().toUpperCase() === String(correct).trim().toUpperCase();

    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
      feedbackEl.innerHTML = `<strong>${isCorrect ? '✔ CORRECT' : '❌ INCORRECT'}</strong><br/>${explanation || ''}`;
    }
  }

  nextQuestion() { if (this.currentIndex < this.questions.length - 1) this.loadQuestion(this.currentIndex + 1); }
  prevQuestion() { if (this.currentIndex > 0) this.loadQuestion(this.currentIndex - 1); }

  startAnimation(sceneType) {
    const canvas = this.getEl('simulationCanvas');
    if (!canvas || typeof window === 'undefined') return;
    const ctx = canvas.getContext('2d');

    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.vehicleX = 50;

    const renderLoop = () => {
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = '#1E293B'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#334155'; ctx.fillRect(0, h / 2 - 40, w, 80);

      ctx.strokeStyle = '#F59E0B'; ctx.lineWidth = 3; ctx.setLineDash([15, 15]);
      ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke(); ctx.setLineDash([]);

      ctx.fillStyle = '#0EA5E9'; ctx.font = 'bold 14px sans-serif'; ctx.fillText(`SCENE: ${sceneType}`, 15, 25);

      const vx = this.vehicleX - 40, vy = h / 2 + 10;
      ctx.fillStyle = '#10B981'; ctx.fillRect(vx, vy, 40, 20);
      ctx.fillStyle = '#FFFFFF'; ctx.fillText('EGO', vx + 5, vy + 15);

      this.vehicleX = (this.vehicleX + 1.5) % (w + 50);
      this.animFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => { window.simulator = new K53TrafficSimulator(); });
}
if (typeof module !== 'undefined' && module.exports) module.exports = { K53TrafficSimulator };
