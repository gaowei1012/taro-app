import Taro from '@tarojs/taro'
import * as addressUpdateApi from './service'

export default {
    namespace: 'addressUpdate',
    state: {// state
        cities: [],
        districts: [],
        pickerValue: [0, 0, 0],
        showValue: {
            region_code: '',
            region_name: ''
        },
        contact_name: '',
        contact_mobile: '',
        address_detail: ''
    },
    effects: {
        * getDistricts({ payload }, { put, call }) { // huoqu
            const { status, data } = yield call(addressUpdateApi.getDistricts, payload);
            if (status === 'ok') {
                const cities = data.send_cities.send_cities;
                const arr = [[],[],[]]; // 定义二维数组
                console.log(cities)
                cities.forEach(item => {
                    arr[0].push({
                        key: item.key,
                        name: item.name,
                    })
                });
                cities[0].cities.forEach(item => {
                    arr[1].push({
                        key: item.key,
                        name: item.name,
                    })
                });
                cities[0].cities[0].forEach(item => {
                    arr[2].push({
                        key: item.key,
                        name: item.key,
                    })
                });
                yield put({
                    type: 'save',
                    payload: {
                        cities,
                        districts: arr,
                    }
                });
            }
        },
        * submit({payload}, { select, call} ) { // tijiao
            const { access_token } = yield select(state => state.common);
            const addressId = yield select(state => state.addressUpdate.addressId)
            const { status } = yield call(addressUpdateApi.submit, {
                id: addressId && addressId != '' ? addressId: undefined,
                access_token,
                region_code: payload.showValue.region_code,
                region_name: payload.showValue.region_name,
                contact_name: payload.contact_name,
                contact_mobile: payload.contact_mobile,
                address_detail: payload.address_detail,
            });
            if (status === 'ok') {
                Taro.showToast({
                    title: '保存成功',
                    icon: 'none'
                });
                setTimeout(() => {
                    Taro.navigateBack()
                }, 1000)
            }
        },
        * removeAddress(_, { select, call }) { // shanchu
            const { access_token } = yield select(state => state.common);
            const addressId = yield select(state => state.addressUpdate.addressId);
            const { status } = yield call(addressUpdateApi.removeAddress, {
                id: addressId,
                access_token,
            });
            if (status === 'ok') {
                Taro.showToast({
                    title: '删除成功',
                    icon: 'none',
                });
                setTimeout(() => {
                    Taro.navigateBack()
                }, 1000);
            }
        }
    },
    reducers: {
        sava(state, { payload }) {
            return { ...state, ...payload };
        }
    },
};