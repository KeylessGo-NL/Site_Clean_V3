// UX-helper: klik op een fleet-card = zelfde als "Nu boeken" klikken

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".fleet-card");

  cards.forEach((card) => {
    const button = card.querySelector(".btn-primary, .btn-secondary");
    if (!button) return;

    card.style.cursor = "pointer";

    card.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") return;
      button.click();
    });
  });
});
