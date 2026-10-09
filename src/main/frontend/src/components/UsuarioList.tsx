import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";

interface Props {
    usuarios: Usuario[];
    onEditar: (u: Usuario) => void;
    onExcluir: (id: number) => void;
}

function UsuarioList({ usuarios, onEditar, onExcluir }: Props) {
    return (
        <div className="grid">
            {usuarios.map((u) => (
                <UsuarioItem key={u.id} usuario={u} onEditar={onEditar} onExcluir={onExcluir} />
            ))}
        </div>
    );
}

export default UsuarioList;