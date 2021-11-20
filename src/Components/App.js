import React from "react";
import "./App.css";
import LevelData from "../levels.json";
import Info from "./Info";
import Level from "./Level";
import Tools from "./Tools";
import Pause from "./Pause";
import Warning from "./Warning";
import MistakeOver from "./MistakeOver";

let levelsArr = [];

for (let i = 0; i < LevelData.ToSolve.length; i++) {
  let levelArr = [];
  for (let j = 0; j < 9; j++) {
    levelArr.push(LevelData.ToSolve[i][j].slice());
  }
  levelsArr.push(levelArr.slice());
}

let levelsToSolve = [];

for (let i = 0; i < LevelData.ToSolve.length; i++) {
  let levelArr = [];
  for (let j = 0; j < 9; j++) {
    levelArr.push(LevelData.ToSolve[i][j].slice());
  }
  levelsToSolve.push(levelArr.slice());
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      mistakes: 0,
      currentCell: null,
      levelToSolve: levelsToSolve[0],
      levelArr: levelsArr[0],
      levelSolved: LevelData.Solved[0],
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
      wrongCells: [],
      correctCells: [],
      wrongRowCells: [],
      wrongColCells: [],
      wrongBoxCells: [],
      emptyClickRowCells: [],
      emptyClickColCells: [],
      emptyClickBoxCells: [],
      loadClickCells: [],
      pencilSelected: false,
      pencilNumbers: [],
      showWarning: false,
      levelChange: null,
      time: 0,
      isPaused: false,
      isFinished: false,
    }
  }
  
  getLevelArr = () => {
    levelsArr = [];
    for (let i = 0; i < LevelData.ToSolve.length; i++) {
      let levelArr = [];
      for (let j = 0; j < 9; j++) {
        levelArr.push(LevelData.ToSolve[i][j].slice());
      }
      levelsArr.push(levelArr.slice());
    }
    return levelsArr;
  }

  getLevelToSolve = () => {
    levelsToSolve = [];
    for (let i = 0; i < LevelData.ToSolve.length; i++) {
      let levelArr = [];
      for (let j = 0; j < 9; j++) {
        levelArr.push(LevelData.ToSolve[i][j].slice());
      }
      levelsToSolve.push(levelArr.slice());
    }
    return levelsToSolve;
  }

  handleCellClick = async (index, value) => {
    await this.setState({
      currentCell: index,
      wrongRowCells: [],
      wrongColCells: [],
      wrongBoxCells: [],
      emptyClickRowCells: [],
      emptyClickColCells: [],
      emptyClickBoxCells: [],
      loadClickCells: [],
    });
    this.emptyCellClickRow(index);
    this.emptyCellClickCol(index);
    this.emptyCellClickBox(index);
    if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9) {
      this.loadCellClick(value);
    }
  }

  handleNumberEnter = (value) => {
    if (this.state.currentCell !== null) {
      let indexX = Math.floor((this.state.currentCell - 1) / 9);
      let indexY = (this.state.currentCell - 1) % 9;
      if (!this.state.pencilSelected) {
        let levelArrCopy = this.state.levelArr;
        levelArrCopy[indexX][indexY] = value;
        this.setState({
          levelArr: levelArrCopy
        });
        this.correctCheck(value, indexX, indexY);
        this.wrongCheck();
        this.mistakeCheck(value);
        this.wrongRowCheck(value);
        this.wrongColCheck(value);
        this.wrongBoxCheck(value);
        this.loadCellClick(value);
      } else {
        let isFound1 = false;
        let pencilNumbersCopy = this.state.pencilNumbers;
        for (let i = 0; i < pencilNumbersCopy.length; i++) {
          if (pencilNumbersCopy[i].cell === this.state.currentCell && value !== 0) {
            let isFound2 = false;
            let numbersArray = pencilNumbersCopy[i].numbers;
            isFound1 = true;
            for (let j = 0; j < numbersArray.length; j++) {
              if (numbersArray[j] === value) {
                isFound2 = true;
                numbersArray.splice(numbersArray.indexOf(value), 1);
                this.setState({ pencilNumber: pencilNumbersCopy });
              }
            } if (!isFound2) {
              pencilNumbersCopy[i].numbers.push(value);
              this.setState({ pencilNumber: pencilNumbersCopy });
            }
          } else if (value === 0) {
            isFound1 = true;
            for (let j = 0; j < pencilNumbersCopy.length; j++) {
              if (pencilNumbersCopy[j].cell === this.state.currentCell) {
                pencilNumbersCopy[j].numbers = [];
                this.setState({ pencilNumber: pencilNumbersCopy });
              }
            }
          }
        } if (!isFound1 && value !== 0) {
          let data = { cell: this.state.currentCell, numbers: [value] }
          pencilNumbersCopy.push(data);
          this.setState({ pencilNumbers: pencilNumbersCopy });
        }
      }
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
    if (value === null || value === 0) {
      this.setState({ loadClickCells: [] });
    } else {
      let loadClickCellsCopy = [];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.state.levelArr[i][j] !== 0 && this.state.levelArr[i][j] === value) {
            loadClickCellsCopy.push((i * 9) + j + 1);
            this.setState({
              loadClickCells: loadClickCellsCopy
            })
          }
        }
      }
      this.wrongRowCheck(value);
      this.wrongColCheck(value);
      this.wrongBoxCheck(value);
    }
  }

  wrongCheck = () => {
    let wrongCellsCopy = [];
    this.setState({ wrongCells: [] });
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.state.levelArr[i][j] !== 0 && this.state.levelArr[i][j] !== this.state.levelSolved[i][j]) {
          wrongCellsCopy.push((i * 9) + j + 1);
          this.setState({
            wrongCells: wrongCellsCopy
          })
        }
      }
    }
  }

  mistakeCheck = async (value) => {
    let indexX = Math.floor((this.state.currentCell - 1) / 9);
    let indexY = (this.state.currentCell - 1) % 9;
    if (value !== 0 && this.state.levelSolved[indexX][indexY] !== value) {
      await this.setState((state) => ({
        mistakes: state.mistakes + 1
      }));
    }
    if (this.state.mistakes >= 3) {
      clearInterval(this.timerID);
      this.setState({
        isFinished: true
      })
    }
  }

  wrongRowCheck = (value) => {
    let isFound = false;
    let indexX = Math.floor((this.state.currentCell - 1) / 9);
    let wrongRowCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      if (this.state.levelArr[indexX][i] !== 0 && this.state.levelArr[indexX][i] === value) {
        isFound = true;
        wrongRowCellsCopy.push((indexX * 9) + i + 1);
        this.setState({
          wrongRowCells: wrongRowCellsCopy
        })
      }
    } if (!isFound) {
      this.setState({
        wrongRowCells: []
      })
    }
  }

  wrongColCheck = (value) => {
    let isFound = false;
    let indexY = (this.state.currentCell - 1) % 9;
    let wrongColCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      if (this.state.levelArr[i][indexY] !== 0 && this.state.levelArr[i][indexY] === value) {
        isFound = true;
        wrongColCellsCopy.push((i * 9) + indexY + 1);
        this.setState({
          wrongColCells: wrongColCellsCopy
        })
      }
    } if (!isFound) {
      this.setState({
        wrongColCells: []
      })
    }
  }

  wrongBoxCheck = (value) => {
    let isFound = false;
    let wrongBoxCellsCopy = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.state.boxes[i][j] === this.state.currentCell) {
          for (let k = 0; k < 9; k++) {
            let value2 = this.state.levelArr[Math.floor((this.state.boxes[i][k] - 1) / 9)][(this.state.boxes[i][k] - 1) % 9];
            if (value2 !== 0 && value2 === value) {
              isFound = true;
              wrongBoxCellsCopy.push(this.state.boxes[i][k]);
              this.setState({
                wrongBoxCells: wrongBoxCellsCopy
              })
            }
          }
        }
      }
    } if (!isFound) {
      this.setState({
        wrongBoxCells: []
      })
    }
  }

  correctCheck = (value, indexX, indexY) => {
    let correctCellsCopy = this.state.correctCells;
    if (value !== 0 && value === this.state.levelSolved[indexX][indexY]) {
      correctCellsCopy.push((indexX * 9) + indexY + 1);
      this.setState({ correctCells: correctCellsCopy });
    }
  }

  pencilToggle = () => {
    this.setState({ pencilSelected: !this.state.pencilSelected });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.time(), 1000);
  }

  time() {
    this.setState({ time: this.state.time + 1 });
  }

  handleRestart = () => {
    clearInterval(this.timerID);
    let initialLevelArr = this.getLevelArr();
    let initialLevelToSolve = this.getLevelToSolve();
    this.setState({
      currentCell: null,
      mistakes: 0,
      levelToSolve: initialLevelToSolve[this.state.level - 1],
      levelArr: initialLevelArr[this.state.level - 1],
      levelSolved: LevelData.Solved[this.state.level - 1],
      wrongCells: [],
      correctCells: [],
      wrongRowCells: [],
      wrongColCells: [],
      wrongBoxCells: [],
      emptyClickRowCells: [],
      emptyClickColCells: [],
      emptyClickBoxCells: [],
      loadClickCells: [],
      pencilSelected: false,
      pencilNumbers: [],
      showWarning: null,
      time: 0,
      isPaused: false,
      isFinished: false,
    });
    this.timerID = setInterval(() => this.time(), 1000);
  }

  handleLevelChange = (change) => {
    this.setState({ showWarning: false });
    if (change === "prev" && this.state.level > 1) {
      clearInterval(this.timerID);
      this.handlePrevious();
      this.setState({ levelChange: "prev" });
    } if (change === "next" && this.state.level < 27) {
      clearInterval(this.timerID);
      this.handleNext();
      this.setState({ levelChange: "next" });
    }
  }

  handlePrevious = () => {
    let initialLevelArr = this.getLevelArr();
    let initialLevelToSolve = this.getLevelToSolve();
    if (this.state.level > 1) {
      if (this.state.levelArr.toString() !== this.state.levelToSolve.toString()) {
        this.setState({ showWarning: true, isPaused: true });
      } else {
        clearInterval(this.timerID);
        this.setState({
          currentCell: null,
          level: this.state.level - 1,
          mistakes: 0,
          levelToSolve: initialLevelToSolve[this.state.level - 2],
          levelArr: initialLevelArr[this.state.level - 2],
          levelSolved: LevelData.Solved[this.state.level - 2],
          wrongCells: [],
          correctCells: [],
          wrongRowCells: [],
          wrongColCells: [],
          wrongBoxCells: [],
          emptyClickRowCells: [],
          emptyClickColCells: [],
          emptyClickBoxCells: [],
          loadClickCells: [],
          pencilSelected: false,
          pencilNumbers: [],
          showWarning: null,
          time: 0,
        });
      this.timerID = setInterval(() => this.time(), 1000);
      }
    }
  }

  handleNext = () => {
    let initialLevelArr = this.getLevelArr();
    let initialLevelToSolve = this.getLevelToSolve();
    if (this.state.level < 27) {
      if (this.state.levelArr.toString() !== this.state.levelToSolve.toString()) {
        this.setState({ showWarning: true, isPaused: true });
      } else {
        clearInterval(this.timerID);
        this.setState({
          currentCell: null,
          level: this.state.level + 1,
          mistakes: 0,
          levelToSolve: initialLevelToSolve[this.state.level],
          levelArr: initialLevelArr[this.state.level],
          levelSolved: LevelData.Solved[this.state.level],
          wrongCells: [],
          correctCells: [],
          wrongRowCells: [],
          wrongColCells: [],
          wrongBoxCells: [],
          emptyClickRowCells: [],
          emptyClickColCells: [],
          emptyClickBoxCells: [],
          loadClickCells: [],
          pencilSelected: false,
          pencilNumbers: [],
          showWarning: null,
          time: 0,
        });
        this.timerID = setInterval(() => this.time(), 1000);
      }
    }
  }

  handlePause = () => {
    clearInterval(this.timerID);
    this.setState({
      isPaused: true,
      showPause: true,
    })
  }

  handleResume = () => {
    this.setState({ isPaused: false, showPause: false });
    this.timerID = setInterval(() => this.time(), 1000);
  }

  handleWarning = (choice, change) => {
    clearInterval(this.timerID);
    let initialLevelArr = this.getLevelArr();
    let initialLevelToSolve = this.getLevelToSolve();
    if (choice && change === "prev") {
      this.setState({
        currentCell: null,
        level: this.state.level - 1,
        mistakes: 0,
        levelToSolve: initialLevelToSolve[this.state.level - 2],
        levelArr: initialLevelArr[this.state.level - 2],
        levelSolved: LevelData.Solved[this.state.level - 2],
        wrongCells: [],
        correctCells: [],
        wrongRowCells: [],
        wrongColCells: [],
        wrongBoxCells: [],
        emptyClickRowCells: [],
        emptyClickColCells: [],
        emptyClickBoxCells: [],
        loadClickCells: [],
        pencilSelected: false,
        pencilNumbers: [],
        showWarning: null,
        time: 0,
        isPaused: false,
      });
      this.timerID = setInterval(() => this.time(), 1000);
    } else if (choice && change === "next") {
      this.setState({
        currentCell: null,
        level: this.state.level + 1,
        mistakes: 0,
        levelToSolve: initialLevelToSolve[this.state.level],
        levelArr: initialLevelArr[this.state.level],
        levelSolved: LevelData.Solved[this.state.level],
        wrongCells: [],
        correctCells: [],
        wrongRowCells: [],
        wrongColCells: [],
        wrongBoxCells: [],
        emptyClickRowCells: [],
        emptyClickColCells: [],
        emptyClickBoxCells: [],
        loadClickCells: [],
        pencilSelected: false,
        pencilNumbers: [],
        showWarning: null,
        time: 0,
        isPaused: false,
      });
      this.timerID = setInterval(() => this.time(), 1000);
    } else {
      this.setState({ showWarning: null, isPaused: false });
      this.timerID = setInterval(() => this.time(), 1000);
    }
  }

  render() {
    return (
      <div className="appContainer">
        <Info
          level={this.state.level}
          mistakes={this.state.mistakes}
          time={this.state.time}
        />
        <Level
          currentCell={this.state.currentCell}
          level={this.state.levelArr}
          onCellClick={this.handleCellClick}
          emptyClickRowCells={this.state.emptyClickRowCells}
          emptyClickColCells={this.state.emptyClickColCells}
          emptyClickBoxCells={this.state.emptyClickBoxCells}
          loadClickCells={this.state.loadClickCells}
          wrongCells={this.state.wrongCells}
          wrongRowCells={this.state.wrongRowCells}
          wrongColCells={this.state.wrongColCells}
          wrongBoxCells={this.state.wrongBoxCells}
          correctCells={this.state.correctCells}
          pencilSelected={this.state.pencilSelected}
          pencilNumbers={this.state.pencilNumbers}
          isPaused={this.state.isPaused}
          isFinished={this.state.isFinished}
        />
        <Tools
          currentCell={this.state.currentCell}
          level={this.state.levelArr}
          levelToSolve={this.state.levelToSolve}
          levelSolved={this.state.levelSolved}
          onNumberEnter={this.handleNumberEnter}
          pencilSelected={this.state.pencilSelected}
          pencilToggle={this.pencilToggle}
          onRestart={this.handleRestart}
          onLevelChange={this.handleLevelChange}
          isPaused={this.state.isPaused}
          onPause={this.handlePause}
          isFinished={this.state.isFinished}
        />
        {this.state.showPause ? 
          <Pause
            onResume={this.handleResume}
          />
          : null}
        {this.state.showWarning ?
          <Warning
            onWarning={this.handleWarning}
            change={this.state.levelChange}
          />
          : null}
        {this.state.mistakes >= 3 ?
          <MistakeOver
            onRestart={this.handleRestart}
          />
          : null}
      </div>
    );
  }
}

export default App;