import React from "react";
import ApiService from "../../../ApiService";

export default class RoomViewTableItem extends React.Component {
    constructor(props) {
        super(props);

        this.order = props.order || "1.";
        this.name = props.name || "Generic Room";
        this.capacity = props.capacity || 20;

        this.canView = true;
        this.canEdit = props.canEdit || true;
        this.canDelete = props.canDelete || true;

        this.state = {
            order: this.order,
            roomId: props.roomId,
            name: this.name,
            capacity: this.capacity,
            success: null,
            error: null
        }

        this.editRoom = this.editRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
    }

    editRoom(event){
        event.preventDefault();
        window.location.href = '/ws/room/create/' + this.state.roomId + '/' + this.state.name + '/' + this.state.capacity;
    }

    deleteRoom(event){
        event.preventDefault();
        ApiService.DeleteRoom(this.state.roomId,success => {
            this.setState({success: 'Room deleted successfully!'});
        }, error => {
            this.setState({error: 'Failed to delete room: ' + error.message || error});
        });
    }

    render(){
        return (
            <tr id={this.state.order}>
                <td>{this.state.order}</td>
                <td>{this.state.name}</td>
                <td>{this.capacity}</td>
                <td className="project-actions" key={this.order}>
                    {this.canView &&
                    <button className="btn btn-primary btn-sm" style={{marginRight:'3px'}}>
                        <i className="fas fa-folder"/>
                        Timetable
                    </button>
                    }
                    {this.canEdit &&
                    <button className="btn btn-info btn-sm" style={{marginRight:'3px'}} onClick={this.editRoom}>
                        <i className="fas fa-pencil-alt"/>
                        Edit
                    </button>
                    }
                    {this.canDelete &&
                    <button className="btn btn-danger btn-sm" style={{marginRight:'3px'}} onClick={this.deleteRoom}>
                        <i className="fas fa-trash"/>
                        Delete
                    </button>
                    }
                    {this.state.error &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>
                    }
                    {this.state.success &&
                    <div className="alert alert-success" role="alert">
                        {this.state.success}
                    </div>
                    }
                </td>
            </tr>
        )
    }
}
