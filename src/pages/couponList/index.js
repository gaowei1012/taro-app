import Taro, { Component } from '@tarojs/taro'
import { View, Input, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'

@connect(({couponList}) => ({
    ...couponList
}))
export default class CouponList extends Component {

    // config 
    config = {
        navigationBatTitleText: '优惠券'
    }

    render() {
        return (
            <View className='couponList-page'>
                <View className='couponList-page'>
                    <View className='header'>
                        <View className='coupons'>
                            暂无优惠券可用
                        </View>
                        <View className='getCoupon'>
                            <View>
                                优惠码
                                <Input type='text'  placeholder='请输入优惠码'/>
                            </View>
                            <Button inline size='small' className='so-sall'>兑换</Button>
                        </View>
                    </View>
                    <View className='on-coupon'>
                        <Image mode='widthFix' src='http://static-r.msparis.com/uploads/6/5/654c84bd4f3c3f1bd53fb6824e191775.png' alt='' />
                    </View>
                </View>
            </View>
        )
    }
};