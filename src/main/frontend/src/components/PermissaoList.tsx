import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";

interface Props {
    permissoes: Permissao[];
    onEditar: (p: Permissao) => void;
    onExcluir: (id: number) => void;
}

function PermissaoList({ permissoes, onEditar, onExcluir }: Props) {
    return (
        <div className="grid">
            {permissoes.map((p) => (
                <PermissaoItem key={p.id} permissao={p} onEditar={onEditar} onExcluir={onExcluir} />
            ))}
        </div>
    );
}

export default PermissaoList;