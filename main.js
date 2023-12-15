class Button {
    constructor(innerHTML, className, callBack) {
        this.innerHTML = innerHTML;
        this.className = className;
        this.buttonElement = this.createButton();
        this.callBack = callBack;
        this.onClick();
    }

    createButton() {
        let button = document.createElement('button');
        button.innerHTML = this.innerHTML;
        button.className = this.className;
        button.style.width = "300px";
        return button;
    }

    onClick() {
        this.buttonElement.addEventListener('click', () => this.callBack());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Create main menu container.
    let mainMenuContainer = document.createElement('div');
    mainMenuContainer.className = "main-menu-container";
    mainMenuContainer.style.display = "flex";
    mainMenuContainer.style.flexDirection = "row";
    mainMenuContainer.style.border = "1px solid black";
    mainMenuContainer.style.flexWrap = "nowrap";
    mainMenuContainer.style.justifyContent = "space-between";
    mainMenuContainer.style.backgroundColor = "antiquewhite";
    mainMenuContainer.style.height = "40px";
    // Create game board container wrapper.
    let gameBoardContainerWrapper = document.createElement('div');
    gameBoardContainerWrapper.className = "game-board-container-wrapper";
    gameBoardContainerWrapper.style.border = "1px solid black";
    gameBoardContainerWrapper.style.height = "92vh";
    gameBoardContainerWrapper.style.backgroundColor = "aliceblue";
    gameBoardContainerWrapper.style.marginTop = "10px";
    // Create game board container.
    let gameBoardContainer = document.createElement('div');
    gameBoardContainer.className = "game-board-container";
    gameBoardContainer.style.border = "1px solid black";
    gameBoardContainer.style.backgroundColor = "rgb(91, 174, 246)";
    gameBoardContainer.style.height = "90vh";
    gameBoardContainer.style.marginTop = "8px";
    gameBoardContainer.style.marginLeft = "8px";
    gameBoardContainer.style.marginRight = "8px";
    gameBoardContainer.style.position = "relative";
    // Append game board container to its wrapper.
    gameBoardContainerWrapper.appendChild(gameBoardContainer);
    // Append containers to the body.
    document.body.appendChild(mainMenuContainer);
    document.body.appendChild(gameBoardContainerWrapper);
    // Create new game button and append it to the container.
    const newGameButton = new Button("New Game", "btn", () => this.createPuzzlePieces(4, 8));
    document.querySelector('.main-menu-container').appendChild(newGameButton.buttonElement);
    // create exit game button and append it to the container.
    const exitGameButton = new Button("Exit", "btn", () => this.redirect());
    document.querySelector('.main-menu-container').appendChild(exitGameButton.buttonElement);
});

function redirect() {
    window.location.href = 'https://www.google.com';
}

function excludeDraggedPiece(pieces, draggedPiece) {
    return Array.from(pieces).filter(piece => piece !== draggedPiece); // converting the Nodelist to an array to use the array methods so we can use the filter method. 
}

function findPieceNextDoor(left, top, pieceWidth, pieceHeight, draggedPiece) {
    const pieces = document.querySelectorAll('.puzzlePiece');
    const pieceLeft = parseInt(left, 10);
    const pieceTop = parseInt(top, 10);
    let nextDoorPiece = null;
    const arrPieces = excludeDraggedPiece(pieces, draggedPiece);
    const centerX = pieceLeft + (parseInt(pieceWidth, 10) / 2);
    //console.log("🚀 ~ file: main.js:16 ~ findPieceNextDoor ~ centerX:", centerX)
    const centerY = pieceTop + (parseInt(pieceHeight, 10) / 2);
    //console.log("🚀 ~ file: main.js:18 ~ findPieceNextDoor ~ centerY:", centerY)

    arrPieces.forEach((piece) => {
        const pieceX = parseInt(piece.style.left, 10);
        //console.log("🚀 ~ file: main.js:22 ~ arrPieces.forEach ~ pieceX:", pieceX)
        const pieceY = parseInt(piece.style.top, 10);
        //console.log("🚀 ~ file: main.js:24 ~ arrPieces.forEach ~ pieceY:", pieceY)
        // Check if the center of the dragged piece is within the bounds of another piece
        if (centerX > pieceX && centerX < pieceX + parseInt(pieceWidth, 10) && centerY > pieceY && centerY < pieceY + parseInt(pieceHeight, 10)) {
            nextDoorPiece = piece;
            return; // We found the adjacent piece, exit the loop
        }
    });

    return nextDoorPiece; // This will be null if no adjacent piece is found
}


function createPuzzlePieces(rows, cols) {
    let gameBoardContainer = document.querySelector(".game-board-container");
    const containerWidth = gameBoardContainer.offsetWidth;
    const containerHeight = gameBoardContainer.offsetHeight;
    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;
    // Clear the game board container before creating new pieces.
    gameBoardContainer.innerHTML = '';
    // crate the puzzle pieces according to the rows and cols.
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const piece = document.createElement('div');
            piece.className = 'puzzlePiece';
            piece.style.left = `${j * pieceWidth}px`;
            piece.style.top = `${i * pieceHeight}px`;
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.style.border = '1px solid black';
            piece.style.position = 'absolute';
            piece.style.backgroundImage = "url('https://i.postimg.cc/52nJ1Vtm/image.jpg')";
            piece.style.backgroundSize = `${containerWidth}px ${containerHeight}px`;
            piece.style.backgroundPosition = `-${j * pieceWidth}px -${i * pieceHeight}px`; // Multiplying j by pieceWidth gives the distance from the left edge of the image to the left edge of the current piece's part.
            // The negative sign (-) is used to shift the background image to the left by this distance, ensuring the correct part of the image appears in each piece.
            gameBoardContainer.appendChild(piece);
        }
    }
    makeDraggable();
}

// logic to implement the dragging actions.
function makeDraggable() {
    const pieces = document.querySelectorAll('.puzzlePiece');
    let draggedPiece = null;
    let offsetX = 0;
    let offsetY = 0;
    let originalX = null;
    let originalY = null;

    pieces.forEach(piece => {
        piece.addEventListener('mousedown', function (e) {
            draggedPiece = this;
            originalX = draggedPiece.style.left;
            originalY = draggedPiece.style.top;
            offsetX = e.clientX - parseInt(draggedPiece.style.left, 10);
            offsetY = e.clientY - parseInt(draggedPiece.style.top, 10);
            draggedPiece.style.zIndex = 1000;
        });

        piece.addEventListener('mouseup', function () {
            if (draggedPiece) {
                draggedPiece.style.zIndex = '';
                draggedPiece = null;
            }
        });
    });

    // Listen to mousemove on the entire container to handle dragging.
    document.querySelector('.game-board-container').addEventListener('mousemove', function (e) {
        if (draggedPiece) {
            draggedPiece.style.left = e.clientX - offsetX + 'px';
            draggedPiece.style.top = e.clientY - offsetY + 'px';

            const pieceNextDoor = findPieceNextDoor(originalX, originalY, draggedPiece.style.width, draggedPiece.style.height, draggedPiece);
            if (pieceNextDoor) {
                // Move the piece next door to where the dragged piece started
                pieceNextDoor.style.left = originalX;
                pieceNextDoor.style.top = originalY;
            }
        }
    });
}

