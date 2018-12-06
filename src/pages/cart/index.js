import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ClothingsItem from './../../components/ClothingsItem'
import './index.scss'

export default class Cart extends Component {

    config = {
        navigationBarTitleText: '时装'
    }

    render() {
        return (
            <View>
                <Text>时装content</Text>
                <ClothingsItem />
            </View>
        )
    }
}