import React from "react";
import Form from "../common/form";
import { signUp } from "../store/user";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import Joi from "joi-browser";
import SubmitBtn from "../common/submitBtn";

class SignUp extends Form {
  state = {
    loading: false,
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().allow("").optional(),
    lastName: Joi.string().allow("").optional(),
    email: Joi.string()
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
    const data = {
      email: this.state.data.email,
      password: this.state.data.password,
    };
    this.props.signUp(data, this.callback);
  };

  callback = (res) => {
    if (res.status === 200) {
      window.alert(res.data.message);
      this.props.history.push("/");
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
        <h3>Sign Up</h3>

        {this.renderInput("firstName", "First Name", "text")}

        {this.renderInput("lastName", "Last Name", "text")}

        {this.renderInput("email", "Email address", "email")}

        {this.renderInput("password", "Password", "password")}

        <SubmitBtn
          btnClass="btn btn-primary"
          disabled={this.state.loading}
          label={"Submit"}
        />

        <p className="forgot-password text-right">
          Already registered? <Link to={"/"}>Sign In</Link>
        </p>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (data, callback) => dispatch(signUp(data, callback)),
});

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
