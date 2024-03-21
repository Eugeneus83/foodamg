import React, {useState, useEffect, useReducer, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import { mainActions } from "../../store/main-slice";

import Card from "../UI/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Login = (props) => {

    const dispatchFunction = useDispatch();

    const emailInputRef = useRef();

    const passwordInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const email = emailInputRef.current.value.trim();
        const password = passwordInputRef.current.value.trim();
        if (email === '' || password === '') {
            alert('Please check entered data');
            return;
        }

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            return response.json();
        }).then(response => {
            dispatchFunction(mainActions.onLogin({
                access_token: response.access_token
            }));
        });
    };

    return (
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="Email"
                    type="email"
                    value=""
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Пароль"
                    type="password"
                    value=""
                />
                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn}>
                        Вход
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
