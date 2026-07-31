document.addEventListener("DOMContentLoaded", () => {
  const cardInner = document.querySelector(".card-inner");
  const cardFront = document.querySelector(".card-front");
  const cardBack = document.querySelector(".card-back");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const flipBtn = document.getElementById("flip");

  let qaPairs = [];
  let currentIndex = 0;

  // Fetch Q&A table
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
        cardFront.innerText = "No Q&A table found.";
      }
    })
    .catch(err => {
      cardFront.innerText = "Error loading Q&A file: " + err;
    });

  function showCard() {
    if (qaPairs.length > 0) {
      cardFront.innerText = qaPairs[currentIndex].question;
      cardBack.innerText = qaPairs[currentIndex].answer;
      cardInner.classList.remove("flipped"); // reset to question side
    }
  }

  function flipCard() {
    cardInner.classList.toggle("flipped");
  }

  flipBtn.addEventListener("click", flipCard);

  // Flip on click/touch of the card itself
  cardInner.addEventListener("click", flipCard);
  cardInner.addEventListener("touchstart", flipCard);

  nextBtn.addEventListener("click", () => {
    if (currentIndex < qaPairs.length - 1) {
      currentIndex++;
      showCard();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showCard();
    }
  });
});
