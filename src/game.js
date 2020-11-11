import React from 'react';


function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
  
    renderSquare(r, c) {
      return <Square
        key={[r, c]}
        value={this.props.squares[r][c]}
        onClick={() => this.props.onClick(r, c)} />;
    }
  
    render() {
      let squares = [];
      for (let r = 0; r < this.props.boardWidth; r++) {
        let row = [];
        for (let c = 0; c < this.props.boardWidth; c++) {
          row.push(this.renderSquare(r, c));
        }
        squares.push(<div className="board-row" key={r}>{row}</div>)
      }
      return (
        <div>
          {squares}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      let boardSize = this.props.location.settings.boardSize;
      this.state = {
        boardWidth: boardSize,
        history: [{
          squares: this.initSquares(boardSize),
          stepLocation: null
        }],
        xIsNext: true,
        stepNumber: 0
      }

      this.calculateWinner = this.calculateWinner.bind(this);
    } 
  
    initSquares(boardWidth) {
      let squares = [];
      for (let index = 0; index < boardWidth; index++) {
        const row = new Array(boardWidth).fill(null);
        squares.push(row);
      }
      return squares;
    }
  
    handleClick(r, c) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (this.calculateWinner(squares) || squares[r][c]) {
        return;
      }
      squares[r][c] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          stepLocation: [r, c],
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step, stepLocation) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      })
    }
  
    calculateWinner(squares) {
  
      let boardWidth = this.state.boardWidth;
      let diagonal1 = [];
      let diagonal2 = [];
      let result = null;
      let isBoardFull = true;
    
    
      //check if one of the rows is a winning row
      for (let r = 0; r < boardWidth; r++) {
        let currentRow = squares[r];
        result = {
          winnerType: 'row',
          index: r,
          winner: currentRow[0]
        };
    
        for (let c = 0; c < currentRow.length; c++) {
          //build diagonals
          if (r === c) {
            diagonal1.push(currentRow[c]);
          }
          if (r + c === boardWidth - 1) {
            diagonal2.push(currentRow[c]);
          }
          //checking rows
          if (!currentRow[c] || currentRow[c] !== currentRow[0]) {
            result = null;
          }
        }
        if (result) {
          return result;
        }
        isBoardFull = isBoardFull && currentRow.every(x => x !== null);
      }
    
      //check diagonals
      if (diagonal1.every(x => x && x === diagonal1[0])) {
        return {
          winnerType: "diagonal1",
          winner: diagonal1[0]
        }
      }
      if (diagonal2.every(x => x && x === diagonal2[0])) {
        return {
          winnerType: "diagonal2",
          winner: diagonal2[0]
        }
      }
    
      //checking columns
      result = null;
      for (let c = 0; c < boardWidth; c++) {
        result = {
          winnerType: "column",
          index: c,
          winner: squares[0][c]
        }
    
        for (let r = 0; r < boardWidth; r++) {
          const cell = squares[r][c];
          if (!cell || cell !== squares[0][c]) {
            result = null;
            break;
          }
        }
        if (result) {
          return result;
        }
      }
    
      //no winner - check for draw
      if (isBoardFull) {
        return {
          winnerType: "draw"
        }
      }
      return result;
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = this.calculateWinner(current.squares);
      const boardWidth = this.state.boardWidth;
  
      const moves = history.map((step, move) => {
        if (!step.stepLocation) return null;
        const col = step.stepLocation[1];
        const row = step.stepLocation[0];
        const desc = move ? 'Go to move #' + move + '( ' + col + ' , ' + row + ')' : 'Go to game start';
        return (
          <li key={move} className={move === this.state.stepNumber ? 'selected-move' : ''}>
            <button className={move === this.state.stepNumber ? 'selected-move' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      if (winner) {
        status = (winner.winnerType === "draw") ? "All right, we'll call this a draw" : 'Winner: ' + winner.winner;
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
              boardWidth={boardWidth}
              onClick={(r, c) => this.handleClick(r, c)} />
          </div>
          <div className="game-info">
            <div >{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  

export default Game;
