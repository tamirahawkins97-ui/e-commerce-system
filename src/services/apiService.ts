import { NetworkError, ProductNotFoundError } from '../utils/errorHandler';

const BASE_URL = 'https://dummyjson.com/products';

// 1. Explicitly type endpoint as string
// 2. Type the JSON response properly with a cast
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
      throw new ProductNotFoundError();
    }
    throw new NetworkError(
      `API Error: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  // Use 'as T' so TypeScript safely acknowledges the returned generic type
  const data = (await response.json()) as T;
  return data;
}

