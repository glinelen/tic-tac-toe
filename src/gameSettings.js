import React from 'react';

class GameSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardSize: 3,
            player1Shape: "X",
            player2Shape: "O"
        };
    }

    render() {
        return (
            <div className="gameSettings" >
                <div >
                    <label>
                        Играть на доске
                    </label>
                    <select value={this.state.boardSize}>
                        <option value="3">3 x 3</option>
                        <option value="4">4 x 4</option>
                        <option value="5">5 x 5</option>
                    </select>
                </div>
                <div>
                    <label>
                        Игрок 1:
                    </label>
                    <select value={this.state.player1Shape}>
                        <option value="X">X</option>
                        <option value="O">O</option>
                    </select>
                </div>
                <div>
                    <label>
                        Игрок 2:
                    </label>
                    <select value={this.state.player2Shape}>
                        <option value="X">X</option>
                        <option value="O">O</option>
                    </select>
                </div>

                <input type="submit" value="Старт!"></input>
            </div>
        )
    }
}

export default GameSettings;