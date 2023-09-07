export class ErrorHandlingModel extends Error {
  constructor(public message: string,
              public statusCode: number) {
    super(message);
  }
}
