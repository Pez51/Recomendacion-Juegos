from flask import Flask, request, jsonify
from flask_cors import CORS
from clipspy import Environment

app = Flask(_name_)
CORS(app)

@app.route('/api/recommend', methods=['POST'])
def recommend():
    user_data = request.get_json()
    
    # 1. Crear entorno CLIPS
    env = Environment()

    # 2. Cargar reglas (usa load)
    env.load('TrabajoFaseUno.clp')  # Aquí están tus reglas

    # 3. Cargar hechos (usa batch para hechos)
    env.batch_star('HechosTrabajoFaseUno.clp')  # Aquí están tus hechos base

    # 4. Insertar hechos personalizados
    env.assert_string(f"(edad {user_data['age']})")
    
    for p in user_data['platforms']:
        env.assert_string(f'(plataforma "{p}")')
    
    for g in user_data['preferredGenres']:
        env.assert_string(f'(gusta-genero "{g}")')
    
    for g in user_data['dislikedGenres']:
        env.assert_string(f'(no-gusta-genero "{g}")')
    
    env.assert_string(f'(complejidad "{user_data["complexity"]}")')
    env.assert_string(f'(duracion "{user_data["duration"]}")')
    env.assert_string(f'(multiplayer "{user_data["multiplayer"]}")')
    
    for g in user_data['likedGames']:
        env.assert_string(f'(le-gusto "{g}")')

    # 5. Ejecutar el motor de inferencia
    env.run()

    # 6. Recoger recomendaciones
    recomendaciones = []
    for fact in env.facts():
        if fact.template.name == 'recomendar':
            juego_id = fact['juego']
            recomendaciones.append(juego_id)

    return jsonify({'recomendaciones': recomendaciones})

if _name_ == '_main_':
    app.run(debug=True)