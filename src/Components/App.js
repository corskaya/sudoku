import React from "react";
import LevelData from "../levels.json";
import Level from "./Level";
import Numbers from "./Numbers";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCell: null,
      currentLevel: 0,
      levelArr: LevelData.ToSolve[0],
      levelSolution: LevelData.Solved[0],
    }
  }

  handleCellClick = (index) => {
    this.setState({
      currentCell: index
    });
  }

  handleNumberEnter = (numberValue) => {
    let arrayIndex = [Math.floor((this.state.currentCell - 1) / 9), (this.state.currentCell - 1) % 9];
    let levelArrCopy = this.state.levelArr;
    levelArrCopy[arrayIndex[0]][arrayIndex[1]] = numberValue;
    this.setState({
      levelArr: levelArrCopy
    });
  }

  render() {
    return (
      <div>
        <Level
          currentCell={this.state.currentCell}
          level={this.state.levelArr}
          onCellClick={this.handleCellClick}
        ></Level>

        <Numbers
          onNumberEnter={this.handleNumberEnter}
        ></Numbers>
      </div>
    );
  }
}

export default App;