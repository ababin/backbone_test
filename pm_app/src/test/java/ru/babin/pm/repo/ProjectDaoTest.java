package ru.babin.pm.repo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import ru.babin.pm.TransactBaseTest;
import ru.babin.pm.dao.model.Project;


public class ProjectDaoTest  extends TransactBaseTest{
	
	@Autowired
	private ProjectRepository pRepo;
	
	@Test
	public void count(){
		long c = pRepo.count();
		assertEquals(c, 0L);
	}
	
	@Test
	public void create(){
		Project p = new Project();
		p.setName("name");
		p.setDesc("desc af asdfasdf asdf");
		p = pRepo.save(p);
		assertNotNull(p.getId());
		
		long c = pRepo.count();
		assertEquals(c, 1L);
	}
	
	
	
}
