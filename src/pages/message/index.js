import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'

@connect(({ message }) => ({
    ...message
}))
export default class Message extends Component {

    config = {
        navigationBarTitleText: 'message' 
    }

    render () {
        return (
            <View>
                <Image mode="widthFix" src="http://static-r.msparis.com/uploads/8/a/8af1e11caa2c7dc29894777852d50eb3.png" />
            </View>
        )
    }

}