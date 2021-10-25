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
      boxes: [
        [1, 2, 3, 10, 11, 12, 19, 20, 21],
        [4, 5, 6, 13, 14, 15, 22, 23, 24],
        [7, 8, 9, 16, 17, 18, 25, 26, 27],
        [28, 29, 30, 37, 38, 39, 46, 47, 48],
        [31, 32, 33, 40, 41, 42, 49, 50, 51],
        [34, 35, 36, 43, 44, 45, 52, 53, 54],
        [55, 56, 57, 64, 65, 66, 73, 74, 75],
        [58, 59, 60, 67, 68, 69, 76, 77, 78],
        [61, 62, 63, 70, 71, 72, 79, 80, 81]
      ],
      wrongRowCells: [],
      wrongColCells: [],
      wrongBoxCells: [],
      emptyClickRowCells: [],
      emptyClickColCells: [],
      emptyClickBoxCells: [],
      loadClickCells: [],
    }
  }

  handleCellClick = (index, value) => {
    this.setState({
      currentCell: index,
      emptyClickRowCells: [],
      emptyClickColCells: [],
      emptyClickBoxCells: [],
      loadClickCells: [],
    });
    this.emptyCellClickRow(index);
    this.emptyCellClickCol(index);
    this.emptyCellClickBox(index);
    if (value !== null) {
      this.loadCellClick(value);
    }
  }

  emptyCellClickRow = (index) => {
    let row = Math.floor((index - 1) / 9);
    let emptyClickRowCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      emptyClickRowCellsCopy.push((row * 9) + i + 1)
    }
    this.setState({
      emptyClickRowCells: emptyClickRowCellsCopy
    })
  }

  emptyCellClickCol = (index) => {
    let col = (index - 1) % 9;
    let emptyClickColCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      emptyClickColCellsCopy.push((i * 9) + col + 1)
    }
    this.setState({
      emptyClickColCells: emptyClickColCellsCopy
    })
  }

  emptyCellClickBox = (index) => {
    let emptyClickBoxCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.state.boxes[i][j] === index) {
          for (let k = 0; k < 9; k++) {
            emptyClickBoxCellsCopy.push(this.state.boxes[i][k])
          }
          this.setState({
            emptyClickBoxCells: emptyClickBoxCellsCopy
          })
        }
      }
    }
  }

  loadCellClick = (value) => {
    let loadClickCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.state.levelArr[i][j] === value) {
          loadClickCellsCopy.push((i * 9) + j + 1);
          this.setState({
            loadClickCells: loadClickCellsCopy
          })
        }
      }
    }
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
    this.wrongBoxCheck();
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

  wrongBoxCheck = () => {
    let isFound = false;
    let wrongBoxCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 8; j++) {
        for (let k = j + 1; k < 9; k++) {
          let value1 = this.state.levelArr[Math.floor((this.state.boxes[i][j] - 1) / 9)][(this.state.boxes[i][j] - 1) % 9];
          let value2 = this.state.levelArr[Math.floor((this.state.boxes[i][k] - 1) / 9)][(this.state.boxes[i][k] - 1) % 9];
          if (value1 !== 0 && value1 === value2) {
            isFound = true;
            wrongBoxCellsCopy.push(this.state.boxes[i][j], this.state.boxes[i][k]);
            this.setState({
              wrongBoxCells: wrongBoxCellsCopy
            })
          }
        }
      }
    } if (!isFound) {
      this.setState({
        wrongBoxCells: []
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
          emptyClickRowCells={this.state.emptyClickRowCells}
          emptyClickColCells={this.state.emptyClickColCells}
          emptyClickBoxCells={this.state.emptyClickBoxCells}
          loadClickCells={this.state.loadClickCells}
          wrongRowCells={this.state.wrongRowCells}
          wrongColCells={this.state.wrongColCells}
          wrongBoxCells={this.state.wrongBoxCells}
        />

        <Numbers
          onNumberEnter={this.handleNumberEnter}
        />
      </div>
    );
  }
}

export default App;