import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import ls from "local-storage";

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
import Landing from './components/templates/landing';
import Login from './components/Common/login';
import createJob from './components/Recruiters/createJob';
import viewJobs from './components/Recruiters/viewJobs';
import editJob from './components/Recruiters/editJob';
import viewAllJobs from './components/Applicants/viewAllJobs';
import myApplications from './components/Applicants/myApplications';
import jobApplications from './components/Recruiters/jobApplications';
import applicantProfile from './components/Applicants/profile';
import recruiterProfile from './components/Recruiters/profile';


function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        {ls.get("isLoggedIn") === "true" ? ( 
          <Navbar/>
        ):null}
        {ls.get("isLoggedIn") === "true" ? ( 
          <Route exact path = "/"  component = {Home} />
        ) : (
          <Route exact path = "/" component = {Landing}/>
        )}
        {/* <Route path = "/" exact component = {Home} />  */}
        <Route exact path = "/createJob" component={createJob}/>
        <Route exact path = "/viewJobs" component={viewJobs}/>
        <Route exact path = "/viewJobs/editJob" component={editJob}/>
        <Route exact path = "/viewJobs/applications" component={jobApplications}/>
        <Route exact path = "/viewAllJobs" component={viewAllJobs}/>
        <Route exact path = "/myApplications" component={myApplications}/>
        <Route exact path = "/applicantProfile" component={applicantProfile}/>
        <Route exact path = "/recruiterProfile" component={recruiterProfile}/>
        
        <Route path="/users" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path= "/login" component = {Login}/>
        <Route path="/profile" component={Profile}/>
  
      </div>
    </Router>
  );
}

export default App;
