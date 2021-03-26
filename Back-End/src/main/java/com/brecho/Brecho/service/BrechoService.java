package com.brecho.Brecho.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

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
	
	public Brecho save (Brecho brecho){
		return repository.save(brecho);
	}		
	
	public ResponseEntity<Brecho> putBrecho(@RequestBody Brecho brecho){
		return ResponseEntity.status(HttpStatus.OK).body(repository.save(brecho));	
	}		

	public void deleteById(@PathVariable Long id) {
		repository.findById(id).map( resp -> {
			repository.delete(resp);
			return Void.TYPE;
			});
	}	
}
