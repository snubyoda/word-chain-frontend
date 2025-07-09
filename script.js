const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;

const display = document.getElementById('game-display');
const input = document.getElementById('word-input');
const button = document.getElementById('submit-btn');
const leaderboardList = document.getElementById('leaderboard-list');
const result = document.getElementById('result');

const BACKEND_URL = 'https://d1173b1f-70b2-436a-8b74-1abd14a78577-00-36p96n6zl8fr3.worf.replit.dev'; // your Replit backend

async function startGame() {
  try {
    const res = await fetch(`${BACKEND_URL}/start`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await res.json();

    display.innerText = `👋 Welcome, ${user.first_name}!\n\n🧠 Bot starts with: ${data.word}\n🎯 Score: ${data.score}`;
    input.value = '';
  } catch (err) {
    display.innerText = '❌ Failed to start game. Please try again.';
  }
}

button.addEventListener('click', async () => {
  const userWord = input.value.trim().toLowerCase();
  if (!userWord) {
    alert('Please enter a word!');
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/play`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        telegram_id: user.id,
        username: user.username,
        word: userWord
      })
    });

    const data = await res.json();

    if (res.ok) {
      display.innerText = `🤖 Bot replies: ${data.reply}\n🎯 Score: ${data.score}`;
      input.value = '';
      loadLeaderboard(); // update in case user entered high score
    } else {
      alert(data.error || data.message || 'Something went wrong.');
    }
  } catch (err) {
    alert('⚠️ Error connecting to backend.');
  }
});

async function loadLeaderboard() {
  try {
    const res = await fetch(`${BACKEND_URL}/top`);
    const data = await res.json();
    const top3 = data.leaderboard.slice(0, 3);

    leaderboardList.innerHTML = '';

    top3.forEach((player, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${player.username || 'Anonymous'} — ${player.score}`;
      leaderboardList.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load leaderboard:', err);
  }
}

document.getElementById('show-full-btn').addEventListener('click', () => {
  window.open(`${BACKEND_URL}/top`, '_blank');
});

window.addEventListener('load', () => {
  startGame();
  loadLeaderboard();
});
