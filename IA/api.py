import tensorflow as tf 
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

MODEL_PATH = "modelo_recomendacao_atualizado.h5"

# Carregar o modelo treinado
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"Modelo carregado com sucesso de: {MODEL_PATH}")
except Exception as e:
    print(f"Erro ao carregar o modelo: {e}")
    exit(1)


# Lista de habilidades
habilidades = [
    "Reconhecer a separação das palavras na escrita por espaços em branco",
    "Nomear as letras do alfabeto e recitá-lo na ordem das letras",
    "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas",
    "Comparar palavras identificando semelhanças e diferenças entre sons de sílabas mediais e finais",
    "Nomear as letras do alfabeto e recitá-lo na ordem das letras",
    "Identificar outros sinais no texto além de letras, como pontos finais, de interrogação e exclamação e seus efeitos na entonação",
    "Agrupar palavras pelo critério de aproximação de significado (sinonímia) e separar palavras pelo critério de oposição de signifcado (antonímia)",
    "Recitar parlendas, quadras, quadrinhas, trava_línguas, com entonação adequada e observando as rimas",
    "Identificar elementos de uma narrativa lida ou escutada, incluindo personagens, enredo, tempo e espaço",
    "Segmentar palavras em sílabas e remover e substituir sílabas iniciais, mediais ou finais para criar novas palavras",
    "Ler e escrever corretamente palavras com marcas de nasalidade (til, m, n)",
    "Perceber o princípio acrofônico que opera nos nomes das letras do alfabeto",
    "Escrever palavras, frases, textos curtos nas formas imprensiva e cursiva",
    "Segmentar corretamente as palavras ao escrever frases e textos", 
    "Usar adequadamente ponto final, ponto de interrogação e ponto de exclamação",
    "Formar o aumentativo e o diminutivo de palavras com os sufixos -ão e -inho/-zinho",
    "Cantar cantigas e canções, obedecendo ao ritmo e à melodia"
]

atividades = [
    {
        "id": 1,
        "descricao": "Atividade de identificação de palavras e espaços em branco",
        "habilidades_relacionadas": [
            "Reconhecer a separação das palavras na escrita por espaços em branco",
            "Nomear as letras do alfabeto e recitá-lo na ordem das letras"
        ]
    },
    {
        "id": 2,
        "descricao": "Atividade de diferenciação de letras e sons",
        "habilidades_relacionadas": [
            "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas",
            "Comparar palavras identificando semelhanças e diferenças entre sons de sílabas mediais e finais"
        ]
    },
    {
        "id": 3,
        "descricao": "Atividade de identificação de separação de palavras e diferenciação de letras",
        "habilidades_relacionadas": [
            "Reconhecer a separação das palavras na escrita por espaços em branco",
            "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas"
        ]
    },
    {
        "id": 4,
        "descricao": "Atividade de identificação de sinais no texto e letras do alfabeto",
        "habilidades_relacionadas": [
            "Identificar outros sinais no texto além de letras, como pontos finais, de interrogação e exclamação e seus efeitos na entonação",
            "Nomear as letras do alfabeto e recitá-lo na ordem das letras"
        ]
    },
    {
        "id": 5,
        "descricao": "Atividade de recitação de parlendas e agrupamento de palavras por significados",
        "habilidades_relacionadas": [
            "Recitar parlendas, quadras, quadrinhas, trava-línguas, com entonação adequada e observando as rimas",
            "Agrupar palavras pelo critério de aproximação de significado (sinonímia) e separar palavras pelo critério de oposição de significado (antonímia)"
        ]
    },
    {
        "id": 6,
        "descricao": "Atividade de identificação de elementos de uma narrativa e comparação de palavras",
        "habilidades_relacionadas": [
            "Identificar elementos de uma narrativa lida ou escutada, incluindo personagens, enredo, tempo e espaço",
            "Comparar palavras identificando semelhanças e diferenças entre sons de sílabas mediais e finais"
        ]
    },
    {
        "id": 7,
        "descricao": "Atividade de agrupamento de palavras e diferenciação de letras",
        "habilidades_relacionadas": [
            "Agrupar palavras pelo critério de aproximação de significado (sinonímia) e separar palavras pelo critério de oposição de significado (antonímia)",
            "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas"
        ]
    },
    {
        "id": 8,
        "descricao": "Atividade de separação de palavras e recitação de parlendas",
        "habilidades_relacionadas": [
            "Reconhecer a separação das palavras na escrita por espaços em branco",
            "Recitar parlendas, quadras, quadrinhas, trava-línguas, com entonação adequada e observando as rimas"
        ]
    },
    {
        "id": 9,
        "descricao": "Atividade de nomeação de letras do alfabeto e identificação de elementos da narrativa",
        "habilidades_relacionadas": [
            "Nomear as letras do alfabeto e recitá-lo na ordem das letras",
            "Identificar elementos de uma narrativa lida ou escutada, incluindo personagens, enredo, tempo e espaço"
        ]
    },
    {
        "id": 10,
        "descricao": "Atividade de identificação de sinais no texto e recitação de parlendas",
        "habilidades_relacionadas": [
            "Identificar outros sinais no texto além de letras, como pontos finais, de interrogação e exclamação e seus efeitos na entonação",
            "Recitar parlendas, quadras, quadrinhas, trava-línguas, com entonação adequada e observando as rimas"
        ]
    },
    {
        "id": 11,
        "descricao": "Atividade de segmentação de palavras e escrita de palavras com nasalidade",
        "habilidades_relacionadas": [
            "Segmentar palavras em sílabas e remover e substituir sílabas iniciais, mediais ou finais para criar novas palavras",
            "Ler e escrever corretamente palavras com marcas de nasalidade (til, m, n)"
        ]
    },
    {
        "id": 12,
        "descricao": "Atividade de percepção acrofônica e escrita de palavras e textos",
        "habilidades_relacionadas": [
            "Perceber o princípio acrofônico que opera nos nomes das letras do alfabeto",
            "Escrever palavras, frases, textos curtos nas formas impressiva e cursiva"
        ]
    },
    {
        "id": 13,
        "descricao": "Atividade de segmentação de palavras e uso de pontuação",
        "habilidades_relacionadas": [
            "Segmentar corretamente as palavras ao escrever frases e textos",
            "Usar adequadamente ponto final, ponto de interrogação e ponto de exclamação"
        ]
    },
    {
        "id": 14,
        "descricao": "Atividade de formação de aumentativos e diminutivos e cantigas",
        "habilidades_relacionadas": [
            "Formar o aumentativo e o diminutivo de palavras com os sufixos -ão e -inho/-zinho",
            "Cantar cantigas e canções, obedecendo ao ritmo e à melodia"
        ]
    },
    {
        "id": 15,
        "descricao": "Atividade de nomeação das letras e segmentação de palavras",
        "habilidades_relacionadas": [
            "Nomear as letras do alfabeto e recitá-lo na ordem das letras",
            "Segmentar palavras em sílabas e remover e substituir sílabas iniciais, mediais ou finais para criar novas palavras"
        ]
    },
    {
        "id": 16,
        "descricao": "Atividade de escrita correta de palavras e formação de aumentativos e diminutivos",
        "habilidades_relacionadas": [
            "Ler e escrever corretamente palavras com marcas de nasalidade (til, m, n)",
            "Formar o aumentativo e o diminutivo de palavras com os sufixos -ão e -inho/-zinho"
        ]
    },
    {
        "id": 17,
        "descricao": "Atividade de percepção acrofônica e cantigas",
        "habilidades_relacionadas": [
            "Perceber o princípio acrofônico que opera nos nomes das letras do alfabeto",
            "Cantar cantigas e canções, obedecendo ao ritmo e à melodia"
        ]
    }
]


