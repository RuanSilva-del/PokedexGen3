import type { Pokemon } from "../types/Pokemon";
import PokemonItem from "./PokemonItem";

interface Props {
    pokemons: Pokemon[];
    onEditar: (p: Pokemon) => void;
    onExcluir: (id: number) => void;
}

function PokemonList({ pokemons, onEditar, onExcluir }: Props) {
    return (
        <div className="grid">
            {pokemons.map((p) => (
                <PokemonItem key={p.id} pokemon={p} onEditar={onEditar} onExcluir={onExcluir} />
            ))}
        </div>
    );
}

export default PokemonList;