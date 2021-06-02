import React from 'react';
import ShowMore from "../../../shared/ShowMore";
import ApiService from "../../../ApiService";
import moment from 'moment';

export default class ProposalViewTableItem extends React.Component{
    constructor(props){
        super(props);

        this.order = props.order || "1.";
        //this.user = props.user || {pid: 1, name: "Alexandra-Natalia Tudorescu", chair: {chairId: 1}}
        this.username = localStorage.username;
        this.proposalId = props.proposalId;
        this.name = props.name || "Untitled";
        this.createdOn = props.createdOn || "unknown";
        this.timeLeft = '';
        this.timeDone = 0;
        this.paperAbstract = props.paperAbstract || "Lorem ipsum";
        this.paperAbstractShort = this.paperAbstract.substr(0, 50);
        this.status = props.status;
        //this.conference = props.conference || { name: "Test conference", call: {deadline: '2020-05-31'} };
        //this.conferenceSection = props.conferenceSection || {name: "Test conference section"};
        // should work if it's on the server: otherwise I get "failed - no file" error, but visually we get something downloading
        this.filePath = props.filePath || "ProposalFormsReview.js";
        this.displayFilePath = props.name || "BestPaper.txt";
        this.showMoreLess = 'show more';

        this.authors = props.authors || [];

        this.conferenceSection = this.authors[0].conferenceSection;
        console.log(this.conferenceSection);
        this.conference = this.conferenceSection.conference;
        this.deadline = this.conference.deadline;
        //this.deadline = "2021-04-31";

        //console.log(this.conference.deadline);
        let deadlineUtc = Date.parse(this.deadline);
        let dateNow = Date.now();

        this.possibleStatus = {
            'bidding': {title: 'Bidding', className: 'bg-info'},
            'accepted': {title: 'Accepted', className: 'bg-success'},
            'contradictory': {title: 'Contradictory', className: 'bg-warning'},
            'rejected': {title: 'Rejected', className: 'bg-danger'}
        }
        this.status = this.possibleStatus[props.status] || this.possibleStatus['bidding'];
        this.canView = (props.canView!==undefined?props.canView:true);
        this.canEdit = (props.canEdit!==undefined?props.canEdit && dateNow < deadlineUtc:false);
        this.canDelete = (props.canDelete!==undefined?props.canDelete:false);
        this.canReview = localStorage.getItem('isReviewer')=='true'?true:false;//(props.canReview!==undefined?props.canReview:true);

        this.state = { //state is by default an object
            proposalId: this.proposalId,
            user: this.user,
            authors: this.authors,
            abstractExpanded: false,
            abstractTruncated:false,
            showMoreLess: this.showMoreLess,
            canView: this.canView,
            canEdit: this.canEdit,
            canReview: this.canReview,
            canDelete: this.canDelete
        };

        this.showMoreLessAction = this.showMoreLessAction.bind(this);
        this.reviewProposal = this.reviewProposal.bind(this);

        this.openReviews = this.openReviews.bind(this);
    }

    getProposalDetails(){
        ApiService.GetProposalDetails(this.proposalId, data => {
            this.setState({
                proposalData: data,
            });
        }, error => {
            alert("Error when fetching proposals: " + error.message || error);
        });
    }

    isUserAuthor(){
        for (let i = 0; i < this.state.authors.length; i++){
        //this.state.authors.map((author) => {
            const author = this.state.authors[i];
            const { participant } = author;
            //console.log(author);
            let authorName = participant.name;
            if(authorName === this.state.username){
                //alert("AUTHOR");
                return true;
            }
        }
        return false;
    }

    setPermissions(){
        console.log(localStorage);
        if(localStorage.getItem('isReviewer') === "true" && !this.isUserAuthor()){
            this.setState({canReview: this.state.canReview && true, canEdit: this.state.canEdit && false, canDelete: this.state.canDelete && false});
        }
        else if (this.isUserAuthor()){
            this.setState({canReview: this.state.canReview && false, canEdit: this.state.canEdit && true, canDelete: this.state.canDelete && true});
        }
        else{
            this.setState({canReview: this.state.canReview && false, canEdit: this.state.canEdit && false, canDelete: this.state.canDelete && false});
        }
        /*
        this.setState({canView: this.state.canView && true});
        if (this.state.user.chair != null && !this.isUserAuthor()){
            this.setState({canReview: this.state.canReview && true, canEdit: this.state.canEdit && false, canDelete: this.state.canDelete && false});
        }
        else if (this.isUserAuthor()){
            this.setState({canReview: this.state.canReview && false, canEdit: this.state.canEdit && true, canDelete: this.state.canDelete && true});
        }
        else{
            this.setState({canReview: this.state.canReview && false, canEdit: this.state.canEdit && false, canDelete: this.state.canDelete && false});
        }

         */
    }

    openReviews(event){
        event.preventDefault();
        window.location.href = '/ws/review/' + this.state.proposalId;
    }

    componentDidMount() {
        this.setPermissions();
    }

    reviewProposal(event){
        event.preventDefault();
        window.location.href = '/ws/proposal/review/' + this.state.proposalId;
    }

    showMoreLessAction(id){
        if (this.state.showMoreLess === 'show more'){
            this.showMoreAbstract(id);
        }
        else{
            this.showLessAbstract(id);
        }

         /**/
    }

    showMoreAbstract(id){
        document.getElementById(id).innerHTML = this.paperAbstract;
        this.setState({showMoreLess: 'show less'});
    }

    showLessAbstract(id){
        document.getElementById(id).innerHTML = this.paperAbstractShort;
        this.setState({showMoreLess: 'show more'});
    }


    renderAuthorTableData() {
        return this.state.authors.map((author, index) => {
            const { authorId, participant } = author //destructuring
            return (
                <tr key={authorId}>
                    <td>{participant.name}</td>
                </tr>
            )
        })
    }

    renderTopicTableData() {
        return this.state.topics.map((topicc, index) => {
            const { topicId, topic } = topicc //destructuring
            return (
                <tr key={topicId}>
                    <td>{topic}</td>
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
            <tr id={this.order}>
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
                    <span id={"paperAbstract"+this.order} className={"showMore"}>
                    {this.paperAbstractShort}
                    </span>
                    <button onClick={() => this.showMoreLessAction("paperAbstract"+this.order)}>{this.state.showMoreLess}</button>
                </td>
                <td><a href={this.filePath} download>{this.displayFilePath}</a></td>
                <td>
                    <span><b>{this.conference.name}</b></span>
                    <br/>
                    <span>{this.conferenceSection.name}</span>
                    <br/>
                    <small>Submit deadline: {this.conference.deadline}</small>
                </td>
                <td>
                    <span className={"badge " + this.status.className}>{this.status.title}</span>
                </td>
                <td className="project-actions" key={this.order}>
                    {this.state.canReview &&
                    <button className="btn btn-primary btn-sm" style={{marginRight:'3px'}} onClick={this.openReviews}>
                        <i className="fas fa-folder"/>
                        Reviews
                    </button>
                    }
                    {this.state.canEdit &&
                    <button className="btn btn-info btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-pencil-alt"/>
                        Edit
                    </button>
                    }
                    {this.state.canDelete &&
                    <button className="btn btn-danger btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-trash"/>
                        Delete
                    </button>
                    }
                    {this.state.canReview &&
                    <button className="btn btn-info btn-sm" style={{marginRight:'3px'}} onClick={this.reviewProposal}>
                        <i className="fas fa-clipboard-check"/>
                        Review
                    </button>
                    }
                </td>
            </tr>

        )
    }
}
