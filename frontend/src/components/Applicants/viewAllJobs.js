import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Select from "react-select";

import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";

const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333"
      };
    }
  };

class viewAllJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      sop: "",
      // filteredJobs : [],
      sortNameSalary: true,
      sortNameRating: true,
      sortNameDuration: true,
      searchText: "",
      filterJobType: "",
      filterDuration: "",
    };
    this.jobType = [
        { label: "Full-time", value: "Full-time" },
        { label: "Part-time", value: "Part-time" },
        { label: "Work from Home", value: "Work from Home" },
        {label : "Reset", value: ""}
      ];
    this.durationDropdown = [
        { label : "1", value : 1},
        { label : "2", value : 2},
        { label : "3", value : 3},
        { label : "4", value : 4},
        { label : "5", value : 5},
        { label : "6", value : 6},
        { label : "7", value : 7},
        { label : "reset", value : 100},
    ]
    this.sortSalary = this.sortSalary.bind(this);
    this.renderIconSalary = this.renderIconSalary.bind(this);
    this.sortDuration = this.sortDuration.bind(this);
    this.renderIconDuration = this.renderIconDuration.bind(this);
    this.sortRating = this.sortRating.bind(this);
    this.renderIconRating = this.renderIconRating.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.onClickApply = this.onClickApply.bind(this);
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/applicants/viewAllJobs")
      .then((response) => {
        //  console.log(response);
        this.setState({ jobs: response.data });
        //  console.log(this.state.jobs);
      })
      .catch(function (error) {
        console.log(error);
        //  console.log("errorrrr");
      });

    var status = [];
    //querying in applications if the given application is present
    for (var i = 0; i < (await this.state.jobs.length); i++) {
      const query = {
        applicantEmail: ls.get("email"),
        jobId: await this.state.jobs[i]._id,
      };
      await axios
        .post("http://localhost:4000/applicants/query", query)
        .then(async (res) => {
          await console.log(res.data);
          (await this.state.jobs[i].numApplications) ===
            (await this.state.jobs[i].maxApplications) ||
          (await this.state.jobs[i].remPos) === 0
            ? await status.push("Full")
            : (await res.data.length) === 0
            ? await status.push("Apply")
            : await status.push("Applied");
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    // await console.log(status);
    var temp = [];
    temp = this.state.jobs;
    for (var i = 0; i < (await this.state.jobs.length); i++) {
      temp[i].applicantStatus = status[i];
      console.log(temp[i].applicantStatus);
    }

    this.setState({ jobs: temp });
  }
  // componentWillReceiveProps(nextProps) {
  //     this.setState({
  //       filtered: nextProps.jobs
  //     });
  //   }
  handleChange(filterJobType) {
    this.setState({ filterJobType });
    console.log(`Option selected:`, filterJobType);
  }
  handleChangeDuration(filterDuration) {
    this.setState({ filterDuration });
    console.log(`Option selected:`, filterDuration);
  }

  sortSalary() {
    var array = this.state.jobs;
    var flag = this.state.sortNameSalary;
    array.sort(function (a, b) {
      if (a.salary !== undefined && b.salary !== undefined) {
        return (1 - flag * 2) * (a.salary - b.salary);
      } else {
        return 1;
      }
    });
    this.setState({
      jobs: array,
      sortNameSalary: !this.state.sortNameSalary,
    });
  }
  renderIconSalary() {
    if (this.state.sortNameSalary) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }

  sortRating() {
    var array = this.state.jobs;
    var flag = this.state.sortNameRating;
    array.sort(function (a, b) {
      if (a.salary !== undefined && b.salary !== undefined) {
        return (1 - flag * 2) * (a.salary - b.salary);
      } else {
        return 1;
      }
    });
    this.setState({
      jobs: array,
      sortNameRating: !this.state.sortNameRating,
    });
  }
  renderIconRating() {
    if (this.state.sortNameRating) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }

  sortDuration() {
    var array = this.state.jobs;
    var flag = this.state.sortNameDuration;
    array.sort(function (a, b) {
      if (a.duration !== undefined && b.duration !== undefined) {
        return (1 - flag * 2) * (a.duration - b.duration);
      } else {
        return 1;
      }
    });
    this.setState({
      jobs: array,
      sortNameDuration: !this.state.sortNameDuration,
    });
  }
  renderIconDuration() {
    if (this.state.sortNameDuration) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }
  updateSearch(event) {
    this.setState({ searchText: event.target.value.substr(0, 20) });
  }

  onClickApply = (id, email, title, salary, recruiterName) => (e) => {
    this.state.sop = prompt("Enter your SOP(max - 250 words)");

    const newApplication = {
      recruiterEmail: email,
      applicantEmail: ls.get("email"),
      jobId: id,
      sop: this.state.sop,
      jobTitle: title,
      jobSalary: salary,
      recruiterName: recruiterName,
    };

    axios
      .post("http://localhost:4000/applicants/apply", newApplication)
      .then((res) => {
        alert("Applied on Job " + title);
        console.log(res.data);
        window.location.reload();
      })
      .catch((res) => {
        alert(res.response.data[Object.keys(res.response.data)[0]]);
      });
  };

 
  render() {
    const { filterJobType } = this.state;
    const { filterDuration } = this.state;

    //search function
    let filteredJobs = this.state.jobs.filter((job) => {
      return (
        job.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
      );
    });

    let tempArr = filteredJobs;

//    //filter based on jobType
    if(this.state.filterJobType === "") filteredJobs = tempArr;
    else{
    filteredJobs = filteredJobs.filter((job) => {
      return job.jobType.indexOf(this.state.filterJobType.value) !== -1;
    });
}

let tempArr2 = filteredJobs;

//filtering on job Duration
if(this.state.filterDuration === "") filteredJobs = tempArr2;
else{
    filteredJobs = filteredJobs.filter((job) => {
      return job.duration < this.state.filterDuration.value;
    });
}

    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={3} lg={3}>
            <List component="nav" aria-label="mailbox folders">
              <ListItem text>
                <h3>Filters</h3>
              </ListItem>
              <ListItem button>
                <form noValidate autoComplete="off">
                  <label>
                    <h5>Salary</h5>
                  </label>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                  />
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true} 
                  />
                </form>
              </ListItem>
              <Divider />
              {/* <ListItem button divider> */}
              {/* <div className="form-group"> */}
              
              <label>
                    <h5>Filter Based on JobType</h5>
                  </label>
              <Select 
            //   defaultValue={this.jobType[3]}
              defaultValue={{ label: "Filter based on JobType", value: "" }}
            //   placeholder="Filter based on JobType"
              id="jobType"
              // className="form-control"
              value={filterJobType}
              onChange={this.handleChange}
              options={this.jobType}
              styles={colourStyles}
            />
             <Divider />
             <label>
                    <h5>Filter Based on Duration</h5>
                  </label>
              <Select
            //   placeholder="Filter based on JobType"
            defaultValue={this.durationDropdown[7]}
              id="durationDropdown"
              // className="form-control"
              value={filterDuration}
              onChange={this.handleChangeDuration}
              options={this.durationDropdown}
              styles={colourStyles}
            />
              {/* </div> */}
               
            </List>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <List component="nav" aria-label="mailbox folders">
              <TextField
                id="standard-basic"
                label="Search"
                fullWidth={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={this.state.searchText}
                onChange={this.updateSearch}
              />
            </List>
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {/* <TableCell> Sr No.</TableCell> */}
                    {/* <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date</TableCell> */}
                    <TableCell>
                      <h6>Job Title</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Recruiter Name</h6>
                    </TableCell>
                    <TableCell>
                      <Button onClick={this.sortRating}>
                        {this.renderIconRating()}
                      </Button>
                      <h6>Rating</h6>
                    </TableCell>
                    <TableCell>
                      <Button onClick={this.sortSalary}>
                        {this.renderIconSalary()}
                      </Button>
                      <h6>Salary</h6>
                    </TableCell>
                    <TableCell>
                      <Button onClick={this.sortDuration}>
                        {this.renderIconDuration()}
                      </Button>
                      <h6>Duration</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Deadline</h6>
                    </TableCell>
                    <TableCell>
                      <h6>JobType</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Status</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredJobs.map((job, ind) => (
                    <TableRow key={ind}>
                      {/* <TableCell>{ind+1}</TableCell> */}
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.recruiterName}</TableCell>
                      <TableCell>{"abc"}</TableCell>
                      <TableCell>{job.salary}</TableCell>
                      <TableCell>{job.duration}</TableCell>
                      <TableCell>{job.deadline}</TableCell>
                      <TableCell>{job.jobType}</TableCell>
                      <TableCell>
                        {/* <Button onClick = {this.onClickApply(job._id, job.recruiterEmail,job.title)} 
                                                    variant="contained" 
                                                    color = "primary">Apply</Button>
                                             */}
                        {job.applicantStatus === "Full" ? (
                          <Button className="btn btn-primary">Full</Button>
                        ) : job.applicantStatus === "Apply" ? (
                          <Button
                            onClick={this.onClickApply(
                              job._id,
                              job.recruiterEmail,
                              job.title,
                              job.salary,
                              job.recruiterName
                            )}
                            variant="contained"
                            color="primary"
                          >
                            Apply
                          </Button>
                        ) : (
                          <Button variant="contained" color="secondary">
                            Applied
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default viewAllJobs;
