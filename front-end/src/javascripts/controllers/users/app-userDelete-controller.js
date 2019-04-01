import {deleteItemByUsername} from '@models/user/user-model';
import angel from '@utils/angel'

const render=async(req,res,next)=>{

     // 判断是否能删除
     if ( localStorage.rank > 2 ) {
        $.Toast('Warning', '无权限删除', 'warning')
        return false;
    }
    
    let username=req.params.username;
    
   let data = await deleteItemByUsername(username)

    angel.emit('back')
}


export default{
    render
}