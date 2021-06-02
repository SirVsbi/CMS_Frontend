import React from 'react';
import moment from 'moment';
export default class ConferenceSection extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id: props.data.id || 1,
            title: props.data.title || 'Section name',
            sessionChair: props.data.sessionChair,
            authors: props.data.authors || [],
            roomId: props.data.roomId,
            roomName: props.data.roomName,
            timeStart: props.data.timeStart?moment(props.data.timeStart).format('YYYY-MM-DD HH:MM'):"Unknown",
            timeEnd: props.data.timeEnd?moment(props.data.timeEnd).format('YYYY-MM-DD HH:MM'):"Unknown",
            onDelete: props.onDelete,
            fetching: true,
            activeTab: null
        }

    }

    setTabActive(tab){
        if (this.state.activeTab){
            document.getElementById(this.state.id + '-' + this.state.activeTab + '-link').className = "nav-link";
            document.getElementById(this.state.id + '-' + this.state.activeTab + '-content').classList.remove("active");
            document.getElementById(this.state.id + '-' + this.state.activeTab + '-content').classList.remove("show");

        }
        this.state.activeTab = tab;
        console.log(this.state.id + '-' + this.state.activeTab + '-link');
        document.getElementById(this.state.id + '-' + this.state.activeTab + '-link').className = "nav-link active";
        document.getElementById(this.state.id + '-' + this.state.activeTab + '-content').classList.add("active");
        document.getElementById(this.state.id + '-' + this.state.activeTab + '-content').classList.add("show");

    }

    componentDidMount(){
        this.setTabActive('general');
        console.log(this.props);
    }

    reviewProposal(id){
        window.location.href = '/ws/proposal/review/' + id;
    }

    render(){
        let proposals = {};

        this.state.authors.map(auth => {
            let proposalId = auth.proposal.proposalId;
            let proposalName = auth.proposal.name;
            let authId = auth.authorId;
            let authName = auth.participant.name;
            let authUsername = auth.participant.userName;

            if (proposals[proposalId] === undefined){
                proposals[proposalId] = {name: proposalName, authors: [{authId: authId, authName: authName, authUsername: authUsername}]};
            }else{
                proposals[proposalId].authors.push({authId: authId, authName: authName, authUsername: authUsername});
            }
        });

        let proposalItems = [];

        for (let proposalId in proposals){
            var prop = proposals[proposalId];
            var authors = prop.authors.map(auth => {
                return (
                    <tr key={auth.authId}><td><a href={"/ws/profile/"+auth.authId}>{auth.authName+' ('+auth.authUsername+')'}</a></td></tr>
                )
            });
            proposalItems.push( (
                <tr key={proposalId}>
                    <td>{prop.name}</td>
                    <td>
                        <table>
                            <tbody>
                                {authors}
                            </tbody>
                        </table>
                    </td>
                    {localStorage.getItem('isReviewer')=='true' && 
                        <td style={{verticalAlign: 'middle'}}>
                            <button className="btn btn-info btn-sm" style={{marginRight:'3px'}} onClick={() => {this.reviewProposal(proposalId)}}>
                                <i className="fas fa-clipboard-check"/>
                                Review
                            </button>
                        </td>
                    }
                </tr>
            ));
        }


        return (
            <div className="card card-primary card-tabs">
                <div className="card-header p-0 pt-1">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="pt-2 px-3">
                            <h3 className="card-title">{this.state.title}</h3> 
                        </li>
                        <li className="nav-item" style={{cursor:'pointer'}}>
                            <a className="nav-link" id={this.state.id+"-general-link"} data-toggle="pill" role="tab" aria-controls={this.state.id+"-tab-general"} role="tab" aria-selected="false" onClick={() => {this.setTabActive('general')}}>General</a>
                        </li>
                        <li className="nav-item" style={{cursor:'pointer'}}>
                            <a className="nav-link" id={this.state.id+"-authors-link"} data-toggle="pill" role="tab" aria-controls={this.state.id+"-tab-authors"} role="tab" aria-selected="false" onClick={() => {this.setTabActive('authors')}}>Proposals</a>
                        </li>
                        <li className="nav-item" style={{cursor:'pointer'}}>
                            <a className="nav-link" id={this.state.id+"-edit-link"} data-toggle="pill" role="tab" aria-controls={this.state.id+"-tab-edit"} role="tab" aria-selected="false" onClick={() => {this.setTabActive('edit')}}>Edit</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div id={this.state.id+"-general-content"} className="tab-pane fade active-show" role="tabpanel" aria-labelledby={this.state.id+"-tab-general"}>
                            <strong><i className="fab fa-redhat" /> Chair</strong>
                            <p className="text-muted">
                                <a href={"/ws/profile/"+this.state.sessionChair.participant.pid}>
                                    {this.state.sessionChair.participant.name + ' (' + this.state.sessionChair.participant.userName + ')'}
                                </a>
                            </p>
                            <hr />
                            <strong><i className="fas fa-laptop-house" /> Room</strong>
                            <p className="text-muted">
                                {this.state.roomName}
                            </p>
                            <hr />
                            <strong><i className="fas fa-calendar-alt" /> Start time</strong>
                            <p className="text-muted">
                                {this.state.timeStart}
                            </p>
                            <hr />
                            <strong><i className="fas fa-calendar-alt" /> End time</strong>
                            <p className="text-muted">
                                {this.state.timeEnd}
                            </p>
                            <hr />
                            {localStorage.getItem('isAdmin')=='true' && 
                            <button type="button" className="btn btn-block btn-danger" onClick={() => {this.state.onDelete(this.state.id)}}>Delete</button>
                            }
                        </div>
                        <div id={this.state.id+"-authors-content"} className="tab-pane fade active-show" role="tabpanel" aria-labelledby={this.state.id+"-tab-authors"}>
                            <table className="table table-stripped">
                                <thead>
                                    <tr>
                                        <th style={{width:'25%'}}>Proposal</th>
                                        <th style={{width:'10%'}}>Authors</th>
                                        {localStorage.getItem('isReviewer')=='true' && 
                                            <th style={{width:'5%'}}>Review</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {proposalItems}
                                </tbody>
                            </table>
                        </div>
                        <div id={this.state.id+"-edit-content"} className="tab-pane fade active-show" role="tabpanel" aria-labelledby={this.state.id+"-tab-edit"}>
                            Edit
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}