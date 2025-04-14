import React from 'react';
import GameList from './GameList';

const RecommendationList = ({ recommendations, allGames, onBack }) => {
  return (
    <div className="recommendation-list">
      <button onClick={onBack} className="back-btn">Volver a preferencias</button>
      
      <h2>Tus recomendaciones</h2>
      {recommendations.length > 0 ? (
        <GameList games={recommendations} />
      ) : (
        <p>No hay recomendaciones basadas en tus preferencias.</p>
      )}
      
      <h2>Todos los juegos disponibles</h2>
      <GameList games={allGames} />
    </div>
  );
};

export default RecommendationList;
