import { ApiError, NetworkError, ProductNotFoundError } from '../utils/errorHandler';

const BASE_URL = 'https://dummyjson.com/products';

export async function request<T>(endpoint: string = ''): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`);
  } catch (error) {
    throw new NetworkError(
      error instanceof Error ? error.message : 'Network failure'
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new ProductNotFoundError(
        `Product cannot be found at endpoint: ${endpoint}`,
        response.status
      );
    }

    throw new ApiError(
      `API Error: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  return (await response.json()) as T;
}