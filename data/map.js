// data/map.js
// Plot de KeylessGo-vloot op de kaart + zoeken + dichtstbijzijnde voertuigen

// Dummy vlootdata – later kun je hier echte voertuigen/links in zetten
window.keylessFleet = [
  {
    id: "utrecht-auto-1",
    title: "VW Up! – Utrecht Centrum",
    typeCategory: "auto",
    typeLabel: "Auto",
    city: "Utrecht",
    postcode: "3511",
    address: "Jaarbeursplein, Utrecht",
    lat: 52.089,
    lng: 5.11,
    image: "img/fleet/compact.jpg",
    snappcarUrl: "https://www.snappcar.nl"
  },
  {
    id: "utrecht-bus-medium-1",
    title: "VW Transporter – Utrecht Lombok",
    typeCategory: "bus-medium",
    typeLabel: "Busje Medium",
    city: "Utrecht",
    postcode: "3531",
    address: "Lombok, Utrecht",
    lat: 52.09,
    lng: 5.095,
    image: "img/fleet/van-medium.jpg",
    snappcarUrl: "https://www.snappcar.nl"
  },
  {
    id: "houten-bus-small-1",
    title: "VW Caddy – Houten Station",
    typeCategory: "bus-small",
    typeLabel: "Busje Small",
    city: "Houten",
    postcode: "3992",
    address: "Stationsgebied, Houten",
    lat: 52.028,
    lng: 5.168,
    image: "img/fleet/van-small.jpg",
    snappcarUrl: "https://www.snappcar.nl"
  },
  {
    id: "houten-auto-1",
    title: "VW Up! – Houten Castellum",
    typeCategory: "auto",
    typeLabel: "Auto",
    city: "Houten",
    postcode: "3994",
    address: "Castellum, Houten",
    lat: 52.02,
    lng: 5.179,
    image: "img/fleet/compact.jpg",
    snappcarUrl: "https://www.snappcar.nl"
  },
  {
    id: "amersfoort-bus-large-1",
    title: "VW Crafter – Amersfoort De Hoef",
    typeCategory: "bus-large",
    typeLabel: "Busje Large",
    city: "Amersfoort",
    postcode: "3812",
    address: "De Hoef, Amersfoort",
    lat: 52.167,
    lng: 5.409,
    image: "img/fleet/van-large.jpg",
    snappcarUrl: "https://www.snappcar.nl"
  },
  {
    id: "nieuwegein-ev-1",
    title: "ID.3 – Nieuwegein City",
    typeCategory: "ev",
    typeLabel: "Elektrische auto",
    city: "Nieuwegein",
    postcode: "3431",
    address: "Cityplaza, Nieuwegein",
    lat: 52.03,
    lng: 5.088,
    image: "img/fleet/ev.jpg",
    snappcarUrl: "https://www.snappcar.nl"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.getElementById("kg-map");
  if (!mapElement) return; // geen kaart op deze pagina

  // --- Kaart initialiseren ---
  const map = L.map("kg-map").setView([52.0907, 5.1214], 11); // Utrecht als start

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap-bijdragers"
  }).addTo(map);

  // Marker-stijl per type
  function markerStyle(category) {
    switch (category) {
      case "auto":
        return { color: "#2563eb", fillColor: "#2563eb" }; // blauw
      case "bus-small":
        return { color: "#fb923c", fillColor: "#fb923c" }; // oranje
      case "bus-medium":
        return { color: "#a855f7", fillColor: "#a855f7" }; // paars
      case "bus-large":
        return { color: "#ef4444", fillColor: "#ef4444" }; // rood
      case "ev":
        return { color: "#22c55e", fillColor: "#22c55e" }; // groen
      default:
        return { color: "#2563eb", fillColor: "#2563eb" };
    }
  }

  // Type-badge klasse (kleur = marker kleur)
  function badgeClass(category) {
    switch (category) {
      case "auto":
        return "badge-type-auto";
      case "bus-small":
        return "badge-type-bus-small";
      case "bus-medium":
        return "badge-type-bus-medium";
      case "bus-large":
        return "badge-type-bus-large";
      case "ev":
        return "badge-type-ev";
      default:
        return "";
    }
  }

  const markersById = {};

  // Markers toevoegen
  window.keylessFleet.forEach((v) => {
    const style = markerStyle(v.typeCategory);

    const marker = L.circleMarker([v.lat, v.lng], {
      radius: 9,
      color: style.color,
      weight: 2,
      fillColor: style.fillColor,
      fillOpacity: 0.9
    }).addTo(map);

    const popupHtml = `
      <div style="min-width:220px">
        <strong>${v.title}</strong><br/>
        <span style="font-size:0.85rem;">${v.address} – ${v.city}</span><br/>
        <span style="font-size:0.8rem;color:#6b7280;">Type: ${v.typeLabel}</span><br/><br/>
        <img src="${v.image}" alt="${v.title}" style="width:100%;max-height:130px;object-fit:cover;border-radius:6px;margin-bottom:6px;"/>
        <a href="${v.snappcarUrl}" target="_blank" rel="noopener"
           style="display:inline-block;margin-top:4px;padding:8px 12px;background:#ff7a00;color:#fff;border-radius:4px;font-size:0.85rem;font-weight:600;text-decoration:none;">
           Nu boeken via SnappCar
        </a>
      </div>
    `;

    marker.bindPopup(popupHtml);
    markersById[v.id] = marker;
  });

  // --- Dichtstbijzijnde voertuigen / zoekfunctie ---

  const listEl = document.querySelector("[data-location-list]");
  const searchInput = document.getElementById("location-search");
  const typeFilter = document.getElementById("location-type-filter");
  const searchBtn = document.getElementById("location-search-btn");
  const useMyLocationBtn = document.getElementById("use-my-location");
  const sidebarSub = document.querySelector(".location-sidebar-sub");

  if (!listEl || !searchInput || !searchBtn) {
    return;
  }

  // Referentie-locatie voor "dichtstbijzijnde"
  let reference = { lat: 52.0907, lng: 5.1214 }; // standaard Utrecht

  // Haversine afstand in km
  function distanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function formatDistance(km) {
    if (km < 1) return "< 1 km";
    return km.toFixed(1).replace(".", ",") + " km";
  }

  // Render lijst van voertuigen, gesorteerd op afstand tot reference
  function renderList() {
    const typeVal = typeFilter ? typeFilter.value : "all";

    let items = window.keylessFleet.map((v) => {
      const dist = distanceKm(reference.lat, reference.lng, v.lat, v.lng);
      return { ...v, distance: dist };
    });

    if (typeVal && typeVal !== "all") {
      items = items.filter((v) => v.typeCategory === typeVal);
    }

    items.sort((a, b) => a.distance - b.distance);

    const toShow = items.slice(0, 5);

    if (!toShow.length) {
      listEl.innerHTML = "<p>Geen voertuigen gevonden voor deze filter.</p>";
      return;
    }

    listEl.innerHTML = toShow
      .map((v) => {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          v.lat + "," + v.lng
        )}`;
        const metaLine =
          `${v.city || ""}` +
          (v.postcode ? ` ${v.postcode}` : "") +
          ` · ${formatDistance(v.distance)}`;

        const badgeCls = badgeClass(v.typeCategory);

        return `
          <article class="location-card" data-vehicle-id="${v.id}">
            <div class="location-card-header">
              <div>
                <div class="location-card-title">${v.title}</div>
                <div class="location-card-meta">${metaLine}</div>
              </div>
              <span class="location-card-type ${badgeCls}">${v.typeLabel}</span>
            </div>
            <div class="location-card-actions">
              <button class="btn btn-secondary btn-sm" data-action="focus">
                Toon op kaart
              </button>
              <a class="btn btn-secondary btn-sm" href="${mapsUrl}" target="_blank" rel="noopener">
                Route in Maps
              </a>
              <a class="btn btn-primary btn-sm" href="${v.snappcarUrl}" target="_blank" rel="noopener">
                Nu huren
              </a>
            </div>
          </article>
        `;
      })
      .join("");

    // Event handlers: toon op kaart + klik op kaartje zelf
    listEl.querySelectorAll(".location-card").forEach((card) => {
      const id = card.getAttribute("data-vehicle-id");
      if (!id) return;

      // klik op kaartje (maar niet op links/knoppen) => focus + popup
      card.addEventListener("click", (e) => {
        if (e.target.closest("a") || e.target.closest("button")) {
          return; // die handlers apart
        }
        focusOnVehicle(id);
      });

      const focusBtn = card.querySelector("[data-action='focus']");
      if (focusBtn) {
        focusBtn.addEventListener("click", (e) => {
          e.preventDefault();
          focusOnVehicle(id);
        });
      }
    });
  }

  // kaart focussen op één voertuig
  function focusOnVehicle(id) {
    const v = window.keylessFleet.find((x) => x.id === id);
    if (!v) return;
    map.setView([v.lat, v.lng], 14);
    const marker = markersById[id];
    if (marker) {
      marker.openPopup();
    }
  }

  // Zoekfunctie op plaats/postcode
  function findLocationByQuery(query) {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    return (
      window.keylessFleet.find(
        (v) =>
          v.city.toLowerCase().includes(q) ||
          (v.postcode && v.postcode.toLowerCase().startsWith(q)) ||
          v.title.toLowerCase().includes(q)
      ) || null
    );
  }

  function handleSearch() {
    const q = searchInput.value;
    const match = findLocationByQuery(q);

    if (!match) {
      if (sidebarSub) {
        sidebarSub.textContent =
          "Geen exacte match gevonden. We tonen voertuigen rond Utrecht centrum.";
      }
      reference = { lat: 52.0907, lng: 5.1214 };
      map.setView([reference.lat, reference.lng], 11);
    } else {
      reference = { lat: match.lat, lng: match.lng };
      map.setView([match.lat, match.lng], 12);
      if (sidebarSub) {
        sidebarSub.textContent =
          "Dichtstbijzijnde voertuigen rond: " +
          match.city +
          (match.postcode ? " (" + match.postcode + ")" : "");
      }
    }

    renderList();
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  // Gebruik mijn locatie (browser geolocatie)
  if (useMyLocationBtn && "geolocation" in navigator) {
    useMyLocationBtn.addEventListener("click", () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          reference = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          map.setView([reference.lat, reference.lng], 12);
          if (sidebarSub) {
            sidebarSub.textContent =
              "Dichtstbijzijnde voertuigen op basis van je huidige locatie.";
          }
          renderList();
        },
        () => {
          reference = { lat: 52.0907, lng: 5.1214 };
          map.setView([reference.lat, reference.lng], 11);
          renderList();
        }
      );
    });
  }

  // eerste render (Utrecht als referentie)
  renderList();
});
