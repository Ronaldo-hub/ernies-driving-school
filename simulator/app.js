
    const SVGS = {
      "DISTANCE": `<svg viewBox="0 0 400 120" width="100%" height="100%">
        <line x1="0" y1="60" x2="400" y2="60" stroke="#555" stroke-width="4" stroke-dasharray="15 15"/>
        <rect x="80" y="40" width="60" height="40" fill="#e62e2e" rx="4"/>
        <rect x="260" y="40" width="60" height="40" fill="#a0a0a0" rx="4"/>
        <path d="M 145 60 L 255 60" stroke="#fff" stroke-width="2" marker-end="url(#arrow)" marker-start="url(#arrow)"/>
        <text x="200" y="30" fill="#fff" font-size="14" text-anchor="middle" font-family="sans-serif">3-Second Rule Gap</text>
      </svg>`,
      "INTERSECTION": `<svg viewBox="0 0 400 120" width="100%" height="100%">
        <rect x="160" y="0" width="80" height="120" fill="#222"/>
        <rect x="0" y="20" width="400" height="80" fill="#222"/>
        <line x1="200" y1="0" x2="200" y2="120" stroke="#fbbf24" stroke-width="2" stroke-dasharray="10 10"/>
        <line x1="0" y1="60" x2="400" y2="60" stroke="#fbbf24" stroke-width="2" stroke-dasharray="10 10"/>
        <circle cx="150" cy="20" r="8" fill="#e62e2e"/>
        <text x="100" y="24" fill="#fff" font-size="12" font-family="sans-serif">STOP</text>
      </svg>`,
      "HEADLIGHTS": `<svg viewBox="0 0 400 120" width="100%" height="100%">
        <rect x="50" y="40" width="80" height="40" fill="#a0a0a0" rx="6"/>
        <polygon points="130,45 350,10 350,110 130,75" fill="url(#beamGrad)" opacity="0.6"/>
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffaa" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#ffffaa" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <text x="200" y="20" fill="#fff" font-size="14" font-family="sans-serif">Dipped Beam vs High Beam</text>
      </svg>`,
      "SIGNS": `<svg viewBox="0 0 400 120" width="100%" height="100%">
        <polygon points="200,10 240,40 240,90 160,90 160,40" fill="#e62e2e"/>
        <text x="200" y="65" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">STOP</text>
        <circle cx="280" cy="50" r="30" fill="#fff" stroke="#e62e2e" stroke-width="6"/>
        <text x="280" y="55" fill="#000" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">60</text>
      </svg>`,
      "GENERAL": `<svg viewBox="0 0 400 120" width="100%" height="100%">
        <line x1="0" y1="60" x2="400" y2="60" stroke="#fff" stroke-width="4" stroke-dasharray="20 20"/>
        <text x="200" y="100" fill="#777" font-size="12" text-anchor="middle" font-family="sans-serif">Standard Road Procedures</text>
      </svg>`
    };

    function renderQuestions() {
      const container = document.getElementById('quizContainer');
      if (!K53_DATA || K53_DATA.length === 0) {
        container.innerHTML = "<h3 style='color:red;'>⚠️ No questions loaded. Please check data.js</h3>";
        return;
      }

      let html = "";
      K53_DATA.forEach((q, index) => {
        // Build Option Inputs
        let optionsHtml = "";
        q.options.forEach((opt, i) => {
          const letter = String.fromCharCode(65 + i); // A, B, C...
          const cleanOpt = opt.replace(/^[A-Z]\)\s*/, ''); // Remove existing "A) " if present
          optionsHtml += `
            <label class="option-label">
              <input type="radio" name="q${index}" value="${letter}">
              ${letter}) ${cleanOpt}
            </label>
          `;
        });

        const svgGraphic = SVGS[q.scene] || SVGS["GENERAL"];

        html += `
          <div class="question-block" id="block_${index}">
            <div class="svg-wrapper">${svgGraphic}</div>
            <div class="q-meta">QUESTION ${index + 1} OF ${K53_DATA.length} - ${q.category}</div>
            <div class="q-text">${q.question}</div>
            <div class="options-list">
              ${optionsHtml}
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    function submitTest() {
      let score = 0;
      K53_DATA.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const block = document.getElementById(`block_${index}`);

        // Reset borders
        block.style.borderLeft = "none";
        block.style.paddingLeft = "0";

        if (selected) {
          const isCorrect = selected.value.toLowerCase() === (q.correct_answer || 'a').toLowerCase()[0];
          if (isCorrect) score++;

          // Simple visual feedback on the block
          block.style.borderLeft = isCorrect ? "4px solid #2ecc71" : "4px solid #e62e2e";
          block.style.paddingLeft = "20px";
        } else {
          block.style.borderLeft = "4px solid #f39c12"; // Unanswered
          block.style.paddingLeft = "20px";
        }
      });

      const results = document.getElementById('resultsPanel');
      const percentage = (score / K53_DATA.length) * 100;

      results.style.display = "block";
      results.className = `results-panel ${percentage >= 70 ? 'pass' : 'fail'}`;
      results.innerHTML = `You scored ${score} out of ${K53_DATA.length} (${percentage.toFixed(0)}%) <br>
        <span style="font-size:0.9rem; font-weight:normal;">${percentage >= 70 ? 'Great job! You passed.' : 'Keep practicing!'}</span>`;

      // Scroll to bottom to see results
      results.scrollIntoView({ behavior: 'smooth' });
    }

    window.onload = renderQuestions;
    