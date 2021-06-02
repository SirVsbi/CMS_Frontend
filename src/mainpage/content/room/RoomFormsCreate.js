import React from 'react';
import ApiService from '../../../ApiService';
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Checkbox, TextField} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

export default class RoomFormsCreate extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.id = parseInt(this.props.match.params.id) || null;
        this.name = this.props.match.params.name || null;
        this.capacity = parseInt(this.props.match.params.capacity) || null;
        this.readOnly = (this.id != null);
        this.state = {
            error: null,
            success: null,
            id: this.id,
            name: this.name,
            capacity: this.capacity,
            readOnly: this.readOnly,
            buttonName: this.readOnly? "Edit": "Create"
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCreateFailed = this.onCreateFailed.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
        this.onUpdateFailed = this.onUpdateFailed.bind(this);
        this.onUpdateSuccess = this.onUpdateSuccess.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        const name = document.getElementById('add-name').value;
        const capacity = document.getElementById('add-capacity').value;

        console.log(this.state.fields);
        if(!this.state.readOnly){
            this.createConferenceRequest({
                name: name,
                capacity: capacity
            });
        }
        else {
            this.editConferenceRequest({
                id: this.state.id,
                name: name,
                capacity: this.state.capacity
            })
        }

    }

    createConferenceRequest(data){
        ApiService.CreateRoom(data, this.onCreateSuccess, this.onCreateFailed);
    }

    editConferenceRequest(data){
        //this.setState({success: parseInt(data.id) + " " + data.name + " " + parseInt(data.capacity)});
        ApiService.UpdateRoom(data, this.onUpdateSuccess, this.onUpdateFailed);
    }

    onUpdateSuccess(response){
        this.setState({success: "You have successfully updated a room!"});
    }

    onUpdateFailed(response){
        this.setState({error: "Room update failed! Error: " + response.message || response});
    }

    onCreateSuccess(response){
        this.setState({success: "You have successfully created a room!"});
    }

    onCreateFailed(response){
        this.setState({error: "Room creation failed! Error: " + response.message || response});
    }

    render(){
        if (!(localStorage.getItem('isAdmin') == "true")){
            return (
                <Error403/>
            )
        }
        const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
        const checkedIcon = <CheckBoxIcon fontSize="small" />;
        return (
            <div className="card card-danger">
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="card-header">
                        <h3 className="card-title">Create a conference</h3>
                    </div>
                    <div className="card-body">
                        {this.state.error &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                        }
                        {this.state.success &&
                        <div className="alert alert-success" role="alert">
                            {this.state.success}
                        </div>
                        }

                        <div className="form-group">
                            <label>Name:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-feather"></i></span>
                                </div>
                                <input id="add-name" name="name" type="text" className="form-control" value={this.state.name} readOnly={this.state.readOnly}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Capacity:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-users"></i></span>
                                </div>
                                <input id="add-capacity" name="capacity" type="number" className="form-control" value={this.state.capacity} onChange={(value) => this.onChange(value)}/>
                            </div>
                        </div>

                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">{this.state.buttonName}</button>
                    </div>
                </form>
            </div>
        )
    }
}
