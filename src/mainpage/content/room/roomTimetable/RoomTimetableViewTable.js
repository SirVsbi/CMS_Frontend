import React from 'react';
import RoomTimetableViewTableItem from "./RoomTimetableViewTableItem";


export default class RoomTimetableViewTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: props.data || []
        }

    }

    render(){
        let tableItems = this.state.data.map(d => {
            return <RoomTimetableViewTableItem key={d.id} {...d}/>
        });

        return (
            <table className="table table-stripped">
                <thead>
                <tr>
                    <th style={{width:"1%"}}>#</th>
                    <th style={{width:'12%'}}>Name</th>
                    <th style={{width:'5%'}}>Listeners</th>
                    <th style={{width:'12%'}}>Session chair</th>
                    <th style={{width:'10%'}}>Start time</th>
                    <th style={{width:'10%'}}>End time</th>
                    <th style={{width:'10%'}}>Paper</th>
                    <th style={{width:'20%'}}>Authors</th>

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
