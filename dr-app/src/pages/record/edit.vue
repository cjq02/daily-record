<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <button type="default" class="mini-btn" size="mini" @tap="add">添加</button>
        </view>
        <view class="content">
            <view class="uni-list">
                <view
                    class="uni-list-cell"
                    hover-class="uni-list-cell-hover"
                    v-for="(item, index) in list"
                    :key="index"
                    @tap="openInfo"
                    :data-announce-id="item.id"
                >
                    <view class="uni-media-list">
                        <view class="uni-media-list-body">
                            <view class="uni-media-list-text-top">AAA</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            list: Array(),
        };
    },
    onLoad() {
        uni.showLoading({
            title: "加载中....",
        });
        uni.request({
            url: "http://localhost:3000/record",
            method: "GET",
            data: {},
            success: (resp) => {
                let data: any = resp.data;
                this.list = data;
                // console.log(this.list[0].name);
                uni.hideLoading();
            },
            fail: () => {},
            complete: () => {},
        });
    },
    methods: {
        openInfo(e: any) {},

        add(e: any) {
            uni.navigateTo({
                url: "./info?announceId=",
            });
        },
    },
});
</script>

<style>
.uni-media-list-body {
    height: auto;
}
.uni-media-list-text-top {
    line-height: 1.6em;
}
.text-right {
    float: right;
}
.mini-btn {
    margin-right: 10upx;
}
</style>
