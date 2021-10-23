import React from "react";
import "./Level.css";

class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkCells: [4, 5, 6, 13, 14, 15, 22, 23, 24, 28, 29, 30, 34, 35, 36, 37, 38, 39, 43, 44, 45, 46, 47, 48, 52, 53, 54, 58, 59, 60, 67, 68, 69, 76, 77, 78],
    }
  }

  checkWrongRowCells = (col, row) => {
    if (this.props.wrongRowCells.length > 0) {
      for (let i = 0; i < this.props.wrongRowCells.length; i++) {
        if (this.props.wrongRowCells[i] === (col * 9) + row + 1) {
          return "wrongCell"
        }
      }
    }
  }

  checkWrongColCells = (col, row) => {
    if (this.props.wrongColCells.length > 0) {
      for (let i = 0; i < this.props.wrongColCells.length; i++) {
        if (this.props.wrongColCells[i] === (col * 9) + row + 1) {
          return "wrongCell"
        } 
      }
    }
  }

  checkCurrentCell = (col, row) => {
    if (this.props.currentCell === (col * 9) + row + 1) {
      return "currentBtn";
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="levelContainer">
        {this.props.level.map((valueRow, indexCol) => {
          return (
            valueRow.map((valueCol, indexRow) => {
                for (let j = 0; j < this.state.darkCells.length; j++) {
                  if (this.state.darkCells[j] === (indexCol * 9) + indexRow + 1) {
                    return (
                      <button
                        className=
                        {`btnInitialDark
                        ${this.checkCurrentCell(indexCol, indexRow)}
                        ${this.checkWrongRowCells(indexCol, indexRow)}
                        ${this.checkWrongColCells(indexCol, indexRow)}
                        `}
                        key={(indexCol * 9) + indexRow + 1}
                        onClick={() => {
                          this.props.onCellClick((indexCol * 9) + indexRow + 1)
                        }}
                      >
                        {valueCol === 0 ? null : valueCol}
                      </button>
                    );
                  }
                } return (
                  <button
                    className=
                    {`btnInitialLight
                        ${this.checkCurrentCell(indexCol, indexRow)}
                        ${this.checkWrongRowCells(indexCol, indexRow)}
                        ${this.checkWrongColCells(indexCol, indexRow)}
                        `}
                    key={(indexCol * 9) + indexRow + 1}
                    onClick={() => {
                      this.props.onCellClick((indexCol * 9) + indexRow + 1)
                    }}
                  >
                    {valueCol === 0 ? null : valueCol}
                  </button>
                );
            })
          );
        })}
      </div>
    );
  }
}

export default Level;