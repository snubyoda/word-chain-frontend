// public/script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("word-form");
  const input = document.getElementById("word-input");
  const log = document.getElementById("log");
  const user = "Player1"; // Replace or dynamically generate if needed

  // Handle Submit Button
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const word = input.value.trim();

    if (!word) return;

    try {
      const response = await fetch("/submit-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word, user }),
      });

      const result = await response.json();

      const message = document.createElement("div");
      message.textContent = result.message;
      message.className = result.success ? "success" : "error";
      log.prepend(message);
    } catch (err) {
      const errorMsg = document.createElement("div");
      errorMsg.textContent = "❌ Server error. Please try again.";
      errorMsg.className = "error";
      log.prepend(errorMsg);
      console.error(err);
    }

    input.value = "";
    input.focus();
  });

  // Handle Enter key for mobile/desktop
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      form.dispatchEvent(new Event("submit"));
    }
  });
});
