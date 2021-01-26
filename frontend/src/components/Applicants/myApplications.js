import React, {Component} from 'react';
import axios from 'axios';
import ls from "local-storage";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class myApplications extends Component {
    
    constructor(props) {
        super(props);
        this.state = { applications: []};
    }

    async componentDidMount() {
        const data ={
            applicantEmail : ls.get("email"),
        }
         await axios.post('http://localhost:4000/applicants/myApplications', data)
             .then(response => {
                 console.log(response);
                 this.setState({applications: response.data});
             })
             .catch(function(error) {
                 console.log(error);
               
             })
    }

    render() {
        return (
            <div>
              
                <Grid container>
                    
                    <Grid item xs={12} md={12} lg={12}>
                    
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> Sr No.</TableCell>
                                            <TableCell> Job Title</TableCell>
                                            <TableCell> Date of Joining</TableCell>
                                            <TableCell> Salary per Month</TableCell>
                                            {/* <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date</TableCell> */}
                                            <TableCell>Name of Recruiter</TableCell>
                                            <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.applications.map((application,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind+1}</TableCell>
                                            <TableCell>{application.jobTitle}</TableCell>
                                            <TableCell>{application.joinDate}</TableCell>
                                            <TableCell>{application.jobSalary}</TableCell>
                                            <TableCell>{application.recruiterName}</TableCell>
                                            <TableCell>{application.stage}</TableCell>
                                        </TableRow>
                                ))
                                }
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
        )
    }
}

export default myApplications;