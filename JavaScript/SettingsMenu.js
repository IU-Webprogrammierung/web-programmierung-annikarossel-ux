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
    if (err) { } else {
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
  // Wenn die Sprache geändert wird, wird der audgewählte Wert ausgelesen und die Sprache des Seite geändert
  document.getElementById('LanguageSelect').addEventListener('change', function (e) {
    const selectedLanguage = e.target.value;
    changeLanguage(selectedLanguage);
  });
  
  /* ------------------------------Einstellungs Menu-------------------------------------------- */
  // Öffne Einstellungsmenü bei Klick auf Button
  const SettingsMenu = document.getElementById("SettingsMenu");
  const SettingsButton = document.getElementById("Settings");
  document.getElementById("Settings").addEventListener("click", function () {
    SettingsMenu.classList.toggle("visible"); // Anzeige SettingsMenu
  });
  
  // Schließt das Menü, wenn man außerhalb klickt
  document.addEventListener("click", function (event) {
    if (!SettingsButton.contains(event.target) && !SettingsMenu.contains(event.target)) {
      SettingsMenu.classList.remove("visible"); // Verstecken von SettingsMenu
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
  
  