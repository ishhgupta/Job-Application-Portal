import React, { Component } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import ls from "local-storage";
import { TextField } from "@material-ui/core";

class createJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      recruiterName: "",
      recruiterEmail: "",
      maxApplications: "",
      maxPositions: "",
      deadline: "",
      requiredSkills: "",
      jobType: "",
      duration: "",
      salary: "",
      selectedOption: "",
      datePosting: "",
      remPos: "",
      errors: {},
    };
    this.jobType = [
      { label: "Full-time", value: "Full-time" },
      { label: "Part-time", value: "Part-time" },
      { label: "Work from Home", value: "Work from Home" },
    ];

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  onSubmit(e) {
    e.preventDefault();

    const newJob = {
      title: this.state.title,
      recruiterName: ls.get("username"),
      recruiterEmail: ls.get("email"),
      maxApplications: this.state.maxApplications,
      maxPositions: this.state.maxPositions,
      deadline: this.state.deadline,
      requiredSkills: this.state.requiredSkills,
      jobType: this.state.selectedOption.value,
      duration: this.state.duration,
      salary: this.state.salary,
      remPos: this.state.maxPositions,
      datePosting: Date.now(),
    };
    // console.log(newJob);
    axios
      .post("http://localhost:4000/recruiters/createJob", newJob)
      .then((res) => {
        alert("Created " + res.data.title);
        console.log(res.data);
        window.location.reload();
      })
      .catch((res) => {
        alert(res.response.data[Object.keys(res.response.data)[0]]);
      });

    
  }

  render() {
    const { errors } = this.state;
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Job Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChange}
              id="title"
              error={errors.title}
            />
          </div>
          <div className="form-group">
            <label>Maximum Number of Applications Allowed: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.maxApplications}
              onChange={this.onChange}
              error={errors.maxApplications}
              id="maxApplications"
            />
          </div>
          <div className="form-group">
            <label>Maximum Available Positions: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.maxPositions}
              onChange={this.onChange}
              error={errors.maxPositions}
              id="maxPositions"
            />
          </div>
          <div>
          <label>Deadline</label>
          <br></br>
            <TextField
              type="datetime-local"
              id="deadline"
              value={this.state.deadline}
              onChange={this.onChange}
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Required Skills: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.requiredSkills}
              onChange={this.onChange}
              error={errors.requiredSkills}
              id="requiredSkills"
            />
          </div>
          <div className="form-group">
            <label>Duration of Job in Months: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChange}
              error={errors.duration}
              id="duration"
            />
          </div>
          <div className="form-group">
            <label>Salary per Month: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.salary}
              onChange={this.onChange}
              error={errors.salary}
              id="salary"
            />
          </div>
          <div className="form-group">
            {/* <label>Confirm password: </label> */}
            <Select
              placeholder="JobType"
              id="jobType"
              // className="form-control"
              value={selectedOption}
              onChange={this.handleChange}
              options={this.jobType}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Job"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
export default createJob;
