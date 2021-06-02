import React from "react";
import RoomTimetableViewTable from "./RoomTimetableViewTable";
import ApiService from "../../../../ApiService";
import {withRouter} from "react-router-dom";

class RoomTimetableView extends React.Component {
    constructor(props) {
        super(props);

        this.id = parseInt(this.props.match.params.id) || null;
        this.data = props.data || [
                {id: 1, order: '1', name: "Section1", timeStart: '2021-05-21 10:30 AM', timeFinish: '2021-05-21 12:00 PM'},
                {id: 2, order: '2', name: "Section2", timeStart: '2021-05-22 10:30 AM', timeFinish: '2021-05-22 12:00 PM'},
        ];

        this.state = {
            roomName: "",
            data: [],
            fetching: true
        }
    }

    getRoom(){
        ApiService.GetRoomDetails(this.id, data => {
            this.setState({
                data: data,
                fetching: false
            });
        }, error => {
            alert("Error when fetching room: " + error.message || error);
        })
    }

    componentDidMount() {
        this.getRoom();
    }

    render(){
        if (this.state.fetching){
            return (
                <span>Fetching data...</span>
            )
        }
        return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Room {this.state.data.name}</h3>
                        </div>
                        <div className="card-body">
                            <RoomTimetableViewTable data={this.state.data.conferenceSections}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RoomTimetableView)
