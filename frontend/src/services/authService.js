const API_URL = 'http://35.154.213.99:5000/api';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  // Store auth data
  localStorage.setItem('auth', 'true');
  localStorage.setItem('token', 'true');
  localStorage.setItem('userEmail', email);

  return { email };
};

export const logout = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
};

export const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};
