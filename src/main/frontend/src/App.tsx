import PokemonsPage from "./pages/PokemonsPage";
import UsuariosPage from "./pages/UsuariosPage";
import PermissoesPage from "./pages/PermissoesPage";
import "./App.css";

function App() {
  return (
    <div className="pagina">
      <header>
        <h1>Pokédex Hoenn</h1>
      </header>
      <div className="app">
        <PokemonsPage />
        <UsuariosPage />
        <PermissoesPage />
      </div>
    </div>
  );
}

export default App;