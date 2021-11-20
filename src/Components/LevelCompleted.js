import React from "react";
import "./LevelCompleted.css";

class LevelCompleted extends React.Component {

  getMinutes() {
    if ((Math.floor(this.props.time / 60)).toString().length === 1) {
      return `0${Math.floor(this.props.time / 60)}`;
    } else {
      return Math.floor(this.props.time / 60);
    }
  }

  getSeconds() {
    if ((this.props.time % 60).toString().length === 1) {
      return `0${this.props.time % 60}`;
    } else {
      return this.props.time % 60;
    }
  }

  render() {
    console.log(this.props.isCompleted);
    if (this.props.isCompleted) {
      return (
          <div className="solvedText">SOLVED</div>
      );
    } else {
      return (
        <div className="completedContainer">
          <p className="completedText">Level Completed</p>
          <p className="congratsText">Congratulations!</p>
          <p className="timeText">Complete Time: {this.getMinutes()}:{this.getSeconds()}</p>
          <p className="mistakesText">Mistakes Made: {this.props.mistakes}</p>
          <div className="buttonsContainer">
            <button className="btnContinue" onClick={() => this.props.onContinue()}>Continue</button>
          </div>
        </div>
      );
    }
  }
}

export default LevelCompleted;