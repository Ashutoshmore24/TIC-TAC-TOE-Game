let boxes = document.querySelectorAll(".box");
let resetbtn = document.getElementById("reset");
let newGameBtn = document.getElementById("newGame");
let message = document.querySelector(".msg");
let messageContainer = document.querySelector(".msg-container");

let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

//disable all boxes
const disableAllBoxes = () => boxes.forEach(box => box.disabled = true);

//enable all boxes
const enableAllBoxes = () => boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
});

const showWinner = (winner) => {
    console.log("Winner : ", winner);
    message.innerText = `Congratulation ! Winner is ${winner}`;
    messageContainer.classList.remove('hide');
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "" &&
            pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }

    // Draw check
    let allFilled = true;
    boxes.forEach(box => {
        if (box.innerText === "") allFilled = false;
    });
    if (allFilled && !gameOver) {
        message.innerText = "It's a Draw!";
        messageContainer.classList.remove("hide");
        gameOver = true;
    }
};

// Box click handlers
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        box.disabled = true;
        checkWinner();
    });
});

// Both buttons for reset logic
const resetGame = () => {
    enableAllBoxes();
    turnO = true;
    gameOver = false;
    message.innerText = "";
    messageContainer.classList.add("hide");
};

resetbtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);