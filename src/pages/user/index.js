import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import message_img from './../../images/user/message_img'
import avatar_img from './../../images/user/avatar_img'
import coupon_img from './../../images/user/coupon_img'
import about_img from './../../images/user/about_img'
import address_img from './../../images/user/address_img'
import './index.scss'

@connect(({ user, common }) => ({
    ...user,
    ...common
}))
export default class User extends Component {
    // 为小程序添加title
    config = {
        navigationBarTitleText: '我的'
    }

    goPage = () => {

    }


    render() {
        const { mobile, coupon_number, nickname, list } = this.props;
        return (
            <View className='user-page'>
                <View className='not-login'>
                    <View className='to-login'>登陆页</View>
                </View>
            </View>
        )
    }
}