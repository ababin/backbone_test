package ru.babin.pm.repo;

import org.springframework.data.repository.PagingAndSortingRepository;

import ru.babin.pm.dao.model.Project;


public interface ProjectRepository extends PagingAndSortingRepository<Project , Long>{}
