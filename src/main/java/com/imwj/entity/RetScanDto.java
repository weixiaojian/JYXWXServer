package com.imwj.entity;

import lombok.Data;

import java.util.List;

/**
 * @author LANGAO
 * @date 2021-10-01 17:31:17
 */
@Data
public class RetScanDto {

    //类型
    private String type;
    //已用时
    private String elapsedTime;
    //运单号
    private String billCode;
    //运输类型
    private String tranType;
    //扫描轨迹
    private List<ScanInfo> k9ScanList;
    private List<ScanInfo> ztdScanList;
}
