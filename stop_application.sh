#!/bin/bash

# Função para verificar se um comando foi bem-sucedido
check_command() {
    if [ $? -ne 0 ]; then
        echo "Erro na execução do comando: $1"
        exit 1
    fi
}

# Função para matar o processo pelo número da porta
kill_process_by_port() {
    local port=$1
    echo "Procurando processo na porta $port..."

    # Encontra o PID do processo que está ouvindo na porta
    pid=$(lsof -t -i:$port)

    if [ -z "$pid" ]; then
        echo "Nenhum processo encontrado na porta $port."
    else
        echo "Matando processo $pid na porta $port..."
        kill -9 $pid
        check_command "matar processo na porta $port"
        echo "Processo na porta $port encerrado com sucesso."
    fi
}

# Parar o backend (porta 3000)
kill_process_by_port 3000

# Parar o frontend (porta 5174)
kill_process_by_port 5173

echo "Aplicação parada com sucesso!"

exit 0

