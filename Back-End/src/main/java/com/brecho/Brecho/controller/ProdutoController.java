package com.brecho.Brecho.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brecho.Brecho.model.Produto;
import com.brecho.Brecho.service.ProdutoService;

@RestController
@RequestMapping("/produto")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class ProdutoController {
	
	@Autowired
	private ProdutoService service;
	
	@GetMapping
	public ResponseEntity<List<Produto>> findAll() {
		return service.findAll().size() == 0 ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : 
			ResponseEntity.status(HttpStatus.OK).body(service.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Produto> findById(@PathVariable(name="id") Long id) {
		return service.findById(id).isEmpty() ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : 
			ResponseEntity.status(HttpStatus.OK).body(service.findById(id).get());
	}
	
	@GetMapping("/nomeProduto/{nome}")
	public ResponseEntity<List<Produto>> findByNomeContaining(@PathVariable(name="nome") String nome) {
		return service.findByName(nome).size() == 0 ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : 
			ResponseEntity.status(HttpStatus.OK).body(service.findByName(nome));
	}
	
	@GetMapping("/brecho/{id}")
	public ResponseEntity<List<Produto>> findByBrecho(@PathVariable Long id){
		return service.findByBrecho(id).isEmpty() ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
			ResponseEntity.status(HttpStatus.OK).body(service.findByBrecho(id));
	}
	
	@GetMapping("/categoria/{id}")
	public ResponseEntity<List<Produto>> findByCategoria(@PathVariable Long id){
		return service.findByCategoria(id).isEmpty() ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
			ResponseEntity.status(HttpStatus.OK).body(service.findByCategoria(id));
	}
	
	@PostMapping
	public ResponseEntity<Produto> post (@Validated @RequestBody Produto produto){
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(produto));
	}
	
	@PutMapping
	public ResponseEntity<Produto> put (@Validated @RequestBody Produto produto){
		return ResponseEntity.ok(service.save(produto));
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		service.deleteProduto(id);
	}

	
}
