import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getContestTC } from '../../redux/profile-reducer';
import { compose } from 'redux';
import { withAuthRedirectLogin } from '../../hoc/AuthRedirect';

const UserProfile = (props) => {
    return (
        <div>
            H1, { props.user.email}
        </div>
    )
}

const Dashboard = (props) => {
    let messages;
    if (!props.dashboard.contest) {
        return <div>No contest</div>
    }

    if (props.dashboard.contest) {
        messages = props.dashboard.contest.map(contest => (<>
            <h3>{contest.contestName}</h3>
            <p>{contest.typeName}</p>
            <NavLink to={`/profile/dashboard/${contest.id}`}>Edit  </NavLink>
        </>
        ));
    }


    return <>
        {messages}
    </>

}

class UserPage extends React.Component {

    componentDidMount () {
        this.props.getContestTC(this.props.user.id)
    }

    render () {
        return <>
            <UserProfile user={this.props.user} />
            {this.props.contest.contest ? <Dashboard dashboard={this.props.contest} /> : null}
        </>
    }

}

const MapStateToProps = (state) => {
    return {
        user: state.auth.user,
        contest: state.profile
    }

}


export default compose(
    withAuthRedirectLogin,
    connect(MapStateToProps, { getContestTC })
)(UserPage);
