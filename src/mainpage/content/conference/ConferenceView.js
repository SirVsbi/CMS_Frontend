import React from 'react';
import ConferenceViewTable from './ConferenceViewTable';


export default class ConferenceView extends React.Component{
    constructor(props){
        super(props);

        this.data = [
            { id: 312, order:'1', title:'Test conference', createdOn: '22-05-2021', chairName: 'Bogdan Vasc', startDate: '2021-05-21', endDate: '2021-05-24', deadline: '2021-05-31', status: 'review', canView: true, canEdit: true, canDelete: true, canSubmit: true },
            { id: 150, order:'2', title:'Another hardcoded conference', createdOn: '22-05-2021', chairName: 'Bogdan Vasc', startDate: '2021-05-24', endDate: '2021-05-28', deadline: '2021-05-23', status: 'bidding', canView: true, canEdit: false, canDelete: false, canSubmit: false }
        ];

    }

    render(){
        return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Conferences</h3>
                        </div>
                        <div className="card-body">
                            <ConferenceViewTable data={this.data}/>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
