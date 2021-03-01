package com.brecho.Brecho.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brecho.Brecho.model.Brecho;
import com.brecho.Brecho.repository.BrechoRepository;

@RestController
@CrossOrigin(origins="*", allowedHeaders = "*")
@RequestMapping("/brecho")
public class BrechoController {
	
	@Autowired
	private BrechoRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Brecho>> findAll(){
		return ResponseEntity.status(HttpStatus.OK).body(repository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Brecho> findById(@PathVariable Long id){
		return repository.findById(id)
				.map(resp -> ResponseEntity.status(HttpStatus.OK).body(resp))
				.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());		
	}
	
	@GetMapping("/nomeBrecho/{nome}")
	public ResponseEntity<List<Brecho>> findByNome(@PathVariable String nome){
		return ResponseEntity.status(HttpStatus.OK).body(repository.findAllByNomeContainingIgnoreCase(nome));
	}
	
	@PostMapping
	public ResponseEntity<Brecho> postBrecho(@Validated @RequestBody Brecho brecho){
		return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(brecho));
	}
	
	@PutMapping
	public ResponseEntity<Brecho> putBrecho(@Validated @RequestBody Brecho brecho){
		return ResponseEntity.status(HttpStatus.OK).body(repository.save(brecho));
	}
	
	@DeleteMapping("/deletarBrecho/{id}")
	public void deleteBrecho(@PathVariable Long id) {
		repository.deleteById(id);
	}

}
