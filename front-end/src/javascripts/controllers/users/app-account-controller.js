

import appAccountRoute from '@views/routes/app-renderhome-route.html';
import {getAccountList} from '@models/user/user-model'

const render=async (req,res,next)=>{
    // searchHandler();
   let data= await renderItems(req,res);
    paginationHandler()
    console.log($('#account-content'))
}
let pageSize = 7;
let pageNo = 1;
let pages = '';
let search = '';
let $sort = '';
let $sortShow = '';
let $sortPublish = '';
let sortBy = '' // 排序依据 publishTime / showTime
let sort = { // 排序规则
    publishTime: 0,
    showTime: 0
} //0 'normal'   1 'up' 2'down' 


//按时间排序
function sortHandler() {
    $sort = $('.sort-btn');
    $sortShow = $('.sort-btn-show');
    $sortPublish = $('.sort-btn-publish');
    $sort.click(async function () {
        console.log($sort)
        $sort.removeClass('btn-primary');
        $(this).removeClass('btn-default').addClass('btn-primary');
        sortBy = $(this).data('by');
        sort[sortBy]++;
        if (sort[sortBy] > 2) sort[sortBy] = 0;
        switch (sort[sortBy]) {
            case 0:
                $(this).find('i').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-normal')
                break;
            case 1:
                $(this).find('i').removeClass('glyphicon-arrow-normal').addClass('glyphicon-arrow-up')
                break;
            case 2:
                $(this).find('i').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down')
                break;
        }
        if (sort[sortBy] === 0) sort[sortBy] = '';
     let data=await renderItems();

    })
}

//查找
function searchHandler() {
    $('#search-button').click(async () => {
        let val = $('.search-input').val();
        if (search === val) return false;
        search = val;
        pageNo = 1;
        await renderItems();
    })
}

//分页器
function paginationHandler() {
    $('#house-items-pagination').createPage({
        pageNum: pages.totalPage,
        current: pageNo,
        backfun: function (e) {
            pageNo = e.current
            renderItems()
        }
    });
}
function renderItems(req,res) {
    return new Promise(async (resolve) => {
        let data = await getAccountList({ pageSize, pageNo, search,sortBy, sort: sort[sortBy]});
        // { pageSize, pageNo, search, sortBy, sort: sort[sortBy] }
        console.log(data)
       $('#web-content').html( 
            template.compile(appAccountRoute)({items:data.items})
            );
        pages = data.pages;
        resolve(data);
        // sortHandler();
        paginationHandler();
    })
}


export default{
    render
}


