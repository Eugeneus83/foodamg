import {useState, useEffect} from 'react';
import styles from './ProductList.module.css';
import ProductItem from './ProductItem/ProductItem';
import Card from '../UI/Card';
import {useSelector} from "react-redux";

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpErrorMessage, setHttpErrorMessage] = useState();

    const accessToken = useSelector((state) => state.main.accessToken);

    const fetchProducts = async () => {
        setIsLoading(true);
        const response = await fetch('/api/products', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error('Somethings is wrong');
        }

        let loadedProducts = [];
        const responseData = await response.json();
        for (const key in responseData) {
            loadedProducts.push({
                id: key,
                ...responseData[key]
            });
        }
        setProducts(loadedProducts);
        setIsLoading(false);
    };

    useEffect(() => {

        fetchProducts().catch(err => {
            setIsLoading(false);
            setHttpErrorMessage(err.message);
        });

    }, []);

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
