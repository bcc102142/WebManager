
import appDetailRoute from '@views/routes/app-detail-route.html';
import { getHouseItemById,updateItem } from '@models/message/message-model'
import angel from '@utils/angel'


let img='';
let editor=null;
let itemId='';
const render=async(req,res,next)=>{
     itemId = req.params.id // 详情对应的电影_id
    let data = await getHouseItemById(itemId);
    res.render(
        template.compile(appDetailRoute)({
            detail: data
        })
    )
    $('#datepicker').date_input();
    editor = new Simditor({
        textarea: $('#item-description'),
        imageButton: ['upload'],
        upload: {
            url: '/api/v1/file/description/img',
            fileKey: 'movieImg',
            leaveConfirm: '正在上传文件..'
        }
    });
    editor.setValue(data.description);
    bindsEvents();
    $('.back').click(function(){
        angel.emit('back')
    })
    $('.btn-file').click(() => {
        $('#item-file').trigger('click');
    })
    $('#item-file').change(function (e) {
        // 将图片内容转换为form-data的二进制格式，post到后端
        uploadImg(this)
    })
}


function bindsEvents() {
    $('#publish-form').submit(async function (e) {
        e.preventDefault();
        // 判断是否已经上传图片
        // if ( !img ) {
        //     alert('请上传图片')
        //     return false
        // }
        let address = $('.input-address').val();
        let price = $('.input-price').val();
        let publishTime = $('.input-publishTime').val();
        let area = $('.input-area').val();
        let tel = $('.input-tel').val();
        let description = editor.getValue();
        //发送请求
        let params = { _id:itemId,address, price, publishTime, description, img,area,tel}
        let data = await updateItem(params);
        //成功后返回查询列表
        if (data) {
            $('.modal-backdrop.in').remove();
            angel.emit('go', '#/message/select')
        }
    })
}

//上传图片
function uploadImg(input) {
    //input为上传文件的dom对象  input.files为选择的图片列表时
    let formData = new FormData();
    formData.append('movieImg', input.files[0])
    $.ajax({
        url: '/api/v1/file/upload/img',
        type: 'post',
        data: formData,
        contentType: false, //不设置内容类型
        processData: false, //不处理数据
    }).done((res) => {
        if (res.code === 501) {
            // $.Toast('Warning', res.msg, 'warning')
            return false;
        }
        img = 'http://localhost:3000' + res.data.img
        $('.publish-img-box').removeClass('hidden').find('img').attr('src', img)
        // $.Toast('Success', '图片上传成功', 'success')
    }).fail((error) => {
        // $.Toast('Warning', '图片上传失败了', 'warning')
    })
}






export default{
    render
}