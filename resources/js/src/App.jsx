import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Layout/Header';
import Login from './components/Login/Login';
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import OrderDetails from "./components/Orders/OrderDetails";
import Orders from './components/Orders/Orders';
import {checkAccessToken} from './store/main-slice';

let isInitialRunning = true;

const App = () => {

    const dispatchAction = useDispatch();
    const accessToken = useSelector((state) => state.main.accessToken);

    useEffect(() => {
        if (accessToken) {
            dispatchAction(checkAccessToken(accessToken));
        }
    }, []);

    const [cartIsVisible, setCartIsVisible] = useState(false);

    const showCartHandler = () => {
        setCartIsVisible(true);
    }

    const hideCartHandler = () => {
        setCartIsVisible(false);
    }

    return (
        <React.Fragment>
            <Router>
                {cartIsVisible && <Cart onHideCart={hideCartHandler}/>}
                {accessToken && <Header onShowCart={showCartHandler}/>}
                <Routes>
                    <Route path='/' element={
                        <main>
                            {!accessToken && <Login/>}
                            {accessToken && <Products/>}
                        </main>
                    } />
                    <Route path='/orders' exact element={<Orders/>}/>
                    <Route path='/orders/:orderId' element={<OrderDetails/>} />
                </Routes>
            </Router>
        </React.Fragment>
    );

}

export default App;
