<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 50);
            $table->string('descricao', 200);
            $table->double('preco')->unsigned();
            $table->date('data_validade');
            $table->longText('imagem')->nullable(); # base 64
            $table->foreignId('categoria_id')->nullable()->constrained('categorias')->onDelete('cascade');  
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
