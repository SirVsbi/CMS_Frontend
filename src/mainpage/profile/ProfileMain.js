import React from 'react';


export default class ProfileMain extends React.Component{
    constructor(props){
        super(props);

        let rolesName = {
            'chair': {title: 'Chair', importance: 6},
            'reviewer': {title: 'Reviewer', importance: 4},
            'admin': {title: 'Administrator', importance: 7},
            'cochair': {title: 'Co Chair', importance: 5},
            'listener': {title: 'Listener', importance: 2},
            'author': {title: 'Author', importance: 3},
            'participant': {title: 'Participant', importance: 1},
        }
        let rolesText = ""
        props.roles.map(role => {
            if (rolesText !== "") rolesText += ", ";
            rolesText += (rolesName[role] ? rolesName[role].title : 'Participant');
        });



        this.state = {
            picture: props.picture || localStorage.getItem('picture'),
            name: props.name || "Unnamed user",
            roles: rolesText,
            stats: {
                joinedDate: props.stats.joinedDate || "unknown",
                stats1: props.stats.stats1 || 0,
                stats2: props.stats.stats2 || 0
            },
            yourProfile: props.yourProfile || false

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
                    <p className="text-muted text-center">{this.state.roles}</p>
                    <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                            <b>Joined on </b> <span className="float-right">{this.state.stats.joinedDate}</span>
                        </li>
                    </ul>
                    {this.state.yourProfile && 
                        <a href="/ws/profile" className="btn btn-primary btn-block"><b>Edit profile</b></a>
                    }  
                </div>
            </div>

        )
    }
}