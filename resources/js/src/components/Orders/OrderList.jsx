import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import OrderItem from "../Orders/OrderItem/OrderItem";
import Card from "../UI/Card";
import styles from "./OrderList.module.css";
import useHttp from "../../hooks/http";

const OrdersList = (props) => {

    const [orders, setOrders] = useState([]);
    const {isLoading, error: httpErrorMessage, sendHttpRequest: fetchOrders} = useHttp();

    useEffect(() => {

        const manageOrders = (responseData) => {
            let loadedOrders = [];
            for (const key in responseData) {
                loadedOrders.push({
                    id: key,
                    ...responseData[key]
                });
            }
            setOrders(loadedOrders);
        }

        fetchOrders('/api/orders', {}, manageOrders);

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
