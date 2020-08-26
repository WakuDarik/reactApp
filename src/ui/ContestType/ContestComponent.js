import React from 'react'
import s from './contest.module.css';


export const HeaderContestForm = (props) => {
    return <>
        <div className={s.titleWrap}>
            <span className="sideline"></span>
            <span className="d-block step-number ml-4">{props.step}</span>
            <h1 className={s.h4}>{props.title}</h1>
            <h6 className={s.h6}>{props.titleDescr}</h6>
        </div>
    </>
}

export const FormItem = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return <>
        <label className={s.card}>
            <div className={s.cardBody}>
                <div className={s.uAvatar}>
                    <img className={s.imgFluid} src="https://www.squadhelp.com/resources/assets/imgs/front/packaging_design.png" alt="Image Description" />
                </div>
                <div className="mb-4">
                    <h4 className="h6 text-dark mb-1">{props.title}</h4>
                    <p className="text-muted">{props.descr}</p>
                </div>
            </div>
            <input style={{ display: 'none' }} type='radio' {...input} {...props} />

        </label>
    </>
}
