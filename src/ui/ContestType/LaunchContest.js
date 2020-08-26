import React from 'react';
import { connect } from 'react-redux';
import s from './contest.module.css';
import { contestName, createContestTC } from '../../redux/contest-reducer';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import { compose } from 'redux';
import { withAuthRedirectLogin } from '../../hoc/AuthRedirect';
import PayForm from './PayForm';
import { withRouter } from 'react-router-dom';


// const contestForm = (props) => {
//     return <form onSubmit={props.handleSubmit}>
//         {this.state.formStep === 1
//             ? <FirstStep updateData={this.updateData} contestType={this.state.contestType} setContestName={this.setContestName} />
//             : this.state.formStep === 2
//                 ? <SecondStep updateData={this.updateData} contestType={this.state.contestType} setContestName={this.setContestName} />
//                 : this.state.formStep === 3
//                     ? <ThirdStep updateData={this.updateData} contestType={this.state.contestType} setContestName={this.setContestName} />
//                     : this.state.formStep === 4
//                         ? <FourthStep updateData={this.updateData} contestType={this.state.contestType} setContestName={this.setContestName} />
//                         : null
//         }
//         <button>cerate contest</button>
//     </form>
// }

const contestForm = (props) => {

    const renderSwitch = (formStep) => {
        switch (formStep) {
            case 1:
                return <FirstStep contestType={props.state.contestType} />
            case 2:
                return <SecondStep isAuth={props.isAuth} user={props.userId} contestType={props.state.contestType} />
            case 3:
                return <PayForm contestType={props.state.contestType} />
            default:
                return null;
        }
    }

    return <form onSubmit={props.handleSubmit}>
        {renderSwitch(props.state.formStep)}
        {props.state.formStep === 3 ? null : <button>next step</button>}
    </form>

}

const ReduxContestForm = reduxForm({
    form: 'contest'
})(contestForm);

class LaunchContest extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formStep: 1,
            localError: '',
            contestType: {
                singl: [
                    {
                        name: 'name',
                        desc: 'Get up and running with the perfect name'
                    },
                    {
                        name: 'tagline',
                        desc: 'Kickstart your venture with a unique, memorable logo'
                    },
                    {
                        name: 'logo',
                        desc: 'Connect deeply with your target audience with an on-target tagline'
                    },

                ],
                package: [
                    {
                        name: 'name + tagline + logo',
                        desc: 'Establish your entire brand identity and save with this bundle.'
                    },
                    {
                        name: 'name + tagline',
                        desc: 'Communicate your vision with the perfect Name/Tagline combo.'
                    },
                    {
                        name: 'name + logo',
                        desc: 'Get the essentials needed to establish your brand together and save'
                    },
                    {
                        name: 'tagline + logo',
                        desc: 'Get a great Logo design and a catchy slogan/ Tagline for your brand'
                    },
                ]
            }
        }
    }

    updateData = (value) => {
        this.setState({ formStep: this.state.formStep + value })
    }

    submitForm = (formData) => {
        if (Object.keys(formData).length !== 0) {
            if (this.state.formStep < 2)
                this.updateData(1)

            if (this.state.formStep === 2) {
                this.props.createContestTC(formData, this.props.user.id)
                this.updateData(1)
            }

            if (this.state.formStep === 3) {
                this.props.history.push('/profile')

            }
            console.log(formData)

        } else {
            throw new SubmissionError({
                _error: 'Error!'
            })
        }
    }

    render () {
        return <>
            <div className='wrap'>
                <div>{this.state.localError}</div>
                <ReduxContestForm
                    onSubmit={this.submitForm}
                    state={this.state}
                    step={this.updateData}
                    isAuth={this.props.isAuth}
                    userId={this.props.user.id} />
                {this.state.formStep <= 1
                    ? null
                    : <button onClick={() => this.updateData(-1)}>prev step</button>
                }
            </div>
        </>
    }

}

const MapStateToProps = (state) => {
    return {
        contest: state.contest,
    }

}


export default compose(
    withAuthRedirectLogin,
    withRouter,
    connect(MapStateToProps, { contestName, createContestTC })
)(LaunchContest);