function createPuzzlePieces(rows, cols) {
    let gameBoardContainer = document.querySelector(".game-board-container")
    const containerWidth = gameBoardContainer.offsetWidth;
    const containerHeight = gameBoardContainer.offsetHeight;
    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

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
}

function closeWindow() {
    window.close();
}