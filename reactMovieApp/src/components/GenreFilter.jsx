

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }) => {
  const handleGenreClick = (genre) => {
    // Required: Log the selected genre to the console
    console.log(`Filtering by ${genre}`);
    
    if (onSelectGenre) {
      onSelectGenre(genre);
    }
  };

  return (
    <div className="genre-filter-card">
      <h2 className="genre-filter-title">Filter by Genre</h2>
      <div className="genre-button-group">
        <button
          type="button"
          className={`genre-btn ${selectedGenre === 'All' ? 'active' : ''}`}
          onClick={() => handleGenreClick('All')}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;