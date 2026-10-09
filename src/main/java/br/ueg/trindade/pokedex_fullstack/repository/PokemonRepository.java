package br.ueg.trindade.pokedex_fullstack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.pokedex_fullstack.model.Pokemon;

public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
    boolean existsByNumero(Integer numero);

    Optional<Pokemon> findByNumero(Integer numero);
}