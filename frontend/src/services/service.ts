function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

async function getCsrfToken(): Promise<string> {
  await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
  const token = getCookie('XSRF-TOKEN');
  if (!token) throw new Error('CSRF token not found');
  return decodeURIComponent(token);
}

export async function loginService(email: string, password: string) {
  const token = await getCsrfToken();

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': token,
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return res.ok
    ? { success: true }
    : { success: false, message: data.message || 'Erro no login' };
}

export async function registerService(name: string, email: string, password: string) {
  const token = await getCsrfToken();

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': token,
    },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  return res.ok
    ? { success: true }
    : { success: false, message: data.message || 'Erro ao registrar' };
}

export async function listarCategorias() {
  const res = await fetch('/api/categorias', {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
}

export async function criarCategoria(nome: string) {
  const token = await getCsrfToken();

  const res = await fetch('/api/categorias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': token,
    },
    credentials: 'include',
    body: JSON.stringify({ nome }),
  });

  const data = await res.json();
  return res.ok ? { success: true, data } : { success: false, message: data.message };
}