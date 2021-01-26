import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import { TextField } from "@material-ui/core";

class applicantProfile extends Component {
  constructor() {
    super();
    this.state = {
      maxApplications: "",
      maxPositions: "",
      deadline: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // const response;
  componentDidMount() {
    const orderdata = { title: ls.get("title"), mail: ls.get("email") };
    // console.log(orderdata);
    axios
      .post("http://localhost:4000/recruiters/viewOneJob", orderdata)
      .then((res) => {
        this.setState({ maxApplications: res.data.maxApplications });
        this.setState({ maxPositions: res.data.maxPositions });
        this.setState({ deadline: res.data.deadline})
        // console.log(res.data);
        // console.log(this.state.deadline);
      })
      .catch(function (err) {
        alert(err);
        // alert(res.response.data[Object.keys(res.response.data)[0]]);
      });
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const orderdata = {
      title: ls.get("title"),
      mail: ls.get("email"),
      maxApplications: this.state.maxApplications,
      maxPositions: this.state.maxPositions,
      deadline : this.state.deadline
    };
    // console.log(orderdata);
    axios
      .post("http://localhost:4000/recruiters/updateJob", orderdata)
      .then((res) => {
        console.log(res);
        alert("Information Updated Successfully");
        window.location.reload();
      })
      .catch(function (err) {
        alert(err);
        // alert(res.response.data[Object.keys(res.response.data)[0]]);
      });
    // ls.set("title", "");
  }

  render() {
    // const { errors } = this.state;
    return (
      <div className="container">
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Maximum Number of Applications Allowed: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.maxApplications}
              onChange={this.handleChange}
              id="maxApplications"
              //   error = {errors.maxApplications}
            />
          </div>

          <div className="form-group">
            <label>Maximum Available Positions: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.maxPositions}
              onChange={this.handleChange}
              //   error = {errors.maxPositions}
              id="maxPositions"
            />
          </div>

          <div>
          <label>Deadline</label>
          <br></br>
          <input
              type="datetime"
              className="form-control"
              value={this.state.deadline}
              // onChange={this.handleChange}
              //   error = {errors.maxPositions}
              // id="maxPositions"
            />
            <TextField
              type="datetime-local"
              id="deadline"
              value={this.state.deadline}
              onChange={this.handleChange}
            />
          </div>
          <br></br>

          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default applicantProfile;
