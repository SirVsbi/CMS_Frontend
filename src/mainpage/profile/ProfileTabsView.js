import React from 'react';
import ProfileSettings from './ProfileSettings';
import ProfileTimeline from './ProfileTimeline';


export default class ProfileTabsView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab: 'timeline'
        }

        this.onTabLinkClick = this.onTabLinkClick.bind(this);
    }

    linkClassName(id){
        return (this.state.activeTab === id?'nav-link active':'nav-link');
    }

    tabClassName(id){
        return (this.state.activeTab === id?'tab-pane active':'tab-pane');
    }

    onTabLinkClick(event){
        this.setState({activeTab: event.target.id.replace('link-', '')});
    }

    render(){
        return (
            <div className="card">
                <div className="card-header p-2">
                    <ul className="nav nav-pills">
                        <li className="nav-item"><button className={this.linkClassName('timeline')} onClick={this.onTabLinkClick} id="link-timeline" data-toggle="tab">Timeline</button></li>
                        <li className="nav-item"><button className={this.linkClassName('settings')} onClick={this.onTabLinkClick} id="link-settings" data-toggle="tab">Settings</button></li>
                    </ul>
                </div>

                <div className="card-body">
                    <div className="tab-content">
                        <div className={this.tabClassName('timeline')} id="tab-timeline">
                            <ProfileTimeline/>
                        </div>
                        <div className={this.tabClassName('settings')} id="tab-settings">
                            <ProfileSettings/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}