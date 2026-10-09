import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { isAxiosError } from "axios";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";

interface Props {
    permissaoEditando: Permissao | null;
    onSalvo: () => void;
    onCancelar: () => void;
}

const vazio: Permissao = { nome: "", descricao: "" };

function PermissaoForm({ permissaoEditando, onSalvo, onCancelar }: Props) {
    const [form, setForm] = useState<Permissao>(vazio);
    const [erro, setErro] = useState("");

    useEffect(() => {
        setForm(permissaoEditando ?? vazio);
        setErro("");
    }, [permissaoEditando]);

    async function enviar(e: FormEvent) {
        e.preventDefault();
        try {
            if (permissaoEditando) {
                await api.put(`/permissoes/${permissaoEditando.id}`, form);
            } else {
                await api.post("/permissoes", form);
            }
            setForm(vazio);
            setErro("");
            onSalvo();
        } catch (err) {
            if (isAxiosError(err)) {
                setErro(err.response?.data?.message ?? "Erro ao salvar");
            } else {
                setErro("Erro ao salvar");
            }
        }
    }

    return (
        <form className="formulario" onSubmit={enviar}>
            <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome (ex: ADMIN)" />
            <input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Descrição" />
            <button type="submit">{permissaoEditando ? "Salvar alterações" : "Cadastrar"}</button>
            {permissaoEditando && (
                <button type="button" className="secundario" onClick={onCancelar}>Cancelar</button>
            )}
            {erro && <p className="erro">{erro}</p>}
        </form>
    );
}

export default PermissaoForm;