package br.ueg.trindade.pokedex_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.pokedex_fullstack.model.Pokemon;
import br.ueg.trindade.pokedex_fullstack.repository.PokemonRepository;

@Service
public class PokemonService {

    private final PokemonRepository repository;

    public PokemonService(PokemonRepository repository) {
        this.repository = repository;
    }

    public List<Pokemon> listar() {
        return repository.findAll();
    }

    public Pokemon buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokémon não encontrado"));
    }

    public Pokemon salvar(Pokemon pokemon) {
        validar(pokemon);
        if (repository.existsByNumero(pokemon.getNumero())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esse número já está cadastrado");
        }
        return repository.save(pokemon);
    }

    public Pokemon atualizar(Long id, Pokemon novo) {
        validar(novo);
        Pokemon atual = buscar(id);
        repository.findByNumero(novo.getNumero()).ifPresent(outro -> {
            if (!outro.getId().equals(id)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esse número já está cadastrado");
            }
        });
        atual.setNumero(novo.getNumero());
        atual.setNome(novo.getNome());
        atual.setTipo1(novo.getTipo1());
        atual.setTipo2(novo.getTipo2());
        atual.setDescricao(novo.getDescricao());
        atual.setImagemUrl(novo.getImagemUrl());
        return repository.save(atual);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

    // REGRA DE NEGÓCIO: só aceita Pokémon da 3ª geração (252 a 386)
    private void validar(Pokemon p) {
        if (p.getNumero() == null || p.getNumero() < 252 || p.getNumero() > 386) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Pokémon da Gen 3 têm número entre 252 e 386");
        }
    }
}