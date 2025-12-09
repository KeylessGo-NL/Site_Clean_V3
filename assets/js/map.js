// data/map.js
// Init Leaflet-kaart + markers. Laat filtering/logic over aan find-vehicle.js

(function () {
    function initMap() {
        const mapContainer = document.getElementById("kg-map");
        if (!mapContainer || !window.L) return;

        const map = L.map("kg-map", {
            scrollWheelZoom: true,
        }).setView([52.091, 5.122], 11);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const markerLayer = L.layerGroup().addTo(map);
        const markerIndex = {};

        function getIconHtml(type) {
            let iconClass = "fa-car";
            switch (type) {
                case "bus-small":
                case "bus-medium":
                case "bus-large":
                    iconClass = "fa-van-shuttle";
                    break;
                case "ev":
                    iconClass = "fa-bolt";
                    break;
                default:
                    iconClass = "fa-car-side";
            }

            let markerClass = "marker-auto";
            if (type === "ev") markerClass = "marker-ev";
            else if (type === "bus-small") markerClass = "marker-bus";
            else if (type === "bus-medium") markerClass = "marker-bus-medium";
            else if (type === "bus-large") markerClass = "marker-bus-large";

            return `
                <div class="kg-marker-pin ${markerClass}">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
            `;
        }

        function getPopupHtml(v) {
            const priceText = v.pricePerDay
                ? `€ ${v.pricePerDay.toFixed(0)}.- p/dag`
                : "Tarief via SnappCar";

            const euro6Tag = v.euro6 ? `<span class="popup-badge">Euro 6</span>` : "";
            const evTag = v.electric ? `<span class="popup-badge">EV</span>` : "";
            const keylessTag = v.keyless ? `<span class="popup-badge">Keyless</span>` : "";

            const locationLabel = [v.city, v.area].filter(Boolean).join(" – ");

            return `
                <div style="max-width:260px;">
                    <div style="border-radius:12px;overflow:hidden;">
                        ${
                            v.imageUrl
                                ? `<img src="${v.imageUrl}" alt="${v.name}" style="width:100%;height:150px;object-fit:cover;">`
                                : ""
                        }
                    </div>
                    <div style="margin-top:8px;">
                        <strong>${v.name}</strong><br/>
                        <span style="font-size:0.85rem;color:#4b5563;">${locationLabel}</span><br/>
                        <span style="font-size:0.9rem;color:#111827;">${priceText}</span>
                    </div>
                    <div style="margin-top:6px;margin-bottom:6px;">
                        ${keylessTag}${evTag}${euro6Tag}
                    </div>
                    <a href="${v.bookUrl ||
                        "https://www.snappcar.nl"}" target="_blank" rel="noopener"
                       style="display:inline-block;margin-top:4px;padding:8px 14px;background:#ff7a00;color:#fff;border-radius:999px;font-size:0.85rem;text-decoration:none;font-weight:700;">
                        Nu boeken
                    </a>
                </div>
            `;
        }

        function updateMarkers(vehicles) {
            markerLayer.clearLayers();
            Object.keys(markerIndex).forEach((k) => delete markerIndex[k]);

            if (!vehicles || vehicles.length === 0) {
                return;
            }

            const markers = [];

            vehicles.forEach((v) => {
                if (typeof v.lat !== "number" || typeof v.lng !== "number") return;

                const marker = L.marker([v.lat, v.lng], {
                    icon: L.divIcon({
                        className: "kg-marker",
                        html: getIconHtml(v.type),
                        iconSize: [36, 36],
                        iconAnchor: [18, 36],
                        popupAnchor: [0, -30],
                    }),
                });

                marker.bindPopup(getPopupHtml(v));
                marker.addTo(markerLayer);

                markers.push(marker);
                markerIndex[v.id] = marker;
            });

            if (markers.length > 0) {
                const group = L.featureGroup(markers);
                try {
                    map.fitBounds(group.getBounds().pad(0.2));
                } catch (e) {
                    // ignore
                }
            }
        }

        function focusOnVehicle(id) {
            const marker = markerIndex[id];
            if (!marker) return;
            const latLng = marker.getLatLng();
            map.setView(latLng, Math.max(map.getZoom(), 13), { animate: true });
            marker.openPopup();
        }

        window.KGMap = {
            updateMarkers,
            focusOnVehicle,
            getMap: function () {
                return map;
            },
        };
    }

    document.addEventListener("DOMContentLoaded", initMap);
})();
