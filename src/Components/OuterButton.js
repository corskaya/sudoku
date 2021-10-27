import React from "react";

class OuterButton extends React.Component {
  render() {
    return (
      <button
        className={`btnInitial ${this.props.className}`}
        onClick={() => {
          this.props.onCellClick(this.props.index, this.props.value)
        }}
      >
        {this.props.value}
      </button>
    );
  }
}

export default OuterButton;