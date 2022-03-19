import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



interface successMessageResponse{
  successMessage:String;
}
interface userData{
  userId:string;
  userName:string;
  emailId:string;
  gender:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiCallService {

  private baseUrl="http://localhost:8082/user";

  constructor(private http:HttpClient) { }

  public registerUser(userRegister){
    return this.http.post<successMessageResponse>(this.baseUrl+"/register",userRegister).pipe(catchError(this.errorHandler));
  }
  
  public updateUser(userUpdatedData){
    return this.http.put(this.baseUrl,userUpdatedData).pipe(catchError(this.errorHandler));
  }

  public deleteUser(){
    return this.http.delete<successMessageResponse>(this.baseUrl);
  }
  public validateUser(userLogin){
    return this.http.post<userData>(this.baseUrl+"/validate",userLogin,{ observe: "response"});
  }

  public updatePassword(userUpdatedPassword){
    return this.http.put<successMessageResponse>(this.baseUrl+"/updatecredential",userUpdatedPassword).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
