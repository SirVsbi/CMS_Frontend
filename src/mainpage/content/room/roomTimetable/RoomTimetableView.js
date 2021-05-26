import React from "react";
import RoomTimetableViewTable from "./RoomTimetableViewTable";

export default class RoomTimetableView extends React.Component {
    constructor(props) {
        super(props);

        this.roomName = props.roomName || "Iorga";
        this.data = props.data || [
                {id: 1, order: '1', name: "Section1", timeStart: '2021-05-21 10:30 AM', timeFinish: '2021-05-21 12:00 PM'},
                {id: 2, order: '2', name: "Section2", timeStart: '2021-05-22 10:30 AM', timeFinish: '2021-05-22 12:00 PM'},
        ];

        this.state = {
            roomName: this.roomName,
            data: this.data
        }
    }

    render(){
        return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Room {this.roomName}</h3>
                        </div>
                        <div className="card-body">
                            <RoomTimetableViewTable data={this.data}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
