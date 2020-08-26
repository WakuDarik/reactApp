import React from 'react'
import s from './contest.module.css';
import { HeaderContestForm, FormItem } from './ContestComponent'
import { Field } from 'redux-form';
import { required } from '../../utils/validation/validation';
import { Input, Textarea, Select, InputEmail, CheckBox } from '../SignUser/FormElem';

const ThirdStep = props => {
    return <>
    <HeaderContestForm step='step 3' title='step 3' titleDescr='step 3' />
    <div className={s.categoryWrap}>
       
        <Field name='someElse' component={Textarea} validate={[required]}/>
    </div>
</>
}
export default ThirdStep