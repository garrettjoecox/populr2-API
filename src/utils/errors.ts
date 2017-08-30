
export class UserError extends Error {
  public status: number;

  constructor(message?: string, status?: number) {
    super(message);
    this.name = 'UserError';
    this.status = status || 400;
  }
}

export class NotFoundError extends Error {
  public status: number;

  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

export class UnauthorizedError extends Error {
  public status: number;

  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}
