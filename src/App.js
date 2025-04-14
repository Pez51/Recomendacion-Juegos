import React, { useState } from 'react';
import PreferencesForm from './components/PreferencesForm'; // Sin llaves
import RecommendationList from './components/RecommendationList'; 
import GameList from './components/GameList';
import './App.css';


function App() {
  const [userPreferences, setUserPreferences] = useState(null);
  const [allGames, setAllGames] = useState([
    {
      id: 'g1',
      title: 'Dragon Quest XI',
      genre: 'RPG',
      platforms: ['PC'],
      complexity: 'Alta',
      duration: 'Larga',
      multiplayer: 'No',
      ageRating: '13+'
    },
    {
      id: 'g2',
      title: 'Persona 5',
      genre: 'RPG',
      platforms: ['PS4'],
      complexity: 'Alta',
      duration: 'Larga',
      multiplayer: 'No',
      ageRating: '16+',
      similarTo: 'g1'
    },
    {
      id: 'g3',
      title: 'Silent Hill',
      genre: 'Terror',
      platforms: ['PC'],
      complexity: 'Media',
      duration: 'Corta',
      multiplayer: 'No',
      ageRating: '18+'
    },
    {
      id: 'g4',
      title: 'Monster Hunter World',
      genre: 'Aventura',
      platforms: ['PC'],
      complexity: 'Alta',
      duration: 'Larga',
      multiplayer: 'Si',
      ageRating: '13+'
    }
  ]);

  const handleSubmitPreferences = (preferences) => {
    setUserPreferences(preferences);
  };

  const getRecommendations = () => {
    if (!userPreferences) return [];
    
    return allGames.filter(game => {
      // Filtro por plataforma
      const platformMatch = userPreferences.platforms.some(platform => 
        game.platforms.includes(platform)
      );
      
      // Filtro por género preferido
      const genreMatch = userPreferences.preferredGenres.includes(game.genre);
      
      // Filtro por género no gustado
      const dislikedGenre = userPreferences.dislikedGenres.includes(game.genre);
      
      // Filtro por edad
      const ageMatch = !isInappropriate(game.ageRating, userPreferences.age);
      
      return platformMatch && genreMatch && !dislikedGenre && ageMatch;
    });
  };

  const isInappropriate = (rating, age) => {
    if (rating === "18+" && age < 18) return true;
    if (rating === "16+" && age < 16) return true;
    return false;
  };

  return (
    <div className="App">
      <h1>Sistema de Recomendación de Juegos</h1>
      
      {!userPreferences ? (
        <PreferencesForm 
          onSubmit={handleSubmitPreferences} 
          allGames={allGames}
        />
      ) : (
        <RecommendationList 
          recommendations={getRecommendations()} 
          allGames={allGames}
          onBack={() => setUserPreferences(null)}
        />
      )}
    </div>
  );
}

export default App;
