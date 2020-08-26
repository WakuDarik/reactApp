export const required = value => {
    if (value) {
        return undefined
    } else {
        return 'Fieled is required'
    }
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) {
        return 'max length id' + maxLength;
    } else {
        return undefined;
    }
}


export const matchInput = (input, allInputs) =>
input === allInputs.password ? undefined : 'Пароль не совпадает';