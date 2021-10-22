import React from "react";
import "./Number.css";

class Numbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }

  render() {
    return (
      <div className="numbersContainer">
        {this.state.buttons.map((value, index) => {
          return (
            <button
              className="btnNumber"
              key={index}
              onClick={() => {
                this.props.onNumberEnter(value)
              }
              }
            >
              {value}
            </button>
          );
        })}
        <button
          className="btnNumber"
          onClick={() => {
            this.props.onNumberEnter(0)
          }
          }
          >
          X
        </button>
      </div>
    );
  }
}

export default Numbers;