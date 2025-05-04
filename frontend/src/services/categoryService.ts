import type { Category } from "../models/category";
import { getCsrfToken } from "./service";

export async function listarCategorias() {
  const res = await fetch("/api/categorias", {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}

export async function criarCategoria(categoria:Category) {
  const token = await getCsrfToken();
  const nome = categoria.nome;

  const res = await fetch("/api/categorias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": token,
    },
    credentials: "include",
    body: JSON.stringify({ nome }),
  });

  const data = await res.json();
  return res.ok
    ? { success: true, data }
    : { success: false, message: data.message };
}

export async function obterCategoria(id: number) {
  const res = await fetch(`/api/categorias/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  return res.ok
    ? { success: true, data }
    : { success: false, message: data.message };
}

export async function atualizarCategoria(categoria: Category) {
  const token = await getCsrfToken();
  const nome = categoria.nome;

  const res = await fetch(`/api/categorias/${categoria.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": token,
    },
    credentials: "include",
    body: JSON.stringify({ nome }),
  });

  const data = await res.json();
  return res.ok
    ? { success: true, data }
    : { success: false, message: data.message };
}

export async function deletarCategoria(id: number) {
  const token = await getCsrfToken();

  const res = await fetch(`/api/categorias/${id}`, {
    method: "DELETE",
    headers: {
      "X-XSRF-TOKEN": token,
    },
    credentials: "include",
  });

  return res.ok
    ? { success: true }
    : { success: false, message: "Erro ao deletar" };
}
