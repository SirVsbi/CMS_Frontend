import React from 'react';
import ConferenceViewTable from './ConferenceViewTable';
import ApiService from '../../../ApiService';


export default class ConferenceView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            fetching: true
        }

        this.getData = this.getData.bind(this);

    }

    getData(){
        ApiService.GetAllConferences(data => {
            this.setState({data: data, fetching: false});
        }, error => {
            //alert('Failed getting conferences! Error: ' + (error.message || error));
        });
    }

    onDelete(conferenceId){
        ApiService.DeleteConference(conferenceId, success => {
            this.getData();
        },error => {
            alert('Could not delete conference: ' + error.message || error);
        });
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        if (this.state.fetching){
            return (
                <span>Fetching data...</span>
            )
        }
        return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Conferences</h3>
                        </div>
                        <div className="card-body">
                            <ConferenceViewTable data={this.state.data} onDelete={this.onDelete}/>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
