import React from 'react';
import './Authpage.css';
import ApiService from '../ApiService';
import Validator from '../Validations';
import {Link} from 'react-router-dom';

class ResetForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                email: ''
            },
            errors: {
                email: ''
            },
            valid: {
                email: true
            },
            wait: false
        };
        this.linkStyle = this.linkStyle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.resetUserPassword = this.resetUserPassword.bind(this);
        this.onResetPasswordSuccess = this.onResetPasswordSuccess.bind(this);
        this.onResetPasswordFailed = this.onResetPasswordFailed.bind(this);   

    }

    formChanged(form){
        if (this.props.onFormChanged){
            this.props.onFormChanged(form);
        }
    }

    validateForm(){
        const fields = this.state.fields;
        let errors = this.state.errors;
        let valid = this.state.valid;
        let invalid = false;

        if (Validator.email(fields.email)){
            errors.email = '';
            valid.email = true;
            
        }else{
            errors.email = 'Please enter a valid email!';
            valid.email = false;
            invalid = true;
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
        let fields = this.state.fields;
        fields['email'] = event.target.value;
        this.setState({fields: fields});
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.validateForm()){
            this.resetUserPassword(this.state.fields);
        }
    }

    resetUserPassword(data){
        this.setState({wait: true});
        ApiService.ResetUserPassword(data,
            (success) => {this.onResetPasswordSuccess(success)},
            (failure) => {this.onResetPasswordFailed(failure)}
            );
    }

    onResetPasswordSuccess(response){
        console.log('Reset success: ' + response.message);
        this.setState({wait: false});
    }

    onResetPasswordFailed(response){
        console.log('Reset failed: ' + response.error);
        this.setState({wait: false});
    }

    render(){
        return (
            <form className="form-reset" onSubmit={this.handleSubmit} noValidate>
                <div className="form-group">
                    <input type="email" name="email" id="resetEmail" className={"form-control " + (this.state.valid.email?'':'is-invalid')} placeholder="Email address" onChange={this.handleInputChange}/>
                    <span className="invalid-feedback" >{this.state.errors.email}</span>
                </div>
                <button disabled={this.state.wait} className="btn btn-primary w-100" type="submit">Reset Password</button>
                <Link to="/" style={this.linkStyle()}>
                    <span id="cancel_reset" ><i className="fas fa-angle-left"></i>Back</span>
                </Link>
            </form>
        )
    }
}


export default ResetForm;