import React from 'react';
import styles from './Input.module.css'

const input = (props) => {

    let inputElement = null;

    const inputClasses = [styles.InputElement];
    let errorLabel = null;

    if (props.shouldValidate && props.touched && !props.valid) {
        inputClasses.push(styles.Invalid);
        errorLabel = <p className={styles.ErrorMessage}>{props.errormessage}</p>;
    }


    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <div className={styles.Input}>
                    <input
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                    { errorLabel}
                </div>
            );
            break;
        case ('textarea'):
            inputElement = (
                <div className={styles.Input}>
                    <textarea
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />;
                    { errorLabel}
                </div>
            );
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {
                        props.elementConfig.options.map(
                            option =>
                                <option
                                    key={option.value}
                                    value={option.value}>
                                    {option.display}
                                </option>
                        )
                    }
                </select>
            )

            break;
        default:
            inputElement = (
                <div className={styles.Input}>
                    <input
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />;
                    { errorLabel}
                </div>
            );
            break;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;