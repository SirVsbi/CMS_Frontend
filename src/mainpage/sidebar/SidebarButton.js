import React from 'react';
import { Link } from 'react-router-dom';


export default class SidebarButton extends React.Component{

    constructor(props){
        super(props);
        this.name = props.name || 'undefined';
        this.iconClass = props.iconClass || 'fa-tachometer-alt';
        this.to = props.to || '#';
        this.children = props.children || null;

        this.state = {
            badge: {
                type: props.badgetype || 'info',
                text: props.badgetext || ''
            }
        }
    }

    setBadge(text, type){
        let badge = this.state.badge;
        if (text){
            badge.text = text;
        }
        if (type){
            badge.type = type;
        }
        this.setState({badge: badge});
    }

    render(){
        let childButtons = null;
        if (this.children){
            childButtons = this.children.map(child => {
                return {
                    key: child.key || 0,
                    name: child.name || 'undefined',
                    to: child.to || '#',
                    type: (child.type?('text-'+child.type):'')
                }
            }).map(child => 
                <li key={child.key} className="nav-item">
                    <Link to={child.to} className="nav-link">
                        <i className={"far fa-circle " + child.type + " nav-icon"}></i>
                        <p>{child.name}</p>
                    </Link>
                </li>  
            ); 
        }

        return (
            <li className="nav-item">
                <Link to={ this.to } className="nav-link">
                    <i className={"nav-icon fas " + this.iconClass}></i>
                    <p>
                        { this.name }
                        { this.children &&
                            <i className="right fas fa-angle-left"></i>
                        }
                        <span className={"badge badge-" + this.state.badge.type + " right"}>{ this.state.badge.text }</span>
                    </p>
                </Link>
                { this.children && 
                    <ul className="nav nav-treeview">
                        { childButtons }
                    </ul>
                }
                
            </li>

        )
    }
}