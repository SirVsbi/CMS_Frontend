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

        this.state = { //state is by default an object
            order: this.order,
            justification: this.justification,
            proposal: this.proposal,
            proposalName: this.proposal.name,
            qualifier: this.qualifier,
            qualifierName: this.qualifier.name,
            qualifierScore: this.qualifier.score,
            reviewer: this.reviewer,
            reviewerName: this.reviewer.pcMember.participant.name
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
                <td className="project-actions" key={this.order}>
                    {this.canReview && (this.state.qualifierScore > 3) &&
                    <button className="btn btn-primary btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-check-circle"/>
                        Accept paper
                    </button>
                    }
                    {this.canReview && (this.state.qualifierScore <= 3) &&
                    <button className="btn btn-danger btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-folder"/>
                        Reject paper
                    </button>
                    }
                </td>
            </tr>

        )
    }
}
