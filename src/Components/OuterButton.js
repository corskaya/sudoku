import React from "react";

class OuterButton extends React.Component {
  render() {
    return (
      <button
        className={`btnInitial ${this.props.className}`}
        disabled={this.props.isPaused || this.props.isFinished}
        onClick={() => {
          this.props.onCellClick(this.props.index, this.props.value)
        }}
      >
        {this.props.isPaused ? null : this.props.value}
      </button>
    );
  }
}

export default OuterButton;