import type { Usuario } from "../types/Usuario";

interface Props {
    usuario: Usuario;
    onEditar: (u: Usuario) => void;
    onExcluir: (id: number) => void;
}

function UsuarioItem({ usuario, onEditar, onExcluir }: Props) {
    return (
        <div className="card">
            <h3>{usuario.nome}</h3>
            <p>@{usuario.username}</p>
            <p>{usuario.email}</p>
            <div className="acoes">
                <button onClick={() => onEditar(usuario)}>Editar</button>
                <button className="perigo" onClick={() => onExcluir(usuario.id!)}>Excluir</button>
            </div>
        </div>
    );
}

export default UsuarioItem;