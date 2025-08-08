export const api = {
  get: async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, { ...options, method: "GET" });
    return response.json();
  },
  post: async (url: string, data: any, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return response.json();
  },
  put: async (url: string, data: any, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, { ...options, method: "DELETE" });
    return response.json();
  },
};
