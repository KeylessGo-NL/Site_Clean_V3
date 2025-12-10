// assets/js/faqData.js
// Centrale FAQ-bron voor zowel faq.html als hoe-werkt-het.html

window.faqData = [
  {
    id: "boeken",
    label: "Boeken & reserveren",
    items: [
      {
        id: "boeken-1",
        question: "Hoe boek ik een voertuig bij KeylessGo?",
        answer: "Je boekt altijd via de SnappCar app of website. Zoek op jouw locatie, kies een KeylessGo voertuig, selecteer de gewenste tijden en rond de betaling af. Je ontvangt direct een bevestiging via e-mail en in de app.",
        tags: ["boeken", "reserveren", "app", "snappcar"]
      },
      {
        id: "boeken-2",
        question: "Kan ik last-minute een busje of auto huren?",
        answer: "Ja, zolang er een KeylessGo voertuig beschikbaar is kun je vaak nog dezelfde minuut boeken en direct wegrijden. Omdat alles keyless verloopt, is er geen balie of fysieke sleuteloverdracht nodig.",
        tags: ["last-minute", "direct", "beschikbaarheid"]
      },
      {
        id: "boeken-3",
        question: "Kan ik de boeking nog wijzigen of annuleren?",
        answer: "Annuleren en wijzigen verloopt via SnappCar. De voorwaarden en eventuele kosten hangen af van het moment van annuleren en het gekozen tarief. Dit zie je duidelijk in de app bij jouw reservering.",
        tags: ["annuleren", "wijzigen", "voorwaarden"]
      }
    ]
  },
  {
    id: "gebruik",
    label: "Gebruik & keyless toegang",
    items: [
      {
        id: "gebruik-1",
        question: "Hoe werkt de keyless check-in?",
        answer: "Loop naar het voertuig dat je hebt geboekt, open de SnappCar app en start de check-in. Je maakt enkele foto's van de auto (zijkanten, voor- en achterkant) en volgt de stappen in de app. Daarna kun je via de app de auto openen.",
        tags: ["check-in", "keyless", "foto's"]
      },
      {
        id: "gebruik-2",
        question: "Wat als de app de deur niet opent?",
        answer: "Controleer of je internetverbinding, locatievoorzieningen en Bluetooth aan staan en dat je dicht bij de auto staat. Werkt het nog steeds niet? Neem dan direct contact op met SnappCar support via de app; zij kunnen vaak op afstand helpen of de auto resetten.",
        tags: ["app", "deur opent niet", "problemen", "bluetooth"]
      },
      {
        id: "gebruik-3",
        question: "Mag iemand anders ook in de auto rijden?",
        answer: "Alleen de geverifieerde huurder mag rijden, tenzij je via SnappCar extra bestuurders toevoegt (indien beschikbaar). Dit moet altijd via het platform geregeld worden zodat verzekering en dekking kloppen.",
        tags: ["bestuurder", "extra bestuurder", "verzekering"]
      }
    ]
  },
  {
    id: "kosten",
    label: "Kosten, brandstof & borg",
    items: [
      {
        id: "kosten-1",
        question: "Moet ik tanken of laden voor inleveren?",
        answer: "Ja, de standaardregel is 'vol = vol' (of hetzelfde niveau als bij start). Voor elektrische voertuigen geldt vaak dat je de auto weer aan de laadpaal koppelt. De exacte afspraken zie je per voertuig in de SnappCar app.",
        tags: ["tanken", "laden", "brandstof", "elektrisch"]
      },
      {
        id: "kosten-2",
        question: "Hoe werkt de borg en betaling?",
        answer: "De borg en betaling verlopen volledig via SnappCar. Het bedrag wordt via iDEAL, creditcard of een andere ondersteunde methode betaald. Eventuele verrekeningen (extra kilometers, boetes, schade) worden achteraf via het platform verwerkt.",
        tags: ["borg", "betaling", "kosten"]
      },
      {
        id: "kosten-3",
        question: "Zijn er extra kosten naast de huursom?",
        answer: "De basisprijs bestaat uit de huursom en eventueel een km-bundel. Daarnaast rekent SnappCar servicekosten en kun je kiezen voor extra opties zoals verlaagde eigen risico. Alle bedragen worden helder getoond voordat je definitief boekt.",
        tags: ["extra kosten", "servicekosten", "eigen risico"]
      }
    ]
  },
  {
    id: "verzekering",
    label: "Verzekering & schade",
    items: [
      {
        id: "verzekering-1",
        question: "Is mijn rit verzekerd?",
        answer: "Ja, alle KeylessGo ritten via SnappCar zijn standaard all-risk verzekerd via Allianz. De dekking en het eigen risico worden duidelijk weergegeven tijdens het boekingsproces.",
        tags: ["verzekering", "all-risk", "allianz"]
      },
      {
        id: "verzekering-2",
        question: "Wat moet ik doen bij schade of pech?",
        answer: "Bij schade maak je altijd foto's en meld je dit direct via de app en/of het SnappCar platform. Bij pech kun je 24/7 gebruikmaken van de pechhulp die via SnappCar geregeld is (Eurocross). In de app vind je de juiste noodnummers en stappen.",
        tags: ["schade", "pech", "meldingen"]
      }
    ]
  },
  {
    id: "duur",
    label: "Duur & verlengen",
    items: [
      {
        id: "duur-1",
        question: "Kan ik de auto langer houden dan gepland?",
        answer: "Ja, zolang er geen andere reservering direct na jouw boeking is. Je kunt via de app een verlengingsverzoek doen. Na akkoord loopt je boeking door en worden de extra uren/kilometers automatisch verrekend.",
        tags: ["verlengen", "duur", "extra tijd"]
      },
      {
        id: "duur-2",
        question: "Wat als ik later terug ben dan afgesproken?",
        answer: "Probeer altijd vooraf te verlengen zodra je weet dat je later terug bent. Lukt dit niet of is er al een volgende boeking, dan kunnen er extra kosten of een boete van toepassing zijn. Dit wordt afgehandeld via SnappCar.",
        tags: ["te laat", "boete", "tijd"]
      }
    ]
  }
];
