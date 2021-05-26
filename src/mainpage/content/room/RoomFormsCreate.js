import React from 'react';
import ApiService from '../../../ApiService';

export default class RoomFormsCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                name: '',
                capacity: 0,
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

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}
