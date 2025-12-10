// faqData.js
// Brondata voor FAQ – KeylessGo

const FAQ_CATEGORIES = [
    { key: "algemeen",    label: "Algemeen" },
    { key: "boeken",      label: "Boeken & gebruik" },
    { key: "kosten",      label: "Kosten & betalen" },
    { key: "verzekering", label: "Schade & verzekering" },
    { key: "zakelijk",    label: "Zakelijk gebruik" }
];

const FAQ_DATA = [
    // ALGEMEEN
    {
        id: "algemeen-1",
        category: "algemeen",
        question: "Wat is KeylessGo precies?",
        answer:
            "KeylessGo is een moderne deel- en huurservice voor auto's en bestelbussen. " +
            "Je reserveert online, opent het voertuig volledig keyless via je telefoon en betaalt alleen voor gebruik."
    },
    {
        id: "algemeen-2",
        category: "algemeen",
        question: "In welke regio is KeylessGo actief?",
        answer:
            "We focussen momenteel op de provincie Utrecht en breiden gefaseerd uit. " +
            "Op de kaart in de app en op de website zie je live waar voertuigen beschikbaar zijn."
    },
    {
        id: "algemeen-3",
        category: "algemeen",
        question: "Heb ik een abonnement nodig om KeylessGo te gebruiken?",
        answer:
            "Nee, je kunt KeylessGo gebruiken zonder abonnement. Je betaalt per rit. " +
            "Voor veelrijders bieden we optionele bundels en pakketten met extra korting."
    },
    {
        id: "algemeen-4",
        category: "algemeen",
        question: "Wat voor voertuigen kan ik huren?",
        answer:
            "Ons aanbod bestaat uit compacte stadsauto's, elektrische voertuigen en bestelbussen in verschillende formaten (S, M, L). " +
            "Ideaal voor boodschappen, een weekend weg of een verhuizing."
    },
    {
        id: "algemeen-5",
        category: "algemeen",
        question: "Moet ik een account aanmaken?",
        answer:
            "Ja, om te kunnen boeken heb je een gratis KeylessGo-account nodig. " +
            "We vragen om enkele persoons- en rijbewijsgegevens om je identiteit te verifiëren."
    },

    // BOEKEN & GEBRUIK
    {
        id: "boeken-1",
        category: "boeken",
        question: "Hoe reserveer ik een voertuig?",
        answer:
            "Je kiest op de kaart een voertuig, selecteert je gewenste begin- en eindtijd en bevestigt de boeking. " +
            "De totale prijs en voorwaarden zie je direct voordat je afrondt."
    },
    {
        id: "boeken-2",
        category: "boeken",
        question: "Hoe werkt het keyless openen van de auto?",
        answer:
            "Zodra je boeking gestart is, verschijnt er een 'Open voertuig'-knop in de app. " +
            "Met één druk op de knop ontgrendelt de auto via een beveiligde verbinding, zonder fysieke sleutel."
    },
    {
        id: "boeken-3",
        category: "boeken",
        question: "Kan ik mijn boeking verlengen als ik later terug ben?",
        answer:
            "Ja, zolang er na jouw reservering geen andere boeking op hetzelfde voertuig gepland staat, " +
            "kun je in de app gemakkelijk verlengen. Eventuele extra kosten worden direct getoond."
    },
    {
        id: "boeken-4",
        category: "boeken",
        question: "Is er een minimum of maximum duur voor een boeking?",
        answer:
            "Je kunt al vanaf een paar uur boeken. Voor langere periodes (bijvoorbeeld meerdere dagen of weken) " +
            "maken we indien nodig een maatwerkafspraak."
    },
    {
        id: "boeken-5",
        category: "boeken",
        question: "Mag er door meerdere bestuurders met hetzelfde voertuig gereden worden?",
        answer:
            "Dat kan, mits alle bestuurders vooraf bekend zijn bij KeylessGo en aan de rijbewijsvoorwaarden voldoen. " +
            "Neem bij meerdere bestuurders even contact op voor de exacte voorwaarden."
    },

    // KOSTEN & BETALEN
    {
        id: "kosten-1",
        category: "kosten",
        question: "Hoe worden de kosten van een rit berekend?",
        answer:
            "De ritprijs bestaat meestal uit een combinatie van tijd (uur- of dagtarief) en gereden kilometers. " +
            "Eventuele extra opties, zoals het verlagen van het eigen risico, worden apart weergegeven."
    },
    {
        id: "kosten-2",
        category: "kosten",
        question: "Welke betaalmethoden kan ik gebruiken?",
        answer:
            "We ondersteunen iDEAL en de meestgebruikte bank- en creditcards. " +
            "Zakelijke klanten kunnen in overleg op factuurbasis betalen."
    },
    {
        id: "kosten-3",
        category: "kosten",
        question: "Moet ik borg betalen?",
        answer:
            "Voor sommige boekingen of profielen vragen we om een borg of een reservering op je rekening. " +
            "Dit wordt altijd duidelijk vermeld tijdens het boekingsproces, vóórdat je betaalt."
    },
    {
        id: "kosten-4",
        category: "kosten",
        question: "Is brandstof inbegrepen in de prijs?",
        answer:
            "Bij de meeste voertuigen tank je zelf en lever je de auto weer met ongeveer hetzelfde brandstofniveau in. " +
            "Bij elektrische voertuigen rekenen we een eerlijke kilometerprijs inclusief laadkosten."
    },
    {
        id: "kosten-5",
        category: "kosten",
        question: "Wat gebeurt er als ik te laat terug ben?",
        answer:
            "Als je later terug bent zonder je boeking te verlengen, kunnen er extra kosten in rekening worden gebracht, " +
            "vooral als de volgende huurder hierdoor hinder ondervindt. Verleng je rit dus tijdig in de app."
    },

    // SCHADE & VERZEKERING
    {
        id: "verzekering-1",
        category: "verzekering",
        question: "Hoe is de verzekering geregeld?",
        answer:
            "Alle voertuigen zijn verzekerd voor verhuur via KeylessGo. " +
            "Er geldt een standaard eigen risico per schadegeval. Bij veel voertuigen kun je dat eigen risico tegen meerprijs verlagen."
    },
    {
        id: "verzekering-2",
        category: "verzekering",
        question: "Wat moet ik doen bij schade of een aanrijding?",
        answer:
            "Zorg eerst voor veiligheid, maak duidelijke foto's van de situatie en het voertuig, en volg de stappen in de app. " +
            "Neem bij twijfel altijd direct contact op met onze support."
    },
    {
        id: "verzekering-3",
        category: "verzekering",
        question: "Ben ik ook verzekerd bij pech onderweg?",
        answer:
            "Ja, er is pechhulp gekoppeld aan de voertuigen. " +
            "In de app vind je het noodnummer en de stappen die je moet volgen bij pech of storingen."
    },
    {
        id: "verzekering-4",
        category: "verzekering",
        question: "Mag ik met het voertuig naar het buitenland?",
        answer:
            "Dit verschilt per voertuig. In de voertuigdetails en tijdens het boeken staat duidelijk aangegeven " +
            "of rijden in het buitenland is toegestaan en in welke landen."
    },
    {
        id: "verzekering-5",
        category: "verzekering",
        question: "Gelden er extra regels voor jonge bestuurders?",
        answer:
            "Ja, voor bestuurders onder een bepaalde leeftijd of met weinig rijervaring kunnen strengere voorwaarden of een hoger eigen risico gelden. " +
            "Deze informatie tonen we tijdens de registratie en bij het boeken."
    },

    // ZAKELIJK
    {
        id: "zakelijk-1",
        category: "zakelijk",
        question: "Bieden jullie ook zakelijke accounts?",
        answer:
            "Ja, we bieden zakelijke accounts met mogelijkheden zoals centrale facturatie, " +
            "overzichten per medewerker of project en vaste voertuigen op locatie."
    },
    {
        id: "zakelijk-2",
        category: "zakelijk",
        question: "Kan KeylessGo een eigen bedrijfswagenpark vervangen?",
        answer:
            "Voor veel bedrijven is een flexibel deelconcept goedkoper en efficiënter dan een eigen wagenpark. " +
            "We denken graag mee over de optimale mix van voertuigen en gebruik."
    },
    {
        id: "zakelijk-3",
        category: "zakelijk",
        question: "Kan ik periodiek rapportages ontvangen voor mijn administratie?",
        answer:
            "Ja, voor zakelijke klanten kunnen we periodieke rapportages leveren met bijvoorbeeld ritoverzichten, " +
            "kilometers per medewerker en kosten per project."
    }
];
