import { Response } from 'express';
import { IExtendedRequest } from '../interfaces/IExtendedRequest';
import fs from 'fs';

const setHeaders = (res: Response) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-AUTH-TOKEN,X-Auth-Token,x-auth-token',
    'Strict-Transport-Security': 'max-age=63072000',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    'Referrer-Policy': 'strict-origin',
    'Expect-CT': 'max-age=86400, enforce',
  });
};

const success = (req: IExtendedRequest, res: Response, message: string, data: any) => {
  const responseJSON = { error: false, message, data };
  req.log.response = responseJSON;
  setHeaders(res);
  res.status(200).json(responseJSON);
};

const badRequest = (req: IExtendedRequest, res: Response, message: string, data: any) => {
  const responseJSON = { error: true, message, data };
  req.log.response = responseJSON;
  setHeaders(res);
  res.status(400).json(responseJSON);
};

const notFound = (req: IExtendedRequest, res: Response, message: string, data: any) => {
  const responseJSON = { error: true, message, data };
  req.log.response = responseJSON;
  setHeaders(res);
  res.status(404).json(responseJSON);
};

const internalServerError = (req: IExtendedRequest, res: Response, message: string, data: any) => {
  const responseJSON = { error: true, message, data };
  req.log.response = responseJSON;
  setHeaders(res);
  res.status(500).json(responseJSON);
};

const unAuthorized = (req: IExtendedRequest, res: Response, message: string) => {
  const responseJSON = { error: true, message };
  req.log.response = responseJSON;
  setHeaders(res);
  res.status(401).json(responseJSON);
};

const forbidden = (req: IExtendedRequest, res: Response, message: string) => {
  const responseJSON = { error: true, message };
  req.log.response = responseJSON;
  setHeaders(res);
  res.status(403).json(responseJSON);
};

const sendExcelBinary = (req: IExtendedRequest, res: Response, filePath: string) => {
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', (error) => {
    console.error('Error reading the file:', error);
    return internalServerError(req, res, 'Error while reading the file', {});
  });

  setHeaders(res);
  res.status(200);
  fileStream.pipe(res);
};

export default {
  success,
  badRequest,
  internalServerError,
  forbidden,
  notFound,
  unAuthorized,
  sendExcelBinary,
};
