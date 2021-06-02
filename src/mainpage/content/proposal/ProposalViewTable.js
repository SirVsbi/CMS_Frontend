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
        let order = 0;
        let tableItems = this.state.data.map(d => {
            order++;
            return <ProposalViewTableItem key={d.proposalId} {...d} order={order+'.'}/>
        });

        return (
            <table className="table table-stripped">
                <thead>
                <tr>
                    <th style={{width:"1%"}}>#</th>
                    <th style={{width:'18%'}}>Name</th>
                    <th style={{width:'12%'}}>Author(s)</th>
                    <th style={{width:'15%'}}>Abstract</th>
                    <th style={{width:'10%'}}>Paper</th>
                    <th style={{width:"15%"}}>Conference</th>
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
