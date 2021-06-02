import React from "react";
import ApiService from "../../../../ApiService";

export default class RoomTimetableViewTableItem extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.order = props.order || "1.";
        this.id = props.conferenceSectionId;
        this.name = props.name || "Section1";
        this.sessionChair = props.sessionChair.participant || {name: "Gigel"};
        this.conferenceName = props.conference.name;
        this.authors = props.authors || [{participantId: 1, authorName: 'Szabolcs Vidam'}, {participantId: 2, authorName: 'Bogdan Vasc'}, {participantId: 3, authorName: 'Alexandra Tudorescu'}, {participantId: 4, authorName: 'David Turcas'}, {participantId: 5, authorName: 'Andrei Turcas'}, {participantId: 6, authorName: 'Andrea Barrasa'}];
        this.listeners = props.listeners || []; //[{participantId: 1, name: 'Szabolcs Vidam'}, {participantId: 2, name: 'Bogdan Vasc'}, {participantId: 3, name: 'Alexandra Tudorescu'}, {participantId: 4, name: 'David Turcas'}, {participantId: 5, name: 'Andrei Turcas'}, {participantId: 6, name: 'Andrea Barrasa'}];
        this.timeStart = props.timeStart;
        this.timeFinish = props.timeEnd;
        this.capacity = props.room.capacity || 20;
        this.canJoinListener = (props.canJoinListener!==undefined?props.canJoinListener:true);
        this.canDelete = (props.canDelete!==undefined?props.canDelete:true);


        this.state = {
            order: this.order,
            name: this.name,
            sessionChair: this.sessionChair,
            authors: this.authors,
            listeners: this.listeners,
            timeStart: this.timeStart,
            timeFinish: this.timeFinish,
            paper: this.paper,
            capacity: this.capacity,
            canJoinListener: this.canJoinListener
        }
        this.joinConference = this.joinConference.bind(this);
    }

    setPermissions(){
        console.log(localStorage);
        if(this.sessionChair.pid !== localStorage.getItem('pid')){
            this.setState({canJoinListener: this.state.canJoinListener && true});
        }
        else{
            this.setState({canJoinListener: this.state.canJoinListener && false});
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

    joinConference(event){
        event.preventDefault();
        let listener = {participantId: localStorage.getItem('pid'), conferenceSectionId: this.id}
        ApiService.AddListener(listener, success => {
            alert("You are now a listener!");
        },
            error => {
            alert("Couldn't add you as a listener!");
            })
    }

    renderAuthorTableData() {
        return this.state.authors.map((author, index) => {
            const { participantId, authorName, email } = author //destructuring
            return (
                <tr key={participantId}>
                    <td>{authorName}</td>
                </tr>
            )
        })
    }

    render(){
        return (
            <tr id={this.state.order}>
                <td>{this.state.order}</td>
                <td><span><b>{this.conferenceName}</b></span>
                    <br/>
                    <small>{this.name}</small></td>
                <td>{this.state.listeners.length}/{this.state.capacity}</td>
                <td>{this.state.sessionChair.name}</td>
                <td>{this.state.timeStart}</td>
                <td>{this.state.timeFinish}</td>
                <td className="project-actions" key={this.order}>
                    {this.state.canJoinListener &&
                    <button className="btn btn-primary btn-sm" style={{marginRight:'3px'}} onClick={this.joinConference}>
                        <i className="fas fa-headphones"/>
                        Join as listener
                    </button>
                    }
                </td>
            </tr>
        )
    }
}
