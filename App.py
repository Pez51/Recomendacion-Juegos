from flask import Flask, request, jsonify
import clips
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/recommend', methods=['POST'])
def recommend():
    try:
        user_data = request.get_json()
        
        # 1. Crear entorno CLIPS
        env = clips.Environment()

        # 2. Cargar reglas y hechos base
        env.load('TrabajoFase1.clp')
        env.build('(batch "HechosTrabajoFase1.clp")')

        # 3. Insertar hechos del usuario actual
        env.assert_string(f'(Usuario (id u1))')
        env.assert_string(f'(Edad_Usuario (usuario u1) (edad {user_data["age"]}))')

        for platform in user_data['platforms']:
            env.assert_string(f'(Posee_Plataforma (usuario u1) (plataforma "{platform}"))')

        for genre in user_data['preferredGenres']:
            env.assert_string(f'(Prefiere_Genero (usuario u1) (genero "{genre}"))')

        for genre in user_data['dislikedGenres']:
            env.assert_string(f'(No_Gusta_Genero (usuario u1) (genero "{genre}"))')

        if user_data['complexity'] != 'Cualquiera':
            env.assert_string(f'(Prefiere_Complejidad (usuario u1) (nivel "{user_data["complexity"]}"))')

        if user_data['duration'] != 'Cualquiera':
            env.assert_string(f'(Prefiere_Duracion (usuario u1) (tipo "{user_data["duration"]}"))')

        if user_data['multiplayer'] != 'Cualquiera':
            env.assert_string(f'(Prefiere_Multiplayer (usuario u1) (tipo "{user_data["multiplayer"]}"))')

        for game_id in user_data['likedGames']:
            env.assert_string(f'(Gusto_Juego (usuario u1) (juego {game_id}))')
            env.assert_string(f'(Jugo_Juego (usuario u1) (juego {game_id}))')

        # 4. Ejecutar el motor de inferencia
        env.run()

        # 5. Recoger recomendaciones
        recommendations = []
        for fact in env.facts():
            if str(fact.template) == 'Recomendacion_Final':
                game_id = str(fact['juego'])
                # Buscar detalles del juego en los hechos
                game_details = {'id': game_id}
                
                for detail_fact in env.facts():
                    if str(detail_fact.template) == 'Titulo_Juego' and str(detail_fact['juego']) == game_id:
                        game_details['title'] = str(detail_fact['titulo'])
                    elif str(detail_fact.template) == 'Tiene_Genero' and str(detail_fact['juego']) == game_id:
                        game_details['genre'] = str(detail_fact['genero'])
                    # Agregar más detalles según necesites
                
                recommendations.append(game_details)

        return jsonify({'recommendations': recommendations})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '_main_':
    app.run(debug=True)