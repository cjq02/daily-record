var numeral = require('numeral');

const BusinessUtils = {

	/**
	 * 重新加载tabBar
	 * */
	reloadTabBarItems() {
		let roleType = UserInfo.getRoleType();
		let tabBarList = getApp().globalData.tabBar[roleType];
		/* console.log('tabBarList', tabBarList); */
		tabBarList.map(item => {
			uni.setTabBarItem(item);
		});
	},

	/**
	 * 回到首页
	 * */
	goHome() {
		if (UserInfo.getRoleType() === Constants.roleType.STORE) {
			uni.reLaunch({
				url: '/pages/store/home'
			})
		} else {
			uni.switchTab({
				url: '/pages/reader/home'
			})
		}
	},

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
	},

	/******************************************
	 ************** 活动 ***********************
	 ******************************************/

	getFormattedDateTime(time) {
		let date = this.$u.timeFormat(time, 'yyyy-mm-dd');
		let now = this.$u.timeFormat(new Date(), 'yyyy-mm-dd');

		if (date === now) {
			return this.$u.timeFormat(time, 'hh:MM');
		}

		return this.$u.timeFormat(time, 'mm-dd');
	},

	getDistance(meter) {
		if (_.isNull(meter)) {
			return '';
		}

		if (meter < 100) {
			return '< 100m';
		}

		if (meter < 950) {
			return `< ${numeral(meter/100).format('0')}00m`;
		}

		return `< ${numeral(meter/1000).format('0[.]0')}km`;
	},

	getHotDegree(num) {
		return Math.ceil(num / 20);
	},

	/**
	 * 活动时间范围
	 * */
	getActivityTimeRange(model) {
		let startTime = '',
			endDate = '',
			endTime = '';

		if (!_.isNumber(model.activityTs) || !_.isNumber(model.activityEndTs)) {
			return '';
		}
		startTime = this.$u.timeFormat(model.activityTs, 'yyyy-mm-dd hh:MM');
		endDate = this.$u.timeFormat(model.activityEndTs, 'yyyy-mm-dd');
		endTime = this.$u.timeFormat(model.activityEndTs, 'yyyy-mm-dd hh:MM');
		if (startTime.includes(endDate)) {
			endTime = endTime.replace(endDate, "");
		}
		return `${startTime} ~ ${endTime}`;
	},

	/**
	 * 活动形式/活动主题
	 * */
	getActivityTypeAndGuide(item) {
		if (_.isEmpty(item.activityTypeName) || _.isEmpty(item.guideName)) {
			return '';
		}
		return `${item.activityTypeName}/${item.guideName}`;
	},

	getActivityImg(item) {
		if (!_.isEmpty(item.imgPath)) {
			return $ajax.getThumbnailUrl(item.imgPath)
		}
		if (!_.isEmpty(item.bsImgPath)) {
			return $ajax.getThumbnailUrl(item.bsImgPath)
		}

		return '/static/images/default-activity.jpg'
	},

	getStoreImg(path) {
		if (!_.isEmpty(path)) {
			return $ajax.getThumbnailUrl(path)
		}

		return '/static/images/default-book-store.jpg'
	},

	previewImage(path) {
		let url = ''
		if (path.includes('http')) {
			url = path
		} else {
			url = $ajax.getFileUrl(path);
		}
		let urls = [];
		urls.push(url)
		console.log('url', urls)
		uni.previewImage({
			urls: urls,
			current: 0
		})
	},

	/**
	 * 详情页面出版时间
	 */
	getPublishTs(model) {
		if (model.publishTs === null) {
			return ''
		}
		let list = model.publishTs.split('-');
		return list[0] + '年' + list[1] + '月';
	},

	/**
	 * 注册时间
	 */
	getRegisterTs(model) {
		if (model.registerTs === "") {
			return ''
		}
		let registerTime = this.$u.timeFormat(model.registerTs, 'yyyy-mm-dd');
		return `${registerTime}`
	},

	getActivityButton(model) {
		let edit = () => {
			uni.navigateTo({
				url: '/pages/store/activity/activityApply?id=' + model.id
			})
		};

		let upload = () => {
			uni.navigateTo({
				url: '/pages/store/activity/activityUpload?applyId=' + model.id
			})
		}

		let buttons = [{
				"code": "0",
				"cls": "u-type-info-disabled-bg",
				"type": "info",
				"text": "上传",
				"method": () => {},
				"disabled": true
			},
			{
				"code": "1",
				"cls": "u-type-error-bg",
				"type": "error",
				"text": "上传",
				"method": upload
			},
			{
				"code": "2",
				"cls": "u-type-success-disabled-bg",
				"type": "success",
				"text": "已上传",
				"method": upload
			},
			{
				"code": "3",
				"cls": "u-type-warning-bg",
				"type": "warning",
				"text": "编辑",
				"method": edit
			},
		];
		let editable = model.status === Constants.activityStatus.UNSUBMIT.code ||
			model.status === Constants.activityStatus.REJECT.code;
		let button;
		/* console.log('model', model);
		console.log('model status', model.status);
		console.log('editable', editable);
		console.log('isReport', model.isReport); */
		if (model.isReport === Constants.isReport.INVISIBLE && editable) {
			button = _.last(buttons)
		} else {
			button = _.find(buttons, {
				code: model.isReport
			});
		}

		/* console.log('button', button); */

		return button;
	},

	getbookListButton(model) {
		let buttons = [{
				"code": "0",
				"cls": "u-type-info-disabled-bg",
				"type": "info",
				"text": "推书",
				"disabled": true
			},
			{
				"code": "1",
				"cls": "u-type-error-bg",
				"type": "error",
				"text": "推书",
			},
			{
				"code": "2",
				"cls": "u-type-warning-bg",
				"type": "warning",
				"text": "编辑",
			},
		];
		let editable = model.status === '0';
		let button;
		if (editable) {
			button = _.last(buttons)
		} else {
			if (model.recommendFlag === '1') {
				button = _.find(buttons, {
					code: '0'
				});
			} else {
				button = _.find(buttons, {
					code: '1'
				});
			}

		}

		return button;
	},

	/******************************************
	 ************** 书店-我的 ***********************
	 ******************************************/
	/**
	 * 书店-我的-热度时间
	 */
	getRefreshTs(model) {
		if (model === "") {
			return ''
		}
		let Ts = this.$u.timeFormat(model, 'yyyy-mm-dd hh:MM:ss');
		return `${Ts}`
	},
	getAvatarBsImg(item) {
		if (!_.isEmpty(item.imgPath)) {
			return $ajax.getFileUrl(item.imgPath)
		}
		if (!_.isEmpty(item.bsImgPath)) {
			return $ajax.getFileUrl(item.bsImgPath)
		}
		return '/static/images/default-avatar.jpg'
	},
	getAvatarBookImg(item) {
		if (!_.isEmpty(item.imgPath)) {
			return $ajax.getFileUrl(item.imgPath)
		}
		if (!_.isEmpty(item.bsImgPath1)) {
			return $ajax.getFileUrl(item.bsImgPath1)
		}
		return '/static/images/default-avatar.jpg'
	},
	//书籍图片
	getBookImg(item) {
		if (!_.isEmpty(item.imgPath)) {
			return $ajax.getFileUrl(item.imgPath)
		}
		if (!_.isEmpty(item.bsImgPath1)) {
			return $ajax.getFileUrl(item.bsImgPath1)
		}
		return '/static/images/default-book-store.jpg'
	},
	//书店图片
	getBsImg(item) {
		if (!_.isEmpty(item.bsImgPath)) {
			return $ajax.getFileUrl(item.bsImgPath)
		}
		if (!_.isEmpty(item.bsImgPath1)) {
			return $ajax.getFileUrl(item.bsImgPath1)
		}
		return '/static/images/default-book-store.jpg'
	},
	//活动
	getActivityPic(item) {
		if (!_.isEmpty(item.imgPath)) {
			return $ajax.getFileUrl(item.imgPath)
		}
		if (!_.isEmpty(item.bsImgPath)) {
			return $ajax.getFileUrl(item.bsImgPath)
		}
		return '/static/images/default-activity.jpg'
	},
	getActivityDetailPic(item) {
		if (!_.isEmpty(item.imgPath)) {
			return $ajax.getFileUrl(item.imgPath)
		}
		if (!_.isEmpty(item.bsImgPath)) {
			return $ajax.getFileUrl(item.bsImgPath)
		}
		return '/static/images/default-activity-detail.jpg'
	},
	/******************************************
	 ************** 分享 ***********************
	 ******************************************/
	getShareBookUrl(isbn) {
		return $ajax.getShareUrl('/pages/bookDetail?isbn=' + isbn);
	},

	getShareStoreUrl(id) {
		return $ajax.getShareUrl('/pages/storeDetail?id=' + id);
	}
};

export default BusinessUtils;
