import React from "react";
import "./Pause.css";

class Pause extends React.Component {
  render() {
    return (
      <div className="pauseContainer">
        <p className="pauseText">Paused</p>
        <div className="buttonContainer">
          <button className="btnResume" onClick={() => this.props.onResume()}>Resume</button>
        </div>
      </div>
    );
  }
}

export default Pause;