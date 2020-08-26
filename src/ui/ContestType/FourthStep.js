import React from 'react'
import s from './contest.module.css';
import { HeaderContestForm, FormItem } from './ContestComponent'

const FourthStep = props => {
    return <>
        <HeaderContestForm />
        <div className={s.categoryWrap}>
            {props.contestType.singl.map(contest => <>
                <FormItem setContestName={props.setContestName} name={contest.name} descr={contest.desc} />
            </>)}
        </div>

        <div className='pkgWrap'>
            <HeaderContestForm />
            <div className={s.categoryWrap}>
                {props.contestType.package.map(contest => <>
                    <FormItem setContestName={props.setContestName} name={contest.name} descr={contest.desc} />
                </>)}
            </div>

        </div>
    </>
}
export default FourthStep