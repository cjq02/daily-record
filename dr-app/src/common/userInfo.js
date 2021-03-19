import Global from '@/common/global.js'

const USER_INFO_KEY = 'userInfo';

const UserInfo = {
	
	set(userInfo) {
		uni.setStorageSync(USER_INFO_KEY, userInfo);
	},
	
	getUserInfo() {
		return uni.getStorageSync(USER_INFO_KEY);
	},
	
	clear() {
		uni.removeStorageSync(USER_INFO_KEY);
	},
	
	getToken() {
		return this.getUserInfo().jwt;
	},
	
	getRoleType() {
		return this.getUserInfo().roleType;
	},
	
	getLocation() {
		return new Promise((resolve, reject) => {
			uni.getLocation({
				// 默认为 wgs84 返回 gps 坐标，gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标，app平台高德SDK仅支持返回gcj02
			    // #ifdef APP-PLUS
			    type: 'gcj02',
			    // #endif
				// #ifdef H5
				type: 'wgs84',
				// #endif
			    success: function (res) {
					console.log('定位成功', res);
			        resolve(res);
			    },
				fail: function(res) {
					resolve({
						latitude: null,
						longitude: null
					});
					console.log('定位失败', res);
				},
				complete: function(res) {
					console.log('定位结束', res);
				}
				
			});
		})
	}
	
}

Global.UserInfo = UserInfo;

export default UserInfo;