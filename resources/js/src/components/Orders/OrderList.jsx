import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import OrderItem from "../Orders/OrderItem/OrderItem";
import Card from "../UI/Card";
import styles from "./OrderList.module.css";

const OrdersList = (props) => {

    const accessToken = useSelector((state) => state.main.accessToken);

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await fetch('/api/orders', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error('Somethings is wrong');
        }

        let loadedOrders = [];
        const responseData = await response.json();
        for (const key in responseData) {
            loadedOrders.push({
                id: key,
                ...responseData[key]
            });
        }
        setOrders(loadedOrders);
    };

    useEffect(() => {

        fetchOrders().catch(err => {
            alert(err.message);
        });

    }, []);

    const orderList = orders.map(order => <OrderItem key={order.id} order={order}/>);

    return <section className={styles.orders}>
        <Card>
            <h2>My Orders</h2>
            <ul>
                {orderList}
            </ul>
        </Card>
    </section>
};

export default OrdersList;
