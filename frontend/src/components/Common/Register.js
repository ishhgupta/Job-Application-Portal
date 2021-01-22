import React, { Component } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      userType: "",
      errors: {},
      selectedOption: "",
      date: null,
    };
    this.userType = [
      { label: "Applicant", value: "applicant" },
      { label: "Recruiter", value: "recruiter" },
    ];

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ name: event.target.value });
  }
  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  onChangePassword2(event) {
    this.setState({ password2: event.target.value });
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
};
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      userType: this.state.selectedOption.value,
      date: Date.now(),
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/users/register", newUser)
      .then((res) => {
        alert("Created " + res.data.name);
        console.log(res.data);
        window.location.reload();
      })
      .catch((res) => {
        alert(res.response.data[Object.keys(res.response.data)[0]]);
      });

    this.setState({
      name: "",
      email: "",
      date: null,
      password: "",
      password2: "",
      userType: "",
      selectedOption: "",
      errors: {}
    });
  }

  render() {
    const { errors } = this.state;
    const { selectedOption } = this.state;
    return (
      <div className = "container">
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeUsername}
              error = {errors.name}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              error = {errors.email}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              error = {errors.password}
            />
          </div>
          <div className="form-group">
            <label>Confirm password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.password2}
              onChange={this.onChangePassword2}
              error = {errors.password2}
            />
          </div>
          <div className="form-group">
            {/* <label>Confirm password: </label> */}
            <Select
              placeholder = "UserType"
              // className="form-control"
              value={selectedOption}
              onChange={this.handleChange}
              options = {this.userType}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
export default Register;
