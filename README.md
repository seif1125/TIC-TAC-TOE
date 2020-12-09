# TIC-TAC-TOE

-this is javascript project developing a TIC-TAC-TOE game 


-the main purpose of this project is applying an algorithm making
the AI player unbeatable


-based on the knowledge of minimax algorithm we developed an improved algorithm
as this algorithm do these steps:-

# 1-check if the center spot (index 4) is not taken to take it(for AI first play only)
# 2- if spot is taken then we play one of the four corners of the board(for AI first play only)
# 3- check in every empty spot if this move by AI will lead to win.
# 4- check in every empty spot if this move by human will lead to lose.
# 5- if not steps(3 & 4) then get all possible winning axis and lose axis by Ai
# 6- get the spot which is intersected the most by these axis
# 7-choose this spot as optimal move(lead to win & avoid loss)

-this algorithm aims to reduce the number of recursions in minimax 



    
