//serves to test some things in js
function checkForPath(coord) {
  if (coord[0] != 0 && coord[0] != y - 1 && coord[1] != 0 && coord[1] != x - 1){
    // in the middle
    findPath = loopThingForPath(-1,2,-1,2,findPath)
  } else if (coord[0] == 0 && coord[1] == 0 ){
    // top left
    findPath = loopThingForPath(0,2,0,2,findPath)
  } else if (coord[0] == 0 && coord[1] == x-1){
    //top right
    findPath = loopThingForPath(0,2,-1,1,findPath)
  } else if (coord[0] == 0 && coord[1] > 0 && coord[1] < x-1){
    // top
    findPath = loopThingForPath(0,2,-1,2,findPath)
  } else if (coord[0] > 0 && coord[0] < y-1 && coord[1] == x-1){
    // right
    findPath = loopThingForPath(-1,2,-1,1,findPath)
  } else if (coord[0] == y-1 && coord[1] == x-1){
    // bottom right
    findPath = loopThingForPath(-1,1,-1,1,findPath)
  } else if (coord[0] == y-1 && coord[1] < x-1 && coord[1] > 0){
    // bottom
    findPath = loopThingForPath(-1,1,-1,2,findPath)
  } else if (coord[0] == y-1 && coord[1] == 0){
    //bottom left
    findPath = loopThingForPath(-1,1,0,2,findPath)
  } else if (coord[0] < y-1 && coord[0] > 0 && coord[1] == 0){
    //left
    findPath = loopThingForPath(-1,2,0,2,findPath)
  } else {
    console.log("huh oh you made a mistake again ");
  }
}