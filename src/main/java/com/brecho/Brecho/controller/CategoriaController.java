package com.brecho.Brecho.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brecho.Brecho.repository.CategoriaRepository;

@RestController
public class CategoriaController {
	@Autowired
	private CategoriaRepository repository;
	
}
