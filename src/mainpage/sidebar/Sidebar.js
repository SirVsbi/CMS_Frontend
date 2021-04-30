import React from 'react';
import { Link } from 'react-router-dom';
import SidebarButton from './SidebarButton';
import SidebarHeader from './SidebarHeader';
import SidebarSearch from './SidebarSearch';
import SidebarUser from './SidebarUser';


export default class Sidebar extends React.Component{

    render(){

        return (

            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/ws">
                    <div className="brand-link">
                        <img src={process.env.PUBLIC_URL + "/adminlte/dist/img/AdminLTELogo.png"} alt="CMS" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                        <span className="brand-text font-weight-light">CMS Workstation</span>
                    </div>
                </Link>
                

                {/* Sidebar */}
                <div className="sidebar">
                    <SidebarUser name="Bogdan Vasc" picture="user_default.jpg"/>
                    <SidebarSearch/>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <SidebarButton name="Dashboard" iconClass="fa-bars" to="/ws" />
                            <SidebarButton name="Tree button" iconClass="fa-car" children= {
                                [
                                    { key: 'subitem-1', name: 'Classic subitem', to: '/ws/1' },
                                    { key: 'subitem-2', name: 'Informational', type:'info', to: '/ws/2' },
                                    { key: 'subitem-3', name: 'Warning', type:'warning', to: '/ws/3' },
                                    { key: 'subitem-4', name: 'Error', type:'danger', to: '/ws/3' }
                                ]
                            }/>
                            <SidebarButton name="With notifications" iconClass="fa-sun" badgetext="3" children= {
                                [
                                    { key: 'subitem-1', name: 'subitem 1', to: '/ws/1' },
                                    { key: 'subitem-2', name: 'subitem 2', to: '/ws/2' },
                                    { key: 'subitem-3', name: 'subitem 3', to: '/ws/3' }
                                ]
                            }/>
                            <SidebarButton name="With warnings" iconClass="fa-flag" badgetext="3" badgetype="warning"/>
                            <SidebarButton name="With error" iconClass="fa-dog" badgetext="Issue" badgetype="danger"/>

                            <SidebarHeader text="Some header"/>
                        </ul>
                    </nav>
                </div>

                

                


            </aside>

        )
    }
}