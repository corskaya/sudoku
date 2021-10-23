import React from "react";
import LevelData from "../levels.json";
import Level from "./Level";
import Numbers from "./Numbers";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCell: null,
      levelArr: LevelData.ToSolve[0],
      wrongRowCells: [],
      wrongColCells: [],
      wrongSquareCells: [],
      correctRow: [],
      correctCol: [],
      correctSquare: [],
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
    this.wrongRowCheck();
    this.wrongColCheck();
  }

  wrongRowCheck = () => {
    let isFound = false;
    let wrongRowCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 8; j++) {
        for (let k = j + 1; k < 9; k++) {
          if (this.state.levelArr[i][j] !== 0 && this.state.levelArr[i][j] === this.state.levelArr[i][k]) {
            isFound = true;
            wrongRowCellsCopy.push((i * 9) + j + 1, (i * 9) + k + 1);
            console.log("satır aynı oldu", i, j, k);
            this.setState({
              wrongRowCells: wrongRowCellsCopy
            })
          }
        }
      }
    } if (!isFound) {
      this.setState({
        wrongRowCells: []
      })
    }
  }

  wrongColCheck = () => {
    let isFound = false;
    let wrongColCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 8; j++) {
        for (let k = j + 1; k < 9; k++) {
          if (this.state.levelArr[j][i] !== 0 && this.state.levelArr[j][i] === this.state.levelArr[k][i]) {
            isFound = true;
            wrongColCellsCopy.push((j * 9) + i + 1, (k * 9) + i + 1);
            console.log("sütun aynı oldu", i, j, k);
            this.setState({
              wrongColCells: wrongColCellsCopy
            })
          }
        }
      }
    } if (!isFound) {
      this.setState({
        wrongColCells: []
      })
    }
  }

  render() {
    return (
      <div>
        <Level
          currentCell={this.state.currentCell}
          level={this.state.levelArr}
          onCellClick={this.handleCellClick}
          wrongRowCells={this.state.wrongRowCells}
          wrongColCells={this.state.wrongColCells}
        ></Level>

        <Numbers
          onNumberEnter={this.handleNumberEnter}
        ></Numbers>
      </div>
    );
  }
}

export default App;