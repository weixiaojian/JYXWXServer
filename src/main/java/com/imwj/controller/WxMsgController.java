package com.imwj.controller;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONUtil;
import com.imwj.entity.K9Scaninfo;
import com.imwj.entity.RetScanDto;
import com.imwj.entity.ScanInfo;
import com.imwj.util.RetResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 微信msg控制类
 *
 * @author langao_q
 * @since 2020-07-28 9:51
 */
@Slf4j
@Controller
@RequestMapping("/msg")
public class WxMsgController {

    private String K9_SCAN_URL = "http://khsend.ztoglobal.com:8618/JPZZTScanInfoZTInterface/K9/queryScanInfo.do";

    private final SimpleDateFormat sdf2 = new SimpleDateFormat("MM-dd");
    private final SimpleDateFormat sdf3 = new SimpleDateFormat("HH:mm");

    /**
     * 跳转到轨迹查询界面
     */
    @RequestMapping("/index")
    public String index() {
        return "queryScan";
    }

    /**
     * 轨迹查询展示页面
     */
    @RequestMapping("/waybilldetail")
    public String waybilldetail(Model model, String code) {
        model.addAttribute("code", code);
        return "waybilldetail";
    }

    @ResponseBody
    @RequestMapping("/waybilldetailData")
    public RetResult waybilldetailData(String code) {
        RetScanDto retScanDto = new RetScanDto();
        List<ScanInfo> restK9List = new ArrayList<>();
        List<ScanInfo> restZtdList = new ArrayList<>();
        Long days = 1L;
        Long hours = 1L;
        try{
            Map<String,Object> mapK9 = new HashMap<String,Object>();
            mapK9.put("billCodes", "["+code+"]");
            log.info("k9查询请求参数：" + code);
            String result = HttpUtil.post(K9_SCAN_URL,mapK9);
            log.info("k9查询响应参数：" + result);
            K9Scaninfo resultK9 = JSONUtil.toBean(result, K9Scaninfo.class);

            List<ScanInfo> k9ScaninfoList =  resultK9.getK9ScanInfo();
            for(ScanInfo k9ScanInfo : k9ScaninfoList){
                ScanInfo scanInfo = new ScanInfo();
                String date = sdf2.format(k9ScanInfo.getScanDate());
                String time = sdf3.format(k9ScanInfo.getScanDate());
                scanInfo.setScanDate(k9ScanInfo.getScanDate());
                scanInfo.setScandate1(date);
                scanInfo.setScandate2(time);
                if(k9ScanInfo.getContent().contains("收件")||k9ScanInfo.getContent().contains("揽收")){
                    retScanDto.setType("已收件");
                    scanInfo.setContent(k9ScanInfo.getContent());
                }else if(k9ScanInfo.getContent().contains("发往")){
                    retScanDto.setType("运输中");
                    scanInfo.setContent(k9ScanInfo.getContent());
                }else if(k9ScanInfo.getContent().contains("到达")){
                    retScanDto.setType("运输中");
                    scanInfo.setContent(k9ScanInfo.getContent());
                }else if(k9ScanInfo.getContent().contains("签收")){
                    retScanDto.setType("已签收");
                    scanInfo.setContent(k9ScanInfo.getContent());
                }else if(k9ScanInfo.getContent().contains("派件")){
                    retScanDto.setType("正在派件");
                    scanInfo.setContent(k9ScanInfo.getContent());
                }else if(k9ScanInfo.getContent().contains("问题件")){
                    retScanDto.setType("正在途中");
                    scanInfo.setContent(k9ScanInfo.getContent());
                }
                restK9List.add(scanInfo);
            }
            List<ScanInfo> ztdScanInfoList =  resultK9.getZtScanInfo();
            for(ScanInfo ztdScanInfo : ztdScanInfoList){
                ScanInfo scanInfo = new ScanInfo();
                String date = sdf2.format(ztdScanInfo.getScanDate());
                String time = sdf3.format(ztdScanInfo.getScanDate());
                scanInfo.setScanDate(ztdScanInfo.getScanDate());
                scanInfo.setScandate1(date);
                scanInfo.setScandate2(time);
                if(ztdScanInfo.getContent().contains("收件")||ztdScanInfo.getContent().contains("揽收")){
                    retScanDto.setType("已收件");
                    scanInfo.setContent(ztdScanInfo.getContent());
                }else if(ztdScanInfo.getContent().contains("发往")){
                    retScanDto.setType("运输中");
                    scanInfo.setContent(ztdScanInfo.getContent());
                }else if(ztdScanInfo.getContent().contains("到达")){
                    retScanDto.setType("运输中");
                    scanInfo.setContent(ztdScanInfo.getContent());
                }else if(ztdScanInfo.getContent().contains("签收")){
                    retScanDto.setType("已签收");
                    scanInfo.setContent(ztdScanInfo.getContent());
                }else if(ztdScanInfo.getContent().contains("派件")){
                    retScanDto.setType("正在派件");
                    scanInfo.setContent(ztdScanInfo.getContent());
                }else if(ztdScanInfo.getContent().contains("问题件")){
                    retScanDto.setType("正在途中");
                    scanInfo.setContent(ztdScanInfo.getContent());
                }
                restZtdList.add(scanInfo);
            }
            if(!k9ScaninfoList.isEmpty()){
                Date k9End = k9ScaninfoList.get(0).getScanDate();
                Date k9Start = k9ScaninfoList.get(k9ScaninfoList.size()-1).getScanDate();
                Long k9Mss = k9Start.getTime() - k9End.getTime();
                days = k9Mss / (1000 * 60 * 60 * 24);
                hours = (k9Mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
            }
            retScanDto.setK9ScanList(restK9List);
            retScanDto.setZtdScanList(restZtdList);
            retScanDto.setBillCode(code);
            retScanDto.setElapsedTime("已用时: "+days+"天"+hours+"时");
            retScanDto.setTranType("陆运");
            if(restK9List.isEmpty() && restZtdList.isEmpty()){
                return RetResult.warn("未查询到数据！");
            }
        }catch (Exception  e){
            log.error("轨迹查询异常：", e);
            return RetResult.warn("未查询到数据！");
        }
        return RetResult.success(retScanDto);
    }

    /**
     * 寄递规范页面
     */
    @RequestMapping("/sendStandard")
    public String sendStandard() {
        return "sendStandard";
    }

    /**
     * 价格表页面
     */
    @RequestMapping("/priceList")
    public String priceList() {
        return "priceList";
    }

}
