package ru.babin.pm.util;

public class NumberUtil {
	
	public static int getAsInt(String str){
		StringBuilder sb = new StringBuilder();
		for(char c : str.toCharArray()){
			if("0123456789".indexOf(c) >= 0){
				sb.append(c);
			}
		}
		return sb.length() == 0 ? 0 : Integer.valueOf(sb.toString());
	}
	
}
