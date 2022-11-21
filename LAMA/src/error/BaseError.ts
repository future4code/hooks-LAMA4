export class BaseError extends Error {
  constructor( public statusCode: number,messege: string)
  {
    super(messege)
  }
}
  