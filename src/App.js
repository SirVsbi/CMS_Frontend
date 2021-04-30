import './App.css';
import Authpage from './login/Authpage';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginForm from './login/LoginForm';
import RegisterForm from './login/RegisterForm';
import ResetForm from './login/ResetForm';
import Mainpage from './mainpage/Mainpage';



class App extends React.Component{  
  render(){
    return (
      
        <Router>
          <Switch>

            <Route path='/ws'>
              <Mainpage/>
            </Route>

            <Route path='/register'>
              <Authpage form={<RegisterForm/>}/>
            </Route>

            <Route path='/reset'>
              <Authpage form={<ResetForm/>}/>
            </Route>

            <Route path='/'>
              <Authpage form={<LoginForm/>}/>
            </Route>

          </Switch>
        </Router>
      
    );

  }
  
}

export default App;
