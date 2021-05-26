import React from "react";
import RoomViewTable from "./RoomViewTable";
import ApiService from "../../../ApiService";

export default class RoomView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || [],
            fetching: true
        }
    }

    componentDidMount(){
        ApiService.GetAllRooms(data => {
            this.setState({
                data: data,
                fetching: false
            });
        }, error => {
            alert("Error when fetching rooms: " + error.message || error);
        });
    }


    render(){
        if (this.state.fetching) return (<span>Fetching...</span>);
        return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Rooms</h3>
                        </div>
                        <div className="card-body">
                            <RoomViewTable data={this.state.data}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
