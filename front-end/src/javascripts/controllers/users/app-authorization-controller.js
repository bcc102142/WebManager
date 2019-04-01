
import appDetailRoute from '@views/routes/app-detail-route.html';
import { getItemByUsername,updateItem } from '@models/user/user-model'
import angel from '@utils/angel'

let rank = null
let itemUserName='';
const render=async(req,res,next)=>{
    itemUserName = req.params.username //找到了选中的账号
    let data = await getItemByUsername(itemUserName);

    bindsEvents();
   
   
    
}


function bindsEvents() {
    // $('#publish-form').submit(async function (e) {
    //     e.preventDefault();
    //     let description = editor.getValue();
    //     //发送请求
    //     let params = { _id:itemId,address, price, publishTime, description, img,area,tel}
    //     let data = await updateItem(params);
    //     //成功后返回查询列表
    //     if (data) {
    //         $('.modal-backdrop.in').remove();
    //         // angel.emit('go', '#/message/select')
    //     }
    // })

       
        $('#saveRank').click( async function(){
            if($('#option1').parent().hasClass("active")){
                rank = 1
            }else if($('#option2').parent().hasClass("active")){
                rank = 2
            }else{
                rank = 3
            }
            let params = {username:itemUserName,rank}
            let data = await updateItem(params)
            angel.emit('go', '#/message/account')
            $('.modal-backdrop.in').remove();
        })
    
    
}








export default{
    render
}