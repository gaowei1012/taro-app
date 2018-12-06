import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import ClothingsItem from './../../components/ClothingsItem'
import './index.scss'

@connect(({ cart }) => ({
    ...cart
}))
export default class Cart extends Component {

    config = {
        navigationBarTitleText: '时装'
    }

    goHome() {
        // 对不同运行环境下的判断
        if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
            Taro.navigateTo({
                url: '/pages/home/index'
            })
        } else {
            Taro.switchTab({
                url: '/pages/home/index'
            })
        }
    }

    clothingNumExplain() {
        const content = `会员免费`;
        Taro.showModal({
            content: content,
            showCancel: false
        })
    }
    
    //删除
    onDeleteClothing = (e) => {
        const id = e.currentTarget.dataset.id;
        Taro.showModal({
            content: '是否删除该商品'
        })
        .then(res => {
            if (res.confirm) {
                this.props.dispatch({
                    type: 'cart/deleteClothes',
                    payload: {
                        id
                    }
                })
            }
        })
    }

    componentDidShow() {
        // 设置一代小红点
        if (this.props.items.length > 0) {
            Taro.setTabBarBadge({
                index: 1,
                text: String(this.props.items.length)
            })
        } else {
            // 移除小红点
            Taro.removeTabBarBadge({
                index: 1
            })
        }
    }

    buy() {
        Taro.showToast({
            title: '衣袋尚未激活， 下单失败...',
            icon: 'none'
        })
    }

    render() {
        const { items } = this.props;
        const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB;
        return (
            <View className='cart-page'>
                {
                    items.length === 0 ? (
                        <View className="empty">
                            <Image mode="widthFix" src="http://static-r.msparis.com/uploads/b/c/bcffdaebb616ab8264f9cfc7ca3e6a4e.png" />
                            <Button type="primary" className="am-button" onClick={this.goHome}>立即去挑选美衣</Button>
                        </View>
                    ) : (
                            <View className="isLogin">
                                <Image onClick={this.clothingNumExplain} mode="widthFix" src="https://static-rs.msparis.com/uploads/1/0/106494e4c47110f6c0e4ea40e15ad446.png" />
                                <ClothingsItem clothing={items} onDeleteClothing={this.onDeleteClothing} />
                                <View className="bottom-count" style={!isH5 && 'bottom:0;'}>
                                    <View className="fj">
                                        <View>
                                            合计： <Text className={!items.length ? 'disabled price' : 'price'}>0.00</Text>
                                        </View>
                                        <Button className="cart-btn" onClick={this.buy} disabled={!items.length}>下单</Button>
                                        <View className="info">
                                            如有失效美衣，建议删除，以免占用衣袋件数
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                }
            </View>
        )
    }
}