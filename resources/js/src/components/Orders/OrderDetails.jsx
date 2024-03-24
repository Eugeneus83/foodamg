import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import styles from "./OrderDetails.module.css";
import useHttp from "../../hooks/http";

const OrderDetails = () => {

    const [loadedOrder, setLoadedOrder] = useState(false);
    const {isLoading, error: httpErrorMessage, sendHttpRequest: fetchOrderDetails} = useHttp();

    const params = useParams();

    useEffect(() => {

        const manageOrders = (loadedData) => {
            setLoadedOrder(loadedData);
        }

        fetchOrderDetails('/api/orders/' + params.orderId, {}, manageOrders);

    },  [fetchOrderDetails]);

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
