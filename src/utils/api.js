export const getAuthToken = () => localStorage.getItem('authToken');

export const fetchWithAuth = async (url, options = {}) => {
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
