import { Request } from 'express';

export interface IExtendedRequest extends Request {
  id: string;
  log: any;
  token: any;
}
