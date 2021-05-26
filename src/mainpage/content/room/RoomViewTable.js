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
        let order = 0;
        let tableItems = this.state.data.map(d => {
            order ++;
            return <RoomViewTableItem key={d.roomId} {...d} order={order+'.'}/>
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
