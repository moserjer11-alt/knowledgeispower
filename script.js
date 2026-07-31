document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("qaTable");
  const flashcardsContainer = document.getElementById("flashcards");

  // Skip header row (index 0)
  for (let i = 1; i < table.rows.length; i++) {
    const question = table.rows[i].cells[0].innerText;
    const answer = table.rows[i].cells[1].innerText;

    // Create card
    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("p");
    front.innerText = question;

    const back = document.createElement("p");
    back.innerText = answer;
    back.style.display = "none";

    card.appendChild(front);
    card.appendChild(back);

    // Flip logic
    card.addEventListener("click", () => {
      if (front.style.display !== "none") {
        front.style.display = "none";
        back.style.display = "block";
      } else {
        front.style.display = "block";
        back.style.display = "none";
      }
    });

    flashcardsContainer.appendChild(card);
  }
});
// JavaScript Document