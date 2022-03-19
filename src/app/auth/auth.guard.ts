import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ShareDataService } from '../service/share-data.service';
import { HttpSession } from '../model/http-request/http-session';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public signedIn;
  public redirectUrl:String="/user-signin-signup/signin";
  constructor(private authService:AuthService,private shareDataApiCall:ShareDataService,private route:Router){}

   async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean>
    {
      if(localStorage.getItem("uId")!=null && localStorage.getItem("sId")!=null)
      {
        try{
        this.signedIn = await this.authService.validateSession().toPromise();// ;//await used to wait for async call to finish
        }
        catch(e){
          console.log("session expired");  
          this.route.navigate([this.redirectUrl]);  
          return false;
        }
        this.shareDataApiCall.setUserData(this.signedIn);
        return true;
      }
      else
      {
        console.log("Login First");
        this.route.navigate([this.redirectUrl]);
        return false;
      }
    }
}
