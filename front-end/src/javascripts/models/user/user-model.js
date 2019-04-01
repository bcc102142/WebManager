
import request from '@utils/request';

const getAccountList = (data) => {
    return request({
        url: '/api/v1/users/accounts',
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

const deleteItemByUsername = (username) => {
    return request({
        url: '/api/v1/users/item',
        data: { username },
        type: 'delete'
    })
}
const getItemByUsername=(username)=>{
    return request({
        url: '/api/v1/users/item/' + username
    })
}


const updateItem=(data)=>{
    return request({
        url:'/api/v1/users/item',
        data,
        type:'put',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}
export {
    getAccountList,
    postHouseItem,
    deleteItemByUsername,
    getItemByUsername,
    updateItem
}