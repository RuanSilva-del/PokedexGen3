import { useEffect, useState } from "react";
import api from "../services/api";
import type { Pokemon } from "../types/Pokemon";
import PokemonForm from "../components/PokemonForm";
import PokemonList from "../components/PokemonList";

function PokemonsPage() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [editando, setEditando] = useState<Pokemon | null>(null);

    function carregar() {
        api.get<Pokemon[]>("/pokemons").then((r) => setPokemons(r.data));
    }

    useEffect(() => {
        carregar();
    }, []);

    async function excluir(id: number) {
        await api.delete(`/pokemons/${id}`);
        carregar();
    }

    return (
        <section>
            <h2>Pokédex de Hoenn</h2>
            <PokemonForm
                pokemonEditando={editando}
                onSalvo={() => {
                    carregar();
                    setEditando(null);
                }}
                onCancelar={() => setEditando(null)}
            />
            <PokemonList pokemons={pokemons} onEditar={setEditando} onExcluir={excluir} />
        </section>
    );
}

export default PokemonsPage;
