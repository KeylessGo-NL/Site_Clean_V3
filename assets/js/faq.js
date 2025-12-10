// assets/js/faq.js
// Gebruikt window.faqData uit faqData.js

(function () {
    const data = window.faqData || [];

    /**
     * Helper: maakt een FAQ-item (accordion) aan
     */
    function createFaqItemElement(item) {
        const wrapper = document.createElement("article");
        wrapper.className = "faq-item";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "faq-question";
        button.textContent = item.question;

        const answer = document.createElement("div");
        answer.className = "faq-answer";

        const p = document.createElement("p");
        p.textContent = item.answer;

        answer.appendChild(p);
        wrapper.appendChild(button);
        wrapper.appendChild(answer);

        // toggle logica
        button.addEventListener("click", () => {
            const isActive = button.classList.toggle("active");
            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = "0px";
            }
        });

        return wrapper;
    }

    /**
     * Flatten: alle vragen in één lijst
     */
    function getAllQuestions() {
        const all = [];
        data.forEach(cat => {
            (cat.items || []).forEach(item => {
                all.push({
                    categoryId: cat.id,
                    categoryLabel: cat.label,
                    ...item
                });
            });
        });
        return all;
    }

    /**
     * Volledige FAQ op faq.html
     */
    function renderFaqFull() {
        const mainEl = document.getElementById("faq-main");
        const filtersEl = document.getElementById("faq-filters");
        const searchInput = document.getElementById("faq-search");
        const emptyState = document.getElementById("faq-empty-state");

        if (!mainEl || !filtersEl) return;

        let activeCategory = "all";
        let searchTerm = "";

        // Filters opbouwen (All + per categorie)
        function buildFilters() {
            filtersEl.innerHTML = "";

            const allBtn = document.createElement("button");
            allBtn.type = "button";
            allBtn.className = "faq-filter-btn active";
            allBtn.dataset.category = "all";
            allBtn.textContent = "Alle vragen";
            filtersEl.appendChild(allBtn);

            allBtn.addEventListener("click", () => setCategory("all"));

            data.forEach(cat => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "faq-filter-btn";
                btn.dataset.category = cat.id;
                btn.textContent = cat.label;
                btn.addEventListener("click", () => setCategory(cat.id));
                filtersEl.appendChild(btn);
            });
        }

        function setCategory(catId) {
            activeCategory = catId;

            // active class
            filtersEl.querySelectorAll(".faq-filter-btn").forEach(btn => {
                if (btn.dataset.category === catId) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });

            render();
        }

        function setSearch(term) {
            searchTerm = term.toLowerCase();
            render();
        }

        function render() {
            mainEl.innerHTML = "";
            const allQuestions = getAllQuestions();

            let filtered = allQuestions;

            if (activeCategory !== "all") {
                filtered = filtered.filter(q => q.categoryId === activeCategory);
            }

            if (searchTerm.trim() !== "") {
                filtered = filtered.filter(q => {
                    const haystack = (q.question + " " + q.answer + " " + (q.tags || []).join(" ")).toLowerCase();
                    return haystack.includes(searchTerm);
                });
            }

            if (filtered.length === 0) {
                if (emptyState) emptyState.style.display = "block";
                return;
            } else {
                if (emptyState) emptyState.style.display = "none";
            }

            // Groeperen per categorie (voor mooie blokken)
            const byCategory = {};
            filtered.forEach(q => {
                if (!byCategory[q.categoryId]) {
                    byCategory[q.categoryId] = {
                        label: q.categoryLabel,
                        items: []
                    };
                }
                byCategory[q.categoryId].items.push(q);
            });

            Object.keys(byCategory).forEach(catId => {
                const block = document.createElement("section");
                block.className = "faq-category-block";

                const title = document.createElement("h3");
                title.className = "faq-category-title";
                title.textContent = byCategory[catId].label;
                block.appendChild(title);

                byCategory[catId].items.forEach(item => {
                    block.appendChild(createFaqItemElement(item));
                });

                mainEl.appendChild(block);
            });
        }

        // Listeners
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                setSearch(e.target.value || "");
            });
        }

        buildFilters();
        render();
    }

    /**
     * Korte FAQ op hoe-werkt-het.html
     * options.limit = max aantal vragen
     */
    function renderFaqShort(targetId, options = {}) {
        const container = document.getElementById(targetId);
        if (!container) return;

        const limit = options.limit || 4;
        const allQuestions = getAllQuestions();

        // simpele selectie: eerste X relevante items
        const selected = allQuestions.slice(0, limit);

        container.innerHTML = "";
        selected.forEach(item => {
            const el = createFaqItemElement(item);
            container.appendChild(el);
        });
    }

    // Export naar window zodat we vanuit HTML scripts kunnen aanroepen
    window.renderFaqFull = renderFaqFull;
    window.renderFaqShort = renderFaqShort;

    // Auto-init: als we op faq.html zitten (faq-main bestaat) => volledige FAQ renderen
    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById("faq-main")) {
            renderFaqFull();
        }
    });
})();
