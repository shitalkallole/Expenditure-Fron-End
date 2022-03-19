import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpSession } from '../model/http-request/http-session';

interface validateSessionResponse{
  userId:string;
  userName:string;
  emailId:string;
  gender:string;
}

interface successMessageResponse{
  successMessage:String;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl="http://localhost:8082/session";

  constructor(private http:HttpClient) { }

  public validateSession(){
    return this.http.get<validateSessionResponse>(this.baseUrl+"/validate");
  }
  public deleteSession(){
    return this.http.delete<successMessageResponse>(this.baseUrl+"/deleteSession");
  }
}
