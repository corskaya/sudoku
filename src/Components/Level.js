import React from "react";
import "./Level.css";
import OuterButton from "./OuterButton";
import InnerButtons from "./InnerButtons";

class Level extends React.Component {

  checkEmptyClickRowCells = (col, row) => {
    if (this.props.emptyClickRowCells.length > 0) {
      for (let i = 0; i < this.props.emptyClickRowCells.length; i++) {
        if (this.props.emptyClickRowCells[i] === (col * 9) + row + 1) {
          return "checkCell"
        }
      }
    }
  }

  checkEmptyClickColCells = (col, row) => {
    if (this.props.emptyClickColCells.length > 0) {
      for (let i = 0; i < this.props.emptyClickColCells.length; i++) {
        if (this.props.emptyClickColCells[i] === (col * 9) + row + 1) {
          return "checkCell"
        }
      }
    }
  }

  checkEmptyClickBoxCells = (col, row) => {
    if (this.props.emptyClickBoxCells.length > 0) {
      for (let i = 0; i < this.props.emptyClickBoxCells.length; i++) {
        if (this.props.emptyClickBoxCells[i] === (col * 9) + row + 1) {
          return "checkCell"
        }
      }
    }
  }

  checkLoadClickCells = (col, row) => {
    if (this.props.loadClickCells.length > 0) {
      for (let i = 0; i < this.props.loadClickCells.length; i++) {
        if (this.props.loadClickCells[i] === (col * 9) + row + 1) {
          return "sameValue border"
        }
      }
    }
  }

  checkWrongCells = (col, row) => {
    if (this.props.wrongCells.length > 0) {
      for (let i = 0; i < this.props.wrongCells.length; i++) {
        if (this.props.wrongCells[i] === (col * 9) + row + 1) {
          return "wrongCell"
        }
      }
    }
  }

  checkWrongRowCells = (col, row) => {
    if (this.props.wrongRowCells.length > 0) {
      for (let i = 0; i < this.props.wrongRowCells.length; i++) {
        if (this.props.wrongRowCells[i] === (col * 9) + row + 1) {
          return "wrongCellBg"
        }
      }
    }
  }

  checkWrongColCells = (col, row) => {
    if (this.props.wrongColCells.length > 0) {
      for (let i = 0; i < this.props.wrongColCells.length; i++) {
        if (this.props.wrongColCells[i] === (col * 9) + row + 1) {
          return "wrongCellBg"
        }
      }
    }
  }

  checkWrongBoxCells = (col, row) => {
    if (this.props.wrongBoxCells.length > 0) {
      for (let i = 0; i < this.props.wrongBoxCells.length; i++) {
        if (this.props.wrongBoxCells[i] === (col * 9) + row + 1) {
          return "wrongCellBg"
        }
      }
    }
  }

  checkCorrectCells = (col, row) => {
    if (this.props.correctCells.length > 0) {
      for (let i = 0; i < this.props.correctCells.length; i++) {
        if (this.props.correctCells[i] === (col * 9) + row + 1) {
          return "correctCell"
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
              return (
                valueCol === 0 ?
                  <InnerButtons
                    className=
                    {`${this.checkCurrentCell(indexCol, indexRow)}
                    ${this.checkEmptyClickRowCells(indexCol, indexRow)}
                    ${this.checkEmptyClickColCells(indexCol, indexRow)}
                    ${this.checkEmptyClickBoxCells(indexCol, indexRow)}
                    ${this.checkLoadClickCells(indexCol, indexRow)}
                    ${this.checkWrongCells(indexCol, indexRow)}
                    ${this.checkWrongRowCells(indexCol, indexRow)}
                    ${this.checkWrongColCells(indexCol, indexRow)}
                    ${this.checkWrongBoxCells(indexCol, indexRow)}
                    ${this.checkCorrectCells(indexCol, indexRow)}
                  `}
                    key={(indexCol * 9) + indexRow + 1}
                    index={(indexCol * 9) + indexRow + 1}
                    onCellClick={this.props.onCellClick}
                    pencilNumbers={this.props.pencilNumbers}
                    isPaused={this.props.isPaused}
                    isFinished={this.props.isFinished}
                    /> :
                  <OuterButton
                    className=
                    {`${this.checkCurrentCell(indexCol, indexRow)}
                    ${this.checkEmptyClickRowCells(indexCol, indexRow)}
                    ${this.checkEmptyClickColCells(indexCol, indexRow)}
                    ${this.checkEmptyClickBoxCells(indexCol, indexRow)}
                    ${this.checkLoadClickCells(indexCol, indexRow)}
                    ${this.checkWrongCells(indexCol, indexRow)}
                    ${this.checkWrongRowCells(indexCol, indexRow)}
                    ${this.checkWrongColCells(indexCol, indexRow)}
                    ${this.checkWrongBoxCells(indexCol, indexRow)}
                    ${this.checkCorrectCells(indexCol, indexRow)}
                  `}
                    key={(indexCol * 9) + indexRow + 1}
                    index={(indexCol * 9) + indexRow + 1}
                    onCellClick={this.props.onCellClick}
                    value={valueCol}
                    isPaused={this.props.isPaused}
                    isFinished={this.props.isFinished}
                  />
              );
            })
          );
        })}
      </div>
    );
  }
}

export default Level;