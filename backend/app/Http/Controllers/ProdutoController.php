<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index()
    {
        return Produto::all();
    }

    public function show($id)
    {
        return Produto::find($id);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'nome' => 'required|string|max:50',
            'descricao' => 'required|string|max:200',
            'preco' => 'required|numeric|min:0',
            'data_validade' => 'required|date|after_or_equal:today',
            'imagem' => 'nullable|string',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);
    
        return Produto::create($data);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:50',
            'descricao' => 'required|string|max:200',
            'preco' => 'required|numeric|min:0',
            'data_validade' => 'required|date|after_or_equal:today',
            'imagem' => 'nullable|string',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);

        $produto = Produto::findOrFail($id);
        $produto->update($data);

        return response()->json($produto);
    }

    public function destroy($id)
    {
        Produto::destroy($id);

        return response()->json(null, 204);
    }
    
    public function paginated(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $produtos = Produto::paginate($perPage);
    
        return response()->json([
            'items' => $produtos->items(),
            'total' => $produtos->total(),
            'current_page' => $produtos->currentPage(),
            'last_page' => $produtos->lastPage(),
        ]);
    }
    
    public function filtered(Request $request)
    {
        $query = Produto::query();

        if ($request->has('nome')) {
            $query->where('nome', 'like', '%' . $request->input('nome') . '%');
        }

        if ($request->has('descricao')) {
            $query->where('descricao', 'like', '%' . $request->input('descricao') . '%');
        }

        return $query->get();
    }

}
