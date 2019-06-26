import Vue from 'vue';
import './assets/styles/global.scss';
import './registerServiceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import App from './App';
import router from './router';
import { plugin } from 'vue-function-api';
import iView from 'iview';
import { checkLogin } from './store';
import Sidebar from './components/sidebar/Sidebar';
import List from './components/topics-list/TopicsList';

moment.locale('zh-cn');
checkLogin();

Vue.use(iView);
Vue.use(plugin);

Vue.config.productionTip = false

Vue.component(Sidebar.name, Sidebar);
Vue.component(List.name, List);



Vue.filter('fromNow', date => {
	return moment(date).fromNow();
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#xiejiahe')
