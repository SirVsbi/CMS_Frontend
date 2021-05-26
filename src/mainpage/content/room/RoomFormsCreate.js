import React from 'react';
import ApiService from '../../../ApiService';
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Checkbox, TextField} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

export default class RoomFormsCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                name: '',
                capacity: 0,
                conferenceSections: [{name: "Section1"}, {name: "Section2"}]
            },
            error: null,
            success: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCreateFailed = this.onCreateFailed.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);

    }

    componentDidMount(){
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;

        document.body.appendChild(s);

    }

    handleSubmit(event){
        event.preventDefault();
        const name = document.getElementById('add-name').value;
        const capacity = document.getElementById('add-capacity').value;
        let fields = this.state.fields;
        fields.name = name;
        fields.capacity = capacity;
        this.setState({fields: fields});

        console.log(this.state.fields);
        this.createConferenceRequest({
            name: this.state.fields.name,
            capacity: this.state.fields.capacity
        });

    }

    createConferenceRequest(data){
        ApiService.CreateRoom(data, this.onCreateSuccess, this.onCreateFailed)
    }

    onCreateSuccess(response){
        this.setState({success: "You have successfully created a room!"});
    }

    onCreateFailed(response){
        this.setState({error: "Room creation failed! Error: " + response.message || response});
    }

    render(){
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
                                <input id="add-name" name="name" type="text" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Capacity:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-users"></i></span>
                                </div>
                                <input id="add-capacity" name="capacity" type="number" className="form-control"/>
                            </div>
                        </div>

                    </div>

                    <div className="form-group">
                        <Autocomplete
                            multiple
                            id="section-checkbox"
                            options={this.state.fields.conferenceSections}
                            min={1}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </React.Fragment>
                            )}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Conference sections" placeholder="Section" />
                            )}
                        />
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}
