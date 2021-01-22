import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import ls from "local-storage"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(event) {
        event.preventDefault();
        ls.set("isLoggedIn","false");
        ls.set("username","");
        ls.set("email","");
        ls.set("userType", "");
        window.location = "/";
    };

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-brand">Demo</div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                             <li className="navbar-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>  
                            {ls.get("userType") === "recruiter" ? (
                                <li className="navbar-item">
                                    <Link to="/createJob" className="nav-link">CreateJob</Link>
                                </li>
                            ) : null}
                            <li className="navbar-item">
                                <Link to="/users" className="nav-link">Users</Link>
                            </li>                      
                            <li className="navbar-item">
                                <Link to="/profile" className="nav-link">My Profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="#" className="nav-link" onClick = {this.handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}