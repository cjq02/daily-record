<template>
	<view class="app-modal" ref="appModal" v-show="isShowOut">
		<view class="app-modal__container">
			<view class="app-modal__container__header" v-if="title">
				<text class="app-modal__container__header__text">{{title}}</text>
			</view>
			<view class="app-modal__container__content">
				<text :style="{textAlign: align,fontSize:contentSize}" class="app-modal__container__content__text">{{content}}</text>
			</view>
			<view class="app-modal__container__footer">
				<view :hover-start-time="20" :hover-stay-time="70" @click="clickLeft" class="app-modal__container__footer-left"
				 hover-class="app-modal__container__footer-hover" style="width: 315rpx" v-if="showCancel">
					<text :style="{color:cancelColor}" class="app-modal__container__footer-left__text">{{cancelText}}</text>
				</view>
				<view :hover-start-time="20" :hover-stay-time="70" :style="{width: showCancel?'315rpx':'630rpx'}"
				 @click="clickRight" class="app-modal__container__footer-right" hover-class="app-modal__container__footer-hover">
					<text :style="{color:confirmColor}" class="app-modal__container__footer-right__text">{{confirmText}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// const animation = weex.requireModule('animation');
	export default {
		props: {
			queryParams: {
				type: Object,
				default: () => {
					return {

					}
				}
			},
		},
		watch: {
			queryParams: {
				handler(newVal, oldVal) {
					this.$u.debounce(() => {
					}, 500);
				},
				deep: true
			},
		},
		data() {
			return {
				isShowOut: false,
				title: "提示",
				content: "",
				contentSize: '34rpx',
				align: "center", // 对齐方式 left/center/right
				cancelText: "取消", // 取消按钮的文字
				cancelColor: "#8F8F8F", // 取消按钮颜色
				confirmText: "确定", // 确认按钮颜色
				confirmColor: "#e4251b", // 确认按钮颜色
				showCancel: true, // 是否显示取消按钮，默认为 true

			};
		},

		onBackPress() {},
		onReady() {},
		onLoad() {},
		mounted() {
			if (this.queryParams.showCancel) {
				this.queryParams.showCancel = JSON.parse(this.queryParams.showCancel)
			}
			Object.assign(this.$data, this.queryParams)
			this.isShowOut = true;
		},
		methods: {
			clickLeft() {
				// 先关闭后发送事件
				this.closeModal();
				uni.$emit('AppModalCancel')
			},
			clickRight() {
				// 先关闭后发送事件
				this.closeModal();
				uni.$emit('AppModalConfirm')
			},
			closeModal() {
				// uni.navigateBack();
				this.isShowOut = false
			}
		}
	}
</script>

<style lang="scss">
	.app-modal {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		opacity: 1;
		z-index: 9999;

		&__container {
			width: 600rpx;
			border-radius: 24rpx;
			background-color: #fff;
			overflow: hidden;

			&__header {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				justify-content: center;
				align-items: center;
				height: 90rpx;

				&__text {
					font-size: 38rpx;
					color: #262626;
				}
			}

			&__content {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				justify-content: center;
				align-items: center;

				padding: 0 30rpx 30rpx 30rpx;
				min-height: 120rpx;

				&__text {
					font-size: 30rpx;
					color: #666;
					line-height: 50rpx;
				}
			}

			&__footer {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				justify-content: center;
				align-items: center;
				flex-direction: row;
				height: 88rpx;

				&-left {
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					justify-content: center;
					align-items: center;
					padding: 14rpx 22rpx;
					border-top: 1px solid #e5e5e5;

					&__text {
						font-size: 34rpx;
					}
				}

				&-left+&-right {
					border-left: 1px solid #e5e5e5
				}

				&-right {
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					justify-content: center;
					align-items: center;
					padding: 14rpx 22rpx;
					border-top: 1px solid #e5e5e5;

					&__text {
						font-size: 34rpx;
					}
				}

				&-hover {
					background-color: #f1f1f1;
				}

			}
		}

	}
</style>
