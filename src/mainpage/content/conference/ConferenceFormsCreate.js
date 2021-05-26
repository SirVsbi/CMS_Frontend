import React from 'react';
import ApiService from '../../../ApiService';

export default class ConferenceFormsCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                title: '',
                description: '',
                startDate: '',
                endDate: ''
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
        s.innerHTML = '$("#add-start-date").inputmask("mm/dd/yyyy hh:mm", { "placeholder": "mm/dd/yyyy hh:mm" });' +
                      '$("#add-end-date").inputmask("mm/dd/yyyy hh:mm", { "placeholder": "mm/dd/yyyy hh:mm" })';
        
        document.body.appendChild(s);
        
    }

    handleSubmit(event){
        event.preventDefault();
        const startDate = document.getElementById('add-start-date').value;
        const endDate = document.getElementById('add-end-date').value;
        const title = document.getElementById('add-title').value;
        const desc = document.getElementById('add-description').value;
        let fields = this.state.fields;
        fields.title = title;
        fields.startDate = startDate;
        fields.endDate = endDate;
        fields.description = desc;
        this.setState({fields: fields});

        console.log(this.state.fields);
        this.createConferenceRequest({
            name: this.state.fields.title,
            timeStart: Date.parse(this.state.fields.startDate),
            timeEnd: Date.parse(this.state.fields.endDate),
            program: this.state.fields.description
        });

    }

    createConferenceRequest(data){
        ApiService.CreateConference(data, this.onCreateSuccess, this.onCreateFailed)
    }

    onCreateSuccess(response){
        this.setState({success: "You have successfully created a conference!"});
    }

    onCreateFailed(response){
        this.setState({error: "Conference creation failed! Error: " + response.message || response});
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
                            <label>Title:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-feather"></i></span>
                                </div>
                                <input id="add-title" name="title" type="text" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Start date:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                </div>
                                <input name="startDate" type="text" id="add-start-date" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy HH:MM" data-mask/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>End date:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                </div>
                                <input name="endDate" type="text" id="add-end-date" className="form-control" blabla="123" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy HH:MM" data-mask inputMode="numeric"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea id="add-description" name="description" className="form-control" rows="3" placeholder="Enter..."/>
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