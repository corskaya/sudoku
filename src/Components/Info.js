import React from "react";
import "./Info.css";

class Info extends React.Component {

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
    return (
      <div className="infoContainer">
        <div className="info">{this.props.level}/27</div>
        <div className="info">Mistakes: {this.props.mistakes}/3</div>
        <div className="info">
          {this.getMinutes()}:{this.getSeconds()}
        </div>
      </div>
    );
  }
}

export default Info;