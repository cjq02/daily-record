let numeral = require('numeral');

export default {
	data() {
		return {
			model: {
				title: '',
				content: '',
				publishTs: '',
				viewFlag: '',
			},
			title: '借呗额度',
			backTextStyle: {
				fontSize: '35rpx'
			},
			color: '#1777FF',
			cardHeadColor: '#CCFFFF',
			imgSrc: '/static/images/loan/rule.png',
			creditAmt: 78000,
			availableAmt: 0,
			usedAmt: 128500,
			freeCreditAmt: 779

		}
	},
	async onLoad(option) {
	},

	methods: {
	
		getAmount(amt) {
			return numeral(amt).format('0,0.00');
		}
	}
}
