import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {



  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />;
  }

  render() {
    let limit = this.props.boardWidth;
    let squares = [];
    for (let rowIdx = 0; rowIdx < limit; rowIdx++) {
      let row = [];
      for (let col = 0; col < limit; col++) {
        row.push(this.renderSquare(rowIdx * limit + col));
      }
      squares.push(<div className="board-row" key={rowIdx}>{row}</div>)
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
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepLocation: null,
      stepNumber: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        stepLocation: i,
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

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const boardWidth = 4;

    const moves = history.map((step, move) => {
      const col = step.stepLocation % boardWidth;
      const row = Math.trunc(step.stepLocation / boardWidth);
      const desc = move ? 'Go to move #' + move + '( ' + col + ' , ' + row + ')' : 'Go to game start';
      return (
        <li key={move} className={move === this.state.stepNumber ? 'selected-move' : ''}>
          <button className={move === this.state.stepNumber ? 'selected-move' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    if (winner) {
      status = 'Winner: ' + winner;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            boardWidth={boardWidth}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div >{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
