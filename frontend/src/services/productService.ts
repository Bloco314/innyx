import type { Produto } from "../models/product";
import { getCsrfToken } from "./service";

export async function listarProdutos() {
  const res = await fetch("/api/produtos", {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}

export async function criarProduto(produto: Produto) {
  const token = await getCsrfToken();

  const res = await fetch("/api/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": token,
    },
    credentials: "include",
    body: JSON.stringify(produto),
  });

  const data = await res.json();
  return res.ok
    ? { success: true, data }
    : { success: false, message: data.message };
}

export async function obterProduto(id: number) {
  const res = await fetch(`/api/produtos/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  return res.ok
    ? { success: true, data }
    : { success: false, message: data.message };
}

export async function atualizarProduto(id: number, produto: Produto) {
  const token = await getCsrfToken();

  const res = await fetch(`/api/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": token,
    },
    credentials: "include",
    body: JSON.stringify(produto),
  });

  const data = await res.json();
  return res.ok
    ? { success: true, data }
    : { success: false, message: data.message };
}

export async function deletarProduto(id: number) {
  const token = await getCsrfToken();

  const res = await fetch(`/api/produtos/${id}`, {
    method: "DELETE",
    headers: {
      "X-XSRF-TOKEN": token,
    },
    credentials: "include",
  });

  return res.status === 204
    ? { success: true }
    : { success: false, message: (await res.json()).message };
}

export async function listarProdutosPaginado(
  page: number = 1,
  perPage: number = 10
) {
  const res = await fetch(
    `/api/produtos/paginado?page=${page}&per_page=${perPage}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();
  return res.ok
    ? {
        success: true,
        data: {
          items: data.items,
          total: data.total,
          currentPage: data.current_page,
          lastPage: data.last_page,
        },
      }
    : { success: false, message: data.message };
}

export async function filtrarProdutos(filtros: {
  nome?: string;
  descricao?: string;
}) {
  const queryParams = new URLSearchParams();

  if (filtros.nome) queryParams.append("nome", filtros.nome);
  if (filtros.descricao) queryParams.append("descricao", filtros.descricao);

  const res = await fetch(`/api/produtos/filtrado?${queryParams.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  return res.ok
    ? { success: true, data }
    : { success: false, message: data.message };
}
