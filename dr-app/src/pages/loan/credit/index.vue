<template>
	<view>
		<u-navbar :back-text="title" :back-text-style="backTextStyle" class="nav">
		</u-navbar>
		<view class="wrap">
			<u-card margin="0" :title="title" :headStyle="{backgroundColor: color}" :border="false"
				:bodyStyle="{backgroundColor: color}" title-color="#FFFFFF" title-size="40" :head-border-bottom="false">
				<view class="amt-card-body" slot="body">
					<u-row>
						<u-col span="12" style="margin-bottom:100rpx;">
							<view class="lbl">总额度（元）</view>
							<view class="amt-color" style="font-size: 60rpx;">{{getAmount(creditAmt)}}</view>
						</u-col>
						<u-col span="6">
							<view class="lbl">可用额度（元）</view>
							<view class="amt-color">{{getAmount(availableAmt)}}</view>
						</u-col>
						<u-col span="6">
							<view class="lbl">已用额度（元）</view>
							<view class="amt-color">{{getAmount(usedAmt)}}</view>
						</u-col>
					</u-row>
				</view>
				<view class="" slot="foot">
					<u-icon name="gift" size="36" style="margin-right: 20rpx;" class="blue-color"></u-icon>
					<text class="blue-color" style="font-size:30rpx;">你有{{getAmount(freeCreditAmt)}}元免息额度可抵用</text>
				</view>
			</u-card>
			<view style="margin-top: 20rpx;">
				<u-image width="100%" height="200rpx" :src="imgSrc" mode="scaleToFill" border-radius="16"></u-image>
			</view>
			<view class="text-bottom blue-color">
				<text>常见问题</text>
				<text style="margin:0 10rpx">|</text>
				<text>回到首页</text>
			</view>
		</view>

	</view>

</template>

<script src="./credit.js"></script>

<style lang="scss" scoped>
	.wrap {
		padding: 30rpx;
		display: flex;
		flex-direction: column;

	}
	
	.nav {
		line-height: 50rpx;
	}

	.amt-card-body {
		.lbl {
			color: #8DCCFF
		}
	}

	.amt-color {
		color: #FFFFFF
	}

	.blue-color {
		color: #1777FF;
	}

	.text-bottom {
		position: fixed;
		width: 100%;
		bottom: 200rpx;
		text-align: center;
		font-size: 26rpx;
	}
</style>

<style>
	page {
		background-color: #F6F6F6;
	}
</style>
