<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in recordConfigs" :key="index" @tap="openInfo" :data-announce-id="item.id">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ item.name }}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis text-right">创建时间：{{ dateFormat(item.createAt, 'yyyy-mm-dd HH:MM:ss') }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import * as _ from 'lodash';
import dateFormat from 'dateformat';

export default {
	data() {
		return {
			recordConfigs: [],
			dateFormat: dateFormat
		};
	},
	onLoad() {
		uni.showLoading({
			title: '加载中....'
		});
		uni.request({
			// url: 'https://www.cjq02.com/recordConfig/list',
			url: 'http://localhost:3000/record/config',
			method: 'GET',
			data: {},
			success: resp => {
				this.recordConfigs = resp.data;
				uni.hideLoading();
			},
			fail: () => {},
			complete: () => {
				console.log(dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'));
			}
		});
	},
	methods: {
		openInfo(e) {
			var announceId = e.currentTarget.dataset.announceId;
			uni.navigateTo({
				url: '../info/info?announceId=' + announceId
			});
		}
	}
};
</script>

<style>
.uni-media-list-body {
	height: auto;
}
.uni-media-list-text-top {
	line-height: 1.6em;
}
.text-right {
	float: right;
}
</style>
