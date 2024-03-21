import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import styles from "./OrderDetails.module.css";

const OrderDetails = () => {

    const accessToken = useSelector((state) => state.main.accessToken);
    const [loadedOrder, setLoadedOrder] = useState(false);

    const params = useParams();

    const fetchOrderDetails = async () => {
        const response = await fetch('/api/orders/' + params.orderId, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error('Somethings is wrong');
        }

        const result = await response.json();
        setLoadedOrder(result);
    };

    useEffect(() => {
        fetchOrderDetails(params.orderId);

    },  []);

    if (!loadedOrder) {
        return '<p>Loading...</p>';
    }

    return (<React.Fragment>
        <div className={styles.details}>
            <div>
                <h3>Customer name:</h3>
                <span>{loadedOrder.name}</span>
            </div>
            <div>
                <h3>Customer phone:</h3>
                <span>{loadedOrder.phone}</span>
            </div>
            <div>
                <h3>Customer address:</h3>
                <span>{loadedOrder.address}</span>
            </div>
            <div>
                <h3>Created at:</h3>
                <span>{loadedOrder['created_at']}</span>
            </div>
            <div>
                <h3>Status:</h3>
                <span>{loadedOrder.status}</span>
            </div>
            <div>
                <h3>Total:</h3>
                <span>{loadedOrder.total}</span>
            </div>
            <div>
                <h4><Link to='/orders'>Back to orders</Link></h4>
            </div>
        </div>
    </React.Fragment>);
};

export default OrderDetails;
