import {useState, useEffect} from 'react';
import styles from './ProductList.module.css';
import ProductItem from './ProductItem/ProductItem';
import Card from '../UI/Card';
import {useSelector} from "react-redux";
import useHttp from "../../hooks/http";

const ProductList = () => {

    const [products, setProducts] = useState([]);

    const {isLoading, error: httpErrorMessage, sendHttpRequest: fetchProducts} = useHttp();

    useEffect(() => {

        const manageProducts = (responseData) => {
            let loadedProducts = [];
            for (const key in responseData) {
                loadedProducts.push({
                    id: key,
                    ...responseData[key]
                });
            }
            if (loadedProducts) {
                setProducts(loadedProducts);
            }
        }

        fetchProducts('/api/products', {}, manageProducts);

    }, [fetchProducts]);

    if (isLoading) {
        return (<section className={styles.loading}>
            Extracting data from server
        </section>);
    }

    if (httpErrorMessage) {
        return (<section className={styles.error}>
            {httpErrorMessage}
        </section>);
    }

    const productList = products.map((product) => <ProductItem key={product.id} product={product}/>);
    return <section className={styles.products}>
        <Card>
            <ul>
                {productList}
            </ul>
        </Card>
    </section>
};

export default ProductList;
