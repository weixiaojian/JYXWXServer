$(function () {

    var codeVal = $("#code").val();

    $.ajax({
        type: "GET",
        url: "waybilldetailData",
        data: {code: codeVal},
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            if(res.code == 200){
                $(".head h2").text(res.data.type);
                $(".head p em").text(res.data.elapsedTime);
                $(".head .billCode").text("运单号: "+res.data.billCode);
                $(".head .className").text("运输类型: "+res.data.tranType);

                var k9ScanList = res.data.k9ScanList;
                var ztdScanList = res.data.ztdScanList;
                var k9html = '';
                var ztdhtml = '';
                for(var i = k9ScanList.length-1; i >= 0; i--){
                    k9html = k9html + "<div class=\"item\"><time><em>"+k9ScanList[i].scandate1+"</em><br><i>"+k9ScanList[i].scandate2+"</i></time><div><p>"+k9ScanList[i].content+"</p></div></div>";
                }
                $(".content .item_list").html(k9html);
                for(var i = ztdScanList.length-1; i >= 0; i--){
                    ztdhtml = ztdhtml + "<div class=\"item\"><time><em>"+ztdScanList[i].scandate1+"</em><br><i>"+ztdScanList[i].scandate2+"</i></time><div><p>"+ztdScanList[i].content+"</p></div></div>";
                }
                $(".content .item_list_two").html(ztdhtml);
            }else {
                $(".content .item_list_two").html("<div class=\"item\"><img src=\"../images/no_data.png\"><p class=\"nodate\">暂无相关物流信息</p></div>");
            }
        }
    });

})