// faq.js
// Renderen van de FAQ-pagina op basis van FAQ_CATEGORIES en FAQ_DATA

document.addEventListener("DOMContentLoaded", function () {
    // Dynamisch jaar in footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Check of data aanwezig is
    if (typeof FAQ_CATEGORIES === "undefined" || typeof FAQ_DATA === "undefined") {
        console.error("FAQ_CATEGORIES of FAQ_DATA ontbreekt. Controleer assets/js/faqData.js.");
        return;
    }

    renderFilters();
    renderFaqContent();
    setupSearchAndFiltering();
    setupAccordionBehaviour();
});

function renderFilters() {
    const filtersContainer = document.getElementById("faq-filters");
    if (!filtersContainer) return;

    filtersContainer.innerHTML = "";

    // "Alle vragen" knop
    const allBtn = createFilterButton("all", "Alle vragen");
    allBtn.classList.add("active");
    filtersContainer.appendChild(allBtn);

    // Knoppen op basis van categorieën
    FAQ_CATEGORIES.forEach(cat => {
        const btn = createFilterButton(cat.key, cat.label);
        filtersContainer.appendChild(btn);
    });
}

function createFilterButton(categoryKey, label) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "faq-filter-btn";
    btn.dataset.category = categoryKey;
    btn.textContent = label;
    return btn;
}

function renderFaqContent() {
    const main = document.getElementById("faq-main");
    if (!main) return;

    main.innerHTML = "";

    // Voor elke categorie een blok (alleen als er vragen zijn)
    FAQ_CATEGORIES.forEach(cat => {
        const itemsForCategory = FAQ_DATA.filter(item => item.category === cat.key);
        if (itemsForCategory.length === 0) return;

        const block = document.createElement("div");
        block.className = "faq-category-block";
        block.dataset.category = cat.key;

        const title = document.createElement("h2");
        title.className = "faq-category-title";
        title.textContent = cat.label;
        block.appendChild(title);

        itemsForCategory.forEach(item => {
            const itemEl = createFaqItemElement(item);
            block.appendChild(itemEl);
        });

        main.appendChild(block);
    });
}

function createFaqItemElement(item) {
    const wrapper = document.createElement("div");
    wrapper.className = "faq-item";
    wrapper.dataset.category = item.category;

    // Voor zoekfunctie: tekstveld waarin vraag+antwoord (lowercased) zitten
    const searchable = (item.question + " " + item.answer)
        .replace(/<[^>]+>/g, "") // HTML tags eruit
        .toLowerCase();
    wrapper.dataset.search = searchable;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "faq-question";
    button.textContent = item.question;

    const answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.innerHTML = "<p>" + item.answer + "</p>";

    wrapper.appendChild(button);
    wrapper.appendChild(answer);

    return wrapper;
}

function setupAccordionBehaviour() {
    const main = document.getElementById("faq-main");
    if (!main) return;

    main.addEventListener("click", function (e) {
        const btn = e.target.closest(".faq-question");
        if (!btn) return;

        btn.classList.toggle("active");
        const answer = btn.nextElementSibling;
        if (!answer) return;

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
}

function setupSearchAndFiltering() {
    const filtersContainer = document.getElementById("faq-filters");
    const searchInput = document.getElementById("faq-search");
    const emptyState = document.getElementById("faq-empty-state");
    const items = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));

    if (!filtersContainer) return;

    let currentCategory = "all";
    let currentSearch = "";

    // Filter-knoppen
    filtersContainer.addEventListener("click", function (e) {
        const btn = e.target.closest(".faq-filter-btn");
        if (!btn) return;

        currentCategory = btn.dataset.category || "all";

        // Active state wisselen
        const allButtons = filtersContainer.querySelectorAll(".faq-filter-btn");
        allButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        applyFilters(items, currentCategory, currentSearch, emptyState);
    });

    // Zoekbalk
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            currentSearch = (searchInput.value || "").trim().toLowerCase();
            applyFilters(items, currentCategory, currentSearch, emptyState);
        });
    }

    // Starttoestand
    applyFilters(items, currentCategory, currentSearch, emptyState);
}

function applyFilters(items, category, searchTerm, emptyStateElement) {
    let visibleCount = 0;

    items.forEach(item => {
        const itemCat = item.dataset.category;
        const haystack = item.dataset.search || "";

        const categoryMatch = category === "all" || itemCat === category;
        const searchMatch = !searchTerm || haystack.indexOf(searchTerm) !== -1;

        if (categoryMatch && searchMatch) {
            item.style.display = "block";
            visibleCount++;
        } else {
            item.style.display = "none";
        }
    });

    if (emptyStateElement) {
        emptyStateElement.style.display = visibleCount === 0 ? "block" : "none";
    }
}
