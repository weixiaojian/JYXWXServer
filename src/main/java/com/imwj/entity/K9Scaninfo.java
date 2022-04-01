package com.imwj.entity;

import lombok.Data;

import java.util.List;

@Data
public class K9Scaninfo {
	private boolean success;
    private String errorCode;
    private int count;
    private List<ScanInfo> k9ScanInfo;
    private List<ScanInfo> ztScanInfo;
}
