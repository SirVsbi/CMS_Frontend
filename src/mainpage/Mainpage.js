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

                <Route path='/ws/1'>
                    <Content title="Test page 1" content={<div>page 1</div>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route path='/ws/2'>
                    <Content title="Test page 2" content={<div>page 2</div>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route path='/ws/3'>
                    <Content title="Test page 3" content={<div>page 3</div>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/profile/'>
                    <Content title="Your profile" content={<Profile/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/profile/:id'>
                    <Content title="User profile" content={<Profile/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/conference/create'>
                    <Content title="Create a conference" content={<ConferenceForms/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route path='/ws/conference/:id'>
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

                <Route exact path='/ws/room/timetable'>
                    <Content title="View room timetable" content={<RoomTimetableView/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws/review'>
                    <Content title="View reviews" content={<ReviewView/>} hierarchy={[{ name: 'Home', to: this.location }]}/>
                </Route>

                <Route exact path='/ws'>
                    <Content title="Front page" content={<div>This is the front page. Use navigation to navigate.</div>} hierarchy={[{ name: 'Home', to: this.location}]}/>
                </Route>
                

            </div>
        )
    }
}

export default Mainpage;
