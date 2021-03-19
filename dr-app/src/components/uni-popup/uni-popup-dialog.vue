<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-title" v-if="showTitle">
			<text :class="['uni-popup__'+dialogType]" class="uni-dialog-title-text">{{title}}</text>
		</view>
		<view :class=" [!showTitle ?'active':''] " class="uni-dialog-content">
			<text class="uni-dialog-content-text" v-if="mode === 'base'">{{content}}</text>
			<input :focus="focus" :placeholder="placeholder" class="uni-dialog-input" type="text" v-else v-model="val">
		</view>
		<view class="uni-dialog-button-group">
			<view @click="close" class="uni-dialog-button" v-if="isClose">
				<text class="uni-dialog-button-text">{{closeText}}</text>
			</view>
			<view @click="onOk" class="uni-dialog-button uni-border-left">
				<text class="uni-dialog-button-text uni-button-color">{{confirmText}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-对话框样式
	 * @description 弹出层-对话框样式
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} value input 模式下的默认值
	 * @property {String} placeholder input 模式下输入提示
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} mode = [base|input] 模式、
	 * 	@value base 基础对话框
	 * 	@value input 可输入对话框
	 * @property {String} content 对话框内容
	 * @property {Boolean} beforeClose 是否拦截取消事件
	 * @event {Function} confirm 点击确认按钮触发
	 * @event {Function} close 点击取消按钮触发
	 * @property {Boolean} showTitle 是否显示对话框标题(true)
	 */

	export default {
		name: "uniPopupDialog",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			/**
			 * 对话框主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'error'
			},
			/**
			 * 对话框模式 base/input
			 */
			mode: {
				type: String,
				default: 'base'
			},
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '提示'
			},
			/**
			 * 对话框内容
			 */
			content: {
				type: String,
				default: ''
			},
			/**
			 * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			},
			//是否显示关闭按钮(true)
			isClose: {
				type: Boolean,
				default: true
			},
			closeText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			//是否显示对话框标题(true)
			showTitle: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			/**
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('confirm', () => {
					this.popup.close()
					if (this.mode === 'input') this.val = this.value
				}, this.mode === 'input' ? this.val : '')
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
					})
					return
				}
				this.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-dialog {
		width: 300px;
		border-radius: 15px;
		background-color: #fff;
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 18px;
		font-weight: 500;
	}

	.uni-dialog-content-text {
		font-size: 15px;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
		min-height: 100rpx;

		&.active {
			padding-top: 20rpx;
			min-height: 200rpx;

			.uni-dialog-content-text {
				font-size: 18px;
			}
		}

	}



	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 55px;
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 17px;
	}

	.uni-button-color {
		color: $u-type-theme;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
	}

	.uni-popup__success {
		color: $u-type-success;
	}

	.uni-popup__warn {
		color: $u-type-warning;
	}

	.uni-popup__error {
		color: $u-type-error;
	}

	.uni-popup__info {
		color: #909399;
	}
</style>
