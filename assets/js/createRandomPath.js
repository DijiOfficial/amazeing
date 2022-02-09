// I need to import the global variables from mazes.js so didn't bother to link them together
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

export default createMaze()