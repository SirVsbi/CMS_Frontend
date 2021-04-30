import React from 'react';


export default class ProfileMain extends React.Component{
    constructor(props){
        super(props);
        this.picture = props.picture || "adminlte/dist/img/user_default.jpg";
        this.name = props.name || "Unnamed user";
        this.role = props.role || "Participant";
        this.stats = {
            joinedDate: props.stats.joinedDate || "unknown",
            stats1: props.stats.stats1 || 0,
            stats2: props.stats.stats2 || 0
        }

    }

    render(){
        return (
            <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                    <div className="text-center">
                        <img className="profile-user-img img-fluid img-circle" src={this.picture} alt="User profile picture" />
                    </div>
                    <h3 className="profile-username text-center">{this.name}</h3>
                    <p className="text-muted text-center">{this.role}</p>
                    <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                        <b>Joined on </b> <a className="float-right">{this.stats.joinedDate}</a>
                    </li>
                    <li className="list-group-item">
                        <b>Some stats</b> <a className="float-right">{this.stats.stats1}</a>
                    </li>
                    <li className="list-group-item">
                        <b>Some other stats</b> <a className="float-right">{this.stats.stats2}</a>
                    </li>
                    </ul>
                    <a href="/ws/profile" className="btn btn-primary btn-block"><b>Something</b></a>
                </div>
            </div>

        )
    }
}