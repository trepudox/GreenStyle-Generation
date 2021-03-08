package com.brecho.Brecho.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(min = 5, max = 70, message = "minimo 5 e maximo 70")// add Message
	private String nome;

	@NotNull
	private double preco;

	@NotNull
	private double desconto;

	@NotNull
	@Size(min = 5, max = 300, message = "minimo 5 e max 300")
	private String descricao;

	@NotNull
	private boolean disponivel;

	@ManyToOne
	@JsonIgnoreProperties("produtos")
	private Categoria categoria;
	
	public Produto() {}

	@ManyToOne
	@JsonIgnoreProperties("produtos")
	private Brecho brecho;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

	public double getDesconto() {
		return desconto;
	}

	public void setDesconto(double desconto) {
		this.desconto = desconto;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public boolean isDisponivel() {
		return disponivel;
	}

	public void setDisponivel(boolean disponivel) {
		this.disponivel = disponivel;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public Brecho getBrecho() {
		return brecho;
	}

	public void setBrecho(Brecho brecho) {
		this.brecho = brecho;
	}
	
}
