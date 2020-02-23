<template>
	<view class="content">
		<view class="title">{{ title }}...</view>
		<view class="art-content"><rich-text class="richText" :nodes="strings"></rich-text></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			strings: ''
		};
	},
	onLoad: function(e) {
		console.log(e);
		uni.request({
			url: `http://localhost:8083/wx/announce/getAnnounceById.json?openId=1&announceId=${e.announceId}`,
			method: 'GET',
			data: {},
			success: resp => {
				console.log(resp);
				this.title = resp.data.info.title;
				this.strings = resp.data.info.content;
			},
			fail: () => {},
			complete: () => {}
		});
	}
};
</script>

<style>
.content {
	padding: 10upx 2%;
	width: 96%;
	flex-wrap: wrap;
}
.title {
	line-height: 2em;
	font-weight: 700;
	font-size: 38upx;
}
.art-content {
	line-height: 2em;
}
</style>
