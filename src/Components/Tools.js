import React from "react";
import "./Tools.css";

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }

  checkFixedCell = (value) => {
    if (this.props.currentCell === null) {
      return null;
    } else {
      let indexX = Math.floor((this.props.currentCell - 1) / 9);
      let indexY = (this.props.currentCell - 1) % 9;
      if (this.props.levelToSolve[indexX][indexY] !== 0 && this.props.levelArr[indexX][indexY] === this.props.levelToSolve[indexX][indexY]) {
        return false;
      } else if (this.props.levelArr[indexX][indexY] !== 0 && this.props.levelArr[indexX][indexY] === this.props.levelSolved[indexX][indexY]) {
        return false;
      } else {
        this.props.onNumberEnter(value);
      }
    }
  }

  checkPencilSelected = () => {
    return this.props.pencilSelected ? "toolSelected" : null;
  }

  render() {
    return (
      <div>
        <div className="toolsContainer">
          <button
            className="btnTool"
            disabled={this.props.isPaused || this.props.isFinished || this.props.isCompleted}
            onClick={() => { this.props.onPause() }}
          >
            <i className="fas fa-pause fa-sm"></i>
          </button>
          <button
            className="btnTool"
            disabled={this.props.isPaused || this.props.isFinished || this.props.isCompleted}
            onClick={() => { this.checkFixedCell(0) }}
          >
            <i className="fas fa-eraser fa-sm"></i>
          </button>
          <button
            className={`btnTool ${this.checkPencilSelected()}`}
            disabled={this.props.isPaused || this.props.isFinished || this.props.isCompleted}
            onClick={() => { this.props.pencilToggle() }}
          >
            <i className="fas fa-pencil-alt fa-sm"></i>
          </button>
        </div>
        <div className="numbersContainer">
          {this.state.btnNumbers.map((value, index) => {
            return (
              <button
                className="btnNumber"
                disabled={this.props.isPaused || this.props.isFinished || this.props.isCompleted}
                key={index}
                onClick={() => { this.checkFixedCell(value) }}>
                {value}
              </button>
            );
          })}
        </div>
        <div className="buttonsContainer">
          <button
            className="btnChangeLevel"
            disabled={this.props.isPaused || this.props.isFinished}
            onClick={() => { this.props.onLevelChange("prev") }}>
            &lt;Prev
          </button>
          <button
            className="btnRestart"
            disabled={this.props.isPaused || this.props.isFinished || this.props.isCompleted}
            onClick={() => { this.props.onRestart() }}>
            Restart Level
          </button>
          <button
            className="btnChangeLevel"
            disabled={this.props.isPaused || this.props.isFinished}
            onClick={() => { this.props.onLevelChange("next") }}>
            Next&gt;
          </button>
        </div>
      </div>
    );
  }
}

export default Tools;