const numeral = require('numeral');
import date from 'date-and-time';

export default {
	data() {
		return {
			backTextStyle: {
				fontSize: '35rpx'
			},
			tabList: [{
					name: '按期还款'
					/* name: 'ON SCHEDULE' */
				},
				{
					name: '提前还款'
					/* name: 'AHEAD' */
				}
			],
			yearlyInterestRate: 0.146,
			borrowPeriod: 36,
			debtAmt: 265000,
			currentTabIndex: 0,
			list: []

		}
	},

	computed: {
		monthlyInterestRate() {
			return this.yearlyInterestRate / this.borrowPeriod;
		},
	},

	async onLoad(option) {
		const now = new Date('2021-03-25');
		const monthRepayment = this.calcMonthRepayment();

		let bridge = this.debtAmt;
		this.list = _.map(_.range(0, this.borrowPeriod), index => {
			let year = null;
			let thisDate = date.addMonths(now, index);
			let monthDate = date.format(thisDate, 'M月D日');
			if (monthDate === '1月25日') {
				year = date.format(thisDate, 'YYYY年');
			}

			//计算当期的应还利息
			let monthInterest = bridge * this.monthlyInterestRate;
			//计算当期的应还本金
			let monthPrincipal = monthRepayment - monthInterest;
			//计算当期的剩余本金
			let residualPrincipal = bridge - monthPrincipal;
			bridge = residualPrincipal;

			return {
				year,
				monthDate,
				monthRepayment: parseFloat(monthRepayment.toFixed(2)),
				monthInterest: parseFloat(monthInterest.toFixed(2)),
				monthPrincipal: parseFloat(monthPrincipal.toFixed(2)),
				residualPrincipal: parseFloat(residualPrincipal.toFixed(2)),
			};
		});
		console.log(JSON.parse(JSON.stringify(this.list)));
	},

	methods: {
		getAmount(amt) {
			return numeral(amt).format('0,0.00');
		},

		changeTab(index) {
			this.currentTabIndex = index;
		},

		calcMonthRepayment() {
			let repayMonthPow = Math.pow((1 + this.monthlyInterestRate), this.borrowPeriod);
			return this.debtAmt * this.monthlyInterestRate * repayMonthPow / (repayMonthPow - 1);
		}
	}
}
