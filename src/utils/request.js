import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';

// request-data
const request_data = {
    platform: 'wap',
    rent_mode: 2,
};

export default (options = { method: 'GET', data: {} }) => {
    // 错误拦截处理
    if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
    }
    // 请求
    return Taro.request({
        url: baseUrl + options.url,
        data: {
            ...request_data,
            ...options.data
        },
        header: {
            'Content-Type': 'application/json',
        },
        method: options.method.toUpperCase(), // 转成大写
    }).then((res) => {
        const { statusCode, data } = res;
        if (statusCode >= 200 && statusCode < 300) {
            if (!noConsole) {
                console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data);
            }
            if (data.status !== 'ok') {
                Taro.showToast({
                    title: `${res.data.error.message}~` || res.data.error.code,
                    icon: 'none',
                    mask: true,
                });
            }
            return data;
        } else {
            throw new Error(`网络请求错误，状态码${statusCode}`);
        }
    })
};
