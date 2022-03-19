import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SessionInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{

    const userId=localStorage.getItem("uId");
    const sessionId=localStorage.getItem("sId");
 
    if(userId!=null && sessionId!=null){
    req=req.clone({
      setHeaders:{
        userId:`${userId}`,
        sessionId:`${sessionId}`
      }
    });
    }
    console.log("interceptor called");
    return next.handle(req);
  }
}
