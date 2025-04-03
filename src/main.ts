import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import { VueQueryPlugin } from '@tanstack/vue-query';

import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(router);
app.use(Toast);
app.use(VueQueryPlugin);
app.mount('#app');
