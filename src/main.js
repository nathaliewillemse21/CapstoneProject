import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import AxiosPlugin from './Axios.js';

const app = createApp(App);
app.use(AxiosPlugin);

// Mount the app with router and store
app.use(router);
app.use(store);
app.mount('#app');
