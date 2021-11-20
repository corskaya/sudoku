import React from "react";
import "./Warning.css";

class Warning extends React.Component {
  render() {
    return (
      <div className="warningContainer">
        <p className="warningText">Your changes will be lost.</p>
        <p className="warningText">Are you sure?</p>
        <div className="buttonsContainer">
          <button className="btnChoice" onClick={() => this.props.onWarning(true, this.props.change)}>Yes</button>
          <button className="btnChoice" onClick={() => this.props.onWarning(false, this.props.change)}>No</button>
        </div>
      </div>
    );
  }
}

export default Warning;