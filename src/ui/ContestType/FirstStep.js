import React from 'react'
import s from './contest.module.css';
import { HeaderContestForm, FormItem } from './ContestComponent'
import { Field } from 'redux-form';
import { required } from '../../utils/validation/validation';

const FirstStep = (props) => {
    return <>
        <HeaderContestForm step='step 1' title='step 1' titleDescr='step 1' />
        <div className={s.categoryWrap}>
            {props.contestType.singl.map((contest, index) => <>
                <Field component={FormItem} type="radio" name='typeName' value={contest.name} title={contest.name} descr={contest.desc} />
            </>)}
        </div>

        <div className='pkgWrap'>
            <HeaderContestForm />
            <div className={s.categoryWrap}>
                {props.contestType.package.map((contest, index) => <>
                    <Field component={FormItem} type="radio" name='typeName' value={contest.name} title={contest.name} descr={contest.desc} />
                </>)}
            </div>

        </div>
    </>
}

export default FirstStep
