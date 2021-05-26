import React from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileMain from './ProfileMain';
import ProfileTabsView from './ProfileTabsView';
import ApiService from '../../ApiService';


export default class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            picture: "adminlte/dist/img/user_default.jpg",
            name: "",
            role: "Participant",
            userInfo: {
                affiliation: "",
                webpage: "",
                contact: "",
            },
            userStats:{
                joinedDate: "Unknown",
                stats1: 500,
                stats2: 13287
            },
            fetching: true
        }
    }

    componentWillMount(){
        this.getData();
    }

    getData(){
        ApiService.GetUserData(localStorage.getItem('pid'), data => {
            this.setState({
                name: data.name || this.state.name,
                userInfo: {
                    affiliation: data.affiliation || this.state.userInfo.affiliation,
                    webpage: data.webpage || this.state.userInfo.webpage,
                    contact: data.email || this.state.userInfo.contact
                },
                fetching: false
            });
            console.log(this.state);
        });
    }

    render(){
        if (this.state.fetching){
            return (
                <span>Fetching data...</span>
            )
        }
        return (
            <div className="row">
                <div className="col-md-3">
                    <ProfileMain name={this.state.name} role={this.state.role} stats={this.state.userStats}/>
                    <ProfileAbout info={this.state.userInfo}/>
                </div>
                <div className="col-md-9">
                    <ProfileTabsView/>
                </div>
            </div>
        )
    }
}