export class NetworkError extends Error {
  public readonly statusCode: number;

  constructor(
    message: string = 'Could not complete request. Please try again later',
    statusCode: number = 500
  ) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  };
};

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'API Error', statusCode: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  };
};

export class ProductNotFoundError extends ApiError {
  constructor(
    message: string = 'Product not found',
    statusCode: number = 404
  ) {
    // Passes message and statusCode directly to ApiError parent
    super(message, statusCode);
    this.name = 'ProductNotFoundError';
  };
};