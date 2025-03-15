/* -----------------------------Sprachauswahl----------------------------------- */
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
  // Spezialelemente, die nicht durch i18n direkt übersetzt werden können
  const inputElement = document.getElementById('SubmitButton');
  const searchField = document.getElementById('search');
  const NameInput = document.getElementById('Name');
  const EmailInput = document.getElementById('email');
  const MessageInput = document.getElementById('message');
  if (inputElement) {  // Nur ausführen, wenn das Element existiert
    inputElement.value = i18next.t('submit');  // Setze den Wert
  }
  if (searchField) {  // Nur ausführen, wenn das Element existiert
    searchField.placeholder = i18next.t('Search');  // Setze den Wert
  }
  if (NameInput) {  // Nur ausführen, wenn das Element existiert
    NameInput.placeholder = i18next.t('Vorname');  // Setze den Wert
  }
  if (EmailInput) {  // Nur ausführen, wenn das Element existiert
    EmailInput.placeholder = i18next.t('Email');  // Setze den Wert
  }
  if (MessageInput) {  // Nur ausführen, wenn das Element existiert
    MessageInput.placeholder = i18next.t('Nachricht');  // Setze den Wert
  }
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

/* ------------------------------Einstellungs Menu-------------------------------------------- */
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






/* -------------------------------------Dark Mode-------------------------------------------------- */
// Hinzufügen Text zur Barrierefreiheit
document.getElementById("DarkModeToggle").addEventListener("change", function () {
  const label = document.getElementById("LabelDarkMode");
  label.textContent = this.checked ? i18next.t("darkMode.on") : i18next.t("darkMode.off");
});


// Ändern Theme
const ToggleDarkMode = document.getElementById("DarkModeToggle"); // Speicherung Status Toggle

// Ändern des Toggle Zustandes
ToggleDarkMode.addEventListener("click", function () {
  const isDarkMode = ToggleDarkMode.checked; // Hole den aktuellen Zustand des Toggles
  applyDarkMode(isDarkMode);
});

document.addEventListener("DOMContentLoaded", function () {
  const savedDarkModeState = localStorage.getItem("darkMode") === "true"; // Hole den gespeicherten Zustand
  ToggleDarkMode.checked = savedDarkModeState; // Setze den Toggle entsprechend
  applyDarkMode(savedDarkModeState);
});


// Fügt/ Entfernt allen Elementen das dark mode class Element
function applyDarkMode(isDarkMode) {
  document.querySelectorAll('*').forEach(function (element) {
    if (isDarkMode) {
      element.classList.add('dark-mode'); // Fügt allen Elementen die dark mode Klasse hinzu
    } else {
      element.classList.remove('dark-mode'); // Entfernt allen Elementen die dark mode Klasse
    }
  });
  localStorage.setItem("darkMode", isDarkMode); // Setzte das Attribut darkMode im localStorage, damit das Ändern von html Seiten + beibehalten vom Theme funktioniert 
}




/* -----------------------------Letzte Speicherung----------------------------------- */
// Abrufen der letzten Speicherung der Seite
document.addEventListener("DOMContentLoaded", function () {
  const LastSaveElement = document.getElementById("LastSave");

  if (LastSaveElement) { // Prüfen, ob das Element existiert
    const lastDate = new Date(document.lastModified); // Datum der letzten Änderung
    const formattingDate = lastDate.toLocaleDateString(); // Datum ohne Uhrzeit
    LastSaveElement.innerText = formattingDate; // Dem Element das Datum hinzufügen
  }
});


/* ------------------------------Navigation-------------------------------------------- */
// Fügt dem Klassenname das Attribut responsive hinzu & Zeigt den X Button an 
function createResponsiveNavigation() {
  var NavigationBar = document.getElementById("NavigationBar");
  const closeButton = document.querySelector(".CloseButton");
  const savedDarkModeState = localStorage.getItem("darkMode") === "true"; // Korrekte Überprüfung

  const isNowResponsive = NavigationBar.classList.toggle("responsive");   // Fügte responsive Klasse hinzu
  if (closeButton) {
    if (isNowResponsive) {
      closeButton.style.display = "inline-block"; // X-Button wird angezeigt  
    } else {
      closeButton.style.display = "none"; // X-Button wird versteckt  
    }
  }

  // Dark Mode anwenden, wenn Navigation offen ist
  if (isNowResponsive && savedDarkModeState) {
    NavigationBar.classList.add("dark-mode");
  } else {
    NavigationBar.classList.remove("dark-mode");
  }
}



function closeMenu() {
  const closeButton = document.querySelector(".CloseButton");
  const nav = document.getElementById("NavigationBar");

  nav.classList.remove("responsive");   // Menü schließen, indem die "responsive" Klasse entfernt wird
  closeButton.style.display = "none";   // X-Button wird wieder versteckt

}

/* ------------------------------Suche Karten-------------------------------------------- */
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

/* ------------------------------Slider Homepage-------------------------------------------- */
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