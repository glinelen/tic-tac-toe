import React from 'react';
import {Link} from 'react-router-dom';

class GameSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardSize: 3,
            player1Shape: "X",
            shapes :[{ key: "x", value: "X" }, { key: "o", value: "O" }]
        };
        this.player1ShapeChanged = this.player1ShapeChanged.bind(this);
        this.player2ShapeChanged = this.player2ShapeChanged.bind(this);
        this.handleBoardSizeChange  = this.handleBoardSizeChange.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
    }

    player1ShapeChanged(event) {
        this.setState({player1Shape : event.target.value});
    }
    player2ShapeChanged(event) {
        this.setState({player2Shape : event.target.value});
    }

    handleBoardSizeChange(event) {
        this.setState({boardSize: event.target.value});
    }
    handleStartGame(event) {

    }

    render() {
        let shapesList = this.state.shapes.length > 0 && this.state.shapes.map((pair) => {
            return (<option key={pair.key} value={pair.value}>{pair.value}</option>);
        }, this);
        return (
            <div className="gameSettings" onSubmit={this.handleStartGame} >
                <div >
                    <label>
                        Играть на доске
                    </label>
                    <select value={this.state.boardSize} onChange={this.handleBoardSizeChange}>
                        <option value="3">3 x 3</option>
                        <option value="4">4 x 4</option>
                        <option value="5">5 x 5</option>
                    </select>
                </div>
                <div>
                    <label>
                        Игрок 1:
                    </label>
                    <select value={this.state.player1Shape} onChange={this.player1ShapeChanged}>
                       {shapesList}
                    </select>
                </div>
                <div>
                    <label>
                        Игрок 2:
                    </label>
                    <select value={this.state.player2Shape} onChange={this.player2ShapeChanged}>
                        {shapesList}
                    </select>
                </div>

                <Link className="gameStartButton" to="/games/1">Старт!</Link>
            </div>
        )
    }
}

export default GameSettings;