import React, { Component } from 'react';
import { Button } from 'reactstrap';

import './Person.css';

export default class PreviewRes extends Component {
	constructor(props) {
		super(props);
		this.removeTime = this.removeTime.bind(this);
		this.resetPerson = this.resetPerson.bind(this);
	}

	removeTime(){
		if (this.props.data.dob) {
			var x = this.props.data.dob.substring(0, this.props.data.dob.indexOf("T"));
			return x;
		}
	}

	resetPerson(){
		this.props.resetPerson();
	}


    render() {
		return (
			<div className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-md-4 text-left">
						<h1 className="title">Created Person</h1>
						<p><b>ID: </b>{this.props.data.id}</p>
						<p><b>Name: </b>{this.props.data.name}</p>
						<p><b>Age: </b>{this.props.data.age}</p>
						<p><b>Date of Birth: </b>{this.removeTime()}</p>
						<p><b>Email: </b>{this.props.data.email}</p>
						<div className="row">
							<div className="col-md-12 button-bottom">
								<Button onClick={this.resetPerson}>New Person</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
    }
}