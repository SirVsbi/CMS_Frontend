import React from 'react';

export default class ProposalViewTableItem extends React.Component{
    constructor(props){
        super(props);

        this.order = props.order || "1.";
        this.name = props.name || "Untitled";
        this.createdOn = props.createdOn || "unknown";
        this.timeLeft = '';
        this.timeDone = 0;
        this.paperAbstract = props.paperAbstract || "Lorem ipsum";
        this.paperAbstractShort = this.paperAbstract.substr(0, 50);
        this.conference = props.conference || { name: "Test conference", call: {deadline: '2020-05-31'} };
        this.deadline = this.conference.call.deadline || "2021-04-31";
        this.showMoreLess = 'show more';

        console.log(this.conference.call.deadline);
        let deadlineUtc = Date.parse(this.conference.call.deadline);
        let dateNow = Date.now();

        this.authors = props.authors || [
            { participantId: 1, authorName: 'Bogdan Vasc', email: 'bv@cs.ubbcluj.ro' },
            { participantId: 2, authorName: 'Szabolcs Vidam', email: 'sv@cs.ubbcluj.ro' },
        ];
        this.topics = props.topics || [
            { topicId: 1, name: 'Machine Learning'},
            { topicId: 2, name: 'Cyber-security'},
        ]
        this.keywords = props.keywords || [
            { topicId: 1, name: 'methodology'},
            { topicId: 2, name: 'visualisation'},
            { topicId: 2, name: 'framework'},
        ]
        this.possibleStatus = {
            'bidding': {title: 'Bidding', className: 'bg-info'},
            'review': {title: 'In review', className: 'bg-warning'},
            'closed': {title: 'Closed', className: 'bg-danger'}
        }
        this.status = this.possibleStatus[props.status] || this.possibleStatus['bidding'];
        this.canView = (props.canView!==undefined?props.canView:true);
        this.canEdit = (props.canEdit!==undefined?props.canEdit:true);
        /*
        if (!isNaN(deadlineUtc) && !isNaN(dateNow)) {
            console.log(deadlineUtc);
            console.log(Date.now());
            this.canEdit = dateNow < deadlineUtc;
            console.log(deadlineUtc);
            console.log(Date.now());
        }

         */
        this.canDelete = (props.canDelete!==undefined?props.canDelete:true);

        this.state = { //state is by default an object
            authors: this.authors,
            topics: this.topics,
            keywords: this.keywords,
            abstractExpanded: false,
            abstractTruncated:false,
            showMoreLess: this.showMoreLess,
        };

        this.showMoreLessAction = this.showMoreLessAction.bind(this);


    }

    showMoreLessAction(){
        /*
        if (this.state.showMoreLess === 'show more'){
            this.showMoreAbstract();
        }
        else{
            this.showLessAbstract();
        }

         */
    }

    showMoreAbstract(){
        document.getElementById("#paperAbstract").setValue(this.paperAbstract);
        this.setState({showMoreLess: 'show less'});
    }

    showLessAbstract(){
        document.getElementById("#paperAbstract").setValue(this.paperAbstractShort);
        this.setState({showMoreLess: 'show more'});
    }


    renderAuthorTableData() {
        return this.state.authors.map((author, index) => {
            const { participantId, authorName, email } = author //destructuring
            return (
                <tr key={participantId}>
                    <td>{authorName}</td>
                    <td>{email}</td>
                </tr>
            )
        })
    }

    renderTopicTableData() {
        return this.state.topics.map((topic, index) => {
            const { topicId, name } = topic //destructuring
            return (
                <tr key={topicId}>
                    <td>{name}</td>
                </tr>
            )
        })
    }

    renderKeywordTableData() {
        return this.state.keywords.map((keyword, index) => {
            const { keywordId, name } = keyword //destructuring
            return (
                <tr key={keywordId}>
                    <td>{name}</td>
                </tr>
            )
        })
    }



    render(){
        return (
            <tr>
                <td>{this.order}</td>
                <td>
                    <span>{this.name}</span>
                    <br/>
                    <small>Created on {this.createdOn}</small>
                </td>
                <td>
                <table id='authors'>
                    <tbody>
                    {this.renderAuthorTableData()}
                    </tbody>
                </table>
                </td>
                <td>
                    <table id='topics'>
                        <tbody>
                        {this.renderTopicTableData()}
                        </tbody>
                    </table>
                </td>
                <td>
                    <table id='keywords'>
                        <tbody>
                        {this.renderKeywordTableData()}
                        </tbody>
                    </table>
                </td>
                <td id={"paperAbstract"} className={"showMore"}>{this.paperAbstractShort}<button onClick={this.showMoreLessAction}>{this.state.showMoreLess}</button></td>
                <td>
                    <span>{this.conference.name}</span>
                    <br/>
                    <small>Submit deadline: {this.conference.call.deadline}</small>
                </td>
                <td>
                    <span className={"badge " + this.status.className}>{this.status.title}</span>
                </td>
                <td className="project-actions" key={this.order}>
                    {this.canView &&
                    <button className="btn btn-primary btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-folder"/>
                        View
                    </button>
                    }
                    {this.canEdit &&
                    <button className="btn btn-info btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-pencil-alt"/>
                        Edit
                    </button>
                    }
                    {this.canDelete &&
                    <button className="btn btn-danger btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-trash"/>
                        Delete
                    </button>
                    }
                </td>
            </tr>

        )
    }
}
