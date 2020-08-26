import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAllContestTC } from '../redux/contest-reducer';


let mapapStateToProps = (state) => {
    return {
        contest: state.contest.contest
    };
};


export const withContest = (Component) => {


    class WithContest extends React.Component {

        componentDidMount () {
            this.props.getAllContestTC();
        }

        render () {
            if (this.props.contest) return <Component {...this.props} />
            return <div>Loading...</div>
        }
    }
    let ConnectContest = compose(
        connect(mapapStateToProps, { getAllContestTC })
    )(WithContest)

    return ConnectContest;
}