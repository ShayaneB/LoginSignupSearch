import React, { Component } from "react";

class Input extends Component {
  state = {
    formclass: "form-control",
  };

  render() {
    const { name, label, error, readOnly, ...rest } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          id={name}
          className={this.state.formclass}
          readOnly={readOnly}
          {...rest}
        />

        {error && <span className="error">{error}</span>}
      </div>
    );
  }
}

export default Input;
