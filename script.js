//declaring variables
let board;
const AiPlayer={
    name:'AI',
	letter:'O',
}
const humanPlayer={
    name:'YOU',
	letter:'X',
}

let humanturn=true;

let AIscore=0;
let humanscore=0;


const winningAxis=
			[
				[0,1,2],
				[3,4,5],
				[6,7,8],
				[0,3,6],
				[1,4,7],
				[2,5,8],
				[2,4,6],
				[0,4,8],
			];

const cells=document.querySelectorAll(".cell");
document.querySelector(".AIscorepoints").innerHTML=AIscore;
document.querySelector(".humanscorepoints").innerHTML=humanscore;
startGame();

function resetGame(){
    humanscore=0;
    AIscore=0;
    startGame()
}
function startGame(){

    board=Array.from(Array(9).keys());
    clearGameBoard();
}

function clearGameBoard(){

    document.querySelector('.winnertextmodal').className='winnertextmodal'
    document.querySelector(".AIscorepoints").innerHTML=AIscore;
document.querySelector(".humanscorepoints").innerHTML=humanscore;

    for(var i=0;i<cells.length;i++){
        cells[i].innerHTML=' ';
        cells[i].className='cell'
        cells[i].addEventListener('click',handleChoosenbox,false)
        humanturn=true;
    }
} 

function handleChoosenbox(square){
    if(humanturn&& cells[square.target.id].innerHTML==' '){
    cells[square.target.id].innerHTML=humanPlayer.letter;
    board[square.target.id]=humanPlayer.letter;
    checkWinner(board,humanPlayer)
    }
}

function checkWinner(board,player){
    
    let playedspots=board.reduce((acc,ele,index)=>

        (ele===player.letter)? acc.concat(index):acc,[]);
        console.log(playedspots)

        for(let[index,winningcombo] of winningAxis.entries()){

            if(winningcombo.every(ele=>playedspots.includes(ele))){        
            
                   declareWinner(winningcombo,player)
            }
            
        }
    }

    function declareWinner(winningcombo,player){ 
       setWinSpotsStyle(winningcombo)
       showWinnerModal();
       updateScoreof(player)
      setTimeout(()=>{startGame()},900)
    }

    function updateScoreof(player){

        if(player===humanPlayer){
        humanscore+=1;
        }
        else{
            AIscore+=1
        }

        
    }

    function setWinSpotsStyle(winningcombo){

        for(let x=0;x<winningcombo.length;x++){
            cells[winningcombo[x]].className='winspots'
        }  
    }
    
    function showWinnerModal(){
        document.querySelector('.winnertextmodal').className=document.querySelector('.winnertextmodal').classList+" "+"winnertextmodal-animation"
        console.log(document.querySelector('.winnertextmodal').classList)
    
    }
