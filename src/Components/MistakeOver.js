import React from "react";
import "./MistakeOver.css";

class MistakeOver extends React.Component {
  render() {
    return (
      <div className="mistakeOverContainer">
        <p className="gameOverText">Game Over</p>
        <p className="mistakeText">You made 3 mistakes.</p>
        <div className="buttonContainer">
          <button className="btnRestart" onClick={() => this.props.onRestart()}>Restart</button>
        </div>
      </div>
    );
  }
}

export default MistakeOver;