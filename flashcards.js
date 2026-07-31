document.addEventListener("DOMContentLoaded", () => {
  const flashcard = document.getElementById("flashcard");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const flipBtn = document.getElementById("flip");

  let qaPairs = [];
  let currentIndex = 0;
  let showingQuestion = true;

  // Fetch the Liturgicalnorms.html file
  fetch("Liturgicalnorms.html")
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const table = doc.getElementById("qaTable");

      if (table) {
        for (let i = 1; i < table.rows.length; i++) {
          const question = table.rows[i].cells[0].innerText.trim();
          const answer = table.rows[i].cells[1].innerText.trim();
          qaPairs.push({ question, answer });
        }
        showCard();
      } else {
        flashcard.innerText = "No Q&A table found in Liturgicalnorms.html";
      }
    })
    .catch(err => {
      flashcard.innerText = "Error loading Q&A file: " + err;
    });

  function showCard() {
    if (qaPairs.length > 0) {
      flashcard.innerText = showingQuestion
        ? qaPairs[currentIndex].question
        : qaPairs[currentIndex].answer;
    }
  }

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    showCard();
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < qaPairs.length - 1) {
      currentIndex++;
      showingQuestion = true;
      showCard();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      showCard();
    }
  });
});
// JavaScript Document