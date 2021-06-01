import React from 'react';
import ApiService from '../../../ApiService';
import Error403 from '../errors/Error403';


export default class ConferenceSectionAdd extends React.Component{
    constructor(props){
        super(props);

        this.conferenceId = props.conferenceId;

        this.state = {
            rooms: [],
            chairs: [],
            onAdd: props.onAdd,
            error: null,
            success: null,
            fetching: 2
        }

        this.handleSubmit = this.handleSubmit.bind(this);


    }

    componentDidMount(){
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = '$("#add-start-date").inputmask("mm/dd/yyyy hh:mm", { "placeholder": "mm/dd/yyyy hh:mm" });' +
                      '$("#add-end-date").inputmask("mm/dd/yyyy hh:mm", { "placeholder": "mm/dd/yyyy hh:mm" })';
        
        document.body.appendChild(s);

        ApiService.GetAllRooms(data => {
            this.setState({
                rooms: data,
                fetching: this.state.fetching - 1
            });
            console.log(this.state.rooms);
        }, error => {
            alert('Error getting rooms information: ' + (error.message || error));
        });

        ApiService.GetAllChairs(data => {
            this.setState({
                chairs: data,
                fetching: this.state.fetching - 1
            });
        });
        
    }

    handleSubmit(event){
        event.preventDefault();
        const startDate = document.getElementById('add-start-date').value;
        const endDate = document.getElementById('add-end-date').value;
        const name = document.getElementById('add-name').value;
        const chair = document.getElementById('add-chair').value;
        const room = document.getElementById('add-room').value;

        let data = {
            conferenceId: this.conferenceId,
            sessionChairId: chair,
            roomId: room,
            name: name,
            timeStart: Date.parse(startDate),
            timeEnd: Date.parse(endDate)
        }
        console.log(data);
        ApiService.CreateConferenceSection(data, response => {
            this.setState({success: 'Section created successfull!'});
            this.state.onAdd();
        }, error => {
            this.setState({error: 'Failed to create section: ' + error.message || error});
        });
    }

    createSectionSuccess(response){
        this.setState({success: "Section created successfully!"});
    }

    createSectionFailed(response){
        this.setState({error: "Creation failed. Error: " + (response.message || response)});
    }

    render(){

        if (!localStorage.getItem('isAdmin') == "true"){
            return (
                <Error403/>
            )
        }

        if (this.state.fetching > 0) return (<div>...</div>);

        let roomsOptions = [];
        for (var i = 0; i < this.state.rooms.length; i++){
            roomsOptions.push(
                <option key={this.state.rooms[i].roomId} value={this.state.rooms[i].roomId}>{this.state.rooms[i].name}</option>
            );
        }
        let chairOptions = this.state.chairs.map(c => {
            return (
                <option key={c.chairId} value={c.chairId}>{c.participant.userName}</option>
            )
        });

        return (
            <div className="card card-danger">
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="card-header">
                        <h3 className="card-title">Create a section</h3>
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
                                <input id="add-name" name="title" type="text" className="form-control"/>
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
                            <label>Room:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-laptop-house"></i></span>
                                </div>
                                <select id="add-room" className="form-control">
                                    {roomsOptions}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Chair:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-redhat"></i></span>
                                </div>
                                <select id="add-chair" className="form-control">
                                    {chairOptions}
                                </select>
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
