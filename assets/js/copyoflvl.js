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

var div = document.createElement("div")
// var script = document.querySelector("script")
document.querySelector("body").insertBefore(div, document.querySelector("script"))
var _initTime = Date.now()

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function getElapsedTime(){
  return Number((Date.now() - _initTime) / 1000).toFixed(2) + 's'
}

function timeToFinish() {
  var time = getElapsedTime()
  div.innerText = "You took " + time + " seconds to finish the last maze"
  var _initTime = Date.now()
  return _initTime;
}
function createMaze(){
  var x = randomInt(15,30)
  var y = randomInt(15,30)
  // var x = 10
  // var y = 10
  var randomLvl = []
  //create 2d array
  for (let i = 0; i < y; i++) {
    randomLvl.push([])
    for (let j = 0; j < x; j++) {
      randomLvl[i].push("*")
    }
  }
  //add start
  var start = [randomInt(0, y-1), randomInt(0, x-1)]
  // var start = [1,1]
  randomLvl[start[0]][start[1]] = "S"
  //add end
  //function that checks if "T" is around "S" and returns true/false to change T if is around S 
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
                // if (randomLvl[i][j] != "S"){
                //   randomLvl[i][j] = "."
                // }
              }
            }
          }
        }
      }
    }
    return restart
  }

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
  // var end = [8,0]
  randomLvl[end[0]][end[1]] = "T"


  function createPath(pos, dir) {
    var tFound = false
    // console.log(pos, dir);
    if (dir == 1) {
      randomPathLength = randomInt(0, x-pos[1]-1)
      // console.log(x-1-pos[1] , randomPathLength);
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
      // console.log(pos[1] , randomPathLength);
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

var levels = [LEVEL_1,LEVEL_2,LEVEL_3]
// var lvlSelected = LEVEL_1
var lvl = 0
function startNextLvl(lvl){
  var select = levels[lvl]
  if (lvl >= 3) {
    var select = createMaze()
  }
  return select;
}
lvlSelected = startNextLvl(lvl)

var main = document.querySelector("main")
var containerDiv = document.createElement("div")
containerDiv.classList.add("container","flex-column")
main.appendChild(containerDiv)

function deleteMaze(){
  // console.log(containerDiv.innerHTML);
  containerDiv.innerHTML = ""
}

function displayMaze(){
  var lvlHeight = lvlSelected.length
  var lvlLength = lvlSelected[0].length
  if (containerDiv.innerHTML != ""){
    deleteMaze()
  }
  for (let i = 0; i < lvlSelected.length; i++) {
    var lineDiv = document.createElement("div")
    lineDiv.classList.add("line","flex")
    containerDiv.appendChild(lineDiv)
  
    lvlSelected[i].forEach(e => {
      var boxDiv = document.createElement("div")
      if (e == "*"){
        boxDiv.classList.add("box","wall")
      } else if (e == "."){
        boxDiv.classList.add("box","path")
      } else if (e == "S"){
        boxDiv.classList.add("box","start")
      } else if (e == "T"){
        boxDiv.classList.add("box","end")
      }
  
      if (lvlHeight >= lvlLength){
        var viewHeight = (100/(lvlHeight + 2)).toString()
        document.querySelector("main div").style.padding = viewHeight + "vh";
        boxDiv.style.width = viewHeight + "vh";
        boxDiv.style.height = viewHeight + "vh";
      } else if (lvlHeight < lvlLength) {
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



function moveUp(){
  var stop = true
  if (stop){
    for (let y = 0; y < lvlSelected.length; y++) {
      if (stop){
        for (let x = 0; x < lvlSelected[y].length; x++) {
          if (stop){
            if (lvlSelected[y][x] == "S"){
              if (y != 0){
                if (lvlSelected[y-1][x] != "*"){
                  if (lvlSelected[y-1][x] == "T"){
                    lvl++
                    lvlSelected = startNextLvl(lvl)
                  } else{
                    [lvlSelected[y][x], lvlSelected[y-1][x]] = [lvlSelected[y-1][x], lvlSelected[y][x]];
                    // break;
                  }
                  stop = false
                }
              }
            }
          }
        }
      }
    }
  }
}



function moveDown(){
  var stop = true
  if (stop){
    for (let y = 0; y < lvlSelected.length; y++) {
      if (stop){
        for (let x = 0; x < lvlSelected[y].length; x++) {
          if (stop){
            if (lvlSelected[y][x] == "S"){
              if (y != lvlSelected.length-1){
                if (lvlSelected[y+1][x] != "*"){
                  if (lvlSelected[y+1][x] == "T"){
                    lvl++
                    lvlSelected = startNextLvl(lvl)
                  } else{
                    [lvlSelected[y][x], lvlSelected[y+1][x]] = [lvlSelected[y+1][x], lvlSelected[y][x]];
                  }
                  stop = false
                }
              }
            }
          }
        }
      }
    }
  }
}
function moveRight(){
  var stop = true
  if (stop){
    for (let y = 0; y < lvlSelected.length; y++) {
      if (stop){
        for (let x = 0; x < lvlSelected[y].length; x++) {
          if (stop){
            if (lvlSelected[y][x] == "S"){
              if (x != lvlSelected[y].length-1){
                if (lvlSelected[y][x+1] != "*"){
                  if (lvlSelected[y][x+1] == "T"){
                    lvl++
                    lvlSelected = startNextLvl(lvl)
                  } else{
                    [lvlSelected[y][x], lvlSelected[y][x+1]] = [lvlSelected[y][x+1], lvlSelected[y][x]];
                  }
                  // break;
                  stop = false
                }
              }
            }
          }
        }
      }
    }
  }
}
function moveLeft(){
  var stop = true
  if (stop){
    for (let y = 0; y < lvlSelected.length; y++) {
      if (stop){
        for (let x = 0; x < lvlSelected[y].length; x++) {
          if(stop){
            if (lvlSelected[y][x] == "S"){
              if (x != 0){
                if (lvlSelected[y][x-1] != "*"){
                  if (lvlSelected[y][x-1] == "T"){
                    lvl++
                    lvlSelected = startNextLvl(lvl)
                  } else{
                    [lvlSelected[y][x], lvlSelected[y][x-1]] = [lvlSelected[y][x-1], lvlSelected[y][x]];
                  }
                  stop = false
                }
              }
            }
          }
        }
      }
    }
  }
}
// function moveLeft(){
//   for (let y = 0; y < lvlSelected.length; y++) {
//     for (let x = 0; x < lvlSelected[y].length; x++) {
//       if (lvlSelected[y][x] == "S"){
//         if (x != 0){
//           if (lvlSelected[y][x-1] != "*"){
//             [lvlSelected[y][x], lvlSelected[y][x-1]] = [lvlSelected[y][x-1], lvlSelected[y][x]];
//             break;
//           }
//         }
//       }
//     }
//   }
// }


document.addEventListener('keyup', e => {
  if (e.code === 'KeyW' || e.code === "ArrowUp") {
    moveUp()
    displayMaze()
  } else if (e.code === "KeyS" || e.code === "ArrowDown"){
    moveDown()
    displayMaze()
  } else if (e.code === "KeyA" || e.code === "ArrowLeft"){
    moveLeft()
    displayMaze()
  } else if (e.code === "KeyD" || e.code === "ArrowRight"){
    moveRight()
    displayMaze()
  }
})
displayMaze()


