import React from 'react';


export default class SidebarHeader extends React.Component{

    constructor(props){
        super(props);
        this.text = props.text || 'undefined';
    }

    render(){

        return (
            <li className="nav-header">{ this.text }</li>
        )
    }
}