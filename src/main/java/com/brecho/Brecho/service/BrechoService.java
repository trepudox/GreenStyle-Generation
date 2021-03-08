package com.brecho.Brecho.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brecho.Brecho.model.Brecho;
import com.brecho.Brecho.repository.BrechoRepository;

@Service
public class BrechoService {

	@Autowired
	private BrechoRepository repository;
	
	public List<Brecho> findAll(){
		return repository.findAll();
	}
	
	public Brecho findById(Long id){
		return repository.findById(id)
				.map(resp->(resp))
				.orElse(null);
	}
	
	public List<Brecho> findByName(String nome){
		return repository.findAllByNomeContainingIgnoreCase(nome);
	}
}
