


const request = (options) => {
    return new Promise((resolve, reject) => {
        // 自动携带token
        if ( !options.data ) {
            options.data = { token: localStorage.token }
        } else {
            options.data.token = localStorage.token
        }
        
        $.ajax({
            ...options,
            success: (res) =>  {
                if ( res.code >= 200 && res.code < 300 || res.code === 304 ) {
                    // 成功处理
                    // $.Toast('Success', '数据请求成功', 'success')
                    resolve(res.data)
                }else if(res.code === 300){
                     $.Toast('Warning', '不是对应用户', 'warning')
                }
                
                else {
                    // 除请求失败处理
                    // $.Toast('Warning', '数据请求失败', 'warning')
                    console.log('fail')
    
                }
            },
            error (error) {
                //做error的处理
                // $.Toast('Danger', '请求出错', 'error')
                console.log('error', error)
                reject(error)
            }
        })
    })
}

export default request