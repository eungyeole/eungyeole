import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export class ApiClient {
  public instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });

    this.instance.interceptors.request.use((config) => {
      const accessToken = getCookie("access_token");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  get<T>(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.get<T>(path, {
      ...config,
      params: data,
    });
  }

  post<TReseponse, F = any>(
    path: string,
    data?: F,
    config?: AxiosRequestConfig<F>
  ) {
    return this.instance.post<TReseponse>(path, data, config);
  }

  put<TReseponse, F = any>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig<F>
  ) {
    return this.instance.put<TReseponse>(path, data, config);
  }

  delete<TReseponse, F = any>(path: string, config?: AxiosRequestConfig<F>) {
    return this.instance.delete<TReseponse>(path, config);
  }

  patch<TReseponse, F = any>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig<F>
  ) {
    return this.instance.patch<TReseponse>(path, data, config);
  }
}

export const apiClient = new ApiClient(
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  process.env.NODE_ENV === "production"
    ? "https://app.feltpen.site/api"
    : "http://localhost:3000/api"
);

export const localApiClient = new ApiClient("http://localhost:3000");
