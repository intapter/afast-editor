export class Result<T> {
  code: number;
  data: T | null;
  message: string;

  constructor(code: number, data: T | null, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }

  static success: <T>(data: T) => Result<T> = (data) => {
    return new Result(200, data, 'success');
  };

  static fail: (message: string) => Result<null> = (message) => {
    return new Result(500, null, message);
  };
}