habil_dict = {habilidade: idx for idx, habilidade in enumerate(habilidades)}

def habilidades_para_vetor(hab_list):
    """Converte uma lista de habilidades para um vetor binário"""
    vetor = np.zeros(len(habilidades))
    for hab in hab_list:
        if hab in habil_dict:
            vetor[habil_dict[hab]] = 1
    return vetor

# Função para encontrar atividades recomendadas com base nas habilidades e no modelo
def recomendar_atividades(habilidades_aluno, threshold=0.20):
    """
    Retorna atividades recomendadas com base nas habilidades do aluno e no threshold.
    """
    # Converter habilidades para vetor binário
    vetor_habilidades = habilidades_para_vetor(habilidades_aluno)

    # Certificar-se de que a forma do vetor é (1, 17)
    vetor_habilidades = np.expand_dims(vetor_habilidades, axis=0)  # Adiciona uma dimensão extra
    vetor_habilidades = np.expand_dims(vetor_habilidades, axis=1)  # Adiciona a dimensão de sequência (1)


    # Fazer a predição
    try:
        predicao = model.predict(vetor_habilidades)
    except Exception as e:
        print(f"Erro na predição: {e}")
        return []

    # Filtrar atividades recomendadas
    atividades_recomendadas = [
        atividade for idx, atividade in enumerate(atividades)
        if predicao[0][idx] >= threshold
    ]

    return atividades_recomendadas


@app.route("/recomendar", methods=["POST"])
def recomendar():
    """
    Endpoint para recomendar atividades com base nas habilidades do aluno.
    """
    data = request.json
    habilidades_aluno = data.get("habilidades", [])
    threshold = data.get("threshold", 0.20)  # Threshold padrão: 0.25

    habilidade : str = habilidades_aluno[0]

    if habilidade.endswith("."):
        habilidade = habilidade[:-1]

    print(habilidade)

    # Obter atividades recomendadas
    atividades_recomendadas = recomendar_atividades([habilidade], threshold)

    # Retornar a lista de atividades recomendadas
    return jsonify({"atividades_recomendadas": atividades_recomendadas})

if __name__ == "__main__":
    app.run(debug=True)