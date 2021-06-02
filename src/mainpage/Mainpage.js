import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ConferenceForms from './content/conference/ConferenceForms';
import ConferenceView from './content/conference/ConferenceView';
import Content from './content/Content';
import './Mainpage.css';
import Profile from './profile/Profile';
import Sidebar from './sidebar/Sidebar';
import ProposalView from "./content/proposal/ProposalView";
import ProposalFormsCreate from "./content/proposal/ProposalFormsCreate";
import ProposalFormsReview from "./content/proposal/ProposalFormsReview";
import RoomFormsCreate from "./content/room/RoomFormsCreate"
import RoomView from "./content/room/RoomView";
import RoomTimetableView from "./content/room/roomTimetable/RoomTimetableView";
import ConferenceDetails from './content/conference/ConferenceDetails';
import ReviewView from "./content/proposal/review/ReviewView";
import Error403 from './content/errors/Error403';
import InvitationsView from './content/invitations/InvitationsView';
import LogOut from './other/Logout';
import AboutUs from './other/AboutUs';

class Mainpage extends React.Component{
    constructor(props){
        super(props);
        this.location = '/ws';
    }

    render(){
        // Here should be a token validation
        //placeholder:

        var loggedIn = true;

        if (!localStorage.getItem('username')){
            loggedIn = false;
        }else{
            let tsLast = localStorage.getItem('ts');
            let ts = Date.now() / 1000;
            if (tsLast && ts - tsLast > 3000000){ 
                localStorage.removeItem('username');
                localStorage.removeItem('ts');
                loggedIn = false;
            }
            
        }
        if (!loggedIn){
            return <Redirect to='/'/>
        }
        return (
            <div id="main" className="sidebar-mini layout-fixed">
                <Sidebar/>

                {/* Content pages */}

                <Route exact path='/ws/profile/'>
                    <Content title="Your profile" content={<Profile/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/profile/:id'>
                    <Content title="User profile" content={<Profile/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/conference/create'>
                    <Content title="Create a conference" content={<ConferenceForms/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route path='/ws/conference/view/:id'>
                    <Content title="View conference" content={<ConferenceDetails/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/conference'>
                    <Content title="View conferences" content={<ConferenceView/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route path='/ws/proposal/create'>
                    <Content title="Submit a proposal" content={<ProposalFormsCreate/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/proposal/review/:id'
                    render={(props) => <Content title="Review proposal" content={<ProposalFormsReview {...props} />} hierarchy={[{ name: 'Home', to: this.location }]}/>}
                />
      
                <Route exact path='/ws/proposal'>
                    <Content title="View proposals" content={<ProposalView/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/room/create/:id?/:name?/:capacity?'
                       render={(props) => <Content title="View proposals" content={<RoomFormsCreate {...props} />} hierarchy={[{ name: 'Home', to: this.location }]}/>}
                />

                <Route exact path='/ws/room'>
                    <Content title="View rooms" content={<RoomView/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/room/timetable/:id'>
                    <Content title="View room timetable" content={<RoomTimetableView/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/review/:id'>
                    <Content title="View reviews" content={<ReviewView/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path="/ws/invitations">
                    <Content title="Application users" content={<InvitationsView/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>


                <Route exact path='/ws/403'>
                    <Content title="Not allowed" content={<Error403/>} hierarchy={[{ name: 'Home', to: this.location}]}/>
                </Route>

                <Route exact path="/ws/about">
                    <Content title="About us" content={<AboutUs/>} hierarchy={[{ name: 'Home', to: this.location}]}/>
                </Route>

                <Route exact path="/ws/logout">
                    <Content title="Log out" content={<LogOut/>} hierarchy={[{ name: 'Home', to: this.location}]}/>
                </Route>


                <Route exact path='/ws'>
                    <Content title="Front page" content={<div>This is the front page. Use navigation to navigate.</div>} hierarchy={[{ name: 'Home', to: this.location}]}/>
                </Route>
                

            </div>
        )
    }
}

export default Mainpage;
