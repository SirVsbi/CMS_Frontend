import React from 'react';

export default class LogOut extends React.Component{


    signOut(){
        localStorage.removeItem('pid');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('name');
        window.location.href='/';
    }

    render(){
        return (
            <div>
                <h5>Logging out will remove all your local data.</h5>
                <button type="button" className="btn btn-info btn-block btn-flat" style={{width: '20%'}} onClick={this.signOut}><i className="fa fa-sign-out-alt"></i> Click here to Sign Out</button>
            </div>
        )
    }
}