import {useSelector, useDispatch} from "react-redux";
import {Link} from 'react-router-dom';
import styles from './OrderItem.module.css';

const OrderItem = (props) => {

    const order = props.order;

    return <li className={styles.order}>
        <div>
            <h3>{order.id}</h3>
            <div>
                <label>Name:</label>
                <span className={styles.name}>{order.name}</span>
            </div>
            <div>
                <label>Phone:</label>
                <span className={styles.phone}>{order.phone}</span>
            </div>
            <div>
                <h4><Link to={'/orders/' + order.id}>Click to see details</Link></h4>
            </div>
        </div>
    </li>;
};

export default OrderItem;
