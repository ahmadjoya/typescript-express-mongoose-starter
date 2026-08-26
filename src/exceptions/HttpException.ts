export class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpException';
    this.status = status;
    Error.captureStackTrace?.(this, HttpException);
  }
}
