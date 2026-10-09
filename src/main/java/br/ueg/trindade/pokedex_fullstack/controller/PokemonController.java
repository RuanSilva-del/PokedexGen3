package br.ueg.trindade.pokedex_fullstack.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.pokedex_fullstack.model.Pokemon;
import br.ueg.trindade.pokedex_fullstack.service.PokemonService;

@RestController
@RequestMapping("/api/pokemons")
@CrossOrigin(origins = "http://localhost:5173")
public class PokemonController {

    private final PokemonService service;

    public PokemonController(PokemonService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pokemon> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Pokemon buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Pokemon criar(@RequestBody Pokemon pokemon) {
        return service.salvar(pokemon);
    }

    @PutMapping("/{id}")
    public Pokemon atualizar(@PathVariable Long id, @RequestBody Pokemon pokemon) {
        return service.atualizar(id, pokemon);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}