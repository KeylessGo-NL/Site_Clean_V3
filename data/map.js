/* ------------------------------------------------------------
   2. MARKER ICONS (Met Voertuig Icoontjes)
------------------------------------------------------------ */

// Functie om de HTML marker te bouwen
const createPinIcon = (type, colorClass, iconClass) => {
    return L.divIcon({
        className: "custom-div-icon", // Lege class om default leaflet stijl te resetten
        html: `<div class="kg-marker-pin ${colorClass}">
                 <i class="${iconClass}"></i>
               </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36], // Zorgt dat de punt precies op de locatie staat
        popupAnchor: [0, -32] // Zorgt dat de popup mooi boven de pin opent
    });
};

const markerIcons = {
    // Auto's (Blauw, Auto icoon)
    auto: createPinIcon("auto", "marker-auto", "fa-solid fa-car-side"),
    
    // Elektrisch (Groen, Bliksem icoon)
    ev: createPinIcon("ev", "marker-ev", "fa-solid fa-bolt"),
    
    // Busjes Small (Oranje, Bestelbus icoon)
    "bus-small": createPinIcon("bus-small", "marker-bus", "fa-solid fa-shuttle-van"),
    
    // Busjes Medium (Paars, Vrachtwagen/Bus icoon)
    "bus-medium": createPinIcon("bus-medium", "marker-bus-medium", "fa-solid fa-truck-pickup"),
    
    // Busjes Large (Rood, Grote truck icoon)
    "bus-large": createPinIcon("bus-large", "marker-bus-large", "fa-solid fa-truck-moving"),
};