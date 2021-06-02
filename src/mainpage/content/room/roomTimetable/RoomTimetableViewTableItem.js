import React from "react";
import ApiService from "../../../../ApiService";
import moment from 'moment';

export default class RoomTimetableViewTableItem extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(localStorage);

        this.order = props.order || "1.";
        this.id = props.conferenceSectionId;
        this.name = props.name || "Section1";
        this.sessionChair = props.sessionChair.participant || {name: "Gigel"};
        this.conferenceName = props.conference.name;
        this.authors = props.authors || [{participantId: 1, authorName: 'Szabolcs Vidam'}, {participantId: 2, authorName: 'Bogdan Vasc'}, {participantId: 3, authorName: 'Alexandra Tudorescu'}, {participantId: 4, authorName: 'David Turcas'}, {participantId: 5, authorName: 'Andrei Turcas'}, {participantId: 6, authorName: 'Andrea Barrasa'}];
        this.listeners = props.listeners || []; //[{participantId: 1, name: 'Szabolcs Vidam'}, {participantId: 2, name: 'Bogdan Vasc'}, {participantId: 3, name: 'Alexandra Tudorescu'}, {participantId: 4, name: 'David Turcas'}, {participantId: 5, name: 'Andrei Turcas'}, {participantId: 6, name: 'Andrea Barrasa'}];
        this.timeStart = props.timeStart?moment(props.timeStart).format('YYYY-MM-DD HH:MM'):"Unknown";;
        this.timeFinish = props.timeEnd?moment(props.timeEnd).format('YYYY-MM-DD HH:MM'):"Unknown";;
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

    isUserAuthor(){
        if(this.state.authors.length === 0){
            return false;
        }
        for (let i = 0; i < this.state.authors.length; i++){
            //this.state.authors.map((author) => {
            const author = this.state.authors[i];
            const { participant } = author;
            //console.log(author);
            let authorPid = participant.pid;
            if(authorPid.toString() === localStorage.getItem('pid')){
                return true;
            }
        }
        return false;
    }

    isUserListener(){
        if(this.state.listeners.length === 0){
            return false;
        }
        for (let i = 0; i < this.state.listeners.length; i++){
            //this.state.authors.map((author) => {
            const listener = this.state.listeners[i];
            const { participant } = listener;
            //console.log(author);
            if (!participant) return false;
            let listenerPid = participant.pid;
            if(listenerPid.toString() === localStorage.getItem('pid')){
                return true;
            }
        }
        return false;
    }

    isFull(){
        if(this.state.listeners.length >= this.state.capacity){
            return true;
        }
        return false;
    }

    setPermissions(){
        console.log(localStorage);
        if(this.sessionChair.pid.toString() !== localStorage.getItem('pid') && !this.isUserAuthor() && !this.isUserListener() && !this.isFull()){
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

    componentDidMount() {
        this.setPermissions();
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
