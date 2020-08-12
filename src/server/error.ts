import { BAD_REQUEST } from 'http-status-codes';

export interface ApiErrorResponse<T> {
  message: string,
  status?: number,
  data?: T
}

export default class ApiError<T> extends Error {
  public message: string;

  private statusCode: number;

  private data?: T;

  constructor(message: string, statusCode = BAD_REQUEST, data?: T) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  public get status(): number {
    return this.statusCode;
  }

  public buildBody(): ApiErrorResponse<T> {
    return {
      message: this.message,
      status: this.status,
      ...(this.data ? { data: this.data } : {}),
    };
  }
}
