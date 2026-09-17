

const MovieList = ({ movies }) => {
  return (
    <div className="table-wrapper">
      <table className="movies-table">
        <thead>
          <tr>
            <th scope="col" style={{ width: '50%' }}>Title</th>
            <th scope="col" style={{ width: '30%' }}>Genre</th>
            <th scope="col" style={{ width: '20%' }}>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <tr key={`${movie.title}-${index}`}>
                <td className="movie-title">{movie.title}</td>
                <td>
                  <span className="genre-badge">{movie.genre}</span>
                </td>
                <td className="movie-year">{movie.year}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-movies">
                No movies found for this genre.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;