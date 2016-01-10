package ru.babin.pm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.babin.pm.api.PagedResultList;
import ru.babin.pm.dao.model.Project;
import ru.babin.pm.repo.ProjectRepository;


@Controller
@RequestMapping(value = "/projects")
public class ProjectController {
	
	@Autowired
	ProjectRepository repo;
		
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody	
	public PagedResultList<Project> getCollection(@RequestParam(value="page", defaultValue="-1") int page, @RequestParam(value="pageSize",defaultValue="10") int pageSize) {
		PagedResultList<Project> res = new PagedResultList<Project>();
		page = page < 0 ? 1 : page;
		Page <Project> p = repo.findAll(new PageRequest(page-1, pageSize));
		res.page = p.getNumber() + 1;
		res.pageSize = p.getSize();
		res.total = p.getTotalElements();
		res.setData(p.getContent());
		return res;
	}

	@RequestMapping(method = RequestMethod.POST, consumes="application/json", produces="application/json")
	@ResponseBody	
	public Project createNew(@RequestBody Project pr) {
		Project p = new Project();
		p.setName(pr.getName());
		p.setDesc(pr.getDesc());
		p = repo.save(p);
		return p;
	}

	
	
}


