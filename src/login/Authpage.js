import React from 'react';
import { Redirect } from 'react-router';
import './Authpage.css';


class Authpage extends React.Component{


    render(){
        return (
            <div style={{backgroundImage: 'url(/img/bg1.png'}} className="responsive-background">
                <div className='title-div'>
                    <span className='main-title'>Conference Management System</span>
                </div>
                
                
                <div id="logreg-forms">
                    {this.props.form}
                </div>
            </div>
        )
    }
}

export default Authpage;