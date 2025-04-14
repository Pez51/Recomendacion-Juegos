import React, { useState } from 'react';

const PreferencesForm = ({ onSubmit, allGames }) => {
  const [formData, setFormData] = useState({
    age: 18,
    platforms: [],
    preferredGenres: [],
    dislikedGenres: [],
    complexity: 'Cualquiera',
    duration: 'Cualquiera',
    multiplayer: 'Cualquiera',
    likedGames: []
  });

  const allGenres = [...new Set(allGames.map(game => game.genre))];
  const allPlatforms = [...new Set(allGames.flatMap(game => game.platforms))];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const key = name.includes('dislike') ? 'dislikedGenres' : 
                 name.includes('platform') ? 'platforms' : 
                 name.includes('game') ? 'likedGames' : 'preferredGenres';
      
      setFormData(prev => {
        const newArray = checked 
          ? [...prev[key], value] 
          : prev[key].filter(item => item !== value);
        return { ...prev, [key]: newArray };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="preferences-form">
      <h2>Ingresa tus preferencias</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edad:</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            min="1" 
            max="99" 
          />
        </div>

        <div className="form-group">
          <label>Plataformas:</label>
          {allPlatforms.map(platform => (
            <div key={platform} className="checkbox-item">
              <input
                type="checkbox"
                id={`platform-${platform}`}
                name={`platform-${platform}`}
                value={platform}
                checked={formData.platforms.includes(platform)}
                onChange={handleChange}
              />
              <label htmlFor={`platform-${platform}`}>{platform}</label>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Géneros que te gustan:</label>
          {allGenres.map(genre => (
            <div key={`like-${genre}`} className="checkbox-item">
              <input
                type="checkbox"
                id={`like-${genre}`}
                name={`like-${genre}`}
                value={genre}
                checked={formData.preferredGenres.includes(genre)}
                onChange={handleChange}
              />
              <label htmlFor={`like-${genre}`}>{genre}</label>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Géneros que NO te gustan:</label>
          {allGenres.map(genre => (
            <div key={`dislike-${genre}`} className="checkbox-item">
              <input
                type="checkbox"
                id={`dislike-${genre}`}
                name={`dislike-${genre}`}
                value={genre}
                checked={formData.dislikedGenres.includes(genre)}
                onChange={handleChange}
              />
              <label htmlFor={`dislike-${genre}`}>{genre}</label>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Complejidad preferida:</label>
          <select name="complexity" value={formData.complexity} onChange={handleChange}>
            <option value="Cualquiera">Cualquiera</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label>Duración preferida:</label>
          <select name="duration" value={formData.duration} onChange={handleChange}>
            <option value="Cualquiera">Cualquiera</option>
            <option value="Corta">Corta</option>
            <option value="Media">Media</option>
            <option value="Larga">Larga</option>
          </select>
        </div>

        <div className="form-group">
          <label>¿Prefieres multiplayer?</label>
          <select name="multiplayer" value={formData.multiplayer} onChange={handleChange}>
            <option value="Cualquiera">Cualquiera</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Juegos que te han gustado:</label>
          {allGames.map(game => (
            <div key={`game-${game.id}`} className="checkbox-item">
              <input
                type="checkbox"
                id={`game-${game.id}`}
                name={`game-${game.id}`}
                value={game.id}
                checked={formData.likedGames.includes(game.id)}
                onChange={handleChange}
              />
              <label htmlFor={`game-${game.id}`}>{game.title}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">Obtener Recomendaciones</button>
      </form>
    </div>
  );
};

export default PreferencesForm;
