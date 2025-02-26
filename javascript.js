function myFunction() {
    var x = document.getElementById("NavigationBar");
    if (x.className === "NavBar") {
      x.className += " responsive";
    } else {
      x.className = "NavBar";
    }
  }