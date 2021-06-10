import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema, { abortEarly: false });
    return error ? error.details[0].message : null;
  };

  setErrors = (input) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    this.setState({ errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChangeSelect = ({ currentTarget: input }) => {
    this.setErrors(input);
    this.setData(input);
  };

  handleChange = ({ currentTarget: input }) => {
    this.setData(input);
  };

  handleBlur = ({ currentTarget: input }) => {
    this.setErrors(input);
  };
  setData = (input) => {
    if (input.name) {
      const data = { ...this.state.data };
      data[input.name] = input.value;
      this.setState({ data });
    }
  };

  renderInput(name, label, type, readOnly = false) {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={errors[name]}
        readOnly={readOnly}
      />
    );
  }
}

export default Form;