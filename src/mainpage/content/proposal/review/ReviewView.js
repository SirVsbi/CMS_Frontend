import React from 'react';
import ReviewViewTable from './ReviewViewTable';
import ApiService from "../../../../ApiService";


export default class ReviewView extends React.Component{
    constructor(props){
        super(props);

        this.canReview = props.canReview || true;

        this.state = {
            data: [],
            fetching: true
        }

        this.acceptPaper = this.acceptPaper.bind(this);
        this.rejectPaper = this.rejectPaper.bind(this);
    }

    getData(){
        ApiService.GetAllReviews(data => {
            this.setState({data: data, fetching: false});
        }, error => {
            alert('Failed getting reviews! Error: ' + (error.message || error));
        });
    }

    componentDidMount(){
        this.getData();
    }

    getProposal(){
        return this.state.data[0].proposal;
    }

    updateProposalStatus(newStatus){
        let newProposal = this.getProposal();
        newProposal.status = newStatus;
        console.log(newProposal);
        ApiService.UpdateProposal(newProposal, success => {
            alert("Updated proposal status");
        }, failure => {
            alert("Couldn't update proposal status");
        })
    }

    acceptPaper(event){
        event.preventDefault();
        this.updateProposalStatus("accepted");
    }

    rejectPaper(event){
        event.preventDefault();
        this.updateProposalStatus("rejected");
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
                            <h3 className="card-title">Reviews</h3>
                        </div>
                        <div className="card-body">
                            <ReviewViewTable data={this.state.data}/>
                            <div className="project-actions">
                                {this.canReview && this.state.data[0].proposal.status == "contradictory" &&
                                <div>
                                    <button className="btn btn-success btn-sm" style={{marginRight:'3px'}} onClick={this.acceptPaper}>
                                        <i className="fas fa-check-circle"/>
                                        Accept paper
                                    </button>
                                    <button className="btn btn-danger btn-sm" style={{marginRight:'3px'}} onClick={this.rejectPaper}>
                                        <i className="fas fa-folder"/>
                                        Reject paper
                                    </button>
                                </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
