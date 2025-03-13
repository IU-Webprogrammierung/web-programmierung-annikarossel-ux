// Sprachauswahl
// Initialisiere i18next
i18next.init({
  lng: localStorage.getItem('language') || 'de',   // Holt Sprache aus local Storage ansonsten ist Standard-Sprache (deutsch)
  resources: {
    en: {
      translation: {}
    },
    de: {
      translation: {}
    }
  }
}, function (err, t) {  // Abfangen Fehler bei Initialisierung
  if (err) {
    console.error("Fehler bei der Initialisierung von i18next:", err);
  } else {
    console.log("i18next ist bereit");
    document.getElementById('LanguageSelect').value = localStorage.getItem('language') || 'de';

    // Lade die Übersetzungen und aktualisiere den Inhalt nach der Initialisierung
    loadTranslations().then(() => {
      updateContent();  // Aktualisiere den Inhalt nach dem Laden der Übersetzungen
    });
  }
});

// Lade die Übersetzungen aus den externen JSON-Dateien
function loadTranslations() {
  return Promise.all([
    fetch('Translation/en.json').then(response => response.json()).then(data => {
      i18next.addResourceBundle('en', 'translation', data);
    }),
    fetch('Translation/de.json').then(response => response.json()).then(data => {
      i18next.addResourceBundle('de', 'translation', data);
    })
  ]);
}

// Funktion zum Aktualisieren der Inhalte direkt im HTML über data-i18n
function updateContent() {
  const elements = document.querySelectorAll('[data-i18n]'); // Holt alle Elemente mit i18n Texten
  elements.forEach(function (element) { //Für jedes Element im Array elements wird der Text im i18n geholt
    const key = element.getAttribute('data-i18n');
    element.innerHTML = i18next.t(key);  // Ersetze den Text mit der Übersetzung
  });
}

// Funktion zum Ändern der Sprache
function changeLanguage(language) {
  i18next.changeLanguage(language, function (err, t) {
    localStorage.setItem('language', language);  // Speichert die gewählte Sprache im localStorage als attribut language
    updateContent();  // Die Inhalte mit der neuen Sprache aktualisieren
  });
}

// Event-Listener für die Auswahl der Sprache
document.getElementById('LanguageSelect').addEventListener('change', function (e) {
  const selectedLanguage = e.target.value;
  changeLanguage(selectedLanguage);
});






// Abrufen der letzten Speicherung der Seite
document.addEventListener("DOMContentLoaded", function () {
  const LastSaveElement = document.getElementById("LastSave");

  if (LastSaveElement) { // Prüfen, ob das Element existiert
    const lastDate = new Date(document.lastModified); // Datum der letzten Änderung
    const formattingDate = lastDate.toLocaleDateString(); // Datum ohne Uhrzeit
    LastSaveElement.innerText = formattingDate; // Dem Element das Datum hinzufügen
  }
});



// Fügt dem Klassenname das Attribut responsive hinzu
function createResponsiveNavigation() {
  var NavigationBar = document.getElementById("NavigationBar");
  if (NavigationBar.className === "NavBar") {
    NavigationBar.className += " responsive";
  } else {
    NavigationBar.className = "NavBar";
  }
}

// Aufsetzen Funktion, die auf losgelassene Taste reagiert
document.addEventListener("DOMContentLoaded", function () {
  const searchInputElement = document.getElementById("search");
  if (searchInputElement) {
    searchInputElement.addEventListener("keyup", function () {
      InputValue = searchInputElement.value;
      filterList();
    });
  }
});

// Versteckt alle Karten, die den gesuchten Begriff nicht beinhalten
function filterList() {
  const filter = InputValue.toLowerCase()
  const listItems = document.querySelectorAll(".ListItem");

  listItems.forEach((item) => {
    let text = item.textContent.toLowerCase();
    if (text.includes(filter)) {
      item.parentNode.style.display = '';
    }
    else {
      item.parentNode.style.display = 'none';
    }
  })
}


// Slider Logik wird nur ausgeführt, wenn index.html Seite geöffnet ist
if (document.body.getAttribute("data-page") === "index") {
  let slideIndex = 1; // Erstes Bild wird auf Slider angezeigt
  showSlides(slideIndex); // Aufruf showSlides Funktion

  // Vor/Zurück Button
  function SlideChange(n) {
    showSlides(slideIndex += n); //Änderung Index, je nach Klicken
  }

  function currentSlide(n) {
    showSlides(slideIndex = n); //Country mit Index n wird angezeigt
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("CarouselItem"); //Alle Items im Carousel
    let dots = document.getElementsByClassName("Dot"); //Puntanzeige unter Card
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "grid";
    dots[slideIndex - 1].className += " active";
  }
}

// Öffne Einstellungsmenü bei Klick auf Button
const SettingsMenu = document.getElementById("SettingsMenu");
const SettingsButton = document.getElementById("Settings");
document.getElementById("Settings").addEventListener("click", function () {
  SettingsMenu.classList.toggle("visible");
});

// Schließt das Menü, wenn man außerhalb klickt
document.addEventListener("click", function (event) {
  if (!SettingsButton.contains(event.target) && !SettingsMenu.contains(event.target)) {
    SettingsMenu.classList.remove("visible");
  }
});


