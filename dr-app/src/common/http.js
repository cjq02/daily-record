import Global from '@/common/global.js'
import request from '@/common/request.js'
import Data from '@/common/data.json'

const http = {
	get(options) {
		options.method = options.method || "GET";
		return request.req(options)
	},
	post(options) {
		options.method = options.method || "POST";
		return request.req(options)
	},
	exportFile: (url, data) => request.exportFile(url, data),
	download: path => request.download(path),

	getUploadUrl() {
		return request.uploadUrl + '/upload.json'
	},

	getBaseUrl(url) {
		if (_.isEmpty(url)) {
			return '';
		}
		return request.baseUrl + url;
	},
	getFileUrl(url) {
		if (_.isEmpty(url)) {
			return '';
		}

		return request.baseUrl + '/bs/upload' + url;
	},

	getThumbnailUrl(url) {
		if (_.isEmpty(url)) {
			return '';
		}

		return request.baseUrl + '/bs/upload/thumbnail' + url;
	},

	getVideoUrl(url) {
		if (_.isEmpty(url)) {
			return '';
		}

		return request.baseUrl + '/bs/video' + url;
	},
	
	getShareUrl(url) {
		return request.shareUrl + '/index.html#' + url;
	},

	getHeader(data) {
		return request.getHeader(data);
	},

	async getCodeList(typeCode) {
		if (!_.isEmpty(Data[typeCode])) {
			return new Promise((resolve, reject) => {
				resolve(Data[typeCode]);
			})
		}

		let resp = await this.get({
			url: '/getCodeList.json',
			data: {
				typeCode
			}
		});
		let codeList = resp.info;
		return _.map(codeList, item => _.assign({
			code: item.configCode,
			name: item.configName
		}, item));
	},

	async getSelectList(typeCode, hasAll) {
		let codeList = await this.getCodeList(typeCode);
		let list = _.map(codeList, item => _.assign({
			value: item.configCode,
			label: item.configName
		}, item));

		if (hasAll) {
			list.unshift({
				value: '',
				label: '全部'
			})
		}

		return list;
	}
}

Global.$ajax = http;

export default http
