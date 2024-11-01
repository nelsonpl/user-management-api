import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { QueryFailedError } from 'typeorm';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      let error = exception;
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const response = exception.getResponse();
        message = typeof response === 'string' ? response : (response as any).message;
      } else if (exception instanceof QueryFailedError) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Database query failed';
        if ((exception as any).code === 'ER_DUP_ENTRY') {
          message = 'Duplicate entry found';
        }
      }
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  }