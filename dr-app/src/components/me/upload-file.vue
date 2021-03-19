<template>
	<view class="u-upload">
		<!-- <view class='t-toptips' :style="{top: top,background: cubgColor}" :class="[show?'t-top-show':'']">
			<view v-if="loading" class="flex flex-sub">
				<view class="cu-progress flex-sub round striped active sm">
					<view :style="{ background: color,width: value + '%'}"></view>
				</view>
				<text class="margin-left">{{value}}%</text>
			</view>
			<block v-else>{{msg}}</block>
		</view> -->
		<view v-if="existsFile" class="u-list-item u-preview-wrap" :style="{width: $u.addUnit(width),height: $u.addUnit(height)}">
			<view class="u-delete-icon" @tap.stop="deleteItem" :style="{background: delBgColor}" v-show="deletable">
				<u-icon class="u-icon" :name="delIcon" size="20" :color="delColor"></u-icon>
			</view>
			<u-line-progress v-if="progress > 0" :show-percent="false" height="16" class="u-progress" :percent="progress"></u-line-progress>
			<image @tap.stop="download()" class="u-preview-image" src="/static/images/file.png"></image>
		</view>
		<view v-if="!existsFile" style="display: inline-block;" @tap="upload">
			<slot name="addBtn"></slot>
			<view class="u-list-item u-add-wrap" hover-class="u-add-wrap__hover" hover-stay-time="150" :style="{
					width: $u.addUnit(width),
					height: $u.addUnit(height)
				}">
				<u-icon name="plus" class="u-add-btn" size="40"></u-icon>
				<view class="u-add-tips">上传文件</view>
			</view>
		</view>
		<!-- 删除 -->
		<uni-popup ref="delDialog" type="dialog">
			<uni-popup-dialog :before-close="true" @close="delClose" @confirm="delConfirm" content="您确定要删除此项吗？" title="提示" type="error"></uni-popup-dialog>
		</uni-popup>
	</view>

