# Innyx Desafio Técnico

Este sistema foi desenvolvido como parte de um desafio técnico da empresa **Innyx**, com o objetivo de demonstrar meu empenho, auto-organização, auto-gerenciamento e domínio técnico.

## 🛠 Stack Utilizada

- **Banco de dados**: MySQL  
- **Backend**: PHP 9 com Laravel 12  
- **Frontend**: Vue 3
- **Autenticação**: Utilizei o Sanctum do Laravel para demonstrar a autenticação via tokens, coletando o token do backend no Login e utilizando nas demais chamadas dentro das paginas do sistema.
- **Estilização**: Adicionei bootstrap 5 ao projeto para gerar responsividade e ao mesmo tempo estilizar alguns componentes de forma dinâmica

> Nota: Em versões recentes do Docker, `compose` se tornou um subcomando nativo.  
> Portanto, onde antes usávamos `docker-compose`, agora pode-se usar simplesmente`docker compose`.

---

## 🚀 Como Executar o Sistema

### 1. (Opcional) Parar containers existentes, se já executou o sistema antes:

```bash
docker compose down
```

## 2 - Dentro do diretorio innyx construa a aplicação usando docker
```bash
docker-compose up --build -d
```
<mark>o Frontend pode ser acessado no localhost:5173<mark/>

## 3 - Durante a primeira execução devem ser executada a migração no backend para criação das tabelas, use
```bash
docker-compose exec backend php artisan migrate
```
#
> dica extra: o backend deve estar servindo para que o comando funcione, então mesmo que a build esteja completa no passo 2 você pode ver algum erro se executar a migração imediatamente ao fim da build, espere alguns instantes ou
> verifique no log do laravel_app no Docker Desktop se o servidor já iniciou completamente para executar a migração.

## Você pode reiniciar as partes individuais do sistema
```bash
docker-compose restart mysql
docker-compose restart backend
docker-compose restart frontend 
```

---

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

no linux tal configuração não deve ser necessaria.

---

# Executar Manualmente o frontend e o backend
> você precisará do composer para instalar as dependencias do backend e do node/npm para as do frontend
> Além disso você precisará criar seu próprio banco no MySql e configurar o .env para acessa-lo corretamente
## Dentro do diretorio frontend
```bash
npm install
npm run dev
```
## Dentro do diretorio backend
```bash
composer install
php artisan serve
```

# Se deseja criar uma nova chave de sistema
> O .env do projeto contém uma chave já criada pra simplificar um pouco os passos da execução
## Caso sinta necessidade de criar uma nova exclua a linha APP_KEY do .env do backend e execute no diretorio do backend
```bash
php artisan key:generate
```
