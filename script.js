let lastLetter = '';
let score = 0;

document.getElementById('submit-word').addEventListener('click', submitWord);
document.getElementById('word-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') submitWord();
});

function submitWord() {
  const word = document.getElementById('word-input').value.trim().toLowerCase();
  if (!word) return;

  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word, lastLetter }),
  })
    .then(res => res.json())
    .then(data => {
      const msg = document.getElementById('message');
      if (data.valid) {
        score++;
        lastLetter = word.slice(-1);
        document.getElementById('score').innerText = score;
        document.getElementById('last-letter').innerText = lastLetter.toUpperCase();
        msg.innerText = '✅ Good one!';
        msg.style.color = 'green';
        if (data.hint) {
          document.getElementById('hint').innerText = `Hint: ${data.hint}`;
        }
      } else {
        msg.innerText = `❌ ${data.message}`;
        msg.style.color = 'red';
      }
      document.getElementById('word-input').value = '';
    });
}
