$(function () {
    //寄件图片/签收图片点击事件
    $(".send_img").click(function () {
        window.open($(this).attr("src"));
    });
    $(".sign_img").click(function () {
        window.open($(this).attr("src"));
    });

    /**
     * 历史记录相关事件
     */
    $("input").focus(function (e) {
        e.stopPropagation()
        $('.history').removeClass('hidden')
        $('.cancel_hi').removeClass('hidden')
        init();
    });
    $('.cancel_hi').on('click', function (e) {
        e.stopPropagation()
        $('.history').addClass('hidden')
        $('.cancel_hi').addClass('hidden')
    })
    $('.order_info').on('click', function (e) {
        e.stopPropagation()
        return false
    })
    $('.containerIndex').on('click', function () {
        $('.history').addClass('hidden')
    })

    var hisTime;//获取搜索时间数组
    var hisItem;//获取搜索内容数组
    var firstKey;//获取最早的1个搜索时间

    function init (){
        hisTime = [];//时间数组置空
        hisItem = [];//内容数组置空
        for(var i = 0; i < localStorage.length; i++){//数据去重
            if(!isNaN(localStorage.key(i))){//判断数据是否合法
                hisTime.push(localStorage.key(i));
            }
        }
        if(hisTime.length > 0) {
            hisTime.sort();//排序
            for (var y = 0; y < hisTime.length; y++) {
                localStorage.getItem(hisTime[y]).trim() && hisItem.push(localStorage.getItem(hisTime[y]));
            }
        }
        $(".his_item_box").html("");//执行init(),每次清空之前添加的节点
        $(".history").hide();
        $(".cancel_hi").hide();
        for(var i = 0; i < hisItem.length; i++){
            $(".his_item_box").prepend('<div class="his_item" data-id='+ [i]+'>'+hisItem[i]+'</div>');
            if(hisItem[i] != ''){
                $(".history").show();
                $(".cancel_hi").show();
            }
        }
    }
    $("#searchBtn").click(function(){
        var value = $("#billCodeText").val().toUpperCase();
        var time = (new Date()).getTime();
        if(!value){
            showTooltip("请输入正确的运单号");
            return false;
        }
        //输入的内容localStorage有记录
        if($.inArray(value,hisItem) >= 0){
            for(var j = 0; j < localStorage.length; j++){
                if(value == localStorage.getItem(localStorage.key(j))){
                    localStorage.removeItem(localStorage.key(j));
                }
            }
            localStorage.setItem(time,value);
        }else{
            localStorage.setItem(time,value);
        }
        //确保只有十条记录
        if(hisTime.length >= 10){
            localStorage.removeItem(hisTime[0]);
        }
        //init();
        getScanByCode();
    });
    $('.history .his_item_box').on('click','.his_item',function(){
        $(".history").hide();
        $(".cancel_hi").hide();
        $(".search input").val($(this).prop("firstChild").nodeValue);
        getScanByCode();
    })
    $(".search input").on({
        blur:function() {
            setTimeout(function(){
                $(".history").hide();
                $(".cancel_hi").hide();
            },250)
        }
    })

    //清除记录功能
    $(".delHis").click(function(){
        var f = 0;
        for(;f<hisTime.length;f++){
            localStorage.removeItem(hisTime[f]);
        }
        init();
    });

    //苹果手机不兼容出现input无法取值以下是解决方法
    $( ".delete" ).on( "click", ".word-break", function() {
        var div = $(this).text();
        $('#billCode').val(div);
    });
});

/**
 * 查询物流轨迹
 */
function getScanByCode(){
    window.location.href = "waybilldetail?code="+$("#code").val();
}

//判断是否不为空，是就返回true，否则返回false
function IsNotNull(str) {
    if (str == '' || str == null || str == undefined || str == "") {
        return false;
    }
    return true;
}
//弹出提示框
function showTooltip(t){
    var MyTooltip = "<div class=\"my_tooltip\">"+t+"</div>"
    $("body").append(MyTooltip)
    setInterval(function() {
            $(".my_tooltip").remove()
        },
        1500)
}