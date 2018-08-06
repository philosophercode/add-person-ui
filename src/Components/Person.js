import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Preview from './Preview.js';
import PreviewRes from './PreviewRes';

import './Person.css';

export class Person extends Component {
	constructor(props) {
		super(props);
		this.state = {
						newPerson: true,
						preview: false,
						previewRes: false,

						data: {},
						error: false,

						name: '',
						age: '',
						dob: '',
						email: ''
					};

		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleName = this.handleName.bind(this);
		this.handleAge = this.handleAge.bind(this);
		this.handleDOB = this.handleDOB.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		
		this.togglePreview = this.togglePreview.bind(this);

		this.resetPerson = this.resetPerson.bind(this);
		this.postPerson = this.postPerson.bind(this);
		this.getPersons = this.getPersons.bind(this);
	}

	
    handleSubmit(event) {
		if(
			this.state.name &&
			this.state.age &&
			this.state.dob &&
			this.state.email
		){
			this.setState({
				newPerson: !this.state.newPerson,
				preview: !this.state.preview,
				error: false
			});
		} else {
			alert('Please Fill Out All Fields');
		}
	}
	
	handleName(event) {
		this.setState({name: event.target.value});
	}
	handleAge(event) {
		this.setState({age: event.target.value});
	}
	handleDOB(event) {
		this.setState({dob: event.target.value});
	}
	handleEmail(event) {
		this.setState({email: event.target.value});
	}

	togglePreview(){
		this.setState({
			newPerson: !this.state.newPerson,
			preview: !this.state.preview
		});
	}
	
	resetPerson(){
		this.setState({
			newPerson: true,
			preview: false,
			previewRes: false,

			data: {},
			error: false,

			name: '',
			age: '',
			dob: '',
			email: ''
		});
		console.log("state cleared");
		
	}

	postPerson(event){
		fetch('https://add-person-api.herokuapp.com/person', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                name : this.state.name,
                age : this.state.age,
                dob : this.state.dob,
                email : this.state.email,
			}),
		})
		.then(res => {
			if (res.status === 500) {
				this.setState({
					error: true,
					newPerson: true,
					preview: false
				})
			} else {
				res.json()
				.then(data => this.setState({data: data[0][0]}))
			}
		})
		.catch(err => console.log(err));
		this.setState({
			newPerson: false,
			preview: false
		});
	}


	getPersons(){
		fetch('https://add-person-api.herokuapp.com/person')
		.then(
			function(response) {
				if (response.status !== 200) {
					console.log("Error. Status Code: " + response.status);
					return;
				}
				response.json()
				.then(
					function(data) {
						console.log(data);
					}
				);
			}
		)
		.catch(err => console.log(err));
	}



    render() {
		if (this.state.newPerson && !this.state.preview) {
			return (
				<div className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-md-4 text-left">					
							{/* <Button color="success" onClick={this.getPersons}>LOG</Button> */}
							<Form>
								<h1 className="title">New Person</h1>
								<FormGroup>
									<Label for="name">Name</Label>
									<Input type="text" name="name" id="name" placeholder="First and Last Name" value={this.state.name} onChange={this.handleName} />
								</FormGroup>
								<FormGroup>
									<Label for="age">Age</Label>
									<Input type="number" name="age" id="age" placeholder="" value={this.state.age} onChange={this.handleAge} />
								</FormGroup>
								<FormGroup>
									<Label for="dob">Date of Birth</Label>
									<Input type="date" name="dob" id="dob" placeholder="" value={this.state.dob} onChange={this.handleDOB} />
								</FormGroup>
								<FormGroup>
									<Label for="mail">Email</Label>
									<div className={" " + (this.state.error ? "d-block" : "d-none")}>
										<p>ERROR: Please check all fields are filled correctly and you are using a unique email address.</p>
									</div>
									<Input className={"" + (this.state.error ? "bg-danger text-black" : "")} type="email" name="email" id="email" placeholder="username@host.com" value={this.state.email} onChange={this.handleEmail} />
								</FormGroup>
								<Button className="button-bottom" onClick={this.handleSubmit}>Preview</Button>
							</Form>
						</div>
					</div>
				</div>
			);
		} else if (!this.state.newPerson && this.state.preview) {
			return(
				<Preview 
					onViewChange = {this.togglePreview}
					postPerson = {this.postPerson}
					name = {this.state.name}
					age = {this.state.age}
					dob = {this.state.dob}
					email = {this.state.email}
				/>
			)
		} else if (!this.state.newPerson && !this.state.preview) {
			return (
				<PreviewRes 
					resetPerson = {this.resetPerson}
					data = {this.state.data}
				/>
			)
		} else {
			return '';
		}
    }
}