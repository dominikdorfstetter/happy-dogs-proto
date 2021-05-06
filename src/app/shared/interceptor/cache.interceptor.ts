import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import { Map } from 'immutable';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<HttpRequest<any>, HttpResponse<any>> = Map();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    const cachedResponse: HttpResponse<any> = this.cache.get(req);
    debugger;
    if (cachedResponse) {
      console.log('returned from cache');
      return of(cachedResponse.clone());
    } else {
      console.log('response from origin');
      return next.handle(req).pipe(
        tap(stateEvent => {
          if (stateEvent instanceof HttpResponse) {
            this.cache = this.cache.set(req, stateEvent.clone());
          }
        }),
        share());
    }
  }
}
