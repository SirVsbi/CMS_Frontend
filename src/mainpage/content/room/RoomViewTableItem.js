import React from "react";

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
            name: this.name,
            capacity: this.capacity,
        }
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
