/**
 * Base custom error class for application and HTTP errors.
 */
export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'API Error occurred', statusCode: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;

    // Restores proper prototype chain in TypeScript
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when network connectivity fails or the fetch request is rejected.
 */
export class NetworkError extends ApiError {
  constructor(
    message: string = 'Network failure: Unable to reach the server',
    statusCode: number = 500
  ) {
    super(message, statusCode);
    this.name = 'NetworkError';
  }
}

/**
 * Thrown when a 404 status is returned for a requested product or endpoint.
 */
export class ProductNotFoundError extends ApiError {
  constructor(
    message: string = 'Product not found',
    statusCode: number = 404
  ) {
    super(message, statusCode);
    this.name = 'ProductNotFoundError';
  }
}

/**
 * Formats any caught error into a user-friendly message for UI display.
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ProductNotFoundError) {
    return `[404 Not Found] ${error.message}`;
  }

  if (error instanceof NetworkError) {
    return `[Network Connection Error] ${error.message}`;
  }

  if (error instanceof ApiError) {
    return `[Error ${error.statusCode}] ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred while processing your request.';
}

/**
 * Utility to log categorized error details to the console for debugging.
 */
export function logError(error: unknown): void {
  if (error instanceof ApiError) {
    console.error(`[${error.name}] Status Code: ${error.statusCode} | Message: ${error.message}`);
  } else if (error instanceof Error) {
    console.error(`[${error.name}] ${error.message}`);
  } else {
    console.error('Unknown Error:', error);
  }
}