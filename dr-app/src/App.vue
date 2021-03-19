<script>
	import BusinessUtils from '@/utils/business.utils.js'

	export default {
		globalData: {
			tabBar: {
				/**
				 * 书店
				 * */
				"2": [{
						"index": 0,
						"pagePath": '/pages/store/home',
						"text": '首页',
						"iconPath": "static/images/tabbar/home.png",
						"selectedIconPath": "static/images/tabbar/home-fill.png"
					},
					{
						"index": 1,
						"pagePath": "/pages/store/activity/activityManage",
						"text": "活动",
						"iconPath": "static/images/tabbar/activity.png",
						"selectedIconPath": "static/images/tabbar/activity-fill.png"
					},
					{
						"index": 2,
						"pagePath": "/pages/store/book/bookList",
						"text": "书籍",
						"iconPath": "static/images/tabbar/book.png",
						"selectedIconPath": "static/images/tabbar/book-fill.png"
					},
					{
						"index": 3,
						"pagePath": "/pages/test/menu",
						"text": "拼书",
						"iconPath": "static/images/tabbar/group-book.png",
						"selectedIconPath": "static/images/tabbar/group-book-fill.png"
					},
					{
						"index": 4,
						"pagePath": "/pages/store/mine",
						"text": "我的",
						"iconPath": "static/images/tabbar/mine.png",
						"selectedIconPath": "static/images/tabbar/mine-fill.png"
					}
				],
				/**
				 * 读者
				 * */
				"7": [{
						"index": 0,
						"pagePath": '/pages/reader/home',
						"text": '首页',
						"iconPath": "static/images/tabbar/home.png",
						"selectedIconPath": "static/images/tabbar/home-fill.png"
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
						"iconPath": "static/images/tabbar/book.png",
						"selectedIconPath": "static/images/tabbar/book-fill.png"
					},
					{
						"index": 3,
						"pagePath": "/pages/reader/activity/activity",
						"text": "活动",
						"iconPath": "static/images/tabbar/activity.png",
						"selectedIconPath": "static/images/tabbar/activity-fill.png"
					},
					{
						"index": 4,
						"pagePath": "/pages/reader/mine",
						"text": "我的",
						"iconPath": "static/images/tabbar/mine.png",
						"selectedIconPath": "static/images/tabbar/mine-fill.png"
					}
				]
			}
		},

		onLaunch: function() {
			
			// #ifdef APP-PLUS  
			plus.navigator.closeSplashscreen();
			// #endif
			/* console.log('token', UserInfo.getToken()); */
			/* if (!UserInfo.getToken()) {
				return uni.reLaunch({
					url: '/pages/login/login'
				})
			} */
			/* BusinessUtils.goHome(); */
			/* BusinessUtils.reloadTabBarItems(); */
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "static/css/uni.css";
	@import "static/css/icon.css";
	@import "static/css/color.scss";
	@import "static/css/style.scss";
	@import "static/css/deepStyle.css";
</style>
