import React from 'react';
import { withRouter } from 'react-router-dom';
import ConferenceSection from './ConferenceSection';
import ConferenceSectionAdd from './ConferenceSectionAdd';
import ApiService from '../../../ApiService';


class ConferenceDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //sections: [{name: 'First section'}, {}, {}, {}],
            sections: [],
            conferenceId: this.props.match.params.id,
            conference: {
                name: '',
                timeStart: '',
                timeEnd: '',
                program: ''
            },
            rooms: [],
            fetching: 2
        }

    }

    componentDidMount(){
        ApiService.GetConferenceDetails(this.state.conferenceId,  data => {
            this.setState({
                conference: {
                    name: data.name || 'Unknown',
                    timeStart: data.timeStart || 'Unknown',
                    timeEnd: data.timeEnd || 'Unknown',
                    program: data.program || 'Unknown program'
                },
                fetching: this.state.fetching - 1
            });
        }, error => {
            alert('Error getting conference information: ' + (error.message || error));
        });

        ApiService.GetAllConferenceSections(this.state.conferenceId, data => {
            this.setState({
                sections: data,
                fetching: this.state.fetching - 1
            });
            console.log(data);
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
            let sec = <ConferenceSection id={id} key={id} {...this.state.sections[i]}/>;
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
                                    {this.state.conference.name}
                                </h3>
                                <p className="text-muted">
                                    {this.state.conference.program}
                                </p>
                                <div className="text-muted">
                                    Conference creator
                                    <div className="list-inline">
                                        <div className="list-inline-item">
                                            <img alt="Avatar" src="adminlte/dist/img/user_default.jpg" style={{borderRadius: "50%", display: "inline", width: "2.5rem"}}></img>
                                        </div>
                                        <div className="list-inline-item">
                                            <a href="/ws/profile">Admin</a>
                                        </div>
                                    </div>
                                    <br/>
                                    <p>
                                        Created on
                                        <b className="d-block">{this.state.conference.createOn}</b>
                                    </p>
                                    <p>
                                        Start date
                                        <b className="d-block">{this.state.conference.timeStart}</b>
                                    </p>
                                    <p>
                                        Deadline
                                        <b className="d-block">{this.state.conference.timeEnd}</b>
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
                            <div className="col-12 col-md-12 col-lg-3 order-2 order-md-1">
                                {col1}
                            </div>
                            <div className="col-12 col-md-12 col-lg-3 order-2 order-md-1">
                                {col2}
                            </div>
                            <div className="col-12 col-md-12 col-lg-3 order-1 order-md-2">
                                <ConferenceSectionAdd conferenceId={this.state.conferenceId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(ConferenceDetails)
