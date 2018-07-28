import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import './assets/scss/style.scss'
import './assets/scss/media.scss'
import store from './store'
import Sidebar from './components/sidebar/Sidebar'
import List from './components/topics-list/TopicsList'
Vue.use(iView)

Vue.config.productionTip = false

Vue.component('Sidebar', Sidebar)
Vue.component('List', List)



Vue.filter('fromNow', date => {
	return moment(date).fromNow();
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#xiejiahe')
