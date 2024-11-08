import numpy as np
import tensorflow as tf
from tensorflow.keras import layers

# Lista de habilidades e atividades
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
    (1, [
        "Reconhecer a separação das palavras na escrita por espaços em branco",
        "Nomear as letras do alfabeto e recitá-lo na ordem das letras"
    ]),
    (2, [
        "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas",
        "Comparar palavras identificando semelhanças e diferenças entre sons de sílabas mediais e finais"
    ]),
    (3, [
        "Reconhecer a separação das palavras na escrita por espaços em branco",
        "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas"
    ]),
    (4, [
        "Identificar outros sinais no texto além de letras, como pontos finais, de interrogação e exclamação e seus efeitos na entonação",
        "Nomear as letras do alfabeto e recitá-lo na ordem das letras"
    ]),
    (5, [
        "Recitar parlendas, quadras, quadrinhas, trava_línguas, com entonação adequada e observando as rimas",
        "Agrupar palavras pelo critério de aproximação de significado (sinonímia) e separar palavras pelo critério de oposição de signifcado (antonímia)"
    ]),
    (6, [
        "Identificar elementos de uma narrativa lida ou escutada, incluindo personagens, enredo, tempo e espaço",
        "Comparar palavras identificando semelhanças e diferenças entre sons de sílabas mediais e finais"
    ]),
    (7, [
        "Agrupar palavras pelo critério de aproximação de significado (sinonímia) e separar palavras pelo critério de oposição de signifcado (antonímia)",
        "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas"
    ]),
    (8, [
        "Reconhecer a separação das palavras na escrita por espaços em branco",
        "Recitar parlendas, quadras, quadrinhas, trava_línguas, com entonação adequada e observando as rimas"
    ]),
    (9, [
        "Nomear as letras do alfabeto e recitá-lo na ordem das letras",
        "Identificar elementos de uma narrativa lida ou escutada, incluindo personagens, enredo, tempo e espaço"
    ]),
    (10, [
        "Identificar outros sinais no texto além de letras, como pontos finais, de interrogação e exclamação e seus efeitos na entonação",
        "Recitar parlendas, quadras, quadrinhas, trava_línguas, com entonação adequada e observando as rimas"
    ]),  
    (11, [
        "Segmentar palavras em sílabas e remover e substituir sílabas iniciais, mediais ou finais para criar novas palavras",
        "Ler e escrever corretamente palavras com marcas de nasalidade (til, m, n)"
    ]),
    (12, [
        "Perceber o princípio acrofônico que opera nos nomes das letras do alfabeto",
        "Escrever palavras, frases, textos curtos nas formas imprensiva e cursiva"
    ]),
    (13, [
        "Segmentar corretamente as palavras ao escrever frases e textos",
        "Usar adequadamente ponto final, ponto de interrogação e ponto de exclamação"
    ]),
    (14, [
        "Formar o aumentativo e o diminutivo de palavras com os sufixos -ão e -inho/-zinho",
        "Cantar cantigas e canções, obedecendo ao ritmo e à melodia"
    ]),
    (15, [
        "Nomear as letras do alfabeto e recitá-lo na ordem das letras",
        "Segmentar palavras em sílabas e remover e substituir sílabas iniciais, mediais ou finais para criar novas palavras"
    ]),
    (16, [
        "Ler e escrever corretamente palavras com marcas de nasalidade (til, m, n)",
        "Formar o aumentativo e o diminutivo de palavras com os sufixos -ão e -inho/-zinho"
    ]),
    (17, [
        "Perceber o princípio acrofônico que opera nos nomes das letras do alfabeto",
        "Cantar cantigas e canções, obedecendo ao ritmo e à melodia"
    ])
]


# Dicionário de habilidades
habildict = {habilidade: idx for idx, habilidade in enumerate(habilidades)}

# Função para converter uma lista de habilidades para um vetor binário
def habilidades_para_vetor(hab_list):
    vetor = np.zeros(len(habilidades))
    for hab in hab_list:
        if hab in habildict:
            vetor[habildict[hab]] = 1
    return vetor

# Dados de entrada (habilidades associadas a cada atividade)
X = np.array([habilidades_para_vetor(atividade[1]) for atividade in atividades])
y = np.array([atividade[0] - 1 for atividade in atividades])

# Reshape para entrada compatível com RNN (3D: amostras, timesteps, features)
X = X.reshape((X.shape[0], 1, X.shape[1]))

# Definindo o modelo com camada LSTM (RNN)
model = tf.keras.Sequential([
    layers.LSTM(64, input_shape=(X.shape[1], X.shape[2]), return_sequences=False),
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(len(atividades), activation='softmax')
])

# Compilação e treino do modelo
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X, y, epochs=250, verbose=2)

# Salvar o modelo treinado
model.save('modelo_recomendacao_atualizado.h5', include_optimizer=True)

# Carregar o modelo treinado
modelo_carregado = tf.keras.models.load_model('modelo_recomendacao_atualizado.h5')

# Compilar o modelo carregado
modelo_carregado.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Função de recomendação
def recomendar_atividades(habilidades_aluno, threshold=0.25):
    # Converter habilidades do aluno para vetor binário
    vetor_habilidades = habilidades_para_vetor(habilidades_aluno).reshape(1, 1, -1)

    # Fazer predição
    predicao = modelo_carregado.predict(vetor_habilidades)

    # Encontrar índices das habilidades requisitadas
    idx_habilidades = [habildict[hab] for hab in habilidades_aluno if hab in habildict]

    # Filtrar IDs das atividades que atendam a pelo menos uma das habilidades
    atividades_recomendadas = []
    for idx, prob in enumerate(predicao[0]):
        if prob >= threshold:
            # Verifica se pelo menos uma habilidade do aluno está presente na atividade
            habilidades_atividade = [habildict[hab] for hab in atividades[idx][1] if hab in habildict]
            if any(hab in habilidades_atividade for hab in idx_habilidades):
                atividades_recomendadas.append(atividades[idx][0])
    return atividades_recomendadas

# Testando a recomendação com habilidades do aluno
habilidades_aluno = ["Recitar parlendas, quadras, quadrinhas, trava_línguas, com entonação adequada e observando as rimas"]
atividades_recomendadas = recomendar_atividades(habilidades_aluno)
print("IDs das atividades recomendadas para o aluno:", atividades_recomendadas)