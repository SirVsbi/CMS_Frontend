import React from 'react';
import ProposalViewTable from "./ProposalViewTable";

export default class ProposalView extends React.Component{
    constructor(props){
        super(props);

        this.authors = [{ participantId: 1, authorName: 'Bogdan Vasc', email: 'bv@cs.ubbcluj.ro' },
            { participantId: 2, authorName: 'Szabolcs Vidam', email: 'sv@cs.ubbcluj.ro' },
            {participantId: 3, authorName: 'Alexandra Tudorescu', email: 'at@cs.ubbcluj.ro'}];

        this.data = [
            { id: 312, order:'1', name: 'Interesting paper', conference: { name: "Test conference", call: {deadline: '2020-05-29'} }, createdOn: '22-05-2021', status: 'review', canView: true, canEdit: true, canDelete: true, canReview: false, paperAbstract: 'In this project, we were asked to experiment with a real world dataset, and to explore how machine learning algorithms can be used to find the patterns in data. We were expected to gain experience using a common data-mining and machine learning library, Weka, and were expected to submit a report about the dataset and the algorithms used. After performing the required tasks on a dataset of my choice, herein lies my final report.' },
            { id: 350, order:'2', name: 'Another interesting paper', authors: [this.authors[2]], conference: { name: "Test conference 2", call: {deadline: '2020-05-29'} }, createdOn: '24-05-2021', status: 'review', canView: true, canEdit: false, canDelete: false, canReview: true, paperAbstract: 'In this project, we were asked to experiment with a real world dataset, and to explore how machine learning algorithms can be used to find the patterns in data. We were expected to gain experience using a common data-mining and machine learning library, Weka, and were expected to submit a report about the dataset and the algorithms used. After performing the required tasks on a dataset of my choice, herein lies my final report.' }
        ];

    }

    render(){
        return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Proposals</h3>
                        </div>
                        <div className="card-body">
                            <ProposalViewTable data={this.data}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
