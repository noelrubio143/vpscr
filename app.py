import os
import requests
from flask import Flask

app = Flask(__name__)

@app.route("/")
def meu_ip():
    try:
        # api.ipify.org é um serviço gratuito que devolve só o IP público
        ip = requests.get("https://api.ipify.org").text
        return f"""
        <h1>IP de saída do Cloud Run</h1>
        <p><strong>{ip}</strong></p>
        <p>(Este é o IP que o seu serviço usa para sair para a internet)</p>
        """
    except Exception as e:
        return f"Erro: {str(e)}"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
