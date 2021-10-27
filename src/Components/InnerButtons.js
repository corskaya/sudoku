import React from "react";
import "./InnerButtons.css";

class InnerButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerButtons: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  }

  checkPencilNumbers = (value) => {
    let isFound = false;
    let pencilNumbers = this.props.pencilNumbers;
    for (let i = 0; i < pencilNumbers.length; i++) {
      if (pencilNumbers[i].cell === this.props.index) {
        for (let j = 0; j < pencilNumbers[i].numbers.length; j++) {
          if (pencilNumbers[i].numbers[j] === value) {
            isFound = true;
            return value;
          }
        }
      }
    } if (!isFound) {
      return "";
    }
  }

  render() {
    return (
      <button
        className={`btnInner btnInitial ${this.props.className}`}
        onClick={() => { this.props.onCellClick(this.props.index, this.props.value) }}>
        <div className="smallNumbersContainer">
          {this.state.innerButtons.map((value, index) => {
            return (
              <div className="smallNumber" key={index + 1}>
                {this.checkPencilNumbers(value)}
              </div>
            );
          })}
        </div>
      </button>
    );
  }
}

export default InnerButtons;