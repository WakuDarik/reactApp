import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { required, matchInput } from '../../utils/validation/validation';
import { Input, InputHidden, InputPassword, InputEmail, CheckBox } from './FormElem';
import s from './signup.module.css';
import { registrationUserTC } from '../../redux/auth-reducer';

const SignupForm = (props) => {
    return <>
        <h1>Form user</h1>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='full name' name='name' component={Input} validate={[required]} />
            </div>
            <div>
                <Field placeholder='email' name='email' component={InputEmail} validate={[required]} />
            </div>
            <div>
                <Field placeholder='password' name='password' component={InputPassword} validate={[required]} />
            </div>
            <div>
                <Field placeholder='confirm password' name='confirmationpass' component={InputPassword} validate={[required, matchInput]} />
            </div>
            <div>
                <Field placeholder='read and agreed to Terms of service' name='agree' component={CheckBox} validate={[required]} />
            </div>
            <div>
                <Field placeholder='you are castomer' name='accType' component={CheckBox} />
            </div>

            <button>Signup</button>
        </form>
    </>
}

const ReduxSignupForm = reduxForm({
    form: 'signup',
})(SignupForm);

class SwitchForm extends React.Component {


    submitForm = (formData) => {
        this.props.registrationUserTC(formData)
        console.log(formData)
    }

    render () {
        return <>
            <ReduxSignupForm onSubmit={this.submitForm} />
        </>
    }

}


export default connect(null, { registrationUserTC })(SwitchForm);