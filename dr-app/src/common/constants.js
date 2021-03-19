import Global from '@/common/global.js'

const Constants = {

	/**
	 * 是
	 * */
	YES: '1',
	/**
	 * 否
	 * */
	NO: '0',

	/**
	 * 角色类型
	 * */
	roleType: {
		/**
		 * 书店
		 * */
		STORE: '2',
		/**
		 * 读者
		 * */
		READER: '7'
	},
	
	/**
	 * 发票抬头
	 * */
	invoiceTitleType: {
		/**
		 * 个人或者事业单位
		 * */
		individualOrInstitution: '1',
		/**
		 * 企业
		 * */
		company: '2'
	},
	
	/**
	 * 发票类型
	 */
	invoiceType: {
		/**
		 * 增值税普通发票
		 * */
		commonInvoice: '1',
		/**
		 * 增值税专用发票
		 * */
		specialInvoice: '2'
	},

	/**
	 * 系统错误编码
	 * */
	errorCode: {
		/**
		 * 书店未初始化信息，请先初始化
		 * */
		SIGN_ERROR: "1000",
		/**
		 * 书店未初始化信息，请先初始化
		 * */
		BS_INIT_ERROR: "3001",
		/**
		 * 书店图片未初始化信息，请先初始化
		 * */
		BS_INIT_ERROR_IMG: "3002",
	},

	/**
	 * 活动状态
	 * */
	activityStatus: {
		UNSUBMIT: {
			code: '0',
			name: '未提交',
			color: 'error'
		},
		PENDING: {
			code: '1',
			name: '审核中',
			color: 'primary'
		},
		PASSED: {
			code: '2',
			name: '已通过',
			color: 'primary'
		},
		REJECT: {
			code: '3',
			name: '不通过',
			color: 'error'
		},
		ENDED: {
			code: '4',
			name: '已结束',
			color: 'primary'
		}
	},

	/**
	 * 列表加载状态
	 * */
	loadStatus: {
		/**
		 * 加载更多
		 * */
		LOAD_MORE: 'loadmore',
		/**
		 * 加载中
		 * */
		LOADING: 'loading',
		/**
		 * 没有更多
		 * */
		NO_MORE: 'nomore'
	},

	/**
	 * 活动上传按钮状态
	 * */
	isReport: {
		/**
		 * 不显示
		 * */
		INVISIBLE: '0',
		/**
		 * 上传
		 * */
		UPLOADING: '1',
		/**
		 * 已上传
		 * */
		UPLOADED: '2'
	},

	/**
	 * 活动形式
	 * */
	activityType: {
		/* 嘉宾论坛 */
		_1: '1',
		/* 才艺表演 */
		_2: '2',
		/* 主题展览 */
		_3: '3',
		/* 感想座谈 */
		_4: '4',
		/* 技能体验 */
		_5: '5',
		/* 项目比赛 */
		_6: '6',
		/* 专家讲座 */
		_7: '7',
	},

	/**
	 * 活动方式
	 * */
	isWebcast: {
		/**
		 * 现场活动 - 线下
		 * */
		OFFLINE: '1',
		/**
		 * 网络直播 - 线上
		 * */
		ONLINE: '2',
	},
	
	/**
	 * "类型：1、公示，2、公告，3、系统通知，4、订单通知，5、拼书通知"
	 * */
	announceType: {
		/**
		 * 公示
		 * */
		_1: '1',
		/**
		 * 公告
		 * */
		_2: '2',
		/**
		 * 系统通知
		 * */
		_3: '3',
		/**
		 * 订单通知
		 * */
		_4: '4',
		/**
		 * 拼书通知
		 * */
		_5: '5',
	},

	/**
	 * 文件上传类型
	 * */
	fileBizType: {
		/**
		 * 活动海报
		 * */
		_72: '72',
		/**
		 * 活动开场一分钟视频
		 * */
		_47: '47',
		/**
		 * 活动过程三分钟视频
		 * */
		_48: '48',
		/**
		 * 活动结束一分钟视频
		 * */
		_49: '49',
		/**
		 * 展览类活动资料
		 * */
		_50: '50',
		/**
		 * 活动开场图片1
		 * */
		_63: '63',
		/**
		 * 活动开场图片2
		 * */
		_64: '64',
		/**
		 * 活动过程图片1
		 * */
		_65: '65',
		/**
		 * 活动过程图片2
		 * */
		_66: '66',
		/**
		 * 活动过程图片3
		 * */
		_67: '67',
		/**
		 * 活动过程图片4
		 * */
		_68: '68',
		/**
		 * 活动结束图片1
		 * */
		_69: '69',
		/**
		 * 活动结束图片2
		 * */
		_70: '70',
		/**
		 * 工商营业执照
		 */
		_61: '61',
		/**
		 * 出版物经营许可证
		 */
		_62: '62',
		/**
		 * 书店白天外观正面照
		 */
		_71: '71',

	},
	
	regExp: {
		PASSWORD: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
	}

};

Global.Constants = Constants;

export default Constants
