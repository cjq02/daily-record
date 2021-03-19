var CryptoJS = require("crypto-js");
let baseUrl = '';
let uploadUrl = '';
let shareUrl = '';

if (process.env.NODE_ENV === 'development') {
	console.log('开发环境');
	baseUrl = 'http://test.bsapp.jiujiezixun.com';
	uploadUrl = 'http://120.79.137.53:8096';
	shareUrl = 'http://120.79.137.53:8098';
} else {
	baseUrl = 'http://test.bsapp.jiujiezixun.com';
	uploadUrl = 'http://120.79.137.53:8096';
	shareUrl = 'http://120.79.137.53:8098';
	console.log('生产环境')
}

const request = {
	/* baseUrl: 'http://192.168.124.13:8096', */
	/* baseUrl: 'http://120.79.137.53:8096', */
	/* baseUrl: 'http://192.168.124.18:8096', */
	/* baseUrl: 'http://124.232.157.137:8096', */
	/* baseUrl: 'http://test.bsapp.jiujiezixun.com', */
	/* baseUrl: 'http://192.168.124.19:8096', */
	baseUrl,
	uploadUrl,
	shareUrl,

	req(options) {
		return new Promise(async (resolve, reject) => {
			let isShowFail = true
			if (options.isShowFail === false) {
				isShowFail = options.isShowFail;
			}
			let baseUrl = options.baseUrl || this.baseUrl;

			if (options.url.indexOf("http://") == 0 || options.url.indexOf("https://") == 0) {
				baseUrl = "";
			}
			let url = baseUrl + options.url;
			options.url = url;

			//允许请求操作
			let contentType = options.contentType || "application/x-www-form-urlencoded";
			let data = options.data;

			if (typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !
				Array
				.isArray(
					data)) {
				for (let p in data) { //遍历json对象的每个key/value对,p为key
					if (data[p] == null) {
						delete data[p]
					}
				}

			}

			await this.setUUID();
			// #ifdef APP-PLUS
			await this.getVersionCode()
			// #endif

			let header = this.getHeader(data);

			if (options.header) {
				Object.assign(header, options.header);
			}
			uni.request({
				method: options.method || "POST",
				header: header,
				url: url,
				data: data || "",
				dataType: options.dataType || "json", //默认json,如果设为 json，会尝试对返回的数据做一次 JSON.parse
				success: (res) => {
					/* console.log(res); */
					// todo 确认返回状态值
					if (res.statusCode === 401 || res.data.code === Constants.errorCode.SIGN_ERROR) {
						let pages = getCurrentPages();
						if (pages.length > 0) {
							let currentPage = pages[pages.length - 1];
							if (currentPage.route !== 'pages/login/login') {
								UserInfo.clear();
								uni.hideLoading();
								uni.showModal({
									title: '登录失效',
									content: '登录已失效，请重新登录',
									showCancel: false,
									success(res) {
										if (res.confirm) {
											uni.reLaunch({
												url: "/pages/login/login"
											})
										}
									}
								})
							}
						}

						if (typeof(options.error) == "function") {
							console.log("error:" + typeof(options.error))
							options.error(res.data)
						}

						return;
					}

					if (res.data.success) {
						if (typeof(options.success) == "function") {
							options.success(res.data)
						}
					}
					resolve(res.data);
				},
				fail: (res) => {
					console.log(options);
					if (options.fail) {
						options.fail(res.data)
					} else {
						console.log("fail")
					}
				},
				complete: (res) => { //无论请求成功失败，都执行
					/* console.log('res', res) */
					if (res.errMsg && res.errMsg.indexOf("request:fail") !== -1) {
						uni.showToast({
							icon: 'none',
							title: '网络连接异常！',
							duration: 5000
						});
					} else {
						if (res.data) {
							if (res.statusCode === 401) {
								return;
							}
							if (!res.data.success) {
								if (res.data.code == 3001 || res.data.code == 3002) {
									return;
								} else {
									if (isShowFail) {
										uni.showToast({
											icon: 'none',
											title: res.data.message,
											duration: 5000
										});
									}

								}
							}
						}
					}
					if (options.complete) {
						options.complete(res.data)
					}
				}
			})
		});
	},
	download(filePath) {
		uni.downloadFile({
			url: this.baseUrl + filePath,
			success: (res) => {
				uni.hideLoading();
				if (res.statusCode === 200) {
					uni.openDocument({
						filePath: res.tempFilePath,
						showMenu: true,
						success(res) {
							console.log('打开文档成功');
						}
					});
				} else {
					uni.showToast({
						title: '导出失败',
						duration: 2000
					});
				}
			}
		});
	},

	exportFile(url, data) {
		let _this = this;

		uni.showLoading({
			title: '加载中'
		});

		_this.req({
			url: url,
			method: 'GET',
			data: data,
			success: res => {
				_this.download(res.info);
			}
		});
	},

	async setUUID() {
		return new Promise((resolve) => {
			if (!_.isEmpty(uni.getStorageSync('uuid'))) {
				resolve();
			}

			// #ifdef APP-PLUS
			plus.device.getInfo({
				success(e) {
					uni.setStorageSync('uuid', e.uuid);
					resolve();
				},
				fail(e) {
					console.log('init device info failed: ' + JSON.stringify(e));
				}
			});
			// #endif

			// #ifdef H5
			uni.setStorageSync('uuid', 'dev');
			resolve();
			// #endif
		});
	},
	async getVersionCode() {
		return new Promise((resolve) => {
			if (!_.isEmpty(uni.getStorageSync('versionCode'))) {
				resolve();
			}
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				uni.setStorageSync('versionCode', widgetInfo.versionCode);
			})
			// #endif
		});
	},

	getHeader(data) {
		let _code = "101";
		// #ifdef APP-PLUS
		_code = uni.getStorageSync('versionCode');
		// #endif
		let header = {
				'global_device': '1',
				'global_deviceuuid': uni.getStorageSync('uuid'),
				'global_version': _code,
				'time': new Date().getTime().toString()
			},
			formatData = (jsonOrigin) => {
				if (_.isUndefined(jsonOrigin)) {
					return {};
				}
				let jsonSorted = {};
				Object.keys(jsonOrigin).sort().forEach(key => jsonSorted[key] = jsonOrigin[key]);
				return _.mapValues(jsonSorted, value => {
					if (_.isNull(value)) {
						value = '';
					}
					if (_.isArray(value)) {
						return _.map(value, item => {
							if (_.isObject(item)) {
								return formatData(item);
							}
							return item.toString();
						})
					}
					if (_.isObject(value)) {
						return formatData(value);
					}
					return value.toString();
				});
			},
			signDataJson = formatData(data),
			signObjOrigin = Object.assign({}, header, signDataJson),
			signObjSorted = {};
		Object.keys(signObjOrigin).sort().forEach(key => signObjSorted[key] = signObjOrigin[key]);
		let signStr = JSON.stringify(signObjSorted),
			signMd5 = CryptoJS.MD5(signStr).toString().toUpperCase(),
			signKey = "03D51FE674C4EBBCCE08CC82B6D2FF65",
			sign = CryptoJS.HmacSHA1(signMd5, signKey).toString().toUpperCase();
		/* console.log('生成签名前的对象', signStr);
		console.log('md5', signMd5);
		console.log('sign', sign); */
		//签名
		header['sign'] = sign;
		// 请求携带token
		let token = UserInfo.getToken()
		if (token) {
			header['Authorization'] = token;
		}
		/* console.log('header', JSON.stringify(header));
		console.log('data', JSON.stringify(data)); */

		return header;
	},
}
export default request
