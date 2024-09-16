/*
 *
 *
 */

export class ApiError extends Error {
  status: number;
  errors?: any;  // eslint-disable-line 

  constructor(message: string, status: number, errors?: any) { // eslint-disable-line 
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
