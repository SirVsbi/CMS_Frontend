import React from 'react';
import ReviewViewTable from './ReviewViewTable';
import ApiService from "../../../../ApiService";
import {withRouter} from "react-router-dom";


class ReviewView extends React.Component{
    constructor(props){
        super(props);

        this.id = parseInt(this.props.match.params.id) || null;

        this.canReview = props.canReview || true;

        this.state = {
            proposalId: this.id,
            proposalData: [],
            data: [],
            fetching: true
        }

        this.acceptPaper = this.acceptPaper.bind(this);
        this.rejectPaper = this.rejectPaper.bind(this);
    }

    getData(){
        ApiService.GetAllReviews(data => {
            console.log(data);
            this.setState({data: data, fetching: false});
        }, error => {
            alert('Failed getting reviews! Error: ' + (error.message || error));
        });
    }

    getProposalDetails(){
        ApiService.GetProposalDetails(this.state.proposalId, data => {
            this.setState({
                data: data.reviews,
                fetching: false,
            });
        }, error => {
            alert("Error when fetching proposal: " + error.message || error);
            //this.setState({fetching: false});
        });
    }

    componentDidMount(){
        //this.getData();
        this.getProposalDetails();
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
        //console.log(this.getProposal());
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
                                {this.canReview && this.state.data.length > 0 && this.state.data[0].proposal.status == "contradictory" &&
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

export default withRouter(ReviewView)
