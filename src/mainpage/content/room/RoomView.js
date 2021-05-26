import React from "react";
import RoomViewTable from "./RoomViewTable";
import ProposalViewTable from "../proposal/ProposalViewTable";
import RoomViewTableItem from "./RoomViewTableItem";

export default class RoomView extends React.Component {
    constructor(props) {
        super(props);

        this.data = props.data || [
            {order: '1', id: 1, name: "Iorga", capacity: 200, conferenceSections:
                [{name: "Section1", timeStart: '2021-05-21 10:30 AM', timeEnd: '2021-05-21 12:00 PM'},
                {name: "Section2", timeStart: '2021-05-22 10:30 AM', timeEnd: '2021-05-22 12:00 PM'},
                ]
            },
            {order: '2', id: 2, name: "A2", capacity: 400, conferenceSections:
                [{name: "Section3", timeStart: '2021-05-21 10:30 AM', timeEnd: '2021-05-21 12:00 PM'},
                {name: "Section4", timeStart: '2021-05-22 10:30 AM', timeEnd: '2021-05-22 12:00 PM'},
                ]
            }
        ];

        this.state = {

        }
    }

    render(){
        return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Rooms</h3>
                        </div>
                        <div className="card-body">
                            <RoomViewTable data={this.data}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
