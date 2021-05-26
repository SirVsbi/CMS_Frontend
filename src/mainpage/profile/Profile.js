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
            this.setState({
                name: data.name || this.state.name,
                userInfo: {
                    affiliation: data.affiliation || this.state.userInfo.affiliation,
                    webpage: data.webpage || this.state.userInfo.webpage,
                    contact: data.email || this.state.userInfo.contact
                },
                fetching: false
            });
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
                    <ProfileMain name={this.state.name} role={this.state.role} stats={this.state.userStats} yourProfile={this.state.yourProfile}/>
                    <ProfileAbout info={this.state.userInfo}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)