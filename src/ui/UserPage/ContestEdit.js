import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthContest } from '../../hoc/ContestHok';
import { activeCurrentContestTC } from '../../redux/profile-reducer';

const EditableContest = (props) => {

    let contest = props.dashboard.map((contest) => (<>
        <h3>{contest.contestName}</h3>
        <p>{contest.typeName}</p>
        <h2>activity: {contest.activity}</h2>
        {props.thisCintest[0].activity
            ? <div>Now is active</div>
            : <button onClick={() => { props.activeContest(contest.id); }}>Active</button>}
    </>
    ))
    return <>
        {contest}
    </>

}

class ContestEdit extends React.Component {
    constructor(props) {
        super(props)


    }

    componentDidMount () {
        console.log(this.props.thisCintest)
    }
    // shouldComponentUpdate (nextProps, nextState) {
    //     console.log(nextState.active)
    // }
    render () {

        return <>
            <EditableContest thisCintest={this.props.thisCintest} activeContest={this.props.activeCurrentContestTC} id={this.props.match.params.id} dashboard={this.props.contest} />
        </>
    }

}

const MapStateToProps = (state) => {
    return {
        user: state.auth.user,
        thisCintest: state.profile.currentContest
    }

}

export default compose(
    withAuthContest,

    withRouter,
    connect(MapStateToProps, { activeCurrentContestTC }),



)(ContestEdit);
