
import request from '@utils/request';

const getHouseList = (data) => {
    return request({
        url: '/api/v1/house/items',
        data,
    })
}
const postHouseItem = (data) => {
    return request({
        url: '/api/v1/house/item',
        type: 'POST',
        data,
    })
}

const deleteItemById = (id) => {
    return request({
        url: '/api/v1/house/item',
        data: { id },
        type: 'delete'
    })
}
const getHouseItemById=(id)=>{
    return request({
        url: '/api/v1/house/item/' + id
    })
}


const updateItem=(data)=>{
    return request({
        url:'/api/v1/house/item',
        data,
        type:'put',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}
export {
    getHouseList,
    postHouseItem,
    deleteItemById,
    getHouseItemById,
    updateItem
}