/**
 * axios 配置
 */
import axios from 'axios'
import store from '../../store/store'
import * as types from '../../store/types'
import router from '../../router/routes'
let qs = require('qs');
// axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //Form Data
// axios.defaults.headers.post['Content-Type'] = 'application/json'; //Request Payload
axios.defaults.validateStatus = function(status) {
  if (status >= 200 && status < 300) {
    return true;
  } else {
    console.log('系统繁忙中，请稍后尝试');
    return false;
  }
};

//添加一个请求拦截器
axios.interceptors.request.use(function(config) {
  //在请求发送之前做一些事
  return config;
}, function(error) {
  //当出现请求错误是做一些事
  return Promise.reject(error);
});

// 添加一个返回拦截器，拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  const data = response.data;
  // 根据返回的code值来做不同的处理（和后端约定）
  switch (data.code) {
    case 0:
      // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
      return response;
    case -3:
      // 账号登录已过期，请重新登录
      store.commit(types.logout);
      if (!router.history.current.query.hasOwnProperty('redirect')) {
        if (router.currentRoute.fullPath == "/login") {
          router.replace({
            path: '/login'
          })
        } else {
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
        }
      }
      return response;
    default:
      return response;
  }
  // 若不是正确的返回code，且已经登录，就抛出错误
  const err = new Error(data.msg)
  err.data = data
  err.response = response
  throw err
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.msg = '请求错误'
        break
      case 401:
        err.msg = '未授权，请登录'
        break
      case 403:
        err.msg = '拒绝访问'
        break
      case 404:
        err.msg = '请求地址出错'
        break
      case 408:
        err.msg = '请求超时，请稍后重试'
        break
      case 500:
        err.msg = '服务器内部错误，请稍后重试'
        break
      case 501:
        err.msg = '服务未实现，请稍后重试'
        break
      case 502:
        err.msg = '网关错误，请稍后重试'
        break
      case 503:
        err.msg = '服务不可用，请稍后重试'
        break
      case 504:
        err.msg = '网关超时，请稍后重试'
        break
      case 505:
        err.msg = 'HTTP版本不受支持'
        break
      default:
    }
  }
  return Promise.reject(err)
})

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(response => {
        if (response.data.code == 0) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error.msg);
      })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(response => {
        if (response.data.code == 0) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error.msg);
      })
  })
}


/**
 * 把指定的 url 转变成 axios 请求，返回的是 Promise 对象
 * @param  {[object]} url {url:this.$api.getL2CatAipl,data:{id:211}}
 */
function makeRequest(url) {
  return axios.get(url.url, { params: url.data })
}
/**
 * 格式化all方法成功后的数据
 * @param  {[type]} response [description]
 * @return {[type]}     示例：    sourceOfAwareness:{allBrand: Array(21)}
 */
function formatResponse(response) {
  return response.data;
}
/**
 * [all description]
 *  注意：所传对象中的属性必须为url和data
 * @param  {...[type]} urls 示例：{url:this.$api.getL2CatAipl,data:{id:211}},{url:this.$api.getSourceOfAwareness,data:{id:433}}
 * @return {[type]}         [description]
 * 示例： 
 * this.$all({url:this.$api.getL2CatAipl,data:data_1},{url:this.$api.getSourceOfAwareness,data:data_2}).then(response=>{
    if(response[0].code === 0){
      //执行第一个接口成功后的回调
    }
    if(response[2].code === 0){
    //执行第一个接口成功后的回调
    }
 }).catch((error)=>{
    console.log(error);
  });
 */
export function all(...urls) {
  let requests = urls.map(makeRequest);
  return new Promise((resolve, reject) => {
    axios.all(requests)
      .then(axios.spread(function(...response) {
        // 所有请求现在都执行完成
        resolve(response.map(formatResponse));
      })).catch(error => {
        reject(error.msg);
      });
  })
}