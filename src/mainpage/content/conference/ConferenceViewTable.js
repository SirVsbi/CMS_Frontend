import React from 'react';
import ConferenceViewTableItem from './ConferenceViewTableItem';


export default class ConferenceViewTable extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            data: props.data || []
        }
        this.onDelete = props.onDelete;

    }

    render(){
        let order = 0;
        let tableItems = this.state.data.map(d => {
            order++;
            return <ConferenceViewTableItem key={d.conferenceId} {...d} order={order+'.'} onDelete={this.onDelete}/>
        });

        return (
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th style={{width:"1%"}}>#</th>
                        <th style={{width:'15%'}}>Title</th>
                        <th style={{width:'10%'}}>Created By</th>
                        <th style={{width:'10%'}}>Start date</th>
                        <th style={{width:'10%'}}>End date</th>
                        <th style={{width:'20%'}}>Time left</th>
                        <th style={{width:'13%'}}>Deadline</th>
                        <th style={{width:"40px"}}>Status</th>
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
