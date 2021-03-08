package com.brecho.Brecho.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.brecho.Brecho.model.Categoria;
import com.brecho.Brecho.repository.CategoriaRepository;

@Service
public class CategoriaService {

	@Autowired CategoriaRepository repository;
	
	public List<Categoria> findAll(){
		return repository.findAll();
	}
	
	public Categoria findById(Long id){
		return repository.findById(id)
				.map(resp->(resp))
				.orElse(null);
	}
	
	public List<Categoria> findByTipo(String tipo){
		return repository.findAllByTipoLikeIgnoreCase(tipo);
	}
	
	public Categoria save(@Validated @RequestBody Categoria categoria) {
		return repository.save(categoria);
	}
	
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}
}
