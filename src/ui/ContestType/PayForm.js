import React from 'react';
import { connect } from 'react-redux';
import { payForPcg } from '../../redux/contest-reducer';
import { reduxForm, Field, SubmissionError } from 'redux-form';

const payForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field name="card" component={"input"} type="number" placeholder="Card number" />
        <Field name="cvv" component={"input"} type="number" placeholder="Card cvv" />
        <Field name="price" component={"input"} value="100" type="number" placeholder="Price" />
        <label>logo
        <Field name="pcg" value="Logo" component={"input"} type="radio" placeholder="logo" />
        </label>
        <label>name + tagline
        <Field name="pcg" value="Name,Tagline" component={"input"} type="radio" placeholder="logo" />
        </label>
        <button>next step</button>
    </form>
}

const ReduxPayForm = reduxForm({
    form: 'pay'
})(payForm);

class PayForPcg extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            localError: '',
        }
    }

    submitForm = (formData) => {
        if (Object.keys(formData).length !== 0) {
            this.props.payForPcg(formData)
            console.log(formData)
        } else {
            throw new SubmissionError({
                _error: 'Login failed!'
            })
        }
    }

    render () {
        return <>
            <div className='wrap'>
                <div>{this.state.localError}</div>
                <ReduxPayForm
                    onSubmit={this.submitForm} />
            </div>
        </>
    }
}

export default connect(null, { payForPcg })(PayForPcg)