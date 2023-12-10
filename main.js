function excludeDraggedPiece(pieces, left, top) {
    return Array.from(pieces).filter(piece =>
        piece.style.left !== left || piece.style.top !== top);
}

function findPieceNextDoor(left, top, pieceWidth, pieceHeight) {
    const pieces = document.querySelectorAll('.puzzlePiece');
    const pieceLeft = parseInt(left, 10);
    const pieceTop = parseInt(top, 10);
    let nextDoorPiece = null;
    const arrPieces = excludeDraggedPiece(pieces, left, top);
    arrPieces.forEach((piece) => {
        const pieceX = parseInt(piece.style.left, 10);
        const pieceY = parseInt(piece.style.top, 10);
        // Check if piece is adjacent by comparing positions
        if (pieceTop >= (pieceX / 2)) {
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

    pieces.forEach(piece => {
        piece.addEventListener('mousedown', function (e) {
            draggedPiece = this;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            // Bring the dragged piece to the front.
            draggedPiece.style.zIndex = 1000;
        });

        piece.addEventListener('mouseup', function () {
            if (draggedPiece) {
                // Reset the z-index
                draggedPiece.style.zIndex = '';
                draggedPiece = null;
            }
        });
    });

    // Listen to mousemove on the entire container to handle dragging.
    document.querySelector('.game-board-container').addEventListener('mousemove', function (e) {
        if (draggedPiece) {
            const pieceNextDoor = findPieceNextDoor(draggedPiece.style.left, draggedPiece.style.top, draggedPiece.style.width, draggedPiece.style.height);
            console.log("🚀 ~ file: main.js:50 ~ pieceNextDoor:", pieceNextDoor)
            draggedPiece.style.left = e.clientX - offsetX + 'px';
            draggedPiece.style.top = e.clientY - offsetY + 'px';
            swapPieces(draggedPiece, pieceNextDoor, this);
        }
    });
}

// Function to swap positions of pieces.
function swapPieces(draggedPiece, pieceNextDoor) {
    console.log("🚀 ~ file: main.js:68 ~ swapPieces ~ pieceNextDoor:", pieceNextDoor)
    console.log("🚀 ~ file: main.js:68 ~ swapPieces ~ draggedPiece:", draggedPiece)
    // calculate the distance between the offsets of the two pieces and when the dragged piece reaches the median then the pieces swipes their offsets so that the pieces will be dragged outomatically to their places 
    // like in a android when you want to play with the positioning of the apps. 
}

function closeWindow() {
    window.close();
}

// X - 1415 / 8 = 176.875
// Y - 630 / 4 = 157.5 