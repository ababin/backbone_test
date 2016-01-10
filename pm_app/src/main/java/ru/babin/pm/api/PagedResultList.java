package ru.babin.pm.api;

import java.util.ArrayList;
import java.util.List;

public class PagedResultList<T> {
	
	public int page;
	public int pageSize;
	public long total;
	
	private List <T> data = new ArrayList<T>();
	
	public void add(T d){
		data.add(d);
	}
	
	public void setData(List <T> list){
		data = list;
	}
	
	public List<T> getData(){
		return data;
	}
	
}
