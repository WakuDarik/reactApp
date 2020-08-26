import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { thisUser } from '../redux/auth-reducer';

let mapapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        user: state.auth.user
    };
};

export const withAuthRedirectLogin = (Component) => {
    class WithRedirectComponent extends React.Component {
        componentDidMount () {
            if (localStorage.getItem('jwtToken') && !this.props.user) {
                this.props.thisUser();
            }

        }
        render () {
            if (!localStorage.getItem('jwtToken')) return <Redirect to='/login' />
            if  (this.props.isAuth) return <Component {...this.props} />
            return <div>Loading///</div>
        }
    }

    let ConnectAuthRedirectLogin = connect(mapapStateToProps, { thisUser })(WithRedirectComponent);

    return ConnectAuthRedirectLogin;
}