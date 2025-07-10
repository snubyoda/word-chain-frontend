// public/script.js
const wordInput = document.getElementById("wordInput");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");
const chain = document.getElementById("chain");
const score = document.getElementById("score");

function submitWord() {
  const word = wordInput.value.trim();
  if (!word) return;

  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word })
  })
    .then(res => res.json())
    .then(data => {
      feedback.textContent = data.message;
      feedback.style.color = data.success ? "green" : "red";

      if (data.success) {
        chain.textContent = data.chain.join(" ➡️ ");
        score.textContent = data.score;
        wordInput.value = '';
        wordInput.focus();
      }
    });
}

// Click Submit button
submitBtn.addEventListener('click', submitWord);

// Press Enter key
wordInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    submitWord();
  }
});
