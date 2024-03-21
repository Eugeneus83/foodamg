import {useRef, useState} from 'react';
import styles from './SubmitOrder.module.css';

const SubmitOrder = (props) => {

    const [userInputValidity, setUserInputValidity] = useState({
        name: true,
        phone: true,
        address: true
    });

    const isInputValid = (value) => value.trim() !== '';

    const inputNameRef = useRef();
    const inputPhoneRef = useRef();
    const inputAddressRef = useRef();

    const confirmOrderHandler = (event) => {
        event.preventDefault();
        const enteredNameValue = inputNameRef.current.value;
        const enteredPhoneValue = inputPhoneRef.current.value;
        const enteredAddressValue = inputAddressRef.current.value;

        const isNameValid = isInputValid(enteredNameValue);
        const isPhoneValid = isInputValid(enteredPhoneValue);
        const isAddressValid = isInputValid(enteredAddressValue);

        const isFormValid = isNameValid && isPhoneValid && isAddressValid;

        setUserInputValidity({
            name: isNameValid,
            phone: isPhoneValid,
            address: isAddressValid
        });

        if (!isFormValid) {
            return;
        }

        props.onSubmit({
            name: enteredNameValue,
            phone: enteredPhoneValue,
            address: enteredAddressValue
        });
    };

    const nameInputClasses = `${styles.control} ${userInputValidity.name ? '' : styles.invalid}`;
    const phoneInputClasses = `${styles.control} ${userInputValidity.phone ? '' : styles.invalid}`;
    const addressInputClasses = `${styles.control} ${userInputValidity.address ? '' : styles.invalid}`;

    return (
        <form className={styles.form} onSubmit={confirmOrderHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={inputNameRef}/>
            </div>
            <div className={phoneInputClasses}>
                <label htmlFor="name">Phone number</label>
                <input type="text" id="phone" ref={inputPhoneRef}/>
            </div>
            <div className={addressInputClasses}>
                <label htmlFor="name">Address</label>
                <input type="text" id="address" ref={inputAddressRef}/>
            </div>
            <div className={styles.actions}>
                <button className={styles.submit}>Confirm order</button>
                <button type="button" onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default SubmitOrder;
