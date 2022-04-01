//ios12输入框兼容性问题
$("input,select").blur(function(){   
    setTimeout(function() {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
})
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
//生成订单号
function saveOrCode(){
    var d = new Date();
    var year = d.getFullYear(); //获取年 
    var month = d.getMonth();//获取月  
    var day = d.getDate();
    var hours = d.getHours();//获取小时
    var mi = d.getMinutes();//获取分钟
    var x = 99;
    var y = 10;
    var rand = parseInt(Math.random() * (x - y + 1) + y);//随机数
    var yearStr = year+"";
    var yearStr = yearStr.substring(2,4);
    var monthStr="";
    var dayStr = "";
    if(month<10){
        monthStr="0"+(month+1);
    }else{
        monthStr=""+(month+1);
    }
    if(day<10){
        dayStr="0"+day;
    }else{
        dayStr=""+day;
    }
    var YcCode = "DD"+""+yearStr+""+monthStr+""+dayStr+""+hours+""+mi+""+rand;
    return YcCode;
}

function showTooltip(t){
    var MyTooltip = "<div class=\"my_tooltip\">"+t+"</div>"
    $("body").append(MyTooltip)
    setInterval(function() {
            $(".my_tooltip").remove()
        },
        1500)
}
//判断是否不为空，是就返回true，否则返回false
function IsNotNull(str) {
    if (str == '' || str == null || str == undefined || str == "") {
        return false;
    }
    return true;
}
// 判断输入的字符是否为英文字母
function IsLetter(str) {
    if (str.length != 0) {
        reg = /^[a-zA-Z]+$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}
// 判断输入的字符是否为汉字 英文 数字
function IsCnEnNumer(str) {
    if (str.length != 0) {
        reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}
// 判断输入的字符是否为数字（整数/小数）
function isNumber(s) {
    var regu = "^[0-9]+\.?[0-9]*$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
// 判断输入的字符是否为整数
function IsInteger(str) {
    if (str.length != 0) {
        reg = /^[-+]?\d*$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}
// 判断输入的字符是否为双精度
function IsDouble(str) {
    if (str.length != 0) {
        reg = /^[-\+]?\d+(\.\d+)?$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}
// 判断输入的字符是否为:a-z,A-Z,0-9
function IsString(str) {
    if (str.length != 0) {
        reg = /^[a-zA-Z0-9_]+$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}
// 判断输入的EMAIL格式是否正确
function IsEmail(str) {
    if (str.length != 0) {
        reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}
// 判断输入的手机是否正确
function IsMobile(str) {
    if (str.length != 0) {
        reg = /^1\d{10}$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}
//精确手机号判断
function IsCnPhone(str) {
    if (str.length != 0) {
        reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}

// 判断输入的电话是否正确
function IsTelePhone(str) {
    if (str.length != 0) {
        reg = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
        if (!reg.test(str)) {
            return false;
        }
    }
    return true;
}