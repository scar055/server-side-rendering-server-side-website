// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from "express";

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import {Liquid} from "liquidjs";

// Doe een fetch naar de data die je nodig hebt
// const apiResponse = await fetch('...')
const apiResponse = await fetch(
  "https://fdnd-agency.directus.app/items/adconnect_nominations",
);
// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const apiResponseJSON = await apiResponse.json();

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON);

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views");

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get("/", async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee

  //op directus staat weinig to geen data dus moet zelf wat megeven / maken
  const person = {
    id: 1,
    excerpt: null,
    body: "\u003Cp\u003EMijn naam is Rhod&eacute; Treur, 22 jaar oud, woon in Woudenberg en ik volg de Ad-opleiding Human Resource Management aan de Hogeschool Utrecht. Momenteel zit ik in het tweede jaar van deze Ad-opleiding en ben ik bezig met mijn eindstage bij Timon jeugd- en (jong)volwassenenzorg. In mijn vrije tijd werk ik als douanedeclarant bij een transportbedrijf en sport ik graag. &nbsp;\u003Cbr\u003E&nbsp;\u003Cbr\u003EIk heb voor een Ad-opleiding gekozen, omdat je hier de kennis en vaardigheden die je opdoet, direct in de praktijk kan brengen door middel van projecten. Ook is er in de opleiding veel aandacht voor je persoonlijke ontwikkeling. Daarnaast vind ik het een voordeel dat het een tweejarige hbo-opleiding is, met de mogelijkheid om door te stromen in de bachelorvariant. &nbsp;\u003Cbr\u003E&nbsp;\u003Cbr\u003EMijn keuze voor Human Resource Management komt voort uit de wens om het menselijke en het zakelijke aspect te combineren. Ik zie het als een uitdaging om medewerkers op de beste manier in te zetten binnen een organisatie, zodat zij op een plek zitten waar ze gelukkig zijn en waar hun talenten het beste uitkomen. Binnen de opleiding vraag ik actief om feedback van zowel medestudenten als docenten. Aan de hand daarvan reflecteer ik op mijn denken en handelen en stel ik doelen op die bijdragen aan mijn professionele ontwikkeling. &nbsp;\u003Cbr\u003E&nbsp;\u003Cbr\u003ENa het afronden van mijn Ad-opleiding zie ik mijzelf doorstromen in de deeltijdvariant van de bachelor. Hierdoor kan ik mijn kennis en vaardigheden dagelijks toepassen in de praktijk en kan ik mij blijven ontwikkelen in de rol als HR-officer.&nbsp;\u003C/p\u003E",
    status: "published",
    alumnus: null,
    education_variant: "Voltijd",
    previous_course: " mbo bol",
    course: " Ad Human Resource Management (HRM)",
    institution: " Hogeschool Utrecht ",
    header: "nominatie",
    slug: null,
    title: "Rhodé Treur",
    date: "2024-01-11",
    profile_picture: "383622d7-ed2f-4e84-8c0a-9476c5c53826",
  };

  response.render("index.liquid", person);
});

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post("/", async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, "/");
});

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
