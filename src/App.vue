<template>
	<div id="app">
		<div class="progress" :class="{actve: start, end: end}">
			<div class="rotate-loading"></div>
			<div class="progress-forward"></div>
		</div>
		<div class="go-top user-select-none" @click="goTop">
			<p>回</p>
			<p>顶</p>
			<p>部</p>
		</div>
		<div class="router-view">
			<Header />
			<keep-alive exclude="User,Collections,Messages,Release">
				<router-view />
			</keep-alive>
			<Footer />
		</div>
	</div>
</template>

<script>
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
export default {
	name: 'App',
	components: {
		Header,
		Footer,
	},
	data () {
		return {
			loading: false,
			start: false,
			end: false,
		}
	},
	created () {
		this.axiosConfig();
		this.momentConfig();
		this.$store.dispatch('checkLogin');
	},
	methods: {
		goTop () {
			window.scrollTo(0, 0);
		},
		progressStart () {
			this.start = true;
		},
		progressEnd () {
			this.end = true;
			setTimeout(() => {
				this.end = this.start = false;
			}, 700);
		},
		axiosConfig () {
			axios.interceptors.request.use(config => {
				this.progressStart();
				// post请求默认发送参数
				if( config.method === 'post' ) {
					config.data = Object.assign({
						accesstoken: this.$store.state.accessToken,
					}, config.data);
				}
				// 如果是发送GET请求
				if( config.method === 'get' ) {
					config.params = Object.assign({
						accesstoken: this.$store.state.accessToken,
					}, config.params);
				}
				return config;
			}, e => {
				this.progressEnd();
				this.$Message.warning('API请求失败!');
				return Promise.reject(e);
			});
			
			// 响应拦截器
			axios.interceptors.response.use(res => {
				this.progressEnd();
				return res;
			}, e => {
				this.$Message.warning('请求超时或服务器出错!');
				this.progressEnd();
				return Promise.reject(e);
			});
		},
		momentConfig () {
			moment.locale('zh-cn', {  
				months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),  
				monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),  
				weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),  
				weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),  
				weekdaysMin : '日_一_二_三_四_五_六'.split('_'),  
				longDateFormat : {  
					LT : 'Ah点mm分',  
					LTS : 'Ah点m分s秒',  
					L : 'YYYY-MM-DD',  
					LL : 'YYYY年MMMD日',  
					LLL : 'YYYY年MMMD日Ah点mm分',  
					LLLL : 'YYYY年MMMD日ddddAh点mm分',  
					l : 'YYYY-MM-DD',  
					ll : 'YYYY年MMMD日',  
					lll : 'YYYY年MMMD日Ah点mm分',  
					llll : 'YYYY年MMMD日ddddAh点mm分'  
				},  
				meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,  
				meridiemHour: function (hour, meridiem) {  
					if (hour === 12) {  
						hour = 0;  
					}  
					if (meridiem === '凌晨' || meridiem === '早上' ||  
							meridiem === '上午') {  
						return hour;  
					} else if (meridiem === '下午' || meridiem === '晚上') {  
						return hour + 12;  
					} else {  
						// '中午'  
						return hour >= 11 ? hour : hour + 12;  
					}  
				},  
				meridiem : function (hour, minute, isLower) {  
					var hm = hour * 100 + minute;  
					if (hm < 600) {  
						return '凌晨';  
					} else if (hm < 900) {  
						return '早上';  
					} else if (hm < 1130) {  
						return '上午';  
					} else if (hm < 1230) {  
						return '中午';  
					} else if (hm < 1800) {  
						return '下午';  
					} else {  
						return '晚上';  
					}  
				},  
				calendar : {  
					sameDay : function () {  
						return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';  
					},  
					nextDay : function () {  
						return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';  
					},  
					lastDay : function () {  
						return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';  
					},  
					nextWeek : function () {  
						var startOfWeek, prefix;  
						startOfWeek = moment().startOf('week');  
						prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';  
						return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';  
					},  
					lastWeek : function () {  
						var startOfWeek, prefix;  
						startOfWeek = moment().startOf('week');  
						prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';  
						return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';  
					},  
					sameElse : 'LL'  
				},  
				ordinalParse: /\d{1,2}(日|月|周)/,  
				ordinal : function (number, period) {  
					switch (period) {  
					case 'd':  
					case 'D':  
					case 'DDD':  
						return number + '日';  
					case 'M':  
						return number + '月';  
					case 'w':  
					case 'W':  
						return number + '周';  
					default:  
						return number;  
					}  
				},  
				relativeTime : {  
					future : '%s内',  
					past : '%s前',  
					s : '几秒',  
					m : '1 分钟',  
					mm : '%d 分钟',  
					h : '1 小时',  
					hh : '%d 小时',  
					d : '1 天',  
					dd : '%d 天',  
					M : '1 个月',  
					MM : '%d 个月',  
					y : '1 年',  
					yy : '%d 年'  
				},  
				week : {  
					dow : 1,
					doy : 4
				}
			});
		}
	}
}
</script>

<style lang="scss">
@import "./assets/scss/_variable.scss";



</style>
