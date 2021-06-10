import React, { Component } from "react";
import loaderIcon from "../images/loading-icon.svg";

class SubmitBtn extends Component {
  state = {};
  render() {
    return this.props.onClickHandle ? (
      <button
        disabled={this.props.disabled}
        onClick={this.props.onClickHandle}
        type="submit"
        className={this.props.btnClass}
      >
        {this.props.label}
        {this.props.loading && (
          <b className=" btn btn-primary btn-loader">
            <img
              src={loaderIcon}
              alt="loader"
              className="loader-img fa-spin loader-icon"
            />
          </b>
        )}
      </button>
    ) : (
      <button
        type="submit"
        disabled={this.props.disabled}
        className={this.props.btnClass}
      >
        {this.props.label}
        {this.props.loading && (
          <b className="btn-loader">
            <img
              src={loaderIcon}
              alt="loader"
              className="loader-img fa-spin loader-icon"
            />
          </b>
        )}
      </button>
    );
  }
}

export default SubmitBtn;
