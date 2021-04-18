package com.brecho.Brecho.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Usuario {
    //atributos

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

	@NotNull private String nome;

    @NotNull private String sobrenome;

    @NotNull @Size(min = 11 , max = 11, message = "Mínimo de 11 caracteres e máximo de 11." ) private String cpf;
	
    @NotNull @Column(unique = true) private String email;
	
    @NotNull @Size(min = 6 ,  message = "Mínimo de 6 caracteres e máximo de 12." ) private String senha;
	
	@NotNull private String tipo;

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

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}
	
	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
    
}