
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
const searchInputElement = document.getElementById("search");
searchInputElement.addEventListener("keyup", function() {
InputValue = searchInputElement.value;
filterList();
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
