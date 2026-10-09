import type { Permissao } from "../types/Permissao";

interface Props {
    permissao: Permissao;
    onEditar: (p: Permissao) => void;
    onExcluir: (id: number) => void;
}

function PermissaoItem({ permissao, onEditar, onExcluir }: Props) {
    return (
        <div className="card">
            <h3>{permissao.nome}</h3>
            <p>{permissao.descricao}</p>
            <div className="acoes">
                <button onClick={() => onEditar(permissao)}>Editar</button>
                <button className="perigo" onClick={() => onExcluir(permissao.id!)}>Excluir</button>
            </div>
        </div>
    );
}

export default PermissaoItem;