package com.brecho.Brecho.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brecho.Brecho.model.Produto;
import com.brecho.Brecho.repository.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	public List<Produto> encontrarTodos() {
		return produtoRepository.findAll();
	}
	
	public List<Produto> findByName (String nome){
		
		return produtoRepository.findByNomeContainingIgnoreCase(nome);
	}
	
	public List<Produto> findDisponivel (boolean disp)
	{
		return produtoRepository.findByDisponivel(disp);
	}
	
	public void deleteProduto (long id)
	{
		produtoRepository.deleteById(id);
	}
	
}
