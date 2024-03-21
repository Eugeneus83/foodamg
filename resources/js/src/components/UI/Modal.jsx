import React from 'react';
import reactDom from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = (props) => {
    return <React.Fragment>
        <div className={styles.backdrop} onClick={props.onHideCart}></div>
    </React.Fragment>
};

const ModalWindow = (props) => {
    return <div className={styles.modal}>
        <div>{props.children}</div>
    </div>
}

const portal = document.getElementById('overlays');

const Modal = (props) => {
    return <React.Fragment>
        {reactDom.createPortal(<Backdrop onHideCart={props.onHideCart}/>, portal)}
        {reactDom.createPortal(<ModalWindow>{props.children}</ModalWindow>, portal)}
    </React.Fragment>
};

export default Modal;