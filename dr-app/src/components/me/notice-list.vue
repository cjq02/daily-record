<template>
	<view>
		<view class="notice-list" v-if="announceList.length > 0">
			<view class="notice-item" v-for="(item,index) in announceList" :key="index">
				<view class="u-line-1 notice-title" @click="viewAnnounceDetail(item)">{{ item.title }}</view>
				<view class="notice-time u-line-1">
					<view class="date-time">{{ getFormattedDateTime(item.publishTs) }}</view>
					<view class="dot-con">
						<u-icon class="dot" name="dot" custom-prefix="custom-icon" size="10px" color="red" v-show="item.viewFlag==='0'"></u-icon>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
		</view>
		<u-empty v-else text="数据为空" src="/static/images/empty/no-data.png" icon-size="500"></u-empty>
	</view>
</template>

<script>
	import BusinessUtils from '@/utils/business.utils.js';
	export default {
		props: {
			type: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				current: 0,
				currentPage: '',
				announceList: [],
				loadStatus: Constants.loadStatus.LOAD_MORE,
			}
		},

		async mounted(options) {
			this.onLoading(async () => {
				await this.query();
			});
		},

		watch: {
			type: {
				handler(newVal, oldVal) {
					this.query()
				},
				deep: true
			}
		},

		methods: {
			getFormattedDateTime: BusinessUtils.getFormattedDateTime,

			async query() {
				this.currentPage = 1;
				this.announceList = await this.getList();
				await this.reachBottom();
			},
			async getList() {
				let resp = await this.$ajax.get({
					url: '/announceList.json',
					data: Object.assign({
						page: this.currentPage,
						type: this.type
					})
				});
				this.currentPage++;
				this.loadStatus = resp.hasNext ? Constants.loadStatus.LOAD_MORE : Constants.loadStatus.NO_MORE;
				return resp.list;
			},

			setList(list) {
				this.announceList.push(...list);
			},
			viewAnnounceDetail(item) {
				item.viewFlag = 1;
				uni.navigateTo({
					url: '/pages/common/noticeContent?id=' + item.id
				});
			},
			async reachBottom() {
				if (this.loadStatus === Constants.loadStatus.NO_MORE) {
					return;
				}
				this.loadStatus = Constants.loadStatus.LOADING;
				this.setList(await this.getList());
			}
		}
	}
</script>

<style scoped lang="scss">
	.notice-list {
		margin-top: 20rpx;

		.notice-item {
			display: flex;
			/* flex-direction: column; */
			justify-content: space-between;
			padding: 20rpx 30rpx;

			.notice-title {
				font-size: 32rpx;
				text-overflow: ellipsis;
				width: 550rpx;
			}

			.notice-time {
				display: flex;
				justify-content: flex-end;
				font-size: 20rpx;
				color: #808080;
				/* margin: 0 10rpx 0 15rpx; */

				.date-time {
					margin-right: 10rpx;
				}

				.dot-con {
					width: 20rpx;
				}
			}
		}
	}

	.message {
		margin: 20rpx;
	}

	.time {}

	.message-dot {}
</style>
