// import createMaze from "./createRandomPath.js"
// var level5 = createMaze()
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
// if we add "save level" button this is where we would add them from the .json file
var levels = [/*LEVEL_1*//*,LEVEL_2,LEVEL_3*/]
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

// setting global variables for later use
var start = [0,0]
var x = 0
var y = 0
// bruh, you can skip this function
function createMaze(){
  //create random x and y for the array
  x = randomInt(15,30)
  y = randomInt(15,30)
  // hehe not so random
  x = 22
  y = 22
  //create 2d array from an empty one
  var randomLvl = []
  for (let i = 0; i < y; i++) {
    randomLvl.push([])
    for (let j = 0; j < x; j++) {
      randomLvl[i].push("*")
    }
  }

  //add start
  start = [randomInt(0, y-1), randomInt(0, x-1)]
  // start = [3,3]
  randomLvl[start[0]][start[1]] = "S"

  //add end
  // check in which corner the start is and get a random position for end depending on "S"+50% of x and y and the end of the array
  if (start[0] < y - start[0]) { // in upper part
    if (start[1] < x - start[1]) { // in left part
      var end = [randomInt(start[0] + Math.ceil(y/2), y-1), randomInt(start[1] + Math.ceil(x/2), x-1)]
    } else { // right part
      var end = [randomInt(start[0] + Math.ceil(y/2), y-1), randomInt(0, start[1] - Math.ceil(x/2)-1)]//maybe add -1
    } 
  } else { // in lower part
    if (start[1] < x - start[1]) { // in left part
      var end = [randomInt(0, start[0]-Math.ceil(y/2)-1), randomInt(start[1] + Math.ceil(x/2), x-1)]
    } else { // right part
      var end = [randomInt(0, start[0]-Math.ceil(y/2)-1), randomInt(0, start[1]- Math.ceil(x/2)-1)]
    } 
  }
  // end = [2,12]
  // when "T" as proper coordinates place it in the array
  randomLvl[end[0]][end[1]] = "T"

  // function that randomly generates a path from "S" until it finds "T"
  function createPath(pos, dir) { //creat a random path depending of the direction given and the current start position of the path
    var tFound = false // if "T" has been found stop creating path ()
    if (dir == 1) { // if we go right
      randomPathLength = randomInt(0, x-pos[1]-1) // get a random number from 0 to the max distance between current postion and end of array
      var zbii = 0 // used to count how many Path tiles have been created to return a correct position if the loop doesn't reach the max j
      for (let j = pos[1]; j < pos[1]+randomPathLength+1; j++) {
        var findT = checkforT([pos[0],j]) // check if "T" is around the path we're creating
        var availablePath = checkForPath([pos[0],j]) // check if the path around currentPosition is "free" or obstructed by another path
        if (findT && availablePath) { 
          zbii++
          if (randomLvl[pos[0]][j]!= "S" && randomLvl[pos[0]][j]!= "T") { // if the currentPosition is not "T" or "S" create a Path block
            randomLvl[pos[0]][j] = "."
          }
        } else if (findT == false) { // if we find "T" stop the loop and creat two more path block on current postion and the next to finish the path
          if (randomLvl[pos[0]][j]!= "S" && randomLvl[pos[0]][j]!= "T") {
            randomLvl[pos[0]][j] = "."
          }
          if (randomLvl[pos[0]][j+1]!= "S" && randomLvl[pos[0]][j+1]!= "T") {
            randomLvl[pos[0]][j+1] = "."
          }
          var tFound = true
          break; // breaks loop when "T" is found
        } else {
          break; //breaks the loop when Path is obstructed
        }
      }
      if (tFound == false && availablePath == true) { // return the new position if the "break;" have not been used
        return [pos[0], pos[1]+randomPathLength]
      } else { // returns the new position if the loop was force stopped
        if (zbii>0) { // don't want to go out of index 
          return [pos[0],pos[1]+zbii-1]
        } else{
          return [pos[0],pos[1]]
        }
      }
    } else if (dir == 2) { //if we go left
      randomPathLength = randomInt(0, pos[1])
      var zbii = 0
      for (let j = pos[1]; j > pos[1]-randomPathLength-1; j--) {
        var findT = checkforT([pos[0],j])
        var availablePath = checkForPath([pos[0],j])
        if (findT && availablePath) {
          zbii++
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
        } else {
          break;
        }
      }
      if (tFound == false && availablePath == true) {
        return [pos[0], pos[1]-randomPathLength]
      } else {
        if (zbii>0) {
          return [pos[0], pos[1]-zbii+1]
        } else {
          return [pos[0], pos[1]]
        }
      }
    } else if (dir == 3) { //if we go up
      randomPathLength = randomInt(0, pos[0])
      var zbii = 0
      for (let i = pos[0]; i > pos[0]-randomPathLength-1; i--) {
        var findT = checkforT([i,pos[1]])
        var availablePath = checkForPath([i,pos[1]])
        if (findT && availablePath) {
          zbii++
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
        } else {
          break;
        }
      }
      if (tFound == false && availablePath == true) {
        return [pos[0]-randomPathLength, pos[1]]
      } else {
        if (zbii>0) {
          return [pos[0]-zbii+1, pos[1]]
        } else {
          return  [pos[0], pos[1]]
        }
      }
    } else if (dir == 4) { //if we go down
      var randomPathLength = randomInt(0, y-1-pos[0])
      var zbii = 0
      for (let i = pos[0]; i < pos[0]+randomPathLength+1; i++) {
        var findT = checkforT([i,pos[1]])
        var availablePath = checkForPath([i,pos[1]])
        if (findT && availablePath) {
          zbii++
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
        } else {
          break;
        }
      }
      if (tFound == false && availablePath == true) {
        return [pos[0]+randomPathLength, pos[1]]
      } else {
        if (zbii>0) {
          return [pos[0]+zbii-1, pos[1]]
        } else {
          return [pos[0], pos[1]]
        }
      }
    } else { // helpful comment to tell me that I somehow fucked up something that I shouldn't be able to fuck up
      console.log("ayoo there's a problem bro");
    }
    if (tFound) { // finally if "T" was found return a boolean instead of an array
      return false
    }
  }
  //set the original position of "S" to currentPath to start building the path from "S"
  var currentPos = start
  
  //check if path ahead is free or not
  //beautiful function that tells another function what it should check depending on where the currentPos is
  //in other words if we are near the border of array (because yes I made it so everything can be generated near the border of the array instead of putting an actual border that can't be crossed. All that because in the first level there's a Path that goes to the border of the array)
  //don't check out of the array (ex: if we are in [0,0] we don't check from [-1,-1] to [1,1] but from [0,0] to [1,1] )
  function checkForPath(coord) { //checks if the path ahead is clear
    var findPath = true
    if (coord[0] != 0 && coord[0] != y - 1 && coord[1] != 0 && coord[1] != x - 1){
      // in the middle not near the border of the array
      findPath = loopThingForPath(-1,2,-1,2,findPath,0)
    } else if (coord[0] == 0 && coord[1] == 0 ){
      // top left corner
      findPath = loopThingForPath(0,2,0,2,findPath,5)
    } else if (coord[0] == 0 && coord[1] == x-1){
      //top right corner
      findPath = loopThingForPath(0,2,-1,1,findPath,5)
    } else if (coord[0] == 0 && coord[1] > 0 && coord[1] < x-1){
      // top of the array
      findPath = loopThingForPath(0,2,-1,2,findPath,3)
    } else if (coord[0] > 0 && coord[0] < y-1 && coord[1] == x-1){
      // right of the array
      findPath = loopThingForPath(-1,2,-1,1,findPath,3)
    } else if (coord[0] == y-1 && coord[1] == x-1){
      // bottom right corner
      findPath = loopThingForPath(-1,1,-1,1,findPath,5)
    } else if (coord[0] == y-1 && coord[1] < x-1 && coord[1] > 0){
      // bottom of the array
      findPath = loopThingForPath(-1,1,-1,2,findPath,3)
    } else if (coord[0] == y-1 && coord[1] == 0){
      //bottom left corner
      findPath = loopThingForPath(-1,1,0,2,findPath,5)
    } else if (coord[0] < y-1 && coord[0] > 0 && coord[1] == 0){
      //left of the array
      findPath = loopThingForPath(-1,2,0,2,findPath,3)
    } else {
      console.log("huh oh you made a mistake again ");
    }
    //a,b,c,d are the compensation to adjust what should be checked depending on the position that is being checked
    //restart is a boolean that tells if we should stop the path or continue if it's clear
    //compensation is the number of tiles that are not being checked because we are near the border of the array (there should always be 9 tiles around the currentPos but in the corner only 4 tiles are being checked so compensation is 5(number of tiles that don't exist))
    function loopThingForPath (a,b,c,d,restart,compensation) {
      var path = 0 //confusing name should be "wall"
      for (let i = coord[0] + a; i < coord[0]+b; i++) {
        for (let j = coord[1]+c; j < coord[1]+d; j++) {
          if (randomLvl[i][j] == "*"){ //check around the currentPos if it's wall
            path++
          }
        }
      }
      //finally if path (or rather the number of walls around currentPos) is bigger than 5 (this number goes down if we can not find "T") path is clear
      //maxCoef = 5 but goes down if we can't find "T" to make the generation less strict stops at 2 otherwise generation goes crazy 
      if (path + compensation > maxCoef) { 
        restart = true
      } else {
        restart = false
      }
      return restart
    }
    return findPath
  }

  function checkforT(posOfT){ //exact same function as above but just checking if "T" is around currentPOs
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
      var stop = true // using this instead of "break" (because it's garbage and we should never use it) to stop the loops when we find "T"
      if (stop) { // this is probably useless
        for (let i = posOfT[0] + a; i < posOfT[0]+b; i++) {
          if (stop) {
            for (let j = posOfT[1]+c; j < posOfT[1]+d; j++) {
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
  //initate the variable before it's called
  var findT = true

  //orignial loop below could be infinite

  /*while(findT){
    var direction = randomInt(1, 4)
    currentPos = createPath(currentPos, direction)

    if (currentPos == false) {
      findT = false
    }
  }*/

  function reduceCoef(x){ //reduces the difficulty of creating a path if it takes too long to find "T"
    if (x < 4) {
      maxCoef = (5 - x)
    } else {
      maxCoef = 2
    }
  }
  
  //original fix to infinite loop was to force stop it and creat a manual path from "S" to "T"
  function createPathToEnd() {
    for (let i = start[0]; i <= end[0]; i++) {
      for (let j = start[1]; j <= end[1]; j++) { 
        if (i == start[0] || j == end[1]) {
          if (randomLvl[i][j] !=  "T" && randomLvl[i][j] !=  "S") {
            randomLvl[i][j] = "."
          }
        }
      }
    }
  }
  
  //initiate variables for the main function that creates the path
  var testing = 0 //could be named "numPathCreated"
  var coefReduction = 0
  var maxCoef = 5 

  //choose a direction, create a Path from it and the current position (originally equal to "S" position)
  //If after creating 1000 Paths you didn't find "T" reduce the difficulty of the PathCreation and reset the amount of path created back to 0
  //finally if after max reduction of difficulty and 1000*500 path created you didn't find "T" (yes it happens I suck at this path creating business)
  //stop the loop and recall the function to create new maze (recalls itself until a suitable maze is created)
  while(testing < 1000 && findT){
    testing++
    var direction = randomInt(1, 4)
    currentPos = createPath(currentPos, direction)
    if (testing == 1000) {
      coefReduction++
      reduceCoef(coefReduction)
      testing = 0
      if (coefReduction > 500) {
        randomLvl = createMaze()
        findT = false 
        console.log("infinite loop stopped");
      }
    }
    if (currentPos == false) { // if "T" is found stop the loop
      findT = false
    }
  }
  //create a Random Path starting at random point to fill the maze with more paths
  function createRandomPath() {
    var testing = 0
    var currentPos = [randomInt(0, y-1), randomInt(0, x-1)]
    while(testing < 100){
      testing++
      var direction = randomInt(1, 4)
      currentPos = createPath(currentPos, direction)
    }
  }

  //initiate variables to check how much of the maze is path 
  var totalBlocks = x*y
  var total = 0

  //function that calculates the amount of non-wall type elements in the maze (mostly path)
  function getTotal() {
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (randomLvl[i][j] != "*") {
          total++
        }
      }    
    }
    return total
  }

  //finally if path (or rather the number of walls around currentPos) is bigger than 5 (this number goes down if we can not find "T")
  total = getTotal() 
  //if total amount of path is smaller than 40% create a new random path
  while(total < Math.ceil(totalBlocks/2.5)){
    total = 0 //reset the total
    maxCoef = 5
    createRandomPath()
    total = getTotal() //check the new total
  }
  return randomLvl //finally return the new level created, what a journey!
}

// displays time it took and changes the level selected or creates a new one
function startNextLvl(lvl){
  getElapsedTime(time)
  if (lvl < levels.length) {
    var select = levels[lvl]
  } else if (lvl >= levels.length) {
    var select = createMaze()
  }
  return select; //returns an array
}

// Initiate the first level
var lvlSelected = startNextLvl(lvl)

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
      } else if (e == "E"){
        boxDiv.classList.add("box","enemy")
      }
  
      if (lvlHeight >= lvlLength){ // create the width and height of the game depending on how big the array is
        var viewHeight = (100/(lvlHeight + 2)).toString()
        document.querySelector("main div").style.padding = viewHeight + "vh";
        boxDiv.style.width = viewHeight + "vh";
        boxDiv.style.height = viewHeight + "vh";
      } else if (lvlHeight < lvlLength) { // does the same because problems with "vw" I couldn't figure out how to make it work (idea was to make the maze take the whole vh if it was "taller" or take the whole vw if "larger" (works but has issues with display when resizing the window))
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

// function that lets you move the "S" around the 2d array 
//("variable" to decide if we moving along x or y,"FirstVariable" used to check if we are at the beginnig or end of the array, last two are used for the displacement of the blocks(check the next block))
function moveAround(variable,FirstVariable,SecondVariable,ThirdVariable) {
  var stop = true // to stop the loops
  var valid = false // set default to false to signify end of the array
  for (let y = 0; y < lvlSelected.length; y++) {
    if (stop){
      for (let x = 0; x < lvlSelected[y].length; x++) {
        if (stop && lvlSelected[y][x] == "S"){ // if we find "S" then run the rest
          if (variable == "xAxis" && x != lvlSelected[0].length - FirstVariable) { // check if we are not at either end of x axis
            valid = true
          } else if (variable == "yAxis" && y != lvlSelected.length - FirstVariable) { // we are not at either end of y axis
            valid = true
          }
          //we could add here restarting the level if we collide with the enemy
          if (valid && lvlSelected[y+SecondVariable][x+ThirdVariable] != "*") { // check if the next block is not a wall (better than checking if it is a path because we need to find the end)
            if (lvlSelected[y+SecondVariable][x+ThirdVariable] == "T"){ // if it's the end increment the level and call the nextlevel
              lvl++
              lvlSelected = startNextLvl(lvl)
            } else{ //otherwise replace "S" with the next block and vice versa
              [lvlSelected[y][x], lvlSelected[y+SecondVariable][x+ThirdVariable]] = [lvlSelected[y+SecondVariable][x+ThirdVariable], lvlSelected[y][x]];
            }
            stop = false // we found "S" and did what we wanted (moved "S" or changed "lvl") so stop the loops (otherwise it keeps moving rigth or up)
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

//initiate the position of the enemy
var enemy = [0,0]
//get a random postion for it, check if it's in the path and not too close to "S"
//iterates itself until it finds a proper position
function createEnemi(){
  enemy = [randomInt(0, lvlSelected.length-1), randomInt(0, lvlSelected[0].length-1)]
  if (lvlSelected[enemy[0]][enemy[1]] == "." && Math.abs(enemy[0]-start[0]) > Math.ceil(lvlSelected.length/4) &&  Math.abs(enemy[1]-start[1]) > Math.ceil(lvlSelected[0].length/4)) {
    lvlSelected[enemy[0]][enemy[1]] = "E"
  } else {
    createEnemi()
  }
}
createEnemi()

console.log("direction 1 == right");
console.log("direction 2 == left");
console.log("direction 3 == up");
console.log("direction 4 == down");
//initiate the first maze to be desplayed
displayMaze()

//randomly move the enemy around
function moveE() {
  var pathUnavailable = true
  //check if the path chosen is availabe otherwise we have to wait 300ms again for it to choose a path that can be going into a wall
  while (pathUnavailable) {
    var directionE = randomInt(1,4)
    if (directionE == 1 && enemy[1] != x-1) {
      if (lvlSelected[enemy[0]][enemy[1]+1] == ".") {
        [lvlSelected[enemy[0]][enemy[1]], lvlSelected[enemy[0]][enemy[1]+1]] = [lvlSelected[enemy[0]][enemy[1]+1], lvlSelected[enemy[0]][enemy[1]]];
        enemy = [enemy[0],enemy[1]+1]
        pathUnavailable = false
      }
    } else if (directionE == 2 && enemy[1] != 0) {
      if (lvlSelected[enemy[0]][enemy[1]-1] == ".") {
        [lvlSelected[enemy[0]][enemy[1]], lvlSelected[enemy[0]][enemy[1]-1]] = [lvlSelected[enemy[0]][enemy[1]-1], lvlSelected[enemy[0]][enemy[1]]];
        enemy = [enemy[0],enemy[1]-1]
        pathUnavailable = false
      }
    } else if (directionE == 3 && enemy[0] != 0) {
      if (lvlSelected[enemy[0]-1][enemy[1]] == ".") {
        [lvlSelected[enemy[0]][enemy[1]], lvlSelected[enemy[0]-1][enemy[1]]] = [lvlSelected[enemy[0]-1][enemy[1]], lvlSelected[enemy[0]][enemy[1]]];
        enemy = [enemy[0]-1,enemy[1]]
        pathUnavailable = false
      }
    } else if (directionE == 4 && enemy[0] != y-1) {
      if (lvlSelected[enemy[0]+1][enemy[1]] == ".") {
        [lvlSelected[enemy[0]][enemy[1]], lvlSelected[enemy[0]+1][enemy[1]]] = [lvlSelected[enemy[0]+1][enemy[1]], lvlSelected[enemy[0]][enemy[1]]];
        enemy = [enemy[0]+1,enemy[1]]
        pathUnavailable = false
      }
    }
  }
  // re-display the maze when the enemy moved (not very efficient but I have no idea how to fix this)
  displayMaze()
}
//finally move the enemy every 300ms
setInterval(moveE, 300);
