import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import './index.scss'

let setIntervalTime = null;

@connect(({ login }) => ({
    ...login
}))
export default class Login extends Component {

    config = {
        navigationBarTitleText: '登录'
    }

    constructor(props) {
        super(props)

        this.state = {
            mobile: '',
            core: '',
            invitation_code: '',
            access_token: '',
            nickname: '',
            new_user: '',
            is_has_buy_card: '',
            smsText: '发送验证码',
            sending: 0,
            smsTime: 30,
            errMessage: ''
        };
    }
    // 获取手机号码
    getMobile = (event) => {
        const value = event.target.value;
        console.log(value)
        this.props.dispatch({
            type: 'login/save',
            payload: { mobile: value }
        })
    }

    // 验证码
    getCode = (event) => {
        const value = event.target.value;
        this.props.dispatch({
            type: 'login/save',
            payload: { code: value }
        })
    }

    sendSms = () => {
        if (this.props.mobile == '' || this.props.mobile != 11) {
            this.showToast('请输入有效的手机号')
            return false;
        }
        this.props.dispatch({
            type: 'login/sendSms',
            payload: {
                mobile: this.props.mobile
            }
        }).then(() => {
            this.setIntervalTime();
            if (this.props.errMessage && this.props.errMessage !== '') {
                clearInterval(setIntervalTime)
                this.showToast(this.props.errMessage)
            }
        })
    }

    // 用定时器模拟发送验证码后的倒计时
    setIntervalTime = () => {
        clearInterval(setIntervalTime);
        let numConst = 30;
        setIntervalTime = setInterval(() => {
            numConst--;
            this.props.dispatch({
                type: 'login/save',
                payload: {
                    sending: 1, smsTime: numConst
                }
            })
            if (numConst == 0 || (this.props.errMessage || this.props.errMessage !== '')) {
                clearInterval(setIntervalTime);
                this.props.dispatch({
                    type: 'login/save',
                    payload: { sending: 2, errMessage: '', smsTime: 30 }
                })
            }
        }, 1000);
    }

    // 登录
    login = () => {
        if (this.props.mobile == '' || this.props.mobile.length != 11 || this.props.code == '' || this.props.code.length != 4) {
            this.showToast('请输入有效的手机号或输入有效验证码！');
            return false;
        }
        this.props.dispatch({
            type: 'login/login',
            payload: {
                code: this.props.code,
                mobile: this.props.mobile,
            },
        });
    }

    // tips
    showToast(text) {
        Taro.showToast({
            title: text,
            icon: 'none'
        })
    }

    getVoiceCode = () => {
        // 语音验证码
        if (this.props.mobile !== '' || this.props.mobile !== 11) {
            this.showToast('请输入正确的手机号')
            return false;
        }
        this.props.dispatch({
            type: 'login/sendSmsVoice',
            payload: {
                mobile: this.props.mobile
            }
        }).then(() => {
            this.setIntervalTime();
            if (this.props.erroMessage && this.props.erroMessage != '') {
                clearInterval(setIntervalTime);
                this.showToast(this.props.erroMessage);
            } else {
                this.showToast("电话拨打中...请留意相关电话");
            }
        })
    }

    render() {
        const { sending, smsTime } = this.props;
        if (Taro.getEnv === Taro.ENV_TYPE.WEB) {
            this.setState({
                sending,
                smsTime
            })
        }
        return (
            <View className='login-page' id='login-page'>
                <View className='title'>您好，请登录！</View>
                <View className='title-des'>新用户注册有好礼相送</View>
                <View className='bgtopWrap'>
                    <View className='loginWrap'>
                        <View className='inpuWrapMpblie'>
                            <Input type='number' name='mobile' maxLength='11' placeholder='请输入手机号' value={this.props.mobile} onInput={this.getMobile}></Input>
                        </View>
                        {/* 这块再者真正的业务中是要到后端去获取数据， 调用短信验证码的接口 */}
                        <View className='inpuWrapNumber'>
                            <Input type="number" name="code" maxLength="4" placeholder="请输入验证码" value={this.props.code} onInput={this.getCode} />
                            {this.state.sending == 2 && <View className="numberWrap" onClick={this.sendSms}>重新获取</View>}
                            {this.state.sending == 1 && <View className="numberWrap">{`${smsTime}秒后重发`}</View>}
                            {this.state.sending == 0 && <View className="numberWrap" onClick={this.sendSms}>获取验证码</View>}
                        </View>
                        <Button className="button" onClick={this.login}>登录</Button></View>
                    <View className="see-des" onClick={this.getVoiceCode}>
                        收不到验证码？
                            <Text>使用语音验证码</Text>
                    </View>
                </View>
            </View>
        )
    }
}