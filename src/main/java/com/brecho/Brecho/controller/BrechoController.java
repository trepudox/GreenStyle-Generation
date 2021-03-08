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
import com.brecho.Brecho.service.BrechoService;

@RestController
@CrossOrigin(origins="*", allowedHeaders = "*")
@RequestMapping("/brecho")
public class BrechoController {
	
	@Autowired
	private BrechoService service;
	
	@GetMapping
	public ResponseEntity<List<Brecho>> findAll(){
		return new ResponseEntity<List<Brecho>>(service.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Brecho> findById(@PathVariable Long id){
		return new ResponseEntity<Brecho>(service.findById(id), HttpStatus.OK);		
	}
	
	@GetMapping("/nomeBrecho/{nome}")
	public ResponseEntity<List<Brecho>> findByNome(@PathVariable String nome){
		return new ResponseEntity<List<Brecho>>(service.findByName(nome), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Brecho> postBrecho(@Validated @RequestBody Brecho brecho){
		return new ResponseEntity<Brecho>(service.save(brecho), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<Brecho> putBrecho(@Validated @RequestBody Brecho brecho){
		return new ResponseEntity<Brecho>(service.save(brecho), HttpStatus.OK);
	}
	
	@DeleteMapping("/deletarBrecho/{id}")
	public void deleteBrecho(@PathVariable Long id) {
		service.deleteById(id);
	}
}
