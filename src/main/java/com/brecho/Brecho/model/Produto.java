package com.brecho.Brecho.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data @Getter @Setter
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

}
