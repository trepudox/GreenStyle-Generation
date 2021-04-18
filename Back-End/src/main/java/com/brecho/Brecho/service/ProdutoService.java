package com.brecho.Brecho.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brecho.Brecho.model.Brecho;
import com.brecho.Brecho.model.Categoria;
import com.brecho.Brecho.model.Produto;
import com.brecho.Brecho.repository.BrechoRepository;
import com.brecho.Brecho.repository.CategoriaRepository;
import com.brecho.Brecho.repository.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private BrechoRepository brechoRepository;
	
	@Autowired
	private CategoriaRepository categoriaRepository;

	public List<Produto> findAll() {
		return produtoRepository.findAll();
	}

	public List<Produto> findByName(String nome) {
		return produtoRepository.findByNomeContainingIgnoreCase(nome);
	}
	
	public List<Produto> findByBrecho(Long id){
		Optional<Brecho> b = brechoRepository.findById(id);
		
		if(b.isPresent()) {
			return produtoRepository.findByBrecho(b.get());
		}
		else {
			List<Produto> listEmpty = new ArrayList<>();
			return  listEmpty;
		}
	}

	public void deleteProduto(long id) {
		produtoRepository.deleteById(id);
	}

	public Optional<Produto> findById(Long id) {
		return produtoRepository.findById(id);
	}

	public Produto save(Produto produto) {
		return produtoRepository.save(produto);
	}

	public List<Produto> findByCategoria(Long id){
		Optional<Categoria> b = categoriaRepository.findById(id);
		
		if(b.isPresent()) {
			return produtoRepository.findByCategoria(b.get());
		}
		else {
			List<Produto> listEmpty = new ArrayList<>();
			return  listEmpty;
		}
	}
}
