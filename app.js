let boxes=document.querySelectorAll(".box");
let resetbutton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#New-button");
let messagecontainer = document.querySelector(".message-container");
let message = document.querySelector("#message");

let turn0 = true;
let count = 0;//to track draw

const winPatterns = [
   [0, 1, 2],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 5, 8],
   [2, 4, 6],
   [3, 4, 5],
   [6, 7, 8],
];

const resetGame = () => {
    turn0= true;
    enableBoxes();
    messagecontainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
       if(turn0){
        box.innerText = "O";
        //player O 
        turn0 = false;
       }else {
        //player X
        box.innerText ="X";
        turn0 = true;
       }
       box.disabled = true;
       count++;

       let isWinner = checkWinner();
       if(count === 9 && !isWinner){
        gameDraw();
       }
    });
});

const gameDraw = () => {
    message.innerText = `Game was a draw.`;
    messagecontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText= "";
    }
};

const showWinner =(winner) => {
    console.log("Winner");
    message.innerText  = `Congratulations , Winner is ${winner}`;
    messagecontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        //console.log(pattern[O],pattern[1],pattern[2]);
        //console.log(
            //boxes [pattern[O]].innerText,
            //boxes [pattern[1]].innerTex,
            //boxes [pattern[2]].innerTex
        //);
         let pos1val = boxes [pattern[0]].innerText;
         let pos2val = boxes [pattern[1]].innerText;
         let pos3val = boxes [pattern[2]].innerText;
         if(pos1val != "" && pos2val != "" && pos3val != ""){
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
         }
    }
};

newGameButton.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);