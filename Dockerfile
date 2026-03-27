FROM python:3.11-slim

WORKDIR /app

# Instala dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código
COPY app.py .

# Porta que o Cloud Run espera
ENV PORT=8080

CMD ["python", "app.py"]
