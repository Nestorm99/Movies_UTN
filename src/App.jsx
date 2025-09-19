import { useState, useEffect } from 'react';
import { getPopularMovies } from './api.js'; 
import { Tarjeta } from './components/Tarjeta.jsx';
import { Contendor } from './components/Contenedor.jsx';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getPopularMovies();
        setMovies(moviesData); 
      } catch (error) {
        console.error("Error al cargar las películas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); 

 
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-gray-900 min-h-screen text-white font-sans p-8">
    
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Movies
        </h1>
        <input
          type="text"
          placeholder="Busca tu película por nombre..."
          className="w-full max-w-lg p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

    
      {loading ? (
        <p className="text-center text-xl">Cargando películas...</p>
      ) : (
       
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
