import React, { useState } from "react";
import "./App.css";

const Xsvg = () => (
  <svg
    className="marker"
    xmlns="http://www.w3.org/2000/svg"
    width="50px"
    height="50px"
    viewBox="0 0 24 24"
  >
    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
  </svg>
);

const Osvg = () => (
  <svg className="marker" height="100%" width="100%">
    <circle cx="50%" cy="50%" r="40" stroke="black" fill="white" />
  </svg>
);

function App() {
  const [gameStatus, setGameStatus] = useState({
    winner: false,
    turn: false,
  });

  const [gameBoard, setGameBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const dfs = (board, i, j, letter, direction, count) => {
    if (count === 3) {
      if (!gameStatus.winner) {
        setTimeout(() => {
          setGameStatus({ ...gameStatus, winner: true });
        }, 400);
      }
      return true;
    }
    if (i < 0 || i > board.length - 1 || j < 0 || j > board[i].length - 1) {
      return;
    }
    let horizontalCount = 0; //check board horizontally
    for (const mark of board[i]) {
      if (mark === letter) horizontalCount++;
    }
    if (horizontalCount === 3) {
      if (!gameStatus.winner) {
        setTimeout(() => {
          setGameStatus({ ...gameStatus, winner: true });
        }, 400);
      }
      return true;
    }

    if (board[i][j] === letter) {
      board[i][j] = "C";
      if (direction === "v") {
        dfs(board, i + 1, j, letter, "v", count + 1);
        dfs(board, i - 1, j, letter, "v", count + 1);
      } else {
        dfs(board, i + 1, j - 1, letter, "d", count + 1);
        dfs(board, i + 1, j + 1, letter, "d", count + 1);
        dfs(board, i - 1, j - 1, letter, "d", count + 1);
        dfs(board, i + 1, j + 1, letter, "d", count + 1);
      }
    } else {
      return;
    }
  };

  const placeMarker = (e) => {
    const [i, j] = e.target.id.split(","); //gets i and j from id
    let boardCopy = gameBoard.slice();
    if (boardCopy[+i][+j] === "") {
      boardCopy[+i][+j] = gameStatus.turn ? "O" : "X";
      setGameBoard(boardCopy);
      //used for vertical check
      let deepCloneBoard1 = boardCopy.map((el) => {
        return [`${el[0]}`, `${el[1]}`, `${el[2]}`];
      });
      //used for diagnol check
      let deepCloneBoard2 = boardCopy.map((el) => {
        return [`${el[0]}`, `${el[1]}`, `${el[2]}`];
      });
      const letter = gameStatus.turn === true ? "O" : "X";
      dfs(deepCloneBoard1, +i, +j, letter, "v", 0);
      dfs(deepCloneBoard2, +i, +j, letter, "d", 0);

      setGameStatus({ ...gameStatus, turn: !gameStatus.turn });
    }
  };

  const resetGame = () => {
    setGameBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setGameStatus({ ...gameStatus, winner: false });
  };

  return (
    <div className="App">
      {gameStatus.winner === false && (
        <>
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ color: "white" }}>
              Player {gameStatus.turn ? "O" : "X"}'s turn
            </h1>
          </div>
          <div className="game-grid">
            <div
              onClick={(e) => {
                placeMarker(e);
              }}
              id="0,0"
              style={{ borderRight: "solid black 1px" }}
              className="node"
            >
              {gameBoard[0][0] === "X" && <Xsvg />}
              {gameBoard[0][0] === "O" && <Osvg />}
            </div>
            <div id="0,1" onClick={(e) => placeMarker(e)} className="node">
              {gameBoard[0][1] === "X" && <Xsvg />}
              {gameBoard[0][1] === "O" && <Osvg />}
            </div>
            <div
              id="0,2"
              onClick={(e) => placeMarker(e)}
              style={{ borderLeft: "solid black 1px" }}
              className="node"
            >
              {gameBoard[0][2] === "X" && <Xsvg />}
              {gameBoard[0][2] === "O" && <Osvg />}
            </div>
            <div
              id="1,0"
              onClick={(e) => placeMarker(e)}
              style={{
                borderRight: "solid black 1px",
                borderTop: "solid black 1px",
              }}
              className="node"
            >
              {gameBoard[1][0] === "X" && <Xsvg />}
              {gameBoard[1][0] === "O" && <Osvg />}
            </div>
            <div
              id="1,1"
              onClick={(e) => placeMarker(e)}
              style={{ borderTop: "solid black 1px" }}
              className="node"
            >
              {gameBoard[1][1] === "X" && <Xsvg />}
              {gameBoard[1][1] === "O" && <Osvg />}
            </div>
            <div
              id="1,2"
              onClick={(e) => placeMarker(e)}
              style={{
                borderLeft: "solid black 1px",
                borderTop: "solid black 1px",
              }}
              className="node"
            >
              {gameBoard[1][2] === "X" && <Xsvg />}
              {gameBoard[1][2] === "O" && <Osvg />}
            </div>
            <div
              id="2,0"
              onClick={(e) => placeMarker(e)}
              style={{
                borderRight: "solid black 1px",
                borderTop: "solid black 1px",
              }}
              className="node"
            >
              {gameBoard[2][0] === "X" && <Xsvg />}
              {gameBoard[2][0] === "O" && <Osvg />}
            </div>
            <div
              id="2,1"
              onClick={(e) => placeMarker(e)}
              style={{ borderTop: "solid black 1px" }}
              className="node"
            >
              {gameBoard[2][1] === "X" && <Xsvg />}
              {gameBoard[2][1] === "O" && <Osvg />}
            </div>
            <div
              id="2,2"
              onClick={(e) => placeMarker(e)}
              style={{
                borderLeft: "solid black 1px",
                borderTop: "solid black 1px",
              }}
              className="node"
            >
              {gameBoard[2][2] === "X" && <Xsvg />}
              {gameBoard[2][2] === "O" && <Osvg />}
            </div>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <button onClick={resetGame} className="btn">
              Reset
            </button>
          </div>
        </>
      )}
      {gameStatus.winner && (
        <>
          <h1 style={{ color: "white" }}>
            Player {!gameStatus.turn ? "X" : "O"} wins!
          </h1>
          <div style={{ paddingTop: "20px" }}>
            <button onClick={resetGame} className="btn">
              Play again!
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
