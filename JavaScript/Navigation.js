// Fügt dem Klassenname das Attribut responsive hinzu & Zeigt den X Button an 
function createResponsiveNavigation() {
    var NavigationBar = document.getElementById("NavigationBar");
    const closeButton = document.querySelector(".CloseButton");
    const savedDarkModeState = localStorage.getItem("darkMode") === "true"; // Überprüft aktuellen Status von Item darkMode
  
    const isNowResponsive = NavigationBar.classList.toggle("responsive");   // Fügt responsive Klasse hinzu
    if (closeButton) {
      if (isNowResponsive) {
        closeButton.style.display = "inline-block"; // X-Button wird angezeigt  
      } else {
        closeButton.style.display = "none"; // X-Button wird versteckt  
      }
    }
  
    // Dark Mode anwenden, wenn Navigation offen ist
    if (isNowResponsive && savedDarkModeState) {
      NavigationBar.classList.add("dark-mode"); // Hinzufügen dark-mode Klasse
    } else {
      NavigationBar.classList.remove("dark-mode");  // Entfernen dark-mode Klasse
    }
  }
  

  
  function closeMenu() {
    const closeButton = document.querySelector(".CloseButton");
    const nav = document.getElementById("NavigationBar");
    nav.classList.remove("responsive");   // Menü schließen, indem die "responsive" Klasse entfernt wird
    closeButton.style.display = "none";   // X-Button wird wieder versteckt
  
  }