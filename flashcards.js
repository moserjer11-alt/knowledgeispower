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
  cardInner.addEventListener("click", flipCard);

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

  // Swipe detection
  let touchStartX = 0;
  let touchEndX = 0;

  cardInner.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  cardInner.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) { // threshold
      if (swipeDistance < 0 && currentIndex < qaPairs.length - 1) {
        currentIndex++;
        showCard();
      } else if (swipeDistance > 0 && currentIndex > 0) {
        currentIndex--;
        showCard();
      }
    }
  }
});
