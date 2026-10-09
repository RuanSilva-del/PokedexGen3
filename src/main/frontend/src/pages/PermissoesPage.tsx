import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoForm from "../components/PermissaoForm";
import PermissaoList from "../components/PermissaoList";

function PermissoesPage() {
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    const [editando, setEditando] = useState<Permissao | null>(null);

    function carregar() {
        api.get<Permissao[]>("/permissoes").then((r) => setPermissoes(r.data));
    }

    useEffect(() => {
        carregar();
    }, []);

    async function excluir(id: number) {
        await api.delete(`/permissoes/${id}`);
        carregar();
    }

    return (
        <section>
            <h2>Permissões</h2>
            <PermissaoForm
                permissaoEditando={editando}
                onSalvo={() => {
                    carregar();
                    setEditando(null);
                }}
                onCancelar={() => setEditando(null)}
            />
            <PermissaoList permissoes={permissoes} onEditar={setEditando} onExcluir={excluir} />
        </section>
    );
}

export default PermissoesPage;