import React from "react";
import "./Level.css";
import OuterButton from "./OuterButton"

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
          return "sameValue"
        }
      }
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

  checkWrongBoxCells = (col, row) => {
    if (this.props.wrongBoxCells.length > 0) {
      for (let i = 0; i < this.props.wrongBoxCells.length; i++) {
        if (this.props.wrongBoxCells[i] === (col * 9) + row + 1) {
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
              return (
                <OuterButton
                  className=
                  {`${this.checkCurrentCell(indexCol, indexRow)}
                    ${this.checkEmptyClickRowCells(indexCol, indexRow)}
                    ${this.checkEmptyClickColCells(indexCol, indexRow)}
                    ${this.checkEmptyClickBoxCells(indexCol, indexRow)}
                    ${this.checkLoadClickCells(indexCol, indexRow)}
                    ${this.checkWrongRowCells(indexCol, indexRow)}
                    ${this.checkWrongColCells(indexCol, indexRow)}
                    ${this.checkWrongBoxCells(indexCol, indexRow)}
                  `}
                  key={(indexCol * 9) + indexRow + 1}
                  index={(indexCol * 9) + indexRow + 1}
                  onClick={this.props.onCellClick}
                  value={valueCol === 0 ? null : valueCol}
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