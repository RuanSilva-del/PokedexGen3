package br.ueg.trindade.pokedex_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.pokedex_fullstack.model.Permissao;
import br.ueg.trindade.pokedex_fullstack.repository.PermissaoRepository;

@Service
public class PermissaoService {

    private final PermissaoRepository repository;

    public PermissaoService(PermissaoRepository repository) {
        this.repository = repository;
    }

    public List<Permissao> listar() {
        return repository.findAll();
    }

    public Permissao buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permissão não encontrada"));
    }

    public Permissao salvar(Permissao permissao) {
        validar(permissao);
        return repository.save(permissao);
    }

    public Permissao atualizar(Long id, Permissao nova) {
        validar(nova);
        Permissao atual = buscar(id);
        atual.setNome(nova.getNome());
        atual.setDescricao(nova.getDescricao());
        return repository.save(atual);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

    // REGRA DE NEGÓCIO: o nome é obrigatório
    private void validar(Permissao p) {
        if (p.getNome() == null || p.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome da permissão é obrigatório");
        }
    }
}