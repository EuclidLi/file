// 引入axios
import axios from 'axios'
import { ip } from './config'

// 创建axios实例
const service = axios.create({
    baseURL: ip, // api的base_url  Vue项目可以根据 process.env.BASE_API，React可以在这里定义
    timeout: 50000, // 请求超时时间
    withCredentials: false, // 跨域携带cookie
    xsrfCookieName: 'xsrf-token',  //当创建实例的时候配置默认配置
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})


// 添加请求拦截器，这里面可以配置一下每次请求都需要携带的参数，比如 token，timestamp等等，根据项目自己配置
service.interceptors.request.use(
    function (configs) {
        // 每次请求带上token和用户编号
        // if (store.getters.token) {
        // configs.headers['Token'] = getToken()
        // configs.headers['Authorization'] = store.getters.userId
        // }
        configs.headers['Content-Type'] = 'application/json;charset=UTF-8'
        // 每次请求带上时间戳 防刷处理
        if (configs.method === 'get' || configs.method === 'delete') {
            configs.params = {
                ...configs.params,
                timestamp: Date.parse(new Date()) / 1000
            }
        } else if (configs.method === 'post' || configs.method === 'put') {
            configs.data = {
                ...configs.data,
                timestamp: Date.parse(new Date()) / 1000
            }
        } else {
            configs.data = {
                ...configs.data,
                timestamp: Date.parse(new Date()) / 1000
            }
        }
        return configs
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)


// 添加响应拦截器 ，这里的 response是接收服务器返回后的结果，也可以在这里做一些状态判断
service.interceptors.response.use(
    response => {
        /**
         * 判断服务器请求是否成功
         * @method if
         * @param  {[type]} response [description]
         * @return {[type]}          [description]
         */
        if (response.status !== 200) {
            return Promise.reject(new Error('网络异常，请稍后重试'))
        } else {
            // console.log(response.data)
            return response.data
        }
        // const res = response.data
        // if (res) {
        //   return res
        // }
    },
    error => {
        return Promise.reject(error)
    }
)
// 提供axios给外部调用
export default service