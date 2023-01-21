//  fetch

export class ApiClient {
  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(
    path: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    if (params) {
      const query = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&");
      path = `${path}?${query}`;
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }

  async post<T>(path: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }

  async put<T>(path: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
}

export const apiClient = new ApiClient("/api");
