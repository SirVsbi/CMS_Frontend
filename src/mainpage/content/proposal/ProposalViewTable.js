import React from 'react';
import ProposalViewTableItem from './ProposalViewTableItem';


export default class ProposalViewTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: props.data || []
        }

    }

    render(){
        let tableItems = this.state.data.map(d => {
            return <ProposalViewTableItem key={d.id} {...d}/>
        });

        return (
            <table className="table table-stripped">
                <thead>
                <tr>
                    <th style={{width:"1%"}}>#</th>
                    <th style={{width:'18%'}}>Name</th>
                    <th style={{width:'15%'}}>Author(s)</th>
                    <th style={{width:'13%'}}>Topic(s)</th>
                    <th style={{width:'15%'}}>Keyword(s)</th>
                    <th style={{width:'20%'}}>Abstract</th>
                    <th style={{width:"32%"}}>Conference</th>
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
