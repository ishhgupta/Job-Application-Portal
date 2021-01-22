import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ls from "local-storage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(loginData);
    axios
    .post("http://localhost:4000/users/login", loginData)
    .then(function (res) {
      console.log(res.data);
        ls.set("isLoggedIn","true");
		    ls.set("username",res.data.user.name);
		    ls.set("email",res.data.user.email);
		    ls.set("userType", res.data.user.userType);
		    window.location = "/";
	  })
      .catch(function (err) {
        alert(err);
        // alert(res.reponse.data[Object.keys(res.response.data)[0]]);
      });
    // this.setState({
    //   email: "",
    //   password: "",
    //   errors: {},
    // });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              error={errors.email}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              error={errors.password}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
