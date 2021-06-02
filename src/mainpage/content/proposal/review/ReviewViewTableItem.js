import React from 'react';
import ApiService from "../../../../ApiService";
import {Box, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";

export default class ReviewViewTableItem extends React.Component{
    constructor(props){
        super(props);

        this.order = props.order || "1.";
        this.reviewId = props.reviewId;
        this.justification = props.justification || "Unglaublich";
        this.proposal = props.proposal;
        this.qualifier = props.qualifier;
        this.reviewer = props.reviewer;
        this.canReview = props.canReview || true;
        this.possibleStatus = {
            'bidding': {title: 'Bidding', className: 'bg-info'},
            'accepted': {title: 'Accepted', className: 'bg-success'},
            'contradictory': {title: 'Contradictory', className: 'bg-warning'},
            'rejected': {title: 'Rejected', className: 'bg-danger'}
        }
        this.status = this.possibleStatus[this.proposal.status] || this.possibleStatus['bidding'];



        this.state = { //state is by default an object
            order: this.order,
            justification: this.justification,
            proposal: this.proposal,
            proposalName: this.proposal.name,
            qualifier: this.qualifier,
            qualifierName: this.qualifier.name,
            qualifierScore: this.qualifier.score,
            reviewer: this.reviewer,
            reviewerName: this.reviewer.participant.name
        };

    }

    componentDidMount() {
    }

    render(){
        return (
            <tr id={this.order}>
                <td>{this.order}</td>
                <td>
                    <span>{this.state.proposalName}</span>
                </td>
                <td>
                    <span>{this.state.reviewerName}</span>
                </td>
                <td>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">{this.state.qualifierName}</Typography>
                        <Rating
                            name="rating"
                            value={this.state.qualifierScore}
                            precision={1}
                            max={7}
                            readOnly
                        />
                    </Box>
                </td>
                <td>
                    <span>{this.state.justification}</span>
                </td>
                <td>
                    <span className={"badge " + this.status.className}>{this.status.title}</span>
                </td>
            </tr>

        )
    }
}
