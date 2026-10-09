import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { isAxiosError } from "axios";
import api from "../services/api";
import type { Pokemon } from "../types/Pokemon";

interface Props {
    pokemonEditando: Pokemon | null;
    onSalvo: () => void;
    onCancelar: () => void;
}

const vazio: Pokemon = { numero: 252, nome: "", tipo1: "", tipo2: "", descricao: "", imagemUrl: "" };

function PokemonForm({ pokemonEditando, onSalvo, onCancelar }: Props) {
    const [form, setForm] = useState<Pokemon>(vazio);
    const [erro, setErro] = useState("");

    useEffect(() => {
        setForm(pokemonEditando ?? vazio);
        setErro("");
    }, [pokemonEditando]);

    function alterar(campo: keyof Pokemon, valor: string | number) {
        setForm({ ...form, [campo]: valor });
    }

    async function enviar(e: FormEvent) {
        e.preventDefault();
        try {
            if (pokemonEditando) {
                await api.put(`/pokemons/${pokemonEditando.id}`, form);
            } else {
                await api.post("/pokemons", form);
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
            <input type="number" value={form.numero} onChange={(e) => alterar("numero", Number(e.target.value))} placeholder="Nº (252-386)" />
            <input value={form.nome} onChange={(e) => alterar("nome", e.target.value)} placeholder="Nome" />
            <input value={form.tipo1} onChange={(e) => alterar("tipo1", e.target.value)} placeholder="Tipo 1" />
            <input value={form.tipo2} onChange={(e) => alterar("tipo2", e.target.value)} placeholder="Tipo 2 (opcional)" />
            <input value={form.imagemUrl} onChange={(e) => alterar("imagemUrl", e.target.value)} placeholder="Imagem (ex: /pokemon/252.png)" />
            <input value={form.descricao} onChange={(e) => alterar("descricao", e.target.value)} placeholder="Descrição" />
            <button type="submit">{pokemonEditando ? "Salvar alterações" : "Cadastrar"}</button>
            {pokemonEditando && (
                <button type="button" className="secundario" onClick={onCancelar}>Cancelar</button>
            )}
            {erro && <p className="erro">{erro}</p>}
        </form>
    );
}

export default PokemonForm;