import React from 'react';
import { Redirect } from 'react-router';
import './Mainpage.css';


class Mainpage extends React.Component{

    render(){
        // Here should be a token validation
        //placeholder:

        var loggedIn = true;

        if (!localStorage.getItem('username')){
            loggedIn = false;
        }else{
            let tsLast = localStorage.getItem('ts');
            let ts = Date.now() / 1000;
            if (tsLast && ts - tsLast > 30){ // 30 seconds lifetime
                localStorage.removeItem('username');
                localStorage.removeItem('ts');
                loggedIn = false;
            }
            
        }
        if (!loggedIn){
            return <Redirect to='/'/>
        }
        return (
            <div style={{backgroundImage: 'url(/img/bgempty.png'}} className="responsive-background">
                Mainpage loaded properly! <br/>
                Username: {localStorage.getItem('username')} <br/>
                You shouldn't be able to go back to '/', '/register' and '/reset'. After 30 seconds you shouldn't be able to come here unless you log in again. <br/>

            </div>
        )
    }
}

export default Mainpage;