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
      searchInputElement.addEventListener("keyup", function() {
        InputValue = searchInputElement.value;
        filterList();
        });
    }
  });

// Versteckt alle Karten, die den gesuchten Begriff nicht beinhalten
function filterList(){
    const filter = InputValue.toLowerCase()
    const listItems = document.querySelectorAll(".ListItem");

    listItems.forEach((item) =>{
        let text = item.textContent.toLowerCase();
        if(text.includes(filter)){
            item.parentNode.style.display ='';
        }
        else{
            item.parentNode.style.display ='none';
        }
    })
}


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
  slides[slideIndex-1].style.display = "grid";
  dots[slideIndex-1].className += " active";
}