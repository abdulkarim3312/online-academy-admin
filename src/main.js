import { createApp } from 'vue'
import App from './App.vue'
import axios from './service/axios'
import store from "./store";
import VueAxios from 'vue-axios'
import moment from 'moment'
import { createI18n } from 'vue-i18n'
import messages from './lang'
import CKEditor from '@ckeditor/ckeditor5-vue';


window.$ = window.jQuery = require('jquery')
window._ = require('lodash')
import router from "./routes";
import VueSweetalert2 from 'vue-sweetalert2';
import ValidationMessage from "./components/shared/ValidationMessage";
import validationErrors from "./mixins/validationErrors";
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/scss/main.scss';
import helperMixins from "./mixins/helperMixins";


export const i18n = new createI18n({
  locale: process.env.VUE_APP_LOCALE,
  fallbackLocale: process.env.VUE_APP_LOCALE,
  messages
})


const app = createApp(App)
app.config.globalProperties.$moment=moment
app.mixin(validationErrors);
app.mixin(helperMixins);
app.component('v-errors', ValidationMessage);
app.use(VueAxios, axios)
app.use(store)
app.use(i18n)
app.use(router)
app.use(VueSweetalert2)
app.use(CKEditor)

app.mount('#app')
