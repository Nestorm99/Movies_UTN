import { useState, useEffect } from 'react';
import { getPopularMovies } from './api.js'; // 1. Importamos la función de la API
import { Tarjeta } from './components/Tarjeta.jsx';
import { Contendor } from './components/Contenedor.jsx';

function App() {
  // 2. Creamos los estados globales para la app
  const [movies, setMovies] = useState([]); // Para guardar todas las películas
  const [searchTerm, setSearchTerm] = useState(''); // Para guardar el texto del buscador
  const [loading, setLoading] = useState(true); // Un estado extra para saber si está cargando

  // 3. useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getPopularMovies();
        setMovies(moviesData); // Guardamos las películas en el estado
      } catch (error) {
        console.error("Error al cargar las películas:", error);
      } finally {
        setLoading(false); // Dejamos de cargar, con o sin error
      }
    };

    fetchMovies();
  }, []); // El array vacío `[]` asegura que solo se ejecute una vez

  // 4. Filtramos las películas basadas en el `searchTerm`
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-gray-900 min-h-screen text-white font-sans p-8">
      {/* DIV central superior */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Movies
        </h1>
        <input
          type="text"
          placeholder="Busca tu película por nombre..."
          className="w-full max-w-lg p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado del buscador
        />
      </div>

      {/* Mostramos un mensaje mientras carga */}
      {loading ? (
        <p className="text-center text-xl">Cargando películas...</p>
      ) : (
        // El contendor ahora recibe las películas filtradas y las renderiza
        <Contendor>
          {filteredMovies.map((movie) => (
            <Tarjeta key={movie.id} item={movie} />
          ))}
        </Contendor>
      )}
    </main>
  );
}

export default App;
