import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras import layers

# Dados de entrada (boletim)
boletim = [
    ("Escrever", 8),
    ("Ler", 6),
    ("Somar", 4),
    ("Dividir", 7),
    ("Multiplicar", 3)
]

skill = []
grades = []
# Preparação dos dados
for materia,nota in boletim:
    skill.append(materia)
    grades.append(nota)
    


print(skill)
print(grades)

tokenizer = Tokenizer()
tokenizer.fit_on_texts(skill)
vocab_size = len(tokenizer.word_index) + 1

sequences = tokenizer.texts_to_sequences(skill)
max_length = max([len(seq) for seq in sequences])
padded_sequences = pad_sequences(sequences, maxlen=max_length, padding='post')

# Criação do modelo
model = tf.keras.Sequential([
    layers.Embedding(input_dim=vocab_size, output_dim=16, input_length=max_length),
    layers.LSTM(32),
    layers.Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# Treinamento do modelo
labels = (np.array(grades) < 5).astype(int)
model.fit(padded_sequences, labels, epochs=100, verbose=2)

# Fazer previsões
predictions = model.predict(padded_sequences)
binary_predictions = (predictions > 0.5).astype(int)

# Mostrar as previsões no terminal
result = "Devem ser revisadas:"
for i, (materia, nota) in enumerate(boletim):
    predicao = binary_predictions[i][0]
    resultado = "Reprovado" if predicao == 1 else "Aprovado"
    if resultado == "Reprovado": 
        result += " " + materia

print(result)