import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/http-request/user-login';
import { UserApiCallService } from '../service/user-api-call.service';
import { ShareDataService } from '../service/share-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  //variables used for http request
  public userLogin=new UserLogin();


  constructor(private userApiCall:UserApiCallService,private shareDataApiCall:ShareDataService,private route:Router) { }

  ngOnInit() {
  }

  onUserLoginClick(){
    /*
        if(entered data is correct means entered phone number in user id field etc )
        {
          if(api call is success)
            redirect to hime/personalexpense
          else
            stay on same page and show error.status and error.error
        }
        else
          stay on same page ans show error
     */
    this.userApiCall.validateUser(this.userLogin)
        .subscribe(
          data=>{
          this.shareDataApiCall.setUserData(data.body);
          
          localStorage.setItem("uId",data.body.userId);
          localStorage.setItem("sId",data.headers.get("sessionId"));

          this.route.navigate(['/home/personalexpense']);    
        },
        error=>{
          console.log(error.status);
          console.log(error.error);
        }
        );
  }

}
