# Para executar o sistema
## Se não for a primeira vez executando recomendo reiniciar os containers atuais com
docker-compose down

## Dentro do diretorio innyx construa a aplicação usando docker
docker-compose up --build -d

## Durante a primeira execução deve ser executada a migração no backend para criação das tabelas, você pode usar
docker-compose exec backend php artisan migrate

## Você pode reiniciar as partes individuais do sistema
docker-compose restart mysql <br/>
docker-compose restart backend <br/>
docker-compose restart frontend <br/>
