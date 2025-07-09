const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;

const display = document.getElementById('game-display');
const input = document.getElementById('word-input');
const button = document.getElementById('submit-btn');
const result = document.getElementById('result');
const hintBox = document.getElementById('hint-box');

const BACKEND_URL = 'https://your-backend.replit.dev'; // 🔁 Replace with yours

async function startGame() {
  try {
    const res = await fetch(`${BACKEND_URL}/start`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await res.json();

    display.innerText = `👋 Welcome, ${user?.first_name || 'player'}!\n\n🤖 Bot starts with: ${data.word}\n🎯 Score: ${data.score}`;
    hintBox.innerText = '';
    input.value = '';
  } catch (err) {
    display.innerText = '❌ Failed to start game.';
  }
}

button.addEventListener('click', async () => {
  const word = input.value.trim().toLowerCase();
  if (!word) return alert('Enter a word first!');

  try {
    const res = await fetch(`${BACKEND_URL}/play`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id: user.id,
        username: user.username,
        word
      })
    });

    const data = await res.json();

    if (res.ok) {
      display.innerText = `🤖 Bot replies: ${data.reply}\n🎯 Score: ${data.score}`;
      input.value = '';
      result.innerText = '';
      hintBox.innerText = data.definition ? `💡 Hint: ${data.definition}` : '';
    } else {
      result.innerText = `❌ ${data.message || 'Invalid word'}`;
    }
  } catch {
    result.innerText = '⚠️ Server unreachable.';
  }
});

window.addEventListener('load', startGame);
