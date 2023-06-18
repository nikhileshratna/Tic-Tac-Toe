const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game

function initGame(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `CurrentPlayer - ${currPlayer}`;

    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win"); 
    })
}

initGame();

function swapTurn(){
    if(currPlayer === "X"){
        currPlayer = "O";
    }
    else{
        currPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) =>{
        if( (gameGrid[position[0]] != "" && gameGrid[position[1]] != "" && gameGrid[position[2]] != "" 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))){

            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //disable pointer events
            boxes.forEach( (box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //check tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== "")
            fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!"
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeeta toh nahi
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click" , () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click" , initGame);

