package com.brecho.Brecho.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brecho.Brecho.model.Brecho;

@Repository
public interface BrechoRepository extends JpaRepository<Brecho, Long> {
	public List<Brecho> findAllByNomeContainingIgnoreCase(String nome);
}
