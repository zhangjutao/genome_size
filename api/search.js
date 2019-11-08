import {
  HTTP
} from '../utils/http.js';
import {
  config
} from '../config'
class SearchModel extends HTTP {
  getSearchList(data, type) {
		data.limitNum = config.limitNum;
      return this.request({
        url: `/questionnaire/${type}`,
        data,
        method: 'POST'
      })
  };
}

module.exports = {
  SearchModel
}