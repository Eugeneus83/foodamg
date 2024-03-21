import {useSelector, useDispatch} from "react-redux";
import styles from './ProductItem.module.css';
import ProductItemForm from "./ProductItemForm";
import {cartActions} from "../../../store/cart-slice";

const ProductItem = (props) => {

    const dispatchFunction = useDispatch();
    const cart = useSelector((state) => state.cart);

    const product = props.product;
    const formattedPrice = `$${parseFloat(product.price).toFixed(2)}`;

    const addItemHandler = (amount) => {
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            amount: amount
        };
        dispatchFunction(cartActions.addItem(item));
    };

    return <li className={styles.product}>
        <div>
            <h3>{product.name}</h3>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.price}>{formattedPrice}</div>
        </div>
        <div><ProductItemForm id={product.id} onAddItem={addItemHandler}/></div>
    </li>;
};

export default ProductItem;
