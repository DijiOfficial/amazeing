# Summary of the project

Here's a quick overview of the know issues and bugs that haven't been fixed yet, as well as the ideas not fully implemented yet.

    - Lots of repeating code that hasn't been turned into functions or loops
    - The code is not very optimised and can be quite hard to understand
    - Most functions use global variables to work, so importing them from other js files would mean importing the global variables from the main file to theirs first (not done)
    - There is only one "enemy"
    - The "enemy" only appears in the first level and doesn't path-find towards you when in sight (random AI)
    - Collision with the "enemy" doesn't stop or restart the level it just causes an error
    - The automatic level generator takes in too much "randomness" which causes issues with generation :
        - Infinite loops (fixed by stopping the generation if it takes too long and restarting it, but causes "lag")
        - x and y variables (length and height of new level) have been fixed for testing purposes but seem to break the generation when going back to random
        - Can sometimes go out of index when generating which causes an error (could be fixed with a "try .. except")(or finding out why it goes out of index)
        - Some of the generated path may not connect to anything (can be fixed my changing "maxCoef" (line.452) from 5 to 4)
    - The "saving a level" button has not been implemented but adding them to the array of levels from the .json file should not be a problem
    - Time is displayed below the maze which takes 100vh, so you have to scroll to see the time
    - No score added yet

Overall had a lot of fun making it, hopefully I do learn more about coding as to improve my style and efficiency. I will enventually come back to it when I have sufficent knowledge to make it better!


# AMAZEing

Let's build a simple Maze program. You start from a defined position, you're supposed to get the treasure.

- Type of challenge: **consolidation**  
- Duration: **1-2 days**  
- Team challenge: **solo**


## Learning objectives

- Using loops and the DOM to generate simple templates. 
- Using keyboard events
- Think of problems as algorithms

## The mission

- Create a new repository named `amazeing`
- Create a new javascript file.
- Create a file named `index.html`. In the `<body>` you can only put an empty `<main>` tag, and the link to your javascript file. The rest of the app has to be generated using your script
- Use [this file](assets/js/mazes.js) as a reference to build a maze. `*` are walls, `.` are paths, `S` is the starting point of the player and `T` is the treasure you should reach in order to end the game. 
- Create a `maze.css` file, you'll have to create styles for the 2 types of terrain (walls and paths), it can be simple background colors for starter.
- Using the keyboard you can navigate in the maze (you can only stay on paths, you cannot cross walls)


The first level looks like this (starting as a red tile, treasure as a yellow tile)

![maze](assets/img/map.png)

## BONUS

- Try to implement the next levels, so when you finished a maze a new one pops up.
- You could also create levels of your own
- Display the time spent to solve the maze
- Make it pretty!
