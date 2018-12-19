import Request from './../../utils/request'

// 获取市区域列表
export const getDistricts = data => Request({
    url: '/common/configs',
    method: 'GET',
    data
});

// 更新地址 
export const updateAddress = data => Request({
    url: '/user/address',
    method: 'POST',
    data
});

// 删除地址 
export const removeAddress = data => Request({
    url: '/user/address',
    method: 'DELETE',
    data
});

