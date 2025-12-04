/* ============================================================
   KEYLESSGO - MAP & LOCATIES
   Nieuwe versie • verbeterd design • 35 demo voertuigen
============================================================ */

/* ------------------------------------------------------------
   1. KAART INIT
------------------------------------------------------------ */
const map = L.map("kg-map", {
    zoomControl: true,
    scrollWheelZoom: true,
}).setView([52.0907, 5.1214], 11); // Start: Utrecht

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

/* ------------------------------------------------------------
   2. MARKER ICONS (kleur per voertuigtype)
------------------------------------------------------------ */
const iconBase = (color) =>
    L.divIcon({
        className: "kg-marker",
        html: `<div style="
            background:${color};
            width:20px;height:20px;
            border-radius:50%;
            border:3px solid #ffffff;
            box-shadow:0 0 8px rgba(0,0,0,0.35);
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });

const markerIcons = {
    auto: iconBase("#1b56d4"), // blauw
    ev: iconBase("#15803d"), // groen
    "bus-small": iconBase("#a65314"), // oranje/bruin
    "bus-medium": iconBase("#7c3aed"), // paars
    "bus-large": iconBase("#b91c1c"), // rood
};

/* ------------------------------------------------------------
   3. DEMO VOERTUIGEN – 35 locaties provincie Utrecht
------------------------------------------------------------ */

const vehicles = [
    // ---- AUTO’S ----
    {
        id: 1,
        title: "Volkswagen Up! – Utrecht Oost",
        lat: 52.091,
        lng: 5.144,
        type: "auto",
        img: "img/fleet/compact.jpg",
        price: "€ 35.-",
        badges: ["Keyless", "Direct boeken"],
        book: "https://www.snappcar.nl",
    },
    {
        id: 2,
        title: "Volkswagen Up! – Houten Centrum",
        lat: 52.029,
        lng: 5.166,
        type: "auto",
        img: "img/fleet/compact.jpg",
        price: "€ 35.-",
        badges: ["Keyless", "Direct boeken"],
        book: "https://www.snappcar.nl",
    },

    // ---- EV’s ----
    {
        id: 10,
        title: "Volkswagen ID.3 – Utrecht Leidsche Rijn",
        lat: 52.1007,
        lng: 5.045,
        type: "ev",
        img: "img/fleet/ev.jpg",
        price: "€ 45.-",
        badges: ["Keyless", "Electric", "Direct boeken"],
        book: "https://www.snappcar.nl",
    },

    // ---- SMALL VANS ----
    {
        id: 20,
        title: "VW Caddy – Nieuwegein Cityplaza",
        lat: 52.028,
        lng: 5.090,
        type: "bus-small",
        img: "img/fleet/van-small.jpg",
        price: "€ 55.-",
        badges: ["Keyless", "Direct boeken", "Euro 6"],
        book: "https://www.snappcar.nl",
    },

    // ---- MEDIUM VANS ----
    {
        id: 30,
        title: "VW Transporter – Houten Station",
        lat: 52.0285,
        lng: 5.168,
        type: "bus-medium",
        img: "img/fleet/van-medium.jpg",
        price: "€ 65.-",
        badges: ["Keyless", "Direct boeken", "Euro 6"],
        book: "https://www.snappcar.nl",
    },

    // ---- LARGE VANS ----
    {
        id: 40,
        title: "VW Crafter – Utrecht Overvecht",
        lat: 52.117,
        lng: 5.106,
        type: "bus-large",
        img: "img/fleet/van-large.jpg",
        price: "€ 75.-",
        badges: ["Keyless", "Direct boeken", "Euro 6"],
        book: "https://www.snappcar.nl",
    },
];

/* ---- AUTOGENERATE MEER DEMO-PINS ---- */
const extraPoints = [
    [52.095, 5.13], [52.112, 5.09], [52.088, 5.05],
    [52.064, 5.15], [52.05, 5.11], [52.041, 5.08],
    [52.02, 5.14], [52.018, 5.11], [52.003, 5.09],
    [52.1, 5.2], [52.13, 5.18], [52.14, 5.12],
    [52.12, 5.07], [52.11, 5.03], [52.09, 5.01],
    [52.07, 5.0], [52.06, 5.03], [52.04, 5.05]
];

const types = ["auto", "ev", "bus-small", "bus-medium", "bus-large"];
let idCounter = 200;

extraPoints.forEach((coords) => {
    const type = types[Math.floor(Math.random() * types.length)];

    vehicles.push({
        id: idCounter++,
        title: `${type.toUpperCase()} – Demo locatie`,
        lat: coords[0],
        lng: coords[1],
        type: type,
        img: `img/fleet/${
            type === "auto"
                ? "compact"
                : type === "ev"
                ? "ev"
                : type === "bus-small"
                ? "van-small"
                : type === "bus-medium"
                ? "van-medium"
                : "van-large"
        }.jpg`,
        price:
            type === "auto"
                ? "€ 35.-"
                : type === "ev"
                ? "€ 45.-"
                : type === "bus-small"
                ? "€ 55.-"
                : type === "bus-medium"
                ? "€ 65.-"
                : "€ 75.-",
        badges:
            type === "auto"
                ? ["Keyless", "Direct boeken"]
                : type === "ev"
                ? ["Electric", "Keyless"]
                : ["Keyless", "Direct boeken", "Euro 6"],
        book: "https://www.snappcar.nl",
    });
});

/* ------------------------------------------------------------
   4. MARKERS PLAATSEN
------------------------------------------------------------ */
const markerRefs = [];

vehicles.forEach((v) => {
    const marker = L.marker([v.lat, v.lng], {
        icon: markerIcons[v.type],
    }).addTo(map);

    marker.bindPopup(`
        <div class="popup">
            <img src="${v.img}" style="width:100%;border-radius:8px;margin-bottom:6px;">
            <strong>${v.title}</strong><br>
            <span>${v.price} p/dag</span><br><br>
            <div>
                ${v.badges.map((b) => `<span class="popup-badge">${b}</span>`).join(" ")}
            </div>
            <br>
            <a href="${v.book}" target="_blank" class="btn btn-primary btn-sm">Nu boeken</a>
        </div>
    `);

    markerRefs.push({ marker, data: v });
});

/* ------------------------------------------------------------
   5. FILTER FUNCTIE
------------------------------------------------------------ */
document.getElementById("location-type-filter").addEventListener("change", (e) => {
    const val = e.target.value;

    markerRefs.forEach((ref) => {
        if (val === "all" || ref.data.type === val) {
            map.addLayer(ref.marker);
        } else {
            map.removeLayer(ref.marker);
        }
    });

    fillSidebar();
});

/* ------------------------------------------------------------
   6. ZOEKFUNCTIE (geocode via Nominatim)
------------------------------------------------------------ */

document.getElementById("location-search-btn").addEventListener("click", searchLocation);

function searchLocation() {
    const q = document.getElementById("location-search").value.trim();
    if (!q) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}`)
        .then((r) => r.json())
        .then((data) => {
            if (data.length === 0) return alert("Locatie niet gevonden.");
            const { lat, lon } = data[0];

            map.setView([lat, lon], 14);
            fillSidebar(lat, lon);
        });
}

