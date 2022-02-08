  function checkforT(){
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