import React from 'react';
import { Link } from 'react-router-dom';


export default class SidebarUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            picture: "adminlte/dist/img/" + (this.props.picture || "user_default.jpg"),
            name: this.props.name || "Undefined"
        }
    }

    render(){
        return (
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img src={this.state.picture} className="img-circle elevation-2" alt="profile" />
                </div>
                <div className="info">
                    <Link to="/ws/profile">
                        <span className="d-block">{this.state.name}</span>
                    </Link>
                    
                </div>
            </div>
        )
    }
}