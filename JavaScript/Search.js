// Aufsetzen Funktion, die auf losgelassene Taste reagiert
document.addEventListener("DOMContentLoaded", function () {
  const searchInputElement = document.getElementById("search");
  if (searchInputElement) {
    searchInputElement.addEventListener("keyup", function () {
      InputValue = searchInputElement.value; // Auslesen Wert in Suchfeld 
      filterList(); // Ausführen Funktion
    });
  }
});

// Versteckt alle Karten, die den gesuchten Begriff nicht beinhalten
function filterList() {
  const filter = InputValue.toLowerCase() // case unabhängige Suche nach Suchbegriff
  const listItems = document.querySelectorAll(".ListItem"); // Array von allen Länderkarten

  listItems.forEach((item) => {
    let text = item.textContent.toLowerCase(); // case unabhängige Suche
    if (text.includes(filter)) { // Falls der Text im Suchfeld gleich ist wie Text auf Länderkarte
      item.parentNode.style.display = ''; // Anzeige von Karte
    }
    else {
      item.parentNode.style.display = 'none'; // Verstecken von Karte
    }
  })
}