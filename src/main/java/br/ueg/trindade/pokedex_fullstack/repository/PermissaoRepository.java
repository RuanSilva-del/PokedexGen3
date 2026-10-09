package br.ueg.trindade.pokedex_fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.pokedex_fullstack.model.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {
}