</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopupDialog
		},
		props: {
			// 额外携带的参数
			formData: {
				type: Object,
				default () {
					return {};
				}
			},
			top: {
				type: String,
				default: 'auto'
			},
			bgColor: {
				type: String,
				default: 'rgba(49, 126, 243, 0.5)',
			},
			color: {
				type: String,
				default: '#e54d42',
			},
			// 后端地址
			action: {
				type: String,
				default: $ajax.getUploadUrl()
			},
			// 文件路径
			src: {
				type: String,
				default: '',
			},
			// 内部预览图片区域和选择图片按钮的区域宽度
			width: {
				type: [String, Number],
				default: 200
			},
			// 内部预览图片区域和选择图片按钮的区域高度
			height: {
				type: [String, Number],
				default: 200
			},
			// 右上角关闭按钮的背景颜色
			delBgColor: {
				type: String,
				default: '#e4251b'
			},
			// 右上角关闭按钮的叉号图标的颜色
			delColor: {
				type: String,
				default: '#ffffff'
			},
			// 右上角删除图标名称，只能为uView内置图标
			delIcon: {
				type: String,
				default: 'close'
			},
			deletable: {
				type: Boolean,
				default: true
			},
			// 上传前的钩子，每个文件上传前都会执行
			beforeUpload: {
				type: Function,
				default: null
			},
		},
		data() {
			return {
				cubgColor: '',
				loading: false,
				value: 5,
				show: false,
				msg: '执行完毕~',
				uploadHtml: "/hybrid/html/upload.html",
				fileUrl: '',
				filePath: '',
				progress: ''
			}
		},
		computed: {
			existsFile() {
				console.log('file url changed!', this.fileUrl);
				return !_.isEmpty(this.fileUrl)
			},
		},
		watch: {
			src: {
				immediate: true,
				handler(val) {
					this.fileUrl = val;
				}
			},
		},
		methods: {
			toast(title = '', {
				duration = 2000,
				icon = 'none'
			} = {}) {
				uni.showToast({
					title,
					duration,
					icon
				});
			},
			getRequest(url) {
				let theRequest = new Object();
				let index = url.indexOf("?");
				if (index != -1) {
					let str = url.substring(index + 1);
					let strs = str.split("&");
					for (let i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				return theRequest;
			},

			/*
			上传
			*/
			upload() {
				console.log('choose file');
				// 执行before-upload钩子
				if (this.beforeUpload && typeof(this.beforeUpload) === 'function') {
					// 执行回调，同时传入索引和文件列表当作参数
					let beforeResponse = this.beforeUpload.bind(this.$u.$parent.call(this))();
					if (!beforeResponse) {
						return;
					}
				}
				let currentWebview = this.$mp.page.$getAppWebview(),
					url = this.action,
					header = $ajax.getHeader(this.formData),
					formData = this.formData;

				// #ifdef APP-PLUS
				console.log('header', JSON.stringify(header));
				console.log('formData', JSON.stringify(formData));
				let wv = plus.webview.create("", this.uploadHtml, {
					'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
					top: 0,
					height: '100%',
					background: 'transparent'
				}, {
					url,
					header,
					formData,
				});
				wv.loadURL(this.uploadHtml)
				currentWebview.append(wv);
				wv.overrideUrlLoading({
					mode: 'reject'
				}, (e) => {
					let {
						fileName,
						res
					} = this.getRequest(e.url);
					/* fileName = unescape(fileName);*/
					res = JSON.parse(res);
					this.fileUrl = res.info;
					return this.onCommit(
						this.$emit('on-success', res)
					);
				});
				// #endif
			},
			/*
			打开文件
			*/
			open(filePath) {
				let system = uni.getSystemInfoSync().platform;
				if (system == 'ios') {
					filePath = encodeURI(filePath);
				}
				console.log('open', filePath);
				uni.openDocument({
					filePath,
					success: (res) => {
						console.log('打开文档成功');
					}
				});
			},
			/*
			下载
			 type: temporary=返回临时地址，local=长期保存到本地
			 */
			download() {
				if (!_.isEmpty(this.filePath)) {
					uni.openDocument({
						filePath: this.filePath,
						showMenu: true,
						success: function(res) {
							console.log('打开文档成功');
						}
					});
					return;
				}

				let downloadTask = uni.downloadFile({
					url: this.fileUrl,
					success: ({
						statusCode,
						tempFilePath
					}) => {
						if (statusCode === 200) {
							this.filePath = tempFilePath;
							uni.openDocument({
								filePath: this.filePath,
								showMenu: true,
								success: function(res) {
									console.log('打开文档成功');
								}
							});
							/* uni.saveFile({
								tempFilePath,
								success: ({
									savedFilePath
								}) => this.onCommit(savedFilePath),
								fail: () => this.errorHandler('下载失败')
							}); }*/
						}
					},
					fail: () => this.errorHandler('下载失败')
				});

				downloadTask.onProgressUpdate(res => {
					if (res.progress > 0) {

						let progress = res.progress;

						if (this.progress === progress) {
							return;
						}

						this.progress = progress;
						console.log(this.$u.timeFormat(new Date(), 'hh时MM分ss秒'), '进度', progress);
					}

				});

			},

			deleteItem() {
				this.$refs.delDialog.open()
				// uni.showModal({
				// 	title: '提示',
				// 	content: '您确定要删除此项吗？',
				// 	success: async (res) => {
				// 		if (res.confirm) {
				// 			this.fileUrl = '';
				// 		}
				// 	},
				// });
			},
			//删除-确定
			async delConfirm(done) {
				done()
				this.fileUrl = '';
			},
			//删除-取消
			async delClose(done) {
				done()
			},
			onCommit(resolve) {
				this.msg = '执行完毕~';
				this.loading = false;
				this.cubgColor = 'rgba(57, 181, 74, 0.5)';
				setTimeout(() => {
					this.show = false;
				}, 1500);
				return resolve;
			},

			upErr(errText) {
				this.$emit('up-error', errText);
			},

			errorHandler(errText, reject) {
				this.msg = errText;
				this.loading = false;
				this.cubgColor = 'rgba(229, 77, 66, 0.5)';
				setTimeout(() => {
					this.show = false;
				}, 1500);
				return;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* .t-toptips {
		width: 100%;
		padding: 18upx 30upx;
		box-sizing: border-box;
		position: fixed;
		z-index: 90;
		color: #fff;
		font-size: 30upx;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		word-break: break-all;
		opacity: 0;
		transform: translateZ(0) translateY(-100%);
		transition: all 0.3s ease-in-out;
	}

	.t-top-show {
		transform: translateZ(0) translateY(0);
		opacity: 1;
	} */

	@import '@/uview-ui/libs/css/style.components.scss';

	.u-upload {
		@include vue-flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.u-list-item {
		width: 200rpx;
		height: 200rpx;
		overflow: hidden;
		margin: 10rpx;
		background: rgb(244, 245, 246);
		position: relative;
		border-radius: 10rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	.u-preview-wrap {
		border: 1px solid rgb(235, 236, 238);
	}

	.u-add-wrap {
		flex-direction: column;
		color: $u-content-color;
		font-size: 26rpx;
	}

	.u-add-tips {
		margin-top: 20rpx;
		line-height: 40rpx;
	}

	.u-add-wrap__hover {
		background-color: rgb(235, 236, 238);
	}

	.u-preview-image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.u-delete-icon {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 10;
		background-color: $u-type-error;
		border-radius: 100rpx;
		width: 44rpx;
		height: 44rpx;
		@include vue-flex;
		align-items: center;
		justify-content: center;
	}

	.u-icon {
		@include vue-flex;
		align-items: center;
		justify-content: center;
	}

	.u-progress {
		position: absolute;
		bottom: 10rpx;
		left: 8rpx;
		right: 8rpx;
		z-index: 9;
		width: auto;
	}

	.u-error-btn {
		color: #ffffff;
		background-color: $u-type-error;
		font-size: 20rpx;
		padding: 4px 0;
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9;
		line-height: 1;
	}
</style>
