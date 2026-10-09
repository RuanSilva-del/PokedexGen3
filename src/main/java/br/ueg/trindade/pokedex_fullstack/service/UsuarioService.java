package br.ueg.trindade.pokedex_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.pokedex_fullstack.model.Usuario;
import br.ueg.trindade.pokedex_fullstack.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    public Usuario salvar(Usuario usuario) {
        validarCampos(usuario);
        if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A senha é obrigatória");
        }
        validarUnicos(usuario, null);
        return repository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario novo) {
        validarCampos(novo);
        Usuario atual = buscar(id);
        validarUnicos(novo, id);
        atual.setNome(novo.getNome());
        atual.setUsername(novo.getUsername());
        atual.setEmail(novo.getEmail());
        // só troca a senha se uma nova for enviada
        if (novo.getSenha() != null && !novo.getSenha().isBlank()) {
            atual.setSenha(novo.getSenha());
        }
        return repository.save(atual);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

    private void validarCampos(Usuario u) {
        if (u.getNome() == null || u.getNome().isBlank()
                || u.getUsername() == null || u.getUsername().isBlank()
                || u.getEmail() == null || u.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Nome, username e e-mail são obrigatórios");
        }
    }

    // REGRA DE NEGÓCIO: username e e-mail não podem repetir
    private void validarUnicos(Usuario u, Long idAtual) {
        repository.findByUsername(u.getUsername()).ifPresent(outro -> {
            if (!outro.getId().equals(idAtual)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esse username já está em uso");
            }
        });
        repository.findByEmail(u.getEmail()).ifPresent(outro -> {
            if (!outro.getId().equals(idAtual)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esse e-mail já está em uso");
            }
        });
    }
}