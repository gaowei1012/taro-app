import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import models from './models'
import dva from './utils/dva'
import Home from './pages/home'

import './styles/base.scss'

// 集成dva
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/home/index',
      'pages/cart/index',
      'pages/user/index',
      'pages/about/index',
      'pages/addressList/index',
      'pages/addressUpdate/index',
      'pages/couponList/index',
      'pages/detail/index',
      'pages/login/index',
      'pages/message/index',
      'pages/order/index',
      'pages/size/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          iconPath: './images/tab/home.png',
          selectedIconPath: './images/tab/home-active.png',
          text: '首页'
        },{
          pagePath: 'pages/cart/index',
          iconPath: './images/tab/cart.png',
          selectedIconPath: './images/tab/cart-active.png',
          text: '时装'
        },{
          pagePath: 'pages/user/index',
          iconPath: './images/tab/user.png',
          selectedIconPath: './images/tab/user-active.png',
          text: '我的'
        }
      ],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: '#ccc'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
