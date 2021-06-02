import React from 'react';
import ApiService from '../../../ApiService';
import Error403 from '../errors/Error403';
import InvitationsTable from './InvitationsTable';


export default class InvitationsView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            reviewers: [], // {id:1, name:'name'}
            chairs: [], // {id:1, name:'name'}
            cochairs: [],
            all: [],
            fetching: 4
        }

        this.addChair = this.addChair.bind(this);
        this.addCochair = this.addCochair.bind(this);
        this.addReviewer = this.addReviewer.bind(this);

    }

    getData(){
        ApiService.GetAllChairs(data => {
            this.setState({chairs: data, fetching: this.state.fetching - 1});
        }, error => {
            alert('Failed getting chairs! Error: ' + (error.message || error));
        });

        ApiService.GetAllCoChairs(data => {
            this.setState({cochairs: data, fetching: this.state.fetching - 1});
        }, error => {
            alert('Failed getting cochairs! Error: ' + (error.message || error));
        });

        ApiService.GetAllReviewers(data => {
            this.setState({reviewers: data, fetching: this.state.fetching - 1});
        }, error => {
            alert('Failed getting reviewers! Error: ' + (error.message || error));
        });

        ApiService.GetAllParticipants(data => {
            this.setState({all: data, fetching: this.state.fetching - 1});
        }, error => {
            alert('Failed getting participants! Error: ' + (error.message || error));
        });
    }

    componentDidMount(){
        this.getData();
    }

    addChair(pid){
        if (!pid || pid == '' || pid < 0){
            alert('Invalid operation!'); return;
        }
        ApiService.AddChair(Number(pid), response => {
            this.setState({success: "Successfully added a chair!"});
            this.setState({fetching: 4});
            this.getData();
            if (pid == localStorage.getItem('pid')){
                localStorage.setItem('isChair', 'true');
            }
            
        }, error => {
            alert("Error when trying to add chair: " + error.message || error);
        });
    }

    addReviewer(pid){
        if (!pid || pid == '' || pid < 0){
            alert('Invalid operation!'); return;
        }
        ApiService.AddReviewer(Number(pid), response => {
            this.setState({success: "Successfully added a chair!"});
            this.setState({fetching: 4});
            this.getData();
            if (pid == localStorage.getItem('pid')){
                localStorage.setItem('isReviewer', 'true');
            }
        }, error => {
            alert("Error when trying to add reviewer: " + error.message || error);
        });
    }

    addCochair(pid){
        if (!pid || pid == '' || pid < 0){
            alert('Invalid operation!'); return;
        }
        ApiService.AddCoChair(Number(pid), response => {
            this.setState({success: "Successfully added a chair!"});
            this.setState({fetching: 4});
            this.getData();
            if (pid == localStorage.getItem('pid')){
                localStorage.setItem('isCoChair', 'true');
            }
            
        }, error => {
            alert("Error when trying to add cochair: " + error.message || error);
        });
    }

    render(){

        if (!(localStorage.getItem('isAdmin') == "true")){
            return (
                <Error403/>
            )
        }
        if (this.state.fetching > 0){
            return (
                <span>Fetching data...</span>
            )
        }
        let reviewersToAdd = this.state.all.filter(p => {
            for (var i = 0; i < this.state.reviewers.length; i++){
                if (this.state.reviewers[i].participant.pid == p.pid) return false;
            }
            return true;
        });
        let chairsToAdd = this.state.all.filter(p => {
            for (var i = 0; i < this.state.chairs.length; i++){
                if (this.state.chairs[i].participant.pid == p.pid) return false;
            }
            return true;
        });
        let cochairsToAdd = this.state.all.filter(p => {
            for (var i = 0; i < this.state.cochairs.length; i++){
                if (this.state.cochairs[i].participant.pid == p.pid) return false;
            }
            return true;
        });
        return (
            <div className="row">
                <div className="">
                        <InvitationsTable vid="chairs" title="Chairs" data={this.state.chairs} all={chairsToAdd} onAdd={this.addChair}/>
                        <InvitationsTable vid="cochairs" title="Co Chairs" data={this.state.cochairs} all={cochairsToAdd} onAdd={this.addCochair}/>
                        <InvitationsTable vid="reviewers" title="Reviewers" data={this.state.reviewers} all={reviewersToAdd} onAdd={this.addReviewer}/>
                       
                    
                </div>
            </div>
            
        )
    }
}
