import React from 'react';
import { withRouter } from 'react-router-dom';
import ConferenceSection from './ConferenceSection';
import ConferenceSectionAdd from './ConferenceSectionAdd';
import ApiService from '../../../ApiService';
import moment from 'moment';


class ConferenceDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //sections: [{name: 'First section'}, {}, {}, {}],
            conferenceId: this.props.match.params.id,
            sections: [],
            name: '',
            timeStart: '',
            timeEnd: '',
            program: '',
            rooms: [],
            fetching: 1
        }

        this.deleteConferenceSection = this.deleteConferenceSection.bind(this);
        this.getData = this.getData.bind(this);

    }

    getData(){
        ApiService.GetConferenceDetails(this.state.conferenceId,  data => {
            console.log(data);
            this.setState({
                sections: data.conferenceSections,
                name: data.name || 'Unknown',
                timeStart: data.timeStart?moment(data.timeStart).format('YYYY-MM-DD HH:MM'):'Unknown',
                timeEnd: data.timeEnd?moment(data.timeEnd).format('YYYY-MM-DD HH:MM'):'Unknown',
                program: data.program || 'Unknown program',
                fetching: this.state.fetching - 1
            });
            
        }, error => {
            //alert('Error getting conference infornmation: ' + (error.message || error));
        });
    }

    componentDidMount(){
        if (this.state.conferenceId == 'create') return;
        this.getData();
        
    }

    deleteConferenceSection(id){
        ApiService.DeleteConfereceSection(id, response => {
            this.getData();
        }, error => {

        });
    }

    render(){
        if (this.state.fetching > 0){
            return (
                <span>Fetching...</span>
            )
        }
        let col1 = [], col2 = [], id = 1;
        for (var i = 0; i < this.state.sections.length; i++){
            let s = this.state.sections[i];
            console.log(s);
            let sData = {id: s.conferenceSectionId, title: s.name, timeStart: s.timeStart, timeEnd: s.timeEnd, roomId: s.room.roomId, roomName: s.room.name, sessionChair: s.sessionChair, authors: s.authors}
            let sec = <ConferenceSection id={s.conferenceSectionId} key={s.conferenceSectionId} data={sData} onDelete={this.deleteConferenceSection}/>;
            if (i%2==0) col1.push(sec);
            else col2.push(sec);
            id ++;
        }
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Conference Detail</h3>

                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-6 order-1 order-md-1">
                                <h3 className="text-primary">
                                    <i className="fas fa-paint-brush"/>
                                    {this.state.name}
                                </h3>
                                <p className="text-muted">
                                    {this.state.program}
                                </p>
                                <div className="text-muted">
                                    Conference creator
                                    <div className="list-inline">
                                        <div className="list-inline-item">
                                            <img alt="Avatar" src="adminlte/dist/img/user_default.jpg" style={{borderRadius: "50%", display: "inline", width: "2.5rem"}}></img>
                                        </div>
                                        <div className="list-inline-item">
                                            <a href="/ws/profile/1">Admin</a>
                                        </div>
                                    </div>
                                    <br/>
                                    <p>
                                        Created on
                                        <b className="d-block">{this.state.createOn}</b>
                                    </p>
                                    <p>
                                        Start date
                                        <b className="d-block">{this.state.timeStart}</b>
                                    </p>
                                    <p>
                                        Deadline
                                        <b className="d-block">{this.state.timeEnd}</b>
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Sections</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {localStorage.getItem('isAdmin')=='true'
                            &&
                            <div className="col-12 col-md-12 col-lg-3 order-1 order-md-1">
                                <ConferenceSectionAdd conferenceId={this.state.conferenceId} onAdd={this.getData}/>
                            </div>
                            }
                            <div className="col-12 col-md-12 col-lg-4 order-2 order-md-2">
                                {col1}
                            </div>
                            <div className="col-12 col-md-12 col-lg-4 order-2 order-md-2">
                                {col2}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(ConferenceDetails)
