package com.imwj;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * @author langao_q
 * @since 2021-03-01 16:32
 */
public class Test {

    public static void main(String[] args) {
        Map<String,Object> mapK9 = new HashMap<String,Object>();
        String url = "http://khsend.ztoglobal.com:8618/JPZZTScanInfoZTInterface/K9/queryScanInfo.do";
        mapK9.put("billCodes", "[75808553225729]");
        String resultK9 = HttpUtil.post(url,mapK9);
        System.out.println(resultK9);
    }

}
