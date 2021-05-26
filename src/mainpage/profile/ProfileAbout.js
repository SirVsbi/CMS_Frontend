import React from 'react';


export default class ProfileAbout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            info: props.info || {}
        }
    }

    render(){
        let infoList = [
            { name: 'affiliation', title: 'Affiliation', icon: 'briefcase' },
            { name: 'webpage', title: 'webpage', icon: 'globe' },
            { name: 'contact', title: 'Contact', icon: 'envelope' }
        ];
        
        let infoItems = infoList.filter(info => {
            return this.state.info[info.name] !== undefined;
        }).map(info => {
            return (
                <div key={info.name}>
                    <strong><i className={"fas fa-" + info.icon + " mr-1"} /> {info.title}</strong>
                    <p className="text-muted">
                        { this.state.info[info.name] }
                    </p>
                    <hr />
                </div>
            )
        });
        


        return (
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">About</h3>
                </div>
                <div className="card-body">
                    { infoItems }
                </div>
            </div>


        )
    }
}