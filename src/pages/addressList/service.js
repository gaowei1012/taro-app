import Reuest from './../../utils/request'

export const getAddressList = data => Request({
    url: '/user/address',
    methods: 'GET',
    data
})