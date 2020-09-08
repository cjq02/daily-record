class AjaxUils {

    private static baseUrl: String = 'http://localhost:3000';

    static get(url, success?, fail?, complete?) {
        return new Promise((resolve, reject) => {
            uni.showLoading({
                title: "加载中...."
            });
            uni.request({
                url: `${this.baseUrl}${url}`,
                method: "GET",
                data: {},
                success: resp => {
                    resolve(resp);
                    success && success(resp);
                    uni.hideLoading();
                },
                fail: fail,
                complete: complete
            });
        });
    }

}

export default AjaxUils;