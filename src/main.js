// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
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


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
