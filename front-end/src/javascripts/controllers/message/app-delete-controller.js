import {deleteItemById} from '@models/message/message-model';
import angel from '@utils/angel'

const render=async(req,res,next)=>{

     // 判断是否能删除
     if ( localStorage.rank > 2 ) {
        $.Toast('Warning', '无权限删除', 'warning')
        return false;
    }
    
    let id=req.params.id;
    
   let data = await deleteItemById(id)

    angel.emit('back')
}


export default{
    render
}