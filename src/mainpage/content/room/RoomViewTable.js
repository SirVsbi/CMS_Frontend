import React from 'react';
import ProposalViewTableItem from './RoomViewTableItem';
import RoomViewTableItem from "./RoomViewTableItem";


export default class RoomViewTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: props.data || []
        }

    }

    render(){
        let tableItems = this.state.data.map(d => {
            return <RoomViewTableItem key={d.id} {...d}/>
        });

        return (
            <table className="table table-stripped">
                <thead>
                <tr>
                    <th style={{width:"1%"}}>#</th>
                    <th style={{width:'20%'}}>Name</th>
                    <th style={{width:'20%'}}>Capacity</th>
                    <th style={{width:'30%'}}></th>
                </tr>
                </thead>
                <tbody>
                {tableItems}
                </tbody>
            </table>

        )
    }
}
