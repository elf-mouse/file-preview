import './config/polyfill';
import Vue from 'vue';
import $http from './plugins/$http';
import App from './views/layouts/app';
import router from './routes';
import store from './store';
import BalmUI from 'balm-ui-lite';

Vue.config.productionTip = false;
Vue.use($http);
Vue.use(BalmUI);
Vue.use(BalmUI.plugins.event);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});
