package com.brecho.Brecho.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brecho.Brecho.model.Brecho;
import com.brecho.Brecho.model.Categoria;
import com.brecho.Brecho.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

	public List<Produto> findByNomeContainingIgnoreCase(String nome);
	
	public List<Produto> findByBrecho(Brecho brecho);

	public List<Produto> findByCategoria(Categoria categoria);
}