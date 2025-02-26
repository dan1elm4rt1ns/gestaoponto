#!/bin/bash

# Função para verificar se um comando foi bem-sucedido
check_command() {
    if [ $? -ne 0 ]; then
        echo "Erro na execução do comando: $1"
        exit 1
    fi
}

# Acessa a pasta backend e executa o npm start com nohup
echo "Iniciando o backend..."

cd /home/djdalg/gestao-ponto-github/gestaoponto/backend || exit 1
nohup npm start &

# Verifica se o comando 'nohup npm start &' foi bem-sucedido e exibe o log
echo "Verificando o log do backend..."
sleep 5  # Dá um tempo para o backend iniciar
tail -n 20 nohup.out
check_command "backend start"

# Acessa a pasta frontend e executa o npm run dev com nohup
echo "Iniciando o frontend..."

cd /home/djdalg/gestao-ponto-github/gestaoponto/frontend || exit 1
nohup npm run dev &

# Aguardar até que o frontend esteja completamente iniciado.
echo "Aguardando o frontend iniciar..."
sleep 5  # Espera por 5 segundos para o processo começar

# Verifica se o frontend iniciou corretamente, aguardando uma string no log.
# Modifique a string caso sua aplicação de frontend mostre uma linha de log específica indicando que foi inicializada.
echo "Verificando o log do frontend..."

# Aguarda a string "Vite server started" no log (ou qualquer outra linha que indique que o frontend foi inicializado)
while ! grep -q " ready in" nohup.out; do
    echo "Aguardando o frontend iniciar..."
    sleep 5  # Aguarda mais 5 segundos antes de verificar novamente
done

# Agora que o frontend iniciou corretamente, exibe o log
tail -n 20 nohup.out

check_command "frontend start"

echo "Aplicação iniciada com sucesso!"

exit 0
