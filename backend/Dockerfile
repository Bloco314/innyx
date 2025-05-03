FROM php:8.2-cli

# Instala dependências
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip curl git libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www

# Copia o código da aplicação
COPY . .

# Instala dependências PHP
RUN composer install

# Dá permissão para a pasta de cache e storage
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 8000

CMD php artisan migrate --force && php-fpm