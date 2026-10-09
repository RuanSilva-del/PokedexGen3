import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { isAxiosError } from "axios";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";

interface Props {
    usuarioEditando: Usuario | null;
    onSalvo: () => void;
    onCancelar: () => void;
}

const vazio: Usuario = { nome: "", username: "", email: "", senha: "" };

function UsuarioForm({ usuarioEditando, onSalvo, onCancelar }: Props) {
    const [form, setForm] = useState<Usuario>(vazio);
    const [erro, setErro] = useState("");

    useEffect(() => {
        setForm(usuarioEditando ? { ...usuarioEditando, senha: "" } : vazio);
        setErro("");
    }, [usuarioEditando]);

    async function enviar(e: FormEvent) {
        e.preventDefault();
        try {
            if (usuarioEditando) {
                await api.put(`/usuarios/${usuarioEditando.id}`, form);
            } else {
                await api.post("/usuarios", form);
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
            <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome" />
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" />
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-mail" />
            <input
                type="password"
                value={form.senha ?? ""}
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
                placeholder={usuarioEditando ? "Nova senha (opcional)" : "Senha"}
            />
            <button type="submit">{usuarioEditando ? "Salvar alterações" : "Cadastrar"}</button>
            {usuarioEditando && (
                <button type="button" className="secundario" onClick={onCancelar}>Cancelar</button>
            )}
            {erro && <p className="erro">{erro}</p>}
        </form>
    );
}

export default UsuarioForm;