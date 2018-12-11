import Request from '../../utils/request'

/**
 * 获取商品详情
 * @param {String} params 
 */
export const getProductInfo = params => Request({
    url: '/product',
    method: 'GET',
    data: params
});