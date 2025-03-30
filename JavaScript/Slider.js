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
    if (n > slides.length) { // Logik zum Springen von der letzten Slide auf die erste Slide
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Versteckt Slides, die nicht angezeigt werden sollen
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); // Dotsanzeige wird als inaktiv gesetzt
    }
    slides[slideIndex - 1].style.display = "grid"; //Darstellung als Grid Container für aktuellen Slide
    dots[slideIndex - 1].className += " active"; // Aktueller Dot wird visuell hervorgehoben
}