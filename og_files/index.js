$(document).ready(function(){
  setTimeout(function(){
    document.getElementById("title").classList.add("fadeOut");
    setTimeout(function(){
      document.getElementById("title").style.display = "none";
      document.getElementById("difficulty-title").style.display = "block";
      document.getElementById("difficulty-buttons").style.display = "flex";
      document.getElementById("difficulty-title").classList.add("fadeIn");
      document.getElementById("difficulty-buttons").classList.add("fadeIn");
    }, 760);
  } , 3000);
});

var bombLocations = [];
var locationsAndCounts = [];
var validFlags = 0;

function generateField(option){
  var difficultyTitle = document.getElementById("difficulty-title");
  var difficultyButtons = document.getElementById("difficulty-buttons");

  difficultyTitle.classList.add("fadeOut");
  difficultyButtons.classList.add("fadeOut");
  setTimeout(function(){
    difficultyTitle.style.display = "none";
    difficultyButtons.style.display = "none";
    drawGrid(option);
  }, 760)
}

function drawGrid(option){
  var grid = document.getElementById("grid");
  var rows;
  var cols;
  var bombs;
  if(option == "e"){
    bombs = 10;
    rows = 8;
    cols = 8;
  }
  else if(option == "m"){
    bombs = 25;
    rows = 11;
    cols = 11;
  }
  else{
    bombs = 50;
    rows = 17;
    cols = 17;
  }

  var bombModulo = rows * cols;
  for(var i = 0; i < bombs; i++){
    var attemptedID = Math.ceil(Math.random() * bombModulo);
    if(bombLocations.includes(attemptedID)){
      i--;
    }
    else{
      bombLocations.push(attemptedID);
    }
  }

  for(var i = 0; i < bombLocations.length; i++){
    for(var j = -1; j < 2; j++){
      updateNums(bombLocations[i] - rows - j);
      updateNums(bombLocations[i] + rows - j);
      if(j != 0){
        updateNums(bombLocations[i] + j);
      }
    }
  }

  var counter = 0;
  for(var r = 0; r < rows; r++){
      var tr = grid.appendChild(document.createElement("tr"));

      for(var c = 0; c < cols; c++){
        var cell = tr.appendChild(document.createElement("td"));
        cell.style.position = "relative";
        cell.innerHTML = "<img src=images/portal.png>";

        var image = document.getElementsByTagName('img')[counter];
        image.classList.add("clickable");
        image.style.width = Math.floor(600 / cols) + "";
        image.style.position = "absolute";
        image.id = "b" + counter;
        image.addEventListener("click", gridClicked, false);
        image.addEventListener('contextmenu', placePlumbus, false);
        counter++;

        var widthHeight = Math.floor(700 / cols) + "px"
        cell.style.width = widthHeight;
        cell.style.height = widthHeight;

        cell.style.fontSize = Math.floor(550 / cols) + "px";
      }
  }
}

function updateNums(indexToCheck){
  if(indexToCheck > -1){
    if(locationsAndCounts[indexToCheck] != undefined){
      locationsAndCounts[indexToCheck]++;
    }
    else{
      locationsAndCounts[indexToCheck] = 1;
    }
  }
}

function gridClicked(event){
  var image = document.getElementById(event.target.id);
  var id = parseInt(image.id.substring(1, image.id.length));
  if(bombLocations.includes(id)){
    image.src = "images/picklerick.png";
    var width = image.style.width.substring(0, image.style.width.indexOf("p"))
    image.style.width = width * .8 + "px";
    image.classList.remove("clickable");
    setTimeout(loss, 500);
  }
  else{
    if(locationsAndCounts[id] != undefined){
      image.parentElement.innerHTML = "<div>" + locationsAndCounts[id] + "</div>";
    }
    else{
      image.style.opacity = "0";
      clearEmptySpaces();
    }
  }
}

function placePlumbus(event){
  event.preventDefault();
  var td = event.target.parentElement;
  var id = parseInt(event.target.id.substring(1, event.target.id.length));
  if(td.children.length > 1){
    if(bombLocations.includes(id)){
      validFlags--;
    }
    var plumbus = td.children[1];
    td.removeChild(plumbus);
    td.children[0].classList.add("clickable");
  }
  else{
    if(bombLocations.includes(id)){
      validFlags++;
      if(validFlags == bombLocations.length){
        document.body.innerHTML = "";
        document.body.style.background = "url('images/wubbalubbadubdub.gif') no-repeat";
        document.body.style.backgroundSize = "100%";
      }
    }
    event.target.classList.remove("clickable");
    var image = td.appendChild(document.createElement("img"));
    image.src = "images/plumbus.png";
    image.classList.add("plumbus");
    image.addEventListener('contextmenu', placePlumbus, false);
    image.style.width = event.target.style.width.substring(0, event.target.style.width.indexOf("p")) * 1.2;
  }
}

function loss(){
  document.body.innerHTML = "";
  document.body.style.background = "url('images/farewellsolenya.gif') no-repeat";
  document.body.style.backgroundSize = "100%";
}
