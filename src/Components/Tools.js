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
      if (this.props.levelToSolve[indexX][indexY] !== 0 && this.props.level[indexX][indexY] === this.props.levelToSolve[indexX][indexY]) {
        return false;
      } else if (this.props.level[indexX][indexY] !== 0 && this.props.level[indexX][indexY] === this.props.levelSolved[indexX][indexY]) {
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
            onClick={() => { this.checkFixedCell(0) }}
          >
            <i className="fas fa-eraser fa-sm"></i>
          </button>
          <button
            className={`btnTool ${this.checkPencilSelected()}`}
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
                key={index}
                onClick={() => { this.checkFixedCell(value) }}>
                {value}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Tools;