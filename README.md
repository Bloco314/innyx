observação: em versões recentes do docker 'compose' se tornou um comando do docker
então onde você executava 'docker-compose' você pode usar 'docker compose'

# Para executar o sistema
## Se não for a primeira vez executando recomendo reiniciar os containers atuais com
docker-compose down

## Dentro do diretorio innyx construa a aplicação usando docker
docker-compose up --build -d

## Durante a primeira execução devem ser executada a migração no backend para criação das tabelas, use
docker-compose exec backend php artisan migrate

## Troubleshooting
Se seu host (maquina fisica) é um sistema Windows podem ocorrer erros ao executar 'composer install' dentro do container Linux
Você pode tentar resolver no docker desktop indo sem Setting (iconem de engrenagem no topo) -> Docker Engine e verificando se o
conteudo parece com:

{
  "dns": [
    "8.8.8.8",
    "1.1.1.1"
  ],
  "experimental": false,
  "features": {
    "buildkit": true
  }
}

no linux tal configuração não deve ser necessaria

## Você pode reiniciar as partes individuais do sistema
docker-compose restart mysql <br/>
docker-compose restart backend <br/>
docker-compose restart frontend 
