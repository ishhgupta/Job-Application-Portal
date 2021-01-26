import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import Button from '@material-ui/core/Button';

class viewJobs extends Component {
	constructor() {
		super();
		this.state = {
			response: []
        };
		this.onDelete = this.onDelete.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onClickApplications = this.onClickApplications.bind(this);
    }
    
	// const response;	
	componentDidMount() {
		const data = { mail: ls.get("email") };
		axios
			.post("http://localhost:4000/recruiters/viewJobs", data)
			.then(res => {
				this.setState({ response: res.data });
			})
			.catch(function(err) {
                alert(err);
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}

	onDelete = arg => e => {
		e.preventDefault();
		const orderdata = {
			title: document.getElementById(arg - 4).innerHTML,
			mail: ls.get("email")
		};
		// console.log(orderdata);
		axios
			.post("http://localhost:4000/recruiters/delete", orderdata)
			.then(res => {
				console.log(res);
				alert("Job Deleted Successfuly");
				window.location.reload();
			})
			.catch(function(err) {
                alert(err);
				// alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};

	onClickEdit = arg => e => {
		e.preventDefault();
		// console.log("abc");
		const orderdata = {
			title: document.getElementById(arg - 5).innerHTML,
		};
		console.log(orderdata);
		ls.set("title",orderdata.title);
		window.location = ("/viewJobs/editJob");
		
	};

	onClickApplications = arg => e => {
		e.preventDefault();
		// console.log("abc");
		const orderdata = {
			title: document.getElementById(arg - 6).innerHTML,
		};
		console.log(orderdata);
		ls.set("title",orderdata.title);
		window.location = ("/viewJobs/applications");
		
	};

	

	createTable() {
		let table = [];
		let i = 0;
		let heading = [
			<td key={i++}>Job Title</td>,
			<td key={i++}>Date of Posting</td>,
			<td key={i++}>Number of Applicants</td>,
            <td key={i++}>Remaining Number of Positions</td>
		];
		table.push(<tr key={i++}>{heading}</tr>);
		for (const response of this.state.response) {
			let children = [];
            const title = response.title;
            const datePosting = response.datePosting;
            const numApplicants = response.numApplications;
            const remPos = response.remPos;

			children.push(
				<td id={i} key={i++}>
					{title}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{datePosting}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{numApplicants}
				</td>
            );
            children.push(
				<td id={i} key={i++}>
					{remPos}
				</td>
            );
            
			children.push(
				<td id={i} key={i++}>
					<form onClick={this.onDelete(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Delete
						</button>
					</form>
				</td>
			);
			
			children.push(
				<td id={i} key={i++}>
					<form onClick={this.onClickEdit(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Edit
						</button>
					</form>
				</td>
			);
			
			
			children.push(
				<td id={i} key={i++}>
					<form onClick={this.onClickApplications(i - 1)}>
					<Button variant="contained" color = "secondary">Applications</Button>
						{/* <button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Edit
						</button> */}
					</form>
				</td>
			);
            
			table.push(<tr key={i++}>{children}</tr>);
			i++;
		}
		return table;
	}

	render() {
		const table = this.createTable();
		return (
			<table>
				<tbody>{table}</tbody>
			</table>
		);
	}
}

export default viewJobs;
