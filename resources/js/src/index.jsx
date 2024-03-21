import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store/index';
import App from './App';

if (document.getElementById('app')) {

    const app = ReactDOM.createRoot(document.getElementById('app'));
    app.render(<Provider store={store}><App /></Provider>);
}
