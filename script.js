* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: linear-gradient(to bottom right, #0f2027, #203a43, #2c5364);
  color: #f8f8f8;
  padding: 30px 20px;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ffde59;
}

.leaderboard {
  background: rgba(255, 255, 255, 0.08);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.leaderboard h2 {
  font-size: 1.2rem;
  color: #ffe35c;
  margin-bottom: 10px;
}

#leaderboard-list {
  list-style: none;
  padding-left: 0;
}

#leaderboard-list li {
  font-size: 1rem;
  margin: 5px 0;
}

#game-display {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #fff2;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 1.1rem;
  border-radius: 10px;
  white-space: pre-wrap;
}

input {
  padding: 12px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #888;
  text-align: center;
}

button {
  padding: 12px 24px;
  background-color: #00c896;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #009e78;
}

#show-full-btn {
  margin-top: 30px;
  background: transparent;
  border: 1px solid #fff5;
  color: #fff;
  padding: 8px 20px;
  font-size: 0.95rem;
  border-radius: 6px;
  cursor: pointer;
}

#show-full-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

footer {
  margin-top: auto;
  padding-top: 30px;
  font-size: 0.85rem;
  color: #aaa;
}

@media (max-width: 480px) {
  body {
    padding: 20px 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  input, button {
    font-size: 1rem;
    width: 90%;
  }
}
