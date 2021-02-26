package com.brecho.Brecho.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.brecho.Brecho.repository.ProdutoRepository;

@RestController
public class ProdutoController {

	@Autowired
	private ProdutoRepository repository;
	
}
