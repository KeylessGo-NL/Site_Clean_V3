// data/find-vehicle.js
// Filterlogica + resultatenlijst voor zowel index.html als zoek-en-boek.html

(function () {
    const EARTH_RADIUS_KM = 6371;

    function toRad(deg) {
        return (deg * Math.PI) / 180;
    }

    function haversineDistance(lat1, lng1, lat2, lng2) {
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
                Math.cos(toRad(lat2)) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

    // Zeer simpele mapping van zoektekst -> referentie-locatie
    function getReferenceLocation(searchText) {
        if (!searchText) {
            return { lat: 52.091, lng: 5.122, label: "Utrecht" };
        }
        const txt = searchText.toLowerCase();
        if (txt.includes("houten")) {
            return { lat: 52.028, lng: 5.168, label: "Houten" };
        }
        if (txt.includes("bilthoven")) {
            return { lat: 52.132, lng: 5.203, label: "Bilthoven" };
        }
        if (txt.includes("utrecht")) {
            return { lat: 52.091, lng: 5.122, label: "Utrecht" };
        }
        return { lat: 52.091, lng: 5.122, label: "Utrecht" };
    }

    function sortVehicles(vehicles, sortBy) {
        const v = vehicles.slice();
        switch (sortBy) {
            case "price-asc":
                v.sort((a, b) => (a.pricePerDay || 0) - (b.pricePerDay || 0));
                break;
            case "price-desc":
                v.sort((a, b) => (b.pricePerDay || 0) - (a.pricePerDay || 0));
                break;
            case "size":
                const rank = { "bus-large": 3, "bus-medium": 2, "bus-small": 1, ev: 0.5, auto: 0.4 };
                v.sort((a, b) => (rank[b.type] || 0) - (rank[a.type] || 0));
                break;
            case "distance":
            default:
                v.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
        }
        return v;
    }

    function buildLocationCard(vehicle) {
        const distanceText =
            typeof vehicle.distanceKm === "number"
                ? `${vehicle.distanceKm.toFixed(1)} km afstand`
                : "";

        const typeClassMap = {
            "bus-small": "badge-type-bus-small",
            "bus-medium": "badge-type-bus-medium",
            "bus-large": "badge-type-bus-large",
            ev: "badge-type-ev",
            auto: "badge-type-auto",
        };

        const typeClass = typeClassMap[vehicle.type] || "badge-type-auto";
        const typeRawLabel = vehicle.type; // wordt op Zoek & Boek pagina omgezet naar Bus S / Bus M / etc.

        const priceText = vehicle.pricePerDay
            ? `€ ${vehicle.pricePerDay.toFixed(0)}.- p/dag`
            : "Tarief via SnappCar";

        const locationLabel = [vehicle.city, vehicle.area].filter(Boolean).join(" – ");

        const bookUrl = vehicle.bookUrl || "https://www.snappcar.nl";
        const routeUrl = `https://www.google.com/maps?q=${vehicle.lat},${vehicle.lng}`;

        return `
            <article class="location-card" data-vehicle-id="${vehicle.id}">
                <div class="location-card-header">
                    <div>
                        <div class="location-card-title">${vehicle.name}</div>
                        <div class="location-card-meta">
                            ${distanceText}${distanceText && locationLabel ? " · " : ""}${locationLabel}
                        </div>
                        <div class="location-card-meta">
                            ${priceText}
                        </div>
                    </div>
                    <div>
                        <span class="location-card-type ${typeClass}">${typeRawLabel}</span>
                    </div>
                </div>
                <div class="location-card-actions">
                    <button class="btn btn-secondary btn-sm js-show-on-map" type="button">
                        Toon op kaart
                    </button>
                    <a class="btn btn-secondary btn-sm" href="${routeUrl}" target="_blank" rel="noopener">
                        Route
                    </a>
                    <a class="btn btn-primary btn-sm" href="${bookUrl}" target="_blank" rel="noopener">
                        Nu huren
                    </a>
                </div>
            </article>
        `;
    }

    function main() {
        const fleet = window.KGFleetData || [];
        if (!fleet.length) return;

        const searchInput = document.getElementById("location-search");
        const typeFilter = document.getElementById("location-type-filter");
        const usageFilter = document.getElementById("usage-filter");
        const cargoFilter = document.getElementById("cargo-filter");
        const priceMinInput = document.getElementById("price-min");
        const priceMaxInput = document.getElementById("price-max");
        const onlyEvCheckbox = document.getElementById("only-ev");
        const onlyLowEmissionCheckbox = document.getElementById("only-low-emission");
        const onlyKeylessCheckbox = document.getElementById("only-keyless");
        const distanceFilter = document.getElementById("distance-filter");
        const sortSelect = document.getElementById("sort-results");
        const resultsCountEl = document.getElementById("results-count");
        const listContainer = document.querySelector("[data-location-list]");
        const searchBtn = document.getElementById("location-search-btn");
        const myLocationBtn = document.getElementById("use-my-location");

        if (!listContainer) return;

        let referenceLocation = getReferenceLocation(searchInput ? searchInput.value : "");
        let currentSort = sortSelect ? sortSelect.value : "distance";

        function applyFilters() {
            let filtered = fleet.slice();

            const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
            if (searchText) {
                referenceLocation = getReferenceLocation(searchText);
                filtered = filtered.filter((v) => {
                    const haystack = [
                        v.name,
                        v.city,
                        v.area,
                        (v.label || ""),
                    ]
                        .join(" ")
                        .toLowerCase();
                    return haystack.includes(searchText);
                });
            } else {
                referenceLocation = getReferenceLocation("");
            }

            // type
            const typeVal = typeFilter ? typeFilter.value : "all";
            if (typeVal && typeVal !== "all") {
                filtered = filtered.filter((v) => v.type === typeVal);
            }

            // usage
            const usageVal = usageFilter ? usageFilter.value : "all";
            if (usageVal && usageVal !== "all") {
                filtered = filtered.filter((v) =>
                    (v.usageTags || []).some((t) => t.toLowerCase().includes(usageVal))
                );
            }

            // cargo / grootte
            const cargoVal = cargoFilter ? cargoFilter.value : "all";
            if (cargoVal && cargoVal !== "all") {
                filtered = filtered.filter((v) => (v.cargoSize || "") === cargoVal);
            }

            // budget
            const priceMin = priceMinInput ? Number(priceMinInput.value) || 0 : 0;
            const priceMax = priceMaxInput ? Number(priceMaxInput.value) || 0 : 0;
            if (priceMin > 0) {
                filtered = filtered.filter((v) => (v.pricePerDay || 0) >= priceMin);
            }
            if (priceMax > 0) {
                filtered = filtered.filter((v) => (v.pricePerDay || 0) <= priceMax);
            }

            // extra voorkeuren
            if (onlyEvCheckbox && onlyEvCheckbox.checked) {
                filtered = filtered.filter((v) => v.electric);
            }
            if (onlyLowEmissionCheckbox && onlyLowEmissionCheckbox.checked) {
                filtered = filtered.filter((v) => v.euro6);
            }
            if (onlyKeylessCheckbox && onlyKeylessCheckbox.checked) {
                filtered = filtered.filter((v) => v.keyless);
            }

            // afstand
            filtered.forEach((v) => {
                v.distanceKm = haversineDistance(
                    referenceLocation.lat,
                    referenceLocation.lng,
                    v.lat,
                    v.lng
                );
            });

            const distanceVal = distanceFilter ? distanceFilter.value : "any";
            if (distanceVal && distanceVal !== "any") {
                const maxKm = Number(distanceVal) || 0;
                if (maxKm > 0) {
                    filtered = filtered.filter((v) => (v.distanceKm || 0) <= maxKm);
                }
            }

            // sorteren
            currentSort = sortSelect ? sortSelect.value : "distance";
            filtered = sortVehicles(filtered, currentSort);

            renderList(filtered);
            if (window.KGMap && typeof window.KGMap.updateMarkers === "function") {
                window.KGMap.updateMarkers(filtered);
            }
        }

        function renderList(vehicles) {
            if (!vehicles || !vehicles.length) {
                listContainer.innerHTML =
                    '<p style="font-size:0.9rem;color:#6b7280;margin:4px 0;">Geen voertuigen gevonden voor je selectie.</p>';
                if (resultsCountEl) {
                    resultsCountEl.textContent = "Geen voertuigen gevonden voor je selectie.";
                }
                return;
            }

            const html = vehicles.map((v) => buildLocationCard(v)).join("");
            listContainer.innerHTML = html;

            if (resultsCountEl) {
                const txt =
                    vehicles.length === 1
                        ? "1 voertuig gevonden in de buurt van jouw zoeklocatie."
                        : `${vehicles.length} voertuigen gevonden in de buurt van jouw zoeklocatie.`;
                resultsCountEl.textContent = txt;
            }

            // click handlers
            listContainer.querySelectorAll(".location-card").forEach((card) => {
                const id = card.getAttribute("data-vehicle-id");
                const showBtn = card.querySelector(".js-show-on-map");

                if (showBtn) {
                    showBtn.addEventListener("click", () => {
                        if (window.KGMap && typeof window.KGMap.focusOnVehicle === "function") {
                            window.KGMap.focusOnVehicle(id);
                        }
                    });
                }

                // hele kaart klikbaar voor map-focus
                card.addEventListener("click", (e) => {
                    // voorkom dubbel open bij klik op knoppen
                    if (
                        e.target.closest("a") ||
                        e.target.closest("button")
                    ) {
                        return;
                    }
                    if (window.KGMap && typeof window.KGMap.focusOnVehicle === "function") {
                        window.KGMap.focusOnVehicle(id);
                    }
                });
            });
        }

        // Events
        if (searchBtn) {
            searchBtn.addEventListener("click", applyFilters);
        }
        if (searchInput) {
            searchInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    applyFilters();
                }
            });
        }
        if (typeFilter) typeFilter.addEventListener("change", applyFilters);
        if (usageFilter) usageFilter.addEventListener("change", applyFilters);
        if (cargoFilter) cargoFilter.addEventListener("change", applyFilters);
        if (priceMinInput) priceMinInput.addEventListener("change", applyFilters);
        if (priceMaxInput) priceMaxInput.addEventListener("change", applyFilters);
        if (onlyEvCheckbox) onlyEvCheckbox.addEventListener("change", applyFilters);
        if (onlyLowEmissionCheckbox)
            onlyLowEmissionCheckbox.addEventListener("change", applyFilters);
        if (onlyKeylessCheckbox)
            onlyKeylessCheckbox.addEventListener("change", applyFilters);
        if (distanceFilter) distanceFilter.addEventListener("change", applyFilters);
        if (sortSelect) sortSelect.addEventListener("change", applyFilters);

        if (myLocationBtn && navigator.geolocation) {
            myLocationBtn.addEventListener("click", () => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        referenceLocation = {
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude,
                            label: "Mijn locatie",
                        };
                        applyFilters();
                        if (window.KGMap && typeof window.KGMap.getMap === "function") {
                            const map = window.KGMap.getMap();
                            if (map) {
                                map.setView(
                                    [referenceLocation.lat, referenceLocation.lng],
                                    12,
                                    { animate: true }
                                );
                            }
                        }
                    },
                    () => {
                        // bij fout: gebruik standaard
                        referenceLocation = getReferenceLocation(
                            searchInput ? searchInput.value : ""
                        );
                        applyFilters();
                    }
                );
            });
        }

        // eerste render
        applyFilters();
    }

    document.addEventListener("DOMContentLoaded", main);
})();
