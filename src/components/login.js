import React from "react";
import { login } from "../store/user";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Form from "../common/form";

import Joi from "joi-browser";
import { setJwt } from "../services/localStorageServices";
import SubmitBtn from "../common/submitBtn";

class Login extends Form {
  state = {
    loading: false,
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .error(() => {
        return { message: "*Required" };
      }),
    password: Joi.string()
      .min(8)
      .max(25)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "password"
      )
      .required()
      .label("Password")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.required":
              err.message = "*Required";
              break;

            case "any.empty":
              err.message = "*Required";
              break;

            case "string.regex.name":
              err.message = "*Invalid";
              break;

            case "string.min":
              err.message = "*Invalid";
              break;

            case "string.max":
              err.message = "*Invalid";
              break;

            default:
          }
        });
        return errors;
      }),
  };

  doSubmit = () => {
    this.setState({
      loading: true,
    });
    setJwt(this.state.data.username);
    this.props.history.push("/dashboard");

    // const data = {
    //   username: this.state.data.username,
    //   password: this.state.data.password,
    // };
    // this.props.login(data, this.callback);
  };

  callback = (res) => {
    if (res.status === 200) {
      setJwt(res.data.data.token);
      this.props.history.push("/dashboard");
      this.setState({
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
      window.alert("Something went wrong");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        {this.renderInput("username", "Username", "username")}

        {this.renderInput("password", "Password", "password")}

        <SubmitBtn
          btnClass="btn btn-primary"
          disabled={this.state.loading}
          label={"Submit"}
        />

        <p className="forgot-password text-right">
          New User? <Link to={"/sign-up"}>sign up</Link>
        </p>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data, callback) => dispatch(login(data, callback)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
