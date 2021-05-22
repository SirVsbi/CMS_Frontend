import React from 'react';
import ConferenceViewTableItem from './ConferenceViewTableItem';


export default class ConferenceViewTable extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            data: props.data || []
        }

    }

    render(){
        let tableItems = this.state.data.map(d => {
            return <ConferenceViewTableItem key={d.id} {...d}/>
        });

        return (
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th style={{width:"1%"}}>#</th>
                        <th style={{width:'20%'}}>Title</th>
                        <th style={{width:'15%'}}>Chair</th>
                        <th style={{width:'13%'}}>Start date</th>
                        <th style={{width:'20%'}}>Time left</th>
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