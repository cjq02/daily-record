import Vue from 'vue';
import App from './App';
import UserInfo from '@/common/userInfo.js';
import uView from 'uview-ui';
import _ from 'lodash';
import http from '@/common/http.js'
import Constants from '@/common/constants.js'
import tabBar from '@/components/uview-ui-ext/u-tabbar/u-tabbar-ext.vue'

Vue.config.productionTip = false;
Vue.use(uView);
Vue.use(_);
Vue.use(Constants);
Vue.use(http);
Vue.use(UserInfo);

Vue.component('tab-bar', tabBar);

Vue.prototype.Constants = Constants;
Vue.prototype.$ajax = http;
Vue.prototype.onLoading = async (handler, title) => {
	/*let begin = new Date().getTime();
	console.log('begin', begin);*/
	uni.showLoading({
		title: title || '加载中',
		mask: true
	});
	await handler();
	uni.hideLoading();
	/*let end = new Date().getTime();
	console.log('end', end);
	console.log('cost time', end - begin);*/
};

Vue.directive('enterNumber', {
	inserted: function(el) {
		el.addEventListener("keypress", function(e) {
			e = e || window.event;
			let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
			let re = /\d/;
			if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
			}
		});
	}
});

Vue.prototype.storeTabBarList = [{
		"index": 0,
		"pagePath": '/pages/store/home',
		"text": '首页',
		"iconPath": "/static/images/tabbar/home.png",
		"selectedIconPath": "/static/images/tabbar/home-fill.png"
	},
	{
		"index": 1,
		"pagePath": "/pages/store/activity/activityManage",
		"text": "活动",
		"iconPath": "/static/images/tabbar/activity.png",
		"selectedIconPath": "/static/images/tabbar/activity-fill.png"
	},
	{
		"index": 2,
		"pagePath": "/pages/store/book/bookList",
		"text": "书籍",
		"iconPath": "/static/images/tabbar/book.png",
		"selectedIconPath": "/static/images/tabbar/book-fill.png"
	},
	/* {
		"index": 3,
		"pagePath": "/pages/test/menu",
		"text": "拼书",
		"iconPath": "static/images/tabbar/group-book.png",
		"selectedIconPath": "static/images/tabbar/group-book-fill.png"
	}, */
	{
		"index": 3,
		"pagePath": "/pages/store/mine",
		"text": "我的",
		"iconPath": "/static/images/tabbar/mine.png",
		"selectedIconPath": "/static/images/tabbar/mine-fill.png"
	}
];
Vue.prototype.readerTabBarList = [{
		"index": 0,
		"pagePath": '/pages/reader/home',
		"text": '首页',
		"iconPath": "/static/images/tabbar/home.png",
		"selectedIconPath": "/static/images/tabbar/home-fill.png"
	},
	{
		"index": 1,
		"pagePath": "/pages/reader/store/store",
		"text": "书店",
		"iconPath": "/static/images/tabbar/group-book.png",
		"selectedIconPath": "/static/images/tabbar/group-book-fill.png",
	},
	{
		"index": 2,
		"pagePath": "/pages/reader/book/book",
		"text": "书籍",
		"iconPath": "/static/images/tabbar/book.png",
		"selectedIconPath": "/static/images/tabbar/book-fill.png"
	},
	{
		"index": 3,
		"pagePath": "/pages/reader/activity/activity",
		"text": "活动",
		"iconPath": "/static/images/tabbar/activity.png",
		"selectedIconPath": "/static/images/tabbar/activity-fill.png"
	},
	{
		"index": 4,
		"pagePath": "/pages/reader/mine",
		"text": "我的",
		"iconPath": "/static/images/tabbar/mine.png",
		"selectedIconPath": "/static/images/tabbar/mine-fill.png"
	}
];
App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
