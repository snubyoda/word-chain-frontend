document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('wordForm');
  const input = document.getElementById('wordInput');
  const status = document.getElementById('status');
  const list = document.getElementById('wordList');
  const scoreEl = document.getElementById('score');
  const hint = document.getElementById('hint');

  let score = 0;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const word = input.value.trim().toLowerCase();
    if (!word) return;

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word })
      });

      const data = await res.json();

      if (data.valid) {
        const li = document.createElement('li');
        li.textContent = word;
        list.appendChild(li);

        status.textContent = `✅ Good one! Next letter: ${data.nextLetter.toUpperCase()}`;
        score++;
        scoreEl.textContent = `Score: ${score}`;
        hint.textContent = '';
      } else {
        status.textContent = `❌ ${data.reason}`;
        hint.textContent = data.hint ? `💡 Hint: ${data.hint}` : '';
      }

      input.value = '';
      input.focus();
    } catch (err) {
      console.error('Error:', err);
      status.textContent = '⚠️ Server error. Try again.';
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent default browser submit
      form.dispatchEvent(new Event('submit'));
    }
  });
});
