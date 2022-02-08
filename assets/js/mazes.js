const LEVEL_1 = [
  ["*","*","*","*","*","*","*","*","*","*","*",".","*"],
  ["*","S",".",".",".",".",".","*","*",".","*",".","T"],
  ["*","*","*","*","*",".",".",".",".",".","*",".","*"],
  ["*","*","*","*","*",".","*","*","*",".","*",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*",".","*"],
  ["*","*","*","*","*",".",".",".",".",".",".",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*","*","*"],
  ["*",".",".",".",".",".",".",".",".",".","*","*","*"],
  ["*",".","*","*","*","*","*","*",".",".",".","*","*"],
  ["*",".",".",".",".","*","*","*","*","*","*","*","*"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*"]
]

const LEVEL_2 = [
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
  ["*",".",".","S",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","*"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*",".","*"],
  ["*",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","*"],
  ["*",".","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
  ["*",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","T"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"]
]

const LEVEL_3 = [
  ["*","*","*","*","*","*","*","*"],
  ["*","*","*","*","S","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*",".",".",".",".",".",".","*"],
  ["*",".","*","*","*","*",".","*"],
  ["*",".",".","*","*","*",".","*"],
  ["*",".",".","*","*","*",".","*"],
  ["*","*",".","*","*","*","*","*"],
  ["*","T",".","*","*","*","*","*"],
  ["*","*","*","*","*","*","*","*"]
]
// create an array with the premade levels and create a "lvl" variable that will change the level when it's over
var levels = [LEVEL_1,LEVEL_2,LEVEL_3]
var lvl = 0

//create a div and inserting it at the end of the body before the script to display the time
var div = document.createElement("div")
document.querySelector("body").insertBefore(div, document.querySelector("script"))
var time = Date.now()

// return a random number between min and max chosen
function randomInt(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// overwrites the global variable for time and uses the old one to display the time it took
function getElapsedTime(timeNow){
  time = Date.now()
  var timeTaken = Number((Date.now() - timeNow) / 1000).toFixed(2)
  div.innerText = "You took " + timeTaken + " seconds to finish the last maze"
}

// bruh
function createMaze(){
  //create random x and y for the array
  var x = randomInt(15,30)
  var y = randomInt(15,30)

  //create 2d array from an empty one
  var randomLvl = []
  for (let i = 0; i < y; i++) {
    randomLvl.push([])
    for (let j = 0; j < x; j++) {
      randomLvl[i].push("*")
    }
  }

  //add start
  var start = [randomInt(0, y-1), randomInt(0, x-1)]
  randomLvl[start[0]][start[1]] = "S"

  //add end
  //function that checks if "T" is around "S" and returns true/false to change T if is around S 
  //could be replaced by a function that gets both x/y coordinates of "S" and "T" and depending on the lenght and height of the given array calculate if it's to close and move it further
  function loopThing (a,b,c,d,restart) {
    var stop = true
    if (stop) {
      for (let i = start[0] + a; i < start[0]+b; i++) {
        if (stop) {
          for (let j = start[1]+c; j < start[1]+d; j++) {
            if (stop) {
              if (i == end[0] && j == end[1]) {
                restart = true
                stop = false
              } else {
                restart = false
              }
            }
          }
        }
      }
    }
    return restart
  }

  //set default global variable to restart if "T" to close to "S"
  var restart = true
  //check if "S" is near border so has not to go out of index
  // here it would have been 1000x easier to add a border around the array and make S only appear within the border of the arraybut i'm dumb and masochist
  while(restart){
    var end = [randomInt(0, y-1), randomInt(0, x-1)]
    if (start[0] != 0 && start[0] != y - 1 && start[1] != 0 && start[1] != x - 1){
      restart = loopThing(-1,2,-1,2,restart)
    } else if (start[0] == 0 && start[1] == 0 ){
      restart = loopThing(0,2,0,2,restart)
    } else if (start[0] == 0 && start[1] == x-1){
      restart = loopThing(0,2,-1,1,restart)
    } else if (start[0] == 0 && start[1] > 0 && start[1] < x-1){
      restart = loopThing(0,2,-1,2,restart)
    } else if (start[0] > 0 && start[0] < y-1 && start[1] == x-1){
      restart = loopThing(-1,2,-1,1,restart)
    } else if (start[0] == y-1 && start[1] == x-1){
      restart = loopThing(-1,1,-1,1,restart)
    } else if (start[0] == y-1 && start[1] < x-1 && start[1] > 0){
      restart = loopThing(-1,1,-1,2,restart)
    } else if (start[0] == y-1 && start[1] == 0){
      restart = loopThing(-1,1,0,2,restart)
    } else if (start[0] < y-1 && start[0] > 0 && start[1] == 0){
      restart = loopThing(-1,2,0,2,restart)
    } else {
      console.log("huh oh you made a mistake again ");
    }
  }
  // when "T" as proper coordinates place it in the array
  randomLvl[end[0]][end[1]] = "T"

  // function that randomly generates a path from "S" until it finds "T"
  function createPath(pos, dir) {
    var tFound = false
    if (dir == 1) {
      randomPathLength = randomInt(0, x-pos[1]-1)
      for (let j = pos[1]; j < pos[1]+randomPathLength+1; j++) {
        var findT = checkforT([pos[0],j])
        if (findT) {
          if (randomLvl[pos[0]][j]!= "S" && randomLvl[pos[0]][j]!= "T") {
            randomLvl[pos[0]][j] = "."
          }
        } else if (findT == false) {
          if (randomLvl[pos[0]][j]!= "S" && randomLvl[pos[0]][j]!= "T") {
            randomLvl[pos[0]][j] = "."
          }
          if (randomLvl[pos[0]][j+1]!= "S" && randomLvl[pos[0]][j+1]!= "T") {
            randomLvl[pos[0]][j+1] = "."
          }
          var tFound = true
          break;
        }
      }
      if (tFound == false) {
        return [pos[0], pos[1]+randomPathLength]
      }
    } else if (dir == 2) {
      randomPathLength = randomInt(0, pos[1])
      for (let j = pos[1]; j > pos[1]-randomPathLength-1; j--) {
        var findT = checkforT([pos[0],j])
        if (findT) {
          if (randomLvl[pos[0]][j]!= "S" && randomLvl[pos[0]][j]!= "T") {
            randomLvl[pos[0]][j] = "."
          }
        } else if (findT == false) {
          if (randomLvl[pos[0]][j]!= "S" && randomLvl[pos[0]][j]!= "T") {
            randomLvl[pos[0]][j] = "."
          }
          if (randomLvl[pos[0]][j-1]!= "S" && randomLvl[pos[0]][j-1]!= "T") {
            randomLvl[pos[0]][j-1] = "."
          }
          var tFound = true
          break;
        }
      }
      if (tFound == false) {
        return [pos[0], pos[1]-randomPathLength]
      }
    } else if (dir == 3) {
      randomPathLength = randomInt(0, pos[0])
      // console.log(pos[0] , randomPathLength);
      for (let i = pos[0]; i > pos[0]-randomPathLength-1; i--) {
        var findT = checkforT([i,pos[1]])
        if (findT) {
          if (randomLvl[i][pos[1]]!= "S" && randomLvl[i][pos[1]]!= "T") {
            randomLvl[i][pos[1]] = "."
          }
        } else if (findT == false) {
          if (randomLvl[i][pos[1]]!= "S" && randomLvl[i][pos[1]]!= "T") {
            randomLvl[i][pos[1]] = "."
          }
          if (randomLvl[i-1][pos[1]]!= "S" && randomLvl[i-1][pos[1]]!= "T") {
            randomLvl[i-1][pos[1]] = "."
          }
          var tFound = true
          break;
        }
      }
      if (tFound == false) {
        return [pos[0]-randomPathLength, pos[1]]
      }
    } else if (dir == 4) {
      randomPathLength = randomInt(0, y-1-pos[0])
      // console.log(y-1-pos[0] , randomPathLength);
      for (let i = pos[0]; i < pos[0]+randomPathLength+1; i++) {
        var findT = checkforT([i,pos[1]])
        if (findT) {
          if (randomLvl[i][pos[1]]!= "S" && randomLvl[i][pos[1]]!= "T") {
            randomLvl[i][pos[1]] = "."
          }
        } else if (findT == false) {
          if (randomLvl[i][pos[1]]!= "S" && randomLvl[i][pos[1]]!= "T") {
            randomLvl[i][pos[1]] = "."
          }
          if (randomLvl[i+1][pos[1]]!= "S" && randomLvl[i+1][pos[1]]!= "T") {
            randomLvl[i+1][pos[1]] = "."
          }
          var tFound = true
          break;
        }
      }
      if (tFound == false) {
        return [pos[0]+randomPathLength, pos[1]]
      }
    } else {
      console.log("ayoo there's a problem bro");
    }

    if (tFound) {
      return false
    }
  }
  //get random direction to build path
  currentPos = start
  
  function checkforT(posOfT){
    if (posOfT[0] != 0 && posOfT[0] != y - 1 && posOfT[1] != 0 && posOfT[1] != x - 1){
      findT = loopThingForT(-1,2,-1,2,findT)
    } else if (posOfT[0] == 0 && posOfT[1] == 0 ){
      findT = loopThingForT(0,2,0,2,findT)
    } else if (posOfT[0] == 0 && posOfT[1] == x-1){
      findT = loopThingForT(0,2,-1,1,findT)
    } else if (posOfT[0] == 0 && posOfT[1] > 0 && posOfT[1] < x-1){
      findT = loopThingForT(0,2,-1,2,findT)
    } else if (posOfT[0] > 0 && posOfT[0] < y-1 && posOfT[1] == x-1){
      findT = loopThingForT(-1,2,-1,1,findT)
    } else if (posOfT[0] == y-1 && posOfT[1] == x-1){
      findT = loopThingForT(-1,1,-1,1,findT)
    } else if (posOfT[0] == y-1 && posOfT[1] < x-1 && posOfT[1] > 0){
      findT = loopThingForT(-1,1,-1,2,findT)
    } else if (posOfT[0] == y-1 && posOfT[1] == 0){
      findT = loopThingForT(-1,1,0,2,findT)
    } else if (posOfT[0] < y-1 && posOfT[0] > 0 && posOfT[1] == 0){
      findT = loopThingForT(-1,2,0,2,findT)
    } else {
      console.log("huh oh you made a mistake again ");
    }
    function loopThingForT (a,b,c,d,restart) {
      // console.log(posOfT[0],posOfT[1]);
      var stop = true
      if (stop) {
        for (let i = posOfT[0] + a; i < posOfT[0]+b; i++) {
          if (stop) {
            for (let j = posOfT[1]+c; j < posOfT[1]+d; j++) {//change to currentPos
              if (stop) {
                if (i == end[0] && j == end[1]) {
                  restart = false
                  stop = false
                } else {
                  restart = true
                }
              }
            }
          }
        }
      }
      return restart
    }
    return findT
  }


  var findT = true
  while(findT){
    var direction = randomInt(1, 4)
    currentPos = createPath(currentPos, direction)

    if (currentPos == false) {
      findT = false
    }
  }
  return randomLvl
}

// displays time it took and changes the level selected or creates a new one
function startNextLvl(lvl){
  getElapsedTime(time)
  if (lvl < 3) {
    var select = levels[lvl]
  } else if (lvl >= 3) {
    var select = createMaze()
  }
  return select; //returns an array
}

// Initiate the first level
lvlSelected = startNextLvl(lvl)

// create a div that will contain the level
var main = document.querySelector("main")
var containerDiv = document.createElement("div")
containerDiv.classList.add("container","flex-column")
main.appendChild(containerDiv)

// clear the level (to refresh the display)
function deleteMaze(){
  containerDiv.innerHTML = ""
}

// displays the current level
function displayMaze(){
  var lvlHeight = lvlSelected.length
  var lvlLength = lvlSelected[0].length
  if (containerDiv.innerHTML != ""){ // if it's the first display does nothing
    deleteMaze()
  }
  for (let i = 0; i < lvlSelected.length; i++) { // loop for each array element of the level and gives it a div
    var lineDiv = document.createElement("div")
    lineDiv.classList.add("line","flex")
    containerDiv.appendChild(lineDiv)
  
    lvlSelected[i].forEach(e => { // loop for each element of the array element of the level (e will be equal to every element of the 2d array)
      var boxDiv = document.createElement("div") // create a div for every element and give it the appropriate class
      if (e == "*"){
        boxDiv.classList.add("box","wall")
      } else if (e == "."){
        boxDiv.classList.add("box","path")
      } else if (e == "S"){
        boxDiv.classList.add("box","start")
      } else if (e == "T"){
        boxDiv.classList.add("box","end")
      }
  
      if (lvlHeight >= lvlLength){ // create the width and height of the game depending on how big the array is
        var viewHeight = (100/(lvlHeight + 2)).toString()
        document.querySelector("main div").style.padding = viewHeight + "vh";
        boxDiv.style.width = viewHeight + "vh";
        boxDiv.style.height = viewHeight + "vh";
      } else if (lvlHeight < lvlLength) { // does the same because problems with "vw"
        var viewWidth = (100/(lvlLength + 2)).toString()
        document.querySelector("main div").style.padding = viewWidth + "vh";
        boxDiv.style.width = viewWidth + "vh";
        boxDiv.style.height = viewWidth + "vh";
      } else {
        console.log("error with lvlHeight and lvlLength");
      }
  
      lineDiv.appendChild(boxDiv)
    });
  }
}

// function that lets you move the "S" around the 2d array func(to decide if we moving along x or y, used to check if we are at the beginnig or end of the array, last two are used for the displacement of the blocks(check the next block))
function moveAround(variable,FirstVariable,SecondVariable,ThirdVariable) {
  var stop = true // to break the loops
  var valid = false // set default to false to signify end of the array
  for (let y = 0; y < lvlSelected.length; y++) {
    if (stop){
      for (let x = 0; x < lvlSelected[y].length; x++) {
        if (stop && lvlSelected[y][x] == "S"){ // if we find "S" then run the rest
          if (variable == "xAxis" && x != lvlSelected[0].length - FirstVariable) { // we are not at either end of x axis
            valid = true
          } else if (variable == "yAxis" && y != lvlSelected.length - FirstVariable) { // we are not at either end of y axis
            valid = true
          }
          if (valid && lvlSelected[y+SecondVariable][x+ThirdVariable] != "*") { // check if the next block is not a wall (better than check if is path because we need to find the end)
            if (lvlSelected[y+SecondVariable][x+ThirdVariable] == "T"){ // if it's the end increment the level and call the nextlevel
              lvl++
              lvlSelected = startNextLvl(lvl)
            } else{ //otherwise replace "S" with the next block and vice versa
              [lvlSelected[y][x], lvlSelected[y+SecondVariable][x+ThirdVariable]] = [lvlSelected[y+SecondVariable][x+ThirdVariable], lvlSelected[y][x]];
            }
            stop = false // we found "S" and did what we wanted so stop the loops
          }
        }
      }
    }
  }
}

document.addEventListener('keyup', e => {
  if (e.code === 'KeyW' || e.code === "ArrowUp") {
    moveAround("yAxis",lvlSelected.length,-1,0)
    displayMaze()
  } else if (e.code === "KeyS" || e.code === "ArrowDown"){
    moveAround("yAxis",1,1,0)
    displayMaze()
  } else if (e.code === "KeyA" || e.code === "ArrowLeft"){
    moveAround("xAxis",lvlSelected[0].length,0,-1)
    displayMaze()
  } else if (e.code === "KeyD" || e.code === "ArrowRight"){
    moveAround("xAxis",1,0,1)
    displayMaze()
  }
})

displayMaze()