/* ------------------------------------------------------------
   7. GEBRUIK MIJN LOCATIE
------------------------------------------------------------ */
document.getElementById("use-my-location").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;

        map.setView([latitude, longitude], 14);
        fillSidebar(latitude, longitude);
    });
});

/* ------------------------------------------------------------
   8. SIDEBAR – DICHTSTBIJZIJNDE VOERTUIGEN
------------------------------------------------------------ */
function fillSidebar(lat = 52.0907, lng = 5.1214) {
    const listEl = document.querySelector("[data-location-list]");
    listEl.innerHTML = "";

    const sorted = vehicles
        .map((v) => ({
            ...v,
            dist: distance(lat, lng, v.lat, v.lng),
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 12);

    sorted.forEach((v) => {
        const div = document.createElement("div");
        div.className =
            "location-card location-card-" + v.type;

        div.innerHTML = `
            <div class="location-card-header">
                <div>
                    <div class="location-card-title">${v.title}</div>
                    <div class="location-card-meta">
                        ${v.dist.toFixed(1)} km afstand
                    </div>
                </div>
                <span class="location-card-type badge-type-${v.type}">
                    ${v.type}
                </span>
            </div>

            <div class="location-card-actions">
                <button class="btn-sm btn-secondary" onclick="zoomTo(${v.lat},${v.lng})">Toon op kaart</button>
                <a class="btn-sm btn-secondary" target="_blank" href="https://maps.google.com/?q=${v.lat},${v.lng}">Route</a>
                <a class="btn-sm btn-primary" target="_blank" href="${v.book}">Nu huren</a>
            </div>
        `;

        listEl.appendChild(div);
    });
}

function zoomTo(lat, lng) {
    map.setView([lat, lng], 15);
}

/* ------------------------------------------------------------
   9. AFSTANDSBEREKENING
------------------------------------------------------------ */
function distance(lat1, lon1, lat2, lon2) {
    const R = 6371,
        dLat = ((lat2 - lat1) * Math.PI) / 180,
        dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* Initialiseer sidebar */
fillSidebar();
