import React from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileMain from './ProfileMain';
import ProfileTabsView from './ProfileTabsView';
import ApiService from '../../ApiService';
import { withRouter } from 'react-router';


class Profile extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            picture: "https://i.ibb.co/bKb1FBn/avatar5.png",
            name: "",
            userInfo: {
                affiliation: "",
                webpage: "",
                contact: "",
            },
            userStats:{
                joinedDate: "30 May 2021",
                stats1: 500,
                stats2: 13287
            },
            roles: [],
            yourProfile: true,
            fetching: true
        }
    }
    componentDidMount(){
        this.getData();

    }
    getData(){
        let id = this.props.match.params.id || localStorage.getItem('pid');
        if (this.props.match.params.id) this.setState({yourProfile: false});
        ApiService.GetUserData(id, data => {
            let roles = [];
            if (data.userName == 'admin') roles.push('admin');
            if (data.reviewer !== null) roles.push('reviewer');
            if (data.chair !== null) roles.push('chair');
            if (data.coChair !== null) roles.push('cochair');
            console.log(data);
            if (data.authors !== null && data.authors.length > 0) roles.push('author');
            if (data.listener !== null) roles.push('listener');
            if (roles.length == 0) roles.push('participant');
            this.setState({
                name: data.name || this.state.name,
                userInfo: {
                    affiliation: data.affiliation || this.state.userInfo.affiliation,
                    webpage: data.webpage || this.state.userInfo.webpage,
                    contact: data.email || this.state.userInfo.contact
                },
                roles: roles,
                fetching: false
            });
        }, failure => {alert(failure.message || failure)});
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
                    <ProfileMain name={this.state.name} roles={this.state.roles} stats={this.state.userStats} yourProfile={this.state.yourProfile}/>
                    <ProfileAbout info={this.state.userInfo}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)