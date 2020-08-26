import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { thisUser } from '../redux/auth-reducer';
import { currentContestTC } from '../redux/profile-reducer';
import { compose } from 'redux';


let mapapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        contest: state.profile.currentContest
    };
};

export const withAuthContest = (Component) => {


    class WithAuthContest extends React.Component {


        componentDidMount () {
            if (localStorage.getItem('jwtToken') && !this.props.isAuth) {
                this.props.thisUser();
            }
            this.props.currentContestTC(this.props.match.params.id)

        }


        render () {
            if (!localStorage.getItem('jwtToken')) return <Redirect to='/login' />
            if (this.props.isAuth && this.props.contest) return <Component {...this.props} />
            return <div>Loading...</div>

        }
    }

    let ConnectAuthContest = compose(
        connect(mapapStateToProps, { thisUser, currentContestTC }),
        withRouter,

    )(WithAuthContest)

    return ConnectAuthContest;
}