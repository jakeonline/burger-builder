export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const validate = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '';
    }

    if(rules.isEmail){
        isValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) ? true : false;
        // console.log(`isEmail: ${isValid}`);
    }

    // if (rules.minLength) {
    //     isValid = value.trim().length >= rules.minLength;
    // }

    // if (rules.maxLength) {
    //     isValid = value.trim().length <= rules.maxLength;
    // }

    // if (rules.minLength && rules.maxLength) {
    //     isValid = value.trim().length >= rules.minLength
    //         && value.trim().length <= rules.maxLength;
    // }

    // if (rules.minLength || rules.maxLength) {
    // isValid = isValid && this.isMinLength(value, rules.minLength) &&
    //     this.isMaxLength(value, rules.maxLength)
    // }

    isValid = isValid && isMinLength(value, rules.minLength) &&
        isMaxLength(value, rules.maxLength);

    // // function practice
    // isValid = isValid &&
    //     this.hasRequiredLength(rules.minLength, (rule) => value.trim().length >= rule)
    //     &&
    //     this.hasRequiredLength(rules.maxLength, (rule) => value.trim().length <= rule)

    return isValid;
}

const isMinLength = (value, minLengthRule) => {
    return minLengthRule ? value.trim().length >= minLengthRule : true;
}

const isMaxLength = (value, maxLengthRule) => {
    return maxLengthRule ? value.trim().length <= maxLengthRule : true;
}