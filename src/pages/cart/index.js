import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Cart extends Component {

    config = {
        navigationBarTitleText: '时装'
    }

    render() {
        return (
            <View>
                <Text>时装content</Text>
            </View>
        )
    }
}