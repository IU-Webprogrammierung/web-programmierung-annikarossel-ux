// Abrufen der letzten Speicherung der Seite
document.addEventListener("DOMContentLoaded", function () {
    const LastSaveElement = document.getElementById("LastSave");
  
    if (LastSaveElement) { // Prüfen, ob das Element existiert
      const lastDate = new Date(document.lastModified); // Datum der letzten Änderung
      const formattingDate = lastDate.toLocaleDateString(); // Datum ohne Uhrzeit
      LastSaveElement.innerText = formattingDate; // Dem Element das Datum hinzufügen
    }
  });
  
  