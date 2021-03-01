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
import com.brecho.Brecho.repository.ProdutoRepository;

@RestController
@RequestMapping("/produto")
@CrossOrigin("*")
public class ProdutoController {

	@Autowired
	private ProdutoRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Produto>> findAll() {
		return repository.findAll().size() == 0 ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : 
			ResponseEntity.status(HttpStatus.OK).body(repository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Produto> findById(@PathVariable(name="id") Long id) {
		return repository.findById(id).isEmpty() ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : 
			ResponseEntity.status(HttpStatus.OK).body(repository.findById(id).get());
	}
	
	@GetMapping("/nomeProduto/{nome}")
	public ResponseEntity<List<Produto>> findByNomeContaining(@PathVariable(name="nome") String nome) {
		return repository.findByNomeContainingIgnoreCase(nome).size() == 0 ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : 
			ResponseEntity.status(HttpStatus.OK).body(repository.findByNomeContainingIgnoreCase(nome));
	}
	
	@GetMapping("/disponivel/{disp}")
	public ResponseEntity<List<Produto>> findByDisponivel(@PathVariable Boolean disp) {
		return repository.findByDisponivel(disp).size() == 0 ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : 
			ResponseEntity.status(HttpStatus.OK).body(repository.findByDisponivel(disp));
	}

	@PostMapping
	public ResponseEntity<Produto> post (@Validated @RequestBody Produto produto){
		return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(produto));
	}
	
	@PutMapping
	public ResponseEntity<Produto> put (@Validated @RequestBody Produto produto){
		return ResponseEntity.ok(repository.save(produto));
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		repository.deleteById(id);
	}

	
}
