package com.imwj.entity;

import lombok.Data;

import java.util.Date;

@Data
public class ScanInfo {
	private String content;
	private Date scanDate;
	//扫描时间
	private String scandate1;
	//扫描时间2
	private String scandate2;
}
