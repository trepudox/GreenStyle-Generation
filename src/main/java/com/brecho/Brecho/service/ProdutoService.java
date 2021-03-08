package com.brecho.Brecho.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.brecho.Brecho.model.Produto;
import com.brecho.Brecho.repository.ProdutoRepository;

@Service
public class ProdutoService {

	private ProdutoRepository produtoRepository;
	
	public List<Produto> encontrarTodos() {
		return produtoRepository.findAll();
	}
	
}
