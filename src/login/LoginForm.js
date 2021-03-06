import React from 'react';
import './Authpage.css';
import ApiService from '../ApiService';
import Validator from '../Validations';
import {Link} from 'react-router-dom';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                user: '',
                password: ''
            },
            userType: 'username',
            errors: {
                user: '',
                password: ''
            },
            valid: {
                user: true,
                password: true
            },
            wait: false,
            logInFailed: false
        };

        this.linkStyle = this.linkStyle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.logInAttempt = this.logInAttempt.bind(this);
        this.onLogInSuccess = this.onLogInSuccess.bind(this);
        this.onLogInFailed = this.onLogInFailed.bind(this);
    }

    validateForm(){
        const fields = this.state.fields;
        let errors = this.state.errors;
        let valid = this.state.valid;
        let invalid = false;

        if (fields.user.length === 0){
            errors.user = 'Please insert your username or email address!';
            valid.user = false;
            invalid = true;
        }else{
            const tEmail = Validator.email(fields.user);
            const tUsername = Validator.username(fields.user);
            errors.user = '';
            valid.user = true;
            if (tUsername && !tEmail){
                this.setState({userType: 'username'});
            }
            else if (!tUsername && tEmail){
                this.setState({userType: 'email'});
            }
            else if (tUsername && tEmail){
                //should never happen
                this.setState({userType: 'username'});
                console.log(3);
            }
            else{
                errors.user = 'Enter e valid username or password!';
                valid.user = false;
                invalid = true;
            }
        }

        if (fields.password.length === 0){
            errors.password = 'Please enter a password!';
            valid.password = false;
            invalid = true;
        }else{
            errors.password = '';
            valid.password = true;
        }
        this.setState({errors: errors, valid: valid});
        return !invalid;
    }

    linkStyle(){
        if (this.state.wait){
            return {pointerEvents: 'none'};
        }
        return {};
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let fields = this.state.fields;
        fields[name] = value;


        this.setState({
            fields: fields
        });
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({logInFailed: false});
        if (this.validateForm()){
            const fields = this.state.fields;
            if (this.state.userType === 'email'){
                this.logInAttempt({
                    email: fields.user,
                    password: fields.password
                });
            }else{
                this.logInAttempt({
                    username: fields.user,
                    password: fields.password
                });
            }
        }
    }

    logInAttempt(data){
        this.setState({wait: true});
        ApiService.LogInUser(data,
            (success) => {this.onLogInSuccess(success)},
            (failure) => {this.onLogInFailed(failure)}
            );
    }

    onLogInSuccess(response){
        console.log('Logged in successfully: ' + response.message);
        this.setState({wait: false});
        localStorage.setItem('username', response.username);
        localStorage.setItem('ts', Date.now() / 1000);
        window.location.href = '/ws';
    }

    onLogInFailed(response){
        console.log('Failed to log in: ' + response.error);
        this.setState({wait: false, logInFailed: true});
    }

    render(){
        return (
            <form className="form-signin" onSubmit={this.handleSubmit} noValidate>
                <h1 className="h3 mb-3 font-weight-normal" > Sign in</h1>
                {this.state.logInFailed &&
                    <div className="alert alert-danger" role="alert">
                        <strong>Invalid credentials!</strong> If you don't remember your login credentials, you can <Link to='/reset' className='alert-link d-inline'>reset your password</Link>.
                    </div>
                }
                <div className="form-group">
                    <input type="text" id="inputUser" name="user" className={"form-control " + (this.state.valid.user?'':'is-invalid')} placeholder="Username or email address" onChange={this.handleInputChange} />
                    <span className="invalid-feedback" >{this.state.errors.user}</span>
                </div>
                <div className="form-group">
                    <input type="password" id="inputPassword" name="password" className={"form-control " + (this.state.valid.password?'':'is-invalid')} placeholder="Password" onChange={this.handleInputChange} />
                    <span className="invalid-feedback" >{this.state.errors.password}</span>

                </div>
                
                
                <button disabled={this.state.wait} className="btn btn-success w-100" type="submit"><i className="fas fa-sign-in-alt"></i> Sign in</button>
                <Link to='/reset' style={this.linkStyle()}>
                    <span id="forgot_pswd" href="/reset">Forgot password?</span>
                </Link>
                
                <hr/>
                <Link to='/register' style={this.linkStyle()}>
                    <button disabled={this.state.wait} className="btn btn-primary w-100" type="button" id="btn-signup" ><i className="fas fa-user-plus"></i> Sign up New Account</button>
                </Link>
            
            </form>
        )
    }
}


export default LoginForm;