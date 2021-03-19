<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v" style="margin-top:200rpx;">
				<navigator url="/pages/loan/credit/index" hover-class="navigator-hover">
					<button type="default">额度</button>
				</navigator>
				<navigator url="/pages/loan/repay/index" hover-class="navigator-hover">
					<button type="default">还款</button>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'navigator'
			}
		},

		methods: {
			async logout() {
				let resp = await $ajax.get({
					url: '/logout.json'
				});

				uni.showToast({
					title: resp.message
				});
				UserInfo.clear();
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}, 1000);


				/* uni.setTabBarItem({
					"index": 0,
					"pagePath": '/pages/index/index',
				})
				console.log('登出后首页还原为index');

				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 1000); */
			},

			redirectReaderHome() {
				uni.setTabBarItem({
					index: 0,
					"pagePath": "/pages/reader/home",
					"text": "读者",
					"iconPath": "static/images/tabbar/book.png",
					"selectedIconPath": "static/images/tabbar/book-fill.png"
				});
				uni.switchTab({
					url: '/pages/reader/home'
				})
			}
		}
	}
</script>
