import {useRef, useState} from 'react';
import styles from './ProductItemForm.module.css';
import Input from "../../UI/Input";

const ProductItemForm = (props) => {

    const addItemHandler = (event) => {
        event.preventDefault();
        props.onAddItem(1);
    };

    return <form className={styles.form}>
        <button onClick={addItemHandler}>Add</button>
    </form>
};

export default ProductItemForm;
