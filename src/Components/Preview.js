import React, { Component } from 'react';
import { Button } from 'reactstrap';

import './Person.css';

export default class Preview extends Component {
	constructor(props) {
		super(props);
		this.editPerson = this.editPerson.bind(this);
		this.addPerson = this.addPerson.bind(this);

	}

	editPerson(){
		this.props.onViewChange();
	}

	addPerson(){
		this.props.postPerson();
	}

    render() {
		return (
			<div className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-md-4 text-left">
						<h1 className="title">Preview Person</h1>
						<p><b>Name: </b>{this.props.name}</p>
						<p><b>Age: </b>{this.props.age}</p>
						<p><b>Date of Birth: </b>{this.props.dob}</p>
						<p><b>Email: </b>{this.props.email}</p>
						<div className="row">
							<div className="col-md-12 button-bottom">
								<Button className="float-left" color="secondary" onClick={this.editPerson}>Edit</Button>
								<Button className="float-right" color="success" onClick={this.addPerson}>Submit</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
    }
}