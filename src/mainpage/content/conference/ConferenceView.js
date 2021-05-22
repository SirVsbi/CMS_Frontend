import React from 'react';
import ConferenceViewTable from './ConferenceViewTable';


export default class ConferenceView extends React.Component{
    constructor(props){
        super(props);

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
                            <ConferenceViewTable/>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}