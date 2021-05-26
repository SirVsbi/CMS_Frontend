import React from 'react';
import './Authpage.css';
import ApiService from '../ApiService';
import Validator from '../Validations';
import {Link, Redirect} from 'react-router-dom';
import { Alert } from '@material-ui/lab';

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                username: '',
                name: '',
                affiliation: '',
                webpage: '',
                email: '',
                password1: '',
                password2: ''
            },
            errors: {
                username: '',
                name: '',
                affiliation: '',
                webpage: '',
                email: '',
                password: ''
            },
            valid: {
                username: true,
                name: true,
                affiliation: true,
                webpage: true,
                email: true,
                password: true
            },
            wait: false,
            registrationFailed: false,
            successRegistration: false
        };
        this.linkStyle = this.linkStyle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.registerUser = this.registerUser.bind(this);
        this.onRegisterSuccess = this.onRegisterSuccess.bind(this);
        this.onRegisterFailed = this.onRegisterFailed.bind(this);
    }

    validateForm(){
        let errors = this.state.errors;
        let valid = this.state.valid;
        const fields = this.state.fields;
        let invalid = false;

        
        
        if (Validator.username(fields.username)){
            errors.username = '';
            valid.username = true;
        }else{
            errors.username = 'Username must contain only letters, numbers and/or "._", must start with a letter and be at least 4 characters long!';
            valid.username = false;
            invalid = true;
        }
        
        if (Validator.name(fields.name)){
            errors.name = '';
            valid.name = true;
        }else{
            errors.name = 'Your name must be at least 5 characters long!';
            valid.name = false;
            invalid = true;
        }

        if (!Validator.password(fields.password1)){
            errors.password = 'Password must be at least 5 characters long!';
            valid.password = false;
            invalid = true;
        }
        else if (fields.password1 !== fields.password2){
            errors.password = 'Passwords do not match!';
            valid.password = false;
            invalid = true;
        }else{
            errors.password = '';
            valid.password = true;
        }

        if (Validator.email(fields.email)){
            errors.email = '';
            valid.email = true;
        }else{
            errors.email = 'Please enter a valid email!';
            valid.email = false;
            invalid = true;
        }

        if (fields.webpage !== '' && !Validator.website(fields.webpage)){
            errors.webpage = 'Enter a valid website or leave empty!';
            valid.webpage = false;
            invalid = true;
        }else{
            errors.webpage = '';
            valid.webpage = true;
        }
        this.setState({errors: errors});
        this.setState({valid: valid});

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

        this.setState({fields: fields});
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.validateForm()){
            const fields = this.state.fields;
            this.registerUser({
                userName: fields.username,
                email: fields.email,
                password: fields.password1,
                name: fields.name,
                affiliation: fields.affiliation,
                webpage: fields.webpage
            });
        }
        
    }

    registerUser(data){
        this.setState({wait: true});
        ApiService.RegisterUser(data,
            (success) => {this.onRegisterSuccess(success)},
            (failure) => {this.onRegisterFailed(failure)}
            );
    }

    onRegisterSuccess(response){
        console.log('Register success: ' + response.message || response);
        this.setState({wait: false});
        this.setState({successRegistration: true});
    }

    onRegisterFailed(response){
        console.log('Register failed: ' + response.error || response);
        alert('Register failed: ' + response.error || response);
        this.setState({wait: false, registrationFailed: true});
    }

    render(){
        if (this.state.successRegistration){
            return (
                <Redirect
                    to={{
                        pathname: "/",
                        afterRegister: true
                    }}
                />
            )
        }
        return (
            <form className="form-signup" onSubmit={this.handleSubmit} noValidate>
                {this.state.registrationFailed &&
                    <div className="alert alert-danger" role="alert">
                        <strong>Registration failed!</strong> There might be a problem on the server. Try again later or contact the administrator!
                    </div>
                }

                <div className="form-group">
                    <input type="text" id="user-username" name="username" className={"form-control " + (this.state.valid.username?'':'is-invalid')} placeholder="Username" onChange={this.handleInputChange} />
                    <span className="invalid-feedback" >{this.state.errors.username}</span>
                </div>

                <div className="form-group">
                    <input type="email" id="user-email" name="email" className={"form-control " + (this.state.valid.email?'':'is-invalid')} placeholder="Email address" onChange={this.handleInputChange} />
                    <span className="invalid-feedback" >{this.state.errors.email}</span>
                </div>

                <div className="form-group">
                    <input type="password" id="user-pass" name="password1" className={"form-control " + (this.state.valid.password?'':'is-invalid')} placeholder="Password" onChange={this.handleInputChange} />
                    <input type="password" id="user-repeatpass" name="password2" className={"form-control " + (this.state.valid.password?'':'is-invalid')} placeholder="Repeat Password" onChange={this.handleInputChange}/>
                    <span className="invalid-feedback" >{this.state.errors.password}</span>
                </div>
                
                <div className="form-group">
                    <input type="text" id="user-name" name="name" className={"form-control " + (this.state.valid.name?'':'is-invalid')} placeholder="Full name" onChange={this.handleInputChange} />
                    <span className="invalid-feedback" >{this.state.errors.name}</span>
                </div>

                <div className="form-group">
                    <input type="text" id="user-affiliation" name="affiliation" className={"form-control " + (this.state.valid.affiliation?'':'is-invalid')} placeholder="Affiliation" onChange={this.handleInputChange} />
                    <span className="invalid-feedback" >{this.state.errors.affiliation}</span>
                </div>

                <div className="form-group">
                    <input type="text" id="user-webpage" name="webpage" className={"form-control " + (this.state.valid.webpage?'':'is-invalid')} placeholder="Webpage" onChange={this.handleInputChange} />
                    <span className="invalid-feedback" >{this.state.errors.webpage}</span>
                </div>
                

                <button disabled={this.state.wait} className="btn btn-primary w-100" type="submit"><i className="fas fa-user-plus"></i> Sign Up</button>
                <Link to='/' style={this.linkStyle()}>
                    <span id="cancel_signup"><i className="fas fa-angle-left"></i> Back</span>
                </Link>
                
            </form>
        )
    }
}


export default RegisterForm;