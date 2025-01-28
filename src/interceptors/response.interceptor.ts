import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common'
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'

@Injectable()
export class ResponseInterceptor<T>
  implements
    NestInterceptor<
      T,
      | { status: string; message: string; data?: T }
      | { status: string; message: string; errors?: string[] }
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<
    | { status: string; message: string; data?: T }
    | { status: string; message: string; errors?: string[] }
  > {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        message: 'Operação realizada com sucesso',
        ...(data && { data }),
      })),
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(() => error)
        }
        return throwError(() => new HttpException('Internal server error', 500))
      }),
    )
  }
}
