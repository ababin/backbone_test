package ru.babin.pm.dao.model;

import javax.persistence.Entity;


@Entity
public class Project {
		
	@javax.persistence.Id
	@javax.persistence.GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
	@javax.persistence.Column(name = "ID", nullable = false)
	private Long id;

	@javax.persistence.Column(name = "NAME", length = 200, nullable=false)
	private String name;

	@javax.persistence.Column(name = "description", length=4000)
	private String desc;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
		
	public String toString(){
		return this.getClass().getSimpleName() + ":{" + 
				"id=" + id + "; " + 
				"name=" + name + "; " + 
				"desc=" + desc + "; " + 
			"}";
	}

}
