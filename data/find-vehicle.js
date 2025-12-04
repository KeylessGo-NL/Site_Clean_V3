// Basislogica voor toekomstige "Vind voertuig"-pagina.
// Draait alleen als de juiste elementen aanwezig zijn.

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("[data-vehicle-search]");
  const typeSelect = document.querySelector("[data-vehicle-type]");
  const listContainer = document.querySelector("[data-vehicle-list]");

  if (!searchInput || !typeSelect || !listContainer || !window.keylessHotspots) {
    return; // niks te doen op deze pagina
  }

  function renderList(items) {
    listContainer.innerHTML = "";
    if (!items.length) {
      listContainer.innerHTML = "<p>Geen locaties gevonden.</p>";
      return;
    }

    items.forEach((h) => {
      const item = document.createElement("div");
      item.className = "vehicle-card";
      item.innerHTML = `
        <div class="vehicle-card-header">
            <span class="vehicle-card-title">${h.name}</span>
            <span class="vehicle-card-type">${h.type}</span>
        </div>
        <div class="vehicle-card-meta">
            <span>${h.city}</span>
        </div>
        <div class="vehicle-card-footer">
            <span class="vehicle-card-price">KeylessGo-hotspot</span>
            <span class="vehicle-card-rating">⭐ Voorbeeld</span>
        </div>
      `;
      listContainer.appendChild(item);
    });
  }

  function applyFilter() {
    const q = searchInput.value.toLowerCase();
    const t = typeSelect.value;

    let filtered = window.keylessHotspots.slice();

    if (q) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
      );
    }

    if (t && t !== "all") {
      filtered = filtered.filter((h) =>
        h.type.toLowerCase().includes(t.toLowerCase())
      );
    }

    renderList(filtered);
  }

  searchInput.addEventListener("input", applyFilter);
  typeSelect.addEventListener("change", applyFilter);

  // eerste render
  applyFilter();
});
