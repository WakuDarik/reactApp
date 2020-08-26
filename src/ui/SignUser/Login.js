import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { findUser } from '../../redux/auth-reducer';

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder='login' name='email' component='input' />
        </div>
        <div>
            <Field placeholder='passwor' name='password' component='input' />
        </div>
        <button>Login</button>
    </form>
}

const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm);

const LoginPage = (props) => {
    
    const submitForm = (formData) => {
        props.findUser(formData);
    }

    return <>
        <div className='errorMsg'>{props.errorMsg}</div>
        <ReduxLoginForm onSubmit={submitForm} />
    </>
}

let mapStateToProps = (state) => {
    return {
        errorMsg: state.auth.errorMsg
    };
};

export default connect(mapStateToProps, { findUser })(LoginPage);