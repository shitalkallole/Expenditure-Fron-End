import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../model/http-request/user-register';
import { UserApiCallService } from '../service/user-api-call.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

   //variables used for http request
   public userRegister=new UserRegister();
   
   constructor(private userApiCall:UserApiCallService,private route:Router) { }
 
   ngOnInit() {
   }
 
   onRegisterUserClick(){
     //do the validation of data i.e confirmpass==pass and mobile =10 digit etc
     /*if(validation is false)
        stay on same page and show error
      else
        call below api
        if(api is success)
           redirect to sign in "show successfully registered and your mobile no is your user id"
        else 
          stay on same page ans show error
     */
     this.userApiCall.registerUser(this.userRegister)
         .subscribe(
           data=>{
            this.route.navigate(['/user-signin-signup/signin']);
            console.log(data.successMessage);
         },
         error=>{
           console.log(error.status);
           console.log(error.error);
         }
        );
   }
 

}
