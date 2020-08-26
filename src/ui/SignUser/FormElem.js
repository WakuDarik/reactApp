import React from 'react';

export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div >
            <textarea className={StyleSheet.textareaWrap + " " + StyleSheet.error} {...input} {...props} />
            {
                hasError && <span className={StyleSheet.spanError}>{meta.error}</span>
            }
        </div >
    )
};

export const Select = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div >
            <select className={StyleSheet.textareaWrap + " " + StyleSheet.error} {...input} {...props}>
            {props.option.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
            </select>
            {
                hasError && <span className={StyleSheet.spanError}>{meta.error}</span>
            }
        </div >
    )
};


export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div >
            <input className={StyleSheet.inputWrap + " " + StyleSheet.error} {...input} {...props} />
            {
                hasError && <span className={StyleSheet.spanError}>{meta.error}</span>
            }
        </div >
    )
};

export const InputPassword = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div >
            <input type="password" className={StyleSheet.inputWrap + " " + StyleSheet.error} {...input} {...props} />
            {
                hasError && <span className={StyleSheet.spanError}>{meta.error}</span>
            }
        </div >
    )
};

export const InputEmail = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div >
            <input type="email" className={StyleSheet.inputWrap + " " + StyleSheet.error} {...input} {...props} />
            {
                hasError && <span className={StyleSheet.spanError}>{meta.error}</span>
            }
        </div >
    )
};

export const CheckBox = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div >
            <label>
                <input type="checkbox" className={StyleSheet.inputWrap + " " + StyleSheet.error} {...input} {...props} />
                {props.placeholder}
                {
                    hasError && <span className={StyleSheet.spanError}>{meta.error}</span>
                }
            </label>
        </div >
    )
};

export const InputHidden = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div >
            <input type="hidden" {...input} {...props} value={props.dataValue} />
        </div >
    )
};