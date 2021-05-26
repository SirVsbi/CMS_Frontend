import React from 'react';


export default class ProfileMain extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            picture: props.picture || "adminlte/dist/img/user_default.jpg",
            name: props.name || "Unnamed user",
            role: props.role || "",
            stats: {
                joinedDate: props.stats.joinedDate || "unknown",
                stats1: props.stats.stats1 || 0,
                stats2: props.stats.stats2 || 0
            }

        }

    }

    render(){
        return (
            <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                    <div className="text-center">
                        <img className="profile-user-img img-fluid img-circle" src={this.state.picture} alt=""/>
                    </div>
                    <h3 className="profile-username text-center">{this.state.name}</h3>
                    <p className="text-muted text-center">{this.state.role}</p>
                    <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                            <b>Joined on </b> <span className="float-right">{this.state.stats.joinedDate}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Some stats</b> <span className="float-right">{this.state.stats.stats1}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Some other stats</b> <span className="float-right">{this.state.stats.stats2}</span>
                        </li>
                    </ul>
                    <a href="/ws/profile" className="btn btn-primary btn-block"><b>Edit profile</b></a>
                </div>
            </div>

        )
    }
}