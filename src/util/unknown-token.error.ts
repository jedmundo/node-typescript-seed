import { HTTP_STATUS_CODES } from './http-status-codes'

export class UnknownTokenError extends Error {

  public status: number

  constructor(message) {
    super(message)

    this.name = this.constructor.name
    this.status = HTTP_STATUS_CODES.FORBIDDEN
  }
}
