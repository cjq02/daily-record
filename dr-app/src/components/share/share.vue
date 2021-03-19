<template v-if="isShow">
	<view>
		<!-- <button type="primary" @tap="shareInfo">分享</button> -->
	</view>
</template>

<script>
	import share from "@/static/js/share/share.js";
	export default {
		props: {
			shareData: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		watch: {
			shareData: {
				handler: function(newVal, oldVal) {
					this.shareInfo(newVal)
				},
				immediate: true,
				deep: true
			}
		},
		data() {
			return {
				queryParams: {},
				shareObj: {},
				isShow: true
			}
		},
		onLoad() {

		},
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj.shareMenu.isVisible()) {
				this.shareObj.shareMenu.hide();
				this.shareObj.alphaBg.hide();
				this.shareObj.alphaButton.hide();
				return true
			}
		},
		methods: {
			shareHide() {
				if (this.shareObj.shareMenu.isVisible()) {
					this.shareObj.shareMenu.hide();
					this.shareObj.alphaBg.hide();
					this.shareObj.alphaButton.hide();
				}
			},
			shareInfo(shareData) {
				console.log(shareData)
				let shareList = [{
						icon: "/static/images/sharemenu/wx.png",
						text: "微信好友",
					},
					{
						icon: "/static/images/sharemenu/pyq.png",
						text: "朋友圈"
					},
					{
						icon: "/static/images/sharemenu/weibo.png",
						text: "微博"
					},
					{
						icon: "/static/images/sharemenu/qq.png",
						text: "QQ"
					},
					{
						icon: "/static/images/sharemenu/copy.png",
						text: "复制"
					},
					// {
					// 	icon: "/static/images/sharemenu/more.png",
					// 	text: "更多"
					// },
				];
				let _this = this;
				this.shareObj = share(shareData, shareList, function(index) {
					console.log("点击按钮的序号: " + index);
					let shareObj = {
						href: shareData.href || "",
						title: shareData.title || "",
						summary: shareData.desc || "",
						success: (res) => {
							console.log("success:" + JSON.stringify(res));
							_this.shareHide()
						},
						fail: (err) => {
							uni.showToast({
								title: '分享失败！',
								icon: 'none'
							});
							console.log("fail:" + JSON.stringify(err));
							_this.shareHide()
						}
					};
					switch (index) {
						case 0:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSceneSession";
							shareObj.type = 0;
							shareObj.imageUrl = shareData.imgUrl || "";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSenceTimeline";
							shareObj.type = 0;
							shareObj.imageUrl = shareData.imgUrl || "";
							uni.share(shareObj);
							break;
						case 2:
							shareObj.provider = "sinaweibo";
							shareObj.type = 0;
							shareObj.imageUrl = shareData.imgUrl || "";
							uni.share(shareObj);
							break;
						case 3:
							shareObj.provider = "qq";
							shareObj.type = 1;
							shareObj.imageUrl = shareData.imgUrl || "";
							uni.share(shareObj);
							break;
						case 4:
							uni.setClipboardData({
								data: shareData.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 5:
							plus.share.sendWithSystem({
								type: "web",
								title: shareData.title || "",
								thumbs: [shareData.imgUrl || ""],
								href: shareData.href || "",
								content: shareData.desc || "",
							})
							break;
					};
				});
				this.$nextTick(() => {
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
					this.shareObj.alphaButton.show();
				})


			}
		},
		mounted() {}
	}
</script>

<style>

</style>
