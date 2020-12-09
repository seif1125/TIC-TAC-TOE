//declaring variables
var board;
let winningAxe;
const AiPlayer={
    name:'AI',
	letter:'O',
}
const humanPlayer={
    name:'YOU',
	letter:'X',
}

let humanTurn=true;

let AIScore=0;
let humanScore=0;

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
document.querySelector(".AIscorepoints").innerHTML=AIScore;
document.querySelector(".humanscorepoints").innerHTML=humanScore;
startGame();

function resetGame(){
    humanScore=0;
    AIScore=0;
    startGame()
}
function startGame(){
    board=Array.from(Array(9).keys());
    clearGameBoard();
}
function clearGameBoard(){

document.querySelector('.winnertextmodal').className='winnertextmodal'
document.querySelector(".AIscorepoints").innerHTML=AIScore;
document.querySelector(".humanscorepoints").innerHTML=humanScore;
humanTurn=true;
for(var i=0;i<cells.length;i++){
    cells[i].innerHTML=' ';
    cells[i].className='cell'
    cells[i].addEventListener('click',handleChoosenbox,false)
}

} 
function handleChoosenbox(square){ 
    if( humanTurn===true &&cells[square.target.id].innerHTML==' '){
        cells[square.target.id].innerHTML=humanPlayer.letter;
        board[square.target.id]=humanPlayer.letter;
        if(!gameTie()){
            if(!checkWinner(board,humanPlayer)) 
            {
                humanTurn=false;
                AIMove(board)
            }
            else{
                declareWinner(winningAxe,humanPlayer)
            }
        }
        else{
            declareWinner(winningAxe,null);
        }
    }    
}
function checkWinner(board,player){
    
    let playedspots=board.reduce((acc,ele,index)=>

        (ele===player.letter)? acc.concat(index):acc,[]);
        
    for(let[index,winningcombo] of winningAxis.entries()){
        if(winningcombo.every(ele=>playedspots.includes(ele))){      
            winningAxe=winningcombo;  
            return true;
        }
    }
    return false;
}
function AIMove(board){
        
    var move=optimalMove(board,AiPlayer)
    board[move]=AiPlayer.letter
    cells[move].innerHTML=AiPlayer.letter
    if(!gameTie()){
        if(!checkWinner(board,AiPlayer)){
            humanTurn=true;
        }
        else{
            declareWinner(winningAxe,AiPlayer)
        }
    }
    else{
        declareWinner(winningAxe,null)
    }
}
function optimalMove(newboard){
    let virtualboard=newboard
    if(getAvailableSpots(virtualboard).length>=8){
        if(getAvailableSpots(virtualboard).includes(4)){
            return 4
        }
        else{
            var arr=[0,2,8,6]  
            return arr[Math.floor(Math.random() * arr.length)];
        }
    }

    else{
        for(var x=0;x<getAvailableSpots(newboard).length;x++){
            let b=[...newboard]
            b[getAvailableSpots(newboard)[x]]=AiPlayer.letter
            if(checkWinner(b,AiPlayer)){ 
                return getAvailableSpots(newboard)[x]
            }
        }
        for(var x=0;x<getAvailableSpots(newboard).length;x++){
            let b=[...newboard]
            b[getAvailableSpots(newboard)[x]]=humanPlayer.letter
            if(checkWinner(b,humanPlayer)){ 
                return getAvailableSpots(newboard)[x]
            }
        }
    let possiblewinningaxis=new Array();
    let criticalspotsscore=new Array(getAvailableSpots(newboard).length).fill(0);
    for(var x=0;x<winningAxis.length;x++){
        
        if(newboard[winningAxis[x][0]]==' ' && newboard[winningAxis[x][1]]==' '&&newboard[winningAxis[x][2]]==' '){

        }
        else if(newboard[winningAxis[x][0]]=='X' || newboard[winningAxis[x][1]]=='X'||newboard[winningAxis[x][2]]=='X'){
            if(newboard[winningAxis[x][0]]!='O' && newboard[winningAxis[x][1]]!='O'&&newboard[winningAxis[x][2]]!='O'){   
                var tempaxis=possiblewinningaxis.slice()
                tempaxis.push(winningAxis[x])
                possiblewinningaxis=tempaxis
            }
        }
        else if(newboard[winningAxis[x][0]]=='O' || newboard[winningAxis[x][1]]=='O'||newboard[winningAxis[x][2]]=='O'){
            if(newboard[winningAxis[x][0]]!='X' && newboard[winningAxis[x][1]]!='X'&&newboard[winningAxis[x][2]]!='X'){
                var tempaxis=possiblewinningaxis.slice()
                tempaxis.push(winningAxis[x])
                possiblewinningaxis=tempaxis
            }
        }
    }
    for(var x =0;x<possiblewinningaxis.length;x++){
        for(var z=0;z<getAvailableSpots(newboard).length;z++){
            if(getAvailableSpots(newboard)[z]==possiblewinningaxis[x][0]||getAvailableSpots(newboard)[z]==possiblewinningaxis[x][1]||getAvailableSpots(newboard)[z]==possiblewinningaxis[x][2]){
                 criticalspotsscore[z]+=1
            }
        }
    }
        return getAvailableSpots(newboard)[criticalspotsscore.indexOf(Math.max(...criticalspotsscore))]
    }       
}
function getAvailableSpots(array){
    return  array.filter(spot => spot!='X'&&spot!='O')
}
function gameTie(){
    let tie=true;
    for(var x=0;x<cells.length;x++){
        if(cells[x].innerHTML==' '){
            tie=false;
        }
    }
    return tie;
}

function declareWinner(winningcombo,player){ 
    if(player){
    updateScoreof(player)
    setWinSpotsStyle(winningcombo)
    showWinnerModal(player.name); 
    }
    
    setTimeout(()=>{startGame()},900)
}

function updateScoreof(player){
    if(player===humanPlayer){
        humanScore+=1;
    }
    else{
        AIScore+=1
    }   
}

function setWinSpotsStyle(winningcombo){
    for(let x=0;x<winningcombo.length;x++){
        cells[winningcombo[x]].className='winspots'
    }  
}
    
function showWinnerModal(playername){
    document.querySelector('.winnertextmodal').innerHTML=playername+" Won";
    document.querySelector('.winnertextmodal').className=document.querySelector('.winnertextmodal').classList+" "+"winnertextmodal-animation"
}
