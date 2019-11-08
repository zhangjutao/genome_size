import { config } from '../config'
const tips = {
	1: '抱歉，出现了个错误',
}
class HTTP {
	request({ url, data = {}, method = 'GET' }) {
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method)
		})
	};
	_request(url, resolve, reject, data = {}, method = 'GET') {
		wx.request({
			url: config.apiUrl + url,
			method: method,
			data: data,
			success: (res) => {
				const code = res.statusCode.toString();
				if (code.startsWith('2')) {
					resolve(res.data);
				} else {
					reject();
					this._show_error(res.data.error_code);
				}
			},
			fail: (err) => {
				reject();
				this._show_error(1);
			}
		})
	};
	_show_error(error_code) {
		error_code ? error_code : error_code = 1;
		const tip = tips[error_code];
		wx.showToast({
			title: tip ? tip : tips[1],
			icon: 'none',
			duration: 2000
		})
	}
}
module.exports = { HTTP }