import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioForm from "../components/UsuarioForm";
import UsuarioList from "../components/UsuarioList";

function UsuariosPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [editando, setEditando] = useState<Usuario | null>(null);

    function carregar() {
        api.get<Usuario[]>("/usuarios").then((r) => setUsuarios(r.data));
    }

    useEffect(() => {
        carregar();
    }, []);

    async function excluir(id: number) {
        await api.delete(`/usuarios/${id}`);
        carregar();
    }

    return (
        <section>
            <h2>Usuários</h2>
            <UsuarioForm
                usuarioEditando={editando}
                onSalvo={() => {
                    carregar();
                    setEditando(null);
                }}
                onCancelar={() => setEditando(null)}
            />
            <UsuarioList usuarios={usuarios} onEditar={setEditando} onExcluir={excluir} />
        </section>
    );
}

export default UsuariosPage;