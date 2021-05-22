import React from 'react';
import ConferenceFormsCreate from './ConferenceFormsCreate';
import ConferenceFormsJoin from './ConferenceFormsJoin';


export default class ConferenceForms extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = '$("#add-start-date").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/yyyy" });' +
                      '$("#add-end-date").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/yyyy" })';
        
        document.body.appendChild(s);
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <ConferenceFormsCreate/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <ConferenceFormsJoin/>
                    </div>
                </div>
            </div>
        )
    }
}