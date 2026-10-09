import type { Pokemon } from "../types/Pokemon";

interface Props {
    pokemon: Pokemon;
    onEditar: (p: Pokemon) => void;
    onExcluir: (id: number) => void;
}

function PokemonItem({ pokemon, onEditar, onExcluir }: Props) {
    return (
        <div className="card">
            {pokemon.imagemUrl ? (
                <img src={pokemon.imagemUrl} alt={pokemon.nome} />
            ) : (
                <div className="sem-imagem">?</div>
            )}
            <span className="numero">#{pokemon.numero}</span>
            <h3>{pokemon.nome}</h3>
            <div className="tipos">
                <span className="tipo">{pokemon.tipo1}</span>
                {pokemon.tipo2 && <span className="tipo">{pokemon.tipo2}</span>}
            </div>
            <p>{pokemon.descricao}</p>
            <div className="acoes">
                <button onClick={() => onEditar(pokemon)}>Editar</button>
                <button className="perigo" onClick={() => onExcluir(pokemon.id!)}>Excluir</button>
            </div>
        </div>
    );
}

export default PokemonItem;