import React from "react";

export default class RoomTimetableViewTableItem extends React.Component {
    constructor(props) {
        super(props);

        this.order = props.order || "1.";
        this.id = this.order;
        this.name = props.name || "Section1";
        this.sessionChair = props.sessionChair || {name: "Gigel"};
        this.authors = props.authors || [{participantId: 1, authorName: 'Szabolcs Vidam'}, {participantId: 2, authorName: 'Bogdan Vasc'}, {participantId: 3, authorName: 'Alexandra Tudorescu'}, {participantId: 4, authorName: 'David Turcas'}, {participantId: 5, authorName: 'Andrei Turcas'}, {participantId: 6, authorName: 'Andrea Barrasa'}];
        this.listeners = props.listeners || [{participantId: 1, name: 'Szabolcs Vidam'}, {participantId: 2, name: 'Bogdan Vasc'}, {participantId: 3, name: 'Alexandra Tudorescu'}, {participantId: 4, name: 'David Turcas'}, {participantId: 5, name: 'Andrei Turcas'}, {participantId: 6, name: 'Andrea Barrasa'}];
        this.timeStart = props.timeStart;
        this.timeFinish = props.timeFinish;
        this.paper = props.paper || "Interesting paper";
        this.capacity = props.capacity || 20;
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
        }
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
                <td>{this.state.name}</td>
                <td>{this.state.listeners.length}/{this.state.capacity}</td>
                <td>{this.state.sessionChair.name}</td>
                <td>{this.state.timeStart}</td>
                <td>{this.state.timeFinish}</td>
                <td>{this.state.paper}</td>
                <td>
                    <table id='authors'>
                        <tbody>
                        {this.renderAuthorTableData()}
                        </tbody>
                    </table>
                </td>
                <td className="project-actions" key={this.order}>
                    {this.canJoinListener &&
                    <button className="btn btn-primary btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-headphones"/>
                        Join as listener
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
