import React from "react";
import "./Level.css";

class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkSquares: [4, 5, 6, 13, 14, 15, 22, 23, 24, 28, 29, 30, 34, 35, 36, 37, 38, 39, 43, 44, 45, 46, 47, 48, 52, 53, 54, 58, 59, 60, 67, 68, 69, 76, 77, 78]
    }
  }

  render() {
    return (
      <div className="levelContainer">
        {this.props.level.map((valueCol, indexCol) => {
          return (
            valueCol.map((valueRow, indexRow) => {
              for (let i = 0; i < this.state.darkSquares.length; i++) {
                if (this.state.darkSquares[i] === (indexCol * 9) + indexRow + 1) {
                  return (
                    <button
                      className={this.props.currentCell === (indexCol * 9) + indexRow + 1 ? "currentBtnDark" : "btnInitialDark"}
                      key={(indexCol * 9) + indexRow + 1
                      }
                      onClick={() => {
                        this.props.onCellClick((indexCol * 9) + indexRow + 1)
                      }}
                    >
                      {valueRow === 0 ? null : valueRow}
                    </button>
                  );
                }
              } return (
                <button
                  className={this.props.currentCell === (indexCol * 9) + indexRow + 1 ? "currentBtnLight" : "btnInitialLight"}
                  key={(indexCol * 9) + indexRow + 1
                  }
                  onClick={() => {
                    this.props.onCellClick((indexCol * 9) + indexRow + 1)
                  }}
                >
                  {valueRow === 0 ? null : valueRow}
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