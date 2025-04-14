import React from 'react';

const GameList = ({ games }) => {
  return (
    <div className="game-list">
      {games.map(game => (
        <div key={game.id} className="game-card">
          <h3>{game.title}</h3>
          <p><strong>Género:</strong> {game.genre}</p>
          <p><strong>Plataformas:</strong> {game.platforms.join(', ')}</p>
          <p><strong>Complejidad:</strong> {game.complexity}</p>
          <p><strong>Duración:</strong> {game.duration}</p>
          <p><strong>Multiplayer:</strong> {game.multiplayer}</p>
          <p><strong>Clasificación:</strong> {game.ageRating}</p>
        </div>
      ))}
    </div>
  );
};

export default GameList;