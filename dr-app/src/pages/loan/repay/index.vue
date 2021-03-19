<template>
	<view>
		<u-navbar back-text="还款" :back-text-style="backTextStyle" class="nav"></u-navbar>
		<view style="background-color: #FFFFFF;">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTabIndex" @change="changeTab" active-color="#1678FF"></u-tabs>
			<view style="text-align: center;margin: 50rpx 0;">
				<view class="bold-text" style="font-size:32rpx;color:#2A3D4B;">3月25日应还（元）</view>
				<view class="current-pay-amt" style="color: #1678FF">{{ getAmount(list[0].monthRepayment) }}</view>
				<view style="padding:38rpx;color:#A2A9AF">
					我们会在
					<text style="color: #1678FF">还款日当天13:00</text>
					开始自动扣款，请确保余额储蓄卡、余额宝账户资金充足，或还款日当天主动还款
				</view>
				<view class="view-detail"><text class="view-detail-button">查看详情</text></view>
			</view>
		</view>
		<view class="wrap" style="margin-top:-50rpx;">
			<u-card margin="0" :show-head="false" :border="false">
				<view slot="body" style="padding:10rpx 0;">
					<view class="residual-title">剩余还款计划</view>
					<u-row v-for="(item, index) in list" :key="index" class="pay-row">
						<u-col span="3" style="">
							<view class="month-date">
								<text>{{ item.year }}</text>
								<view>{{ item.monthDate }}</view>
							</view>
							<!-- <view>
								<u-icon class="circle-round" name="circle-round" custom-prefix="custom-icon" color="#1678FF"></u-icon>
								<u-line v-show="index !== list.length - 1" direction="col" color="#c7c7c7" length="100rpx" class="col-line"></u-line>
							</view> -->
						</u-col>
						<u-col span="1" class="circle-line">
							<view>
								<u-icon class="circle-round" name="circle-round" custom-prefix="custom-icon" color="#1678FF"></u-icon>
								<u-line v-show="index !== list.length - 1" direction="col" color="#DDDCE1" length="100rpx" class="col-line"></u-line>
							</view>
						</u-col>
						<u-col span="3">
							<view class="pay-amt">{{ getAmount(item.monthRepayment) }}</view>
						</u-col>
						<u-col span="5" style="text-align: right"><u-icon name="arrow-right" color="#DDDCE1"></u-icon></u-col>
					</u-row>
				</view>
			</u-card>
		</view>
	</view>
</template>

<script src="./repay.js"></script>

<style lang="scss" scoped>
.wrap {
	padding: 20rpx;
}

.bold-text {
	color: #2A3D4B;
	font-weight: bold;
	font-size: 32rpx;
}

.view-detail {
	height: 120rpx;
	margin-top: 30rpx;
}

.view-detail-button {
	background-color: #f2f3f5;
	font-size: 32rpx;
	padding: 30rpx 80rpx;
	border-radius: 10rpx;
}

.residual-title {
	color: #2A3D4B;
	font-weight: bold;
	font-size: 30rpx;
	margin: 0 0 50rpx 20rpx;
}

.current-pay-amt {
	font-weight: bold;
	font-size: 90rpx;
}

.pay-row {
	display: flex;
	align-items: flex-start !important;
	height: 150rpx;
}

.circle-line {
	/* margin-left: -10rpx; */
	/* height: 150rpx; */
	/* height: 100rpx; */
}

.col-line {
	position: relative;
	left: 5rpx;
}

.pay-amt,
.month-date {
	font-weight: bold;
	text-align: center;
}

.month-date {
	font-size: 30rpx;
}

.pay-amt {
	margin-left: 20rpx;
	font-size: 32rpx;
	margin-top: -5rpx;
}
</style>

<style>
page {
	background-color: #f6f6f6;
}
</style>
