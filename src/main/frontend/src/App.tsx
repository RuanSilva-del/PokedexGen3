import PokemonsPage from "./pages/PokemonsPage";
import UsuariosPage from "./pages/UsuariosPage";
import PermissoesPage from "./pages/PermissoesPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>⚡ Pokédex Hoenn</h1>
      </header>
      <PokemonsPage />
      <UsuariosPage />
      <PermissoesPage />
    </div>
  );
}

export default App;