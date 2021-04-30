import React from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileMain from './ProfileMain';
import ProfileTabsView from './ProfileTabsView';


export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.picture = "adminlte/dist/img/user_default.jpg";
        this.name = "Bogdan Vasc";
        this.role = "Chair";

        this.userStats = {
            joinedDate: "29/04/2021",
            stats1: 543,
            stats2: 13287
        }
        this.userInfo = {
            affiliation: "UBB Cluj",
            website: "www.google.com",
            contact: "bogdanvasc.jwk@gmail.com"
        }

    }

    render(){
        return (
            <div className="row">
                <div className="col-md-3">
                    <ProfileMain name={this.name} role={this.role} stats={this.userStats}/>
                    <ProfileAbout info={this.userInfo}/>
                </div>
                <div className="col-md-9">
                    <ProfileTabsView/>
                </div>
            </div>
        )
    }
}