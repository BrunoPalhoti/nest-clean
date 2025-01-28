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
      { data: T } | { data: { status: string; message: string } }
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ data: T } | { data: { status: string; message: string } }> {
    return next.handle().pipe(
      map((data) => {
        if (data) {
          return { data }
        } else {
          return {
            data: {
              status: 'success',
              message: 'Operação realizada com sucesso',
            },
          }
        }
      }),
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(() => error)
        }
        return throwError(() => new HttpException('Internal server error', 500))
      }),
    )
  }
}
