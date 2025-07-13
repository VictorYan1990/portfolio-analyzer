export const getAuthToken = (): string | null => localStorage.getItem('authToken');

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const fetchWithAuth = async (url: string, options: FetchOptions = {}): Promise<any> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // Ensure the "Bearer" prefix is added
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}; 