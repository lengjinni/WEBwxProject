import axios from 'axios'
import qs from 'qs'

class allRequest {
  //表单序列化
  packageParamBase(param) {
    let _param = param || {}
    let _requestParam = param
    return qs.stringify(_requestParam)
  }
  // POST
  httpPostRequest(url, data, callback) {
    let _requestParam = this.packageParamBase(data);
    axios({
      method: 'post',
      url: url,
      data: _requestParam,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then(function(response) {
      console.log(response)
      let rescode = response.status;
      callback(response.data)
    })
    .catch(function(error) {
      if(error && error.response) {
        callback(error.response)
      }
    })
  }
  // GET
  httpGetRequest(url, data, callback) {
    axios.get(url, {
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then(function(response) {
      let rescode = response.status;
      callback(response.data)
    })
    .catch(function(error) {
      if(error && error.response) {
        callback(error.response)
      }
    })
  }
  // put
  httpPutRequest(url, data, callback) {
    let _requestParam = this.packageParamBase(data);
    axios({
      method: 'put',
      url: url,
      data: _requestParam,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then(function(response) {
      let rescode = response.status;
      callback(response.data)
    })
    .catch(function(error) {
      if(error && error.response) {
        callback(error.response)
      }
    })
  }
  //delete
  httpDeleteRequest(url, data, callback) {
    axios.delete(url, {
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then(function(response) {
      let rescode = response.status;
      callback(response.data)
    })
    .catch(function(error) {
      if(error && error.response) {
        callback(error.response)
      }
    })
  }
}
export default new allRequest()
