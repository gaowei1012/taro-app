import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'

export default class ClothingsItem extends Component {

    static propTypes = {
        clothing: PropTypes.array,
        deleteClothing: PropTypes.func
    }

    static defaultProps = {
        clothing: [],
        deleteClothing: function () {}
    }

    render() {
        const { clothing, onDeleteClothing } = this.props;
        return (
            <View>
                <View className='ClothingsItem-page'>
                    <View className='hr'></View>
                    {
                        clothing.map(item => (
                            <View key={item.product_id}>
                                <View className='WhiteSpace'></View>
                                <Viwe className='clothing'>
                                    <View className='shop-img'>
                                        <Image mode='widthFix' src={`${item.image}!w750`}></Image>
                                    </View>
                                    <View className='content'>
                                        <View className='title p'>{item.brand}</View>
                                        <View className='info p'>{item.name}</View>
                                        <View className='size p'>
                                            {`${item.spu} | ${item.specification || '均码'}`}
                                        </View>
                                    </View>
                                    <View className='edit'>
                                        {/* 自定义属性  data-id  */}
                                        <View className='iconfont icon-delete' data-id={item.product_id} onClick={this.onDeleteClothing}></View>
                                    </View>
                                </Viwe>
                                <View className='WhiteSpace'></View>
                                <View className='hr'></View>
                            </View>
                        ))
                    }
                </View>
            </View>
        )
    }
}