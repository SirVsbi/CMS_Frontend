import React from 'react';
import ReviewViewTableItem from './ReviewViewTableItem';


export default class ReviewViewTable extends React.Component{
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
            return <ReviewViewTableItem key={d.reviewId} {...d} order={order+'.'}/>
        });

        return (
            <table className="table table-stripped">
                <thead>
                <tr>
                    <th style={{width:"1%"}}>#</th>
                    <th style={{width:'20%'}}>Proposal</th>
                    <th style={{width:'15%'}}>Reviewer</th>
                    <th style={{width:'13%'}}>Review score</th>
                    <th style={{width:'40%'}}>Review justification</th>
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
