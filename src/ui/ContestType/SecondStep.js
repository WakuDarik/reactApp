import React, { useState } from 'react'
import s from './contest.module.css';
import { HeaderContestForm, FormItem } from './ContestComponent'
import { Field } from 'redux-form';
import { required } from '../../utils/validation/validation';
import { Input, Textarea, Select, InputEmail, CheckBox } from '../SignUser/FormElem';
import { NavLink } from 'react-router-dom';

const SecondStep = props => {

    const [option, setOption] = useState(['coockies', 'sweeti']);

    if (!props.isAuth) {
        return <RedorectOrLogin />
    }

    return <>
        <HeaderContestForm step='step 2' title='step 2' titleDescr='step 2' />
        <div className={s.categoryWrap}>
            <Field name='contestName' component={Input} type='text' placeholder='title of contest' validate={[required]} />
            <Field component={Select} name='asociated' option={option} validate={[required]} />
            <Field name='description' component={Textarea} validate={[required]} />
            <Field name='targetCustomer' component={Textarea} validate={[required]} />
            <Field name='awardAmount' component={Input} type='number' placeholder='award amount' validate={[required]} />
            {/* <Field name='someElse' component={Textarea} validate={[required]}/> */}
        </div>
    </>
}

const RedorectOrLogin = (props) => {
    return <>
        <NavLink to="/login">Signin</NavLink>
        or
        <NavLink to="/signup">Signup</NavLink>
    </>
}

export default SecondStep