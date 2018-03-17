import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			name: 'HomePage',
			path: '/',
			component: () => import('../views/index/Index'),
		},
		{
			name: 'Login',
			path: '/login',
			component: () => import('../views/login/Login'),
		},
		{
			name: 'User',
			path: '/user/:loginname',
			component: () => import('../views/user/User'),
		},
		{
			name: 'Collections',
			path: '/user/:loginname/collections',
			props: route => ({ loginname: route.params.loginname }),
			component: () => import('../views/collections/Collections'),
		},
		{
			name: 'Messages',
			path: '/messages',
			component: () => import('../views/messages/Messages'),
		},
		{
			name: 'Topic',
			path: '/topic/:id',
			component: () => import('../views/topic/Topic'),
		},
		{
			name: 'Release',
			path: '/release/:id',
			component: () => import('../views/release/Release'),
		},
		{
			name: 'NotMatch',
			path: '*',
			component: () => import('../views/404/404'),
		}
	]
})
