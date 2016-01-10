package ru.babin.pm.util;

public class EqualsUtil {
			
	public static boolean equals(Object a, Object b){
		if(a == null && b == null){
			return true;
		}
		
		if(a != null){
			return a.equals(b);
		}
		if(b != null){
			return b.equals(a);
		}
		return false;
	}
	
	
	
	
}
