import numpy as np
import tensorflow as tf
from tensorflow.keras import layers

# Lista de habilidades e atividades
habilidades = ["Reconhecer a separação das palavras na escrita por espaços em branco", "Nomear as letras do alfabeto e recitá-lo na ordem das letras", "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas", "Comparar palavras identificando semelhanças e diferenças entre sons de sílabas mediais e finais"]

atividades = [
    (1, ["Reconhecer a separação das palavras na escrita por espaços em branco", "Nomear as letras do alfabeto e recitá-lo na ordem das letras"]),
    (2, ["Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas", "Comparar palavras identificando semelhanças e diferenças entre sons de sílabas mediais e finais"]),
    (3, ["Reconhecer a separação das palavras na escrita por espaços em branco", "Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas"]),
]

# Dicionário de habilidades
habildict = {habilidade: idx for idx, habilidade in enumerate(habilidades)}

# Função para converter uma lista de habilidades para um vetor binárioa
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

def recomendar_atividades(habilidades_aluno, threshold=0.25):
    # Converter habilidades do aluno para vetor binário
    vetor_habilidades = habilidades_para_vetor(habilidades_aluno).reshape(1, 1, -1)
    
    # Fazer predição
    predicao = model.predict(vetor_habilidades)
    
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
habilidades_aluno = ["Conhecer diferenciar e relacionar letras em formato imprensa e cursiva maiúsculas e minúsculas"]
atividades_recomendadas = recomendar_atividades(habilidades_aluno)
print("IDs das atividades recomendadas para o aluno:", atividades_recomendadas)

