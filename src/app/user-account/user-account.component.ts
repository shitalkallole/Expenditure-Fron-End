import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';
import { UserRegister } from '../model/http-request/user-register';
import { UserApiCallService } from '../service/user-api-call.service';
import { UserPasswordUpdate } from '../model/http-request/user-password-update';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  
  public redirectUrl:String="/user-signin-signup/signin";
  
  public userData;
  
  public updateUser=new UserRegister();
  public updatePassword=new UserPasswordUpdate();

  public status=[];
  constructor(private shareData:ShareDataService,private userApiCall:UserApiCallService,private route:Router) { }

  ngOnInit() {
    this.userData=this.shareData.getUserData();

    //set default data for updateUserInformation 
    this.updateUser.userName=this.userData.name;
    this.updateUser.emailId=this.userData.emailId;
    this.updateUser.gender=this.userData.gender;

    if(this.updateUser.gender=='male')
      this.status.push(true);
    else
     this.status.push(false);
    
    if(this.updateUser.gender=='female')
      this.status.push(true);
    else
     this.status.push(false);
    
   if(this.updateUser.gender=='other')
      this.status.push(true);
    else
     this.status.push(false);
  }

  onUpdateUserInformationClick(){
    this.userApiCall.updateUser(this.updateUser)
        .subscribe(data=>{
          this.shareData.setUserData(data);
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//bad request
            console.log(error.error);
          }
        });
  }

  onUpdateUserPasswordClick(newPassword,confirmPassword){
    //check all condition for valid password
    if(newPassword==confirmPassword)
    {
      this.updatePassword.newPassword=newPassword;
      this.userApiCall.updatePassword(this.updatePassword)
          .subscribe(data=>{
            console.log(data.successMessage);
          },
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{//bad request
              console.log(error.status);
              console.log(error.error);
            }
          });
    }
    else
    {
      console.log("please enter correct confirm password");
    }

  }
  onDeleteMyAccountClick(){
    this.userApiCall.deleteUser()
        .subscribe(data=>{
          console.log(data.successMessage);
          this.route.navigate(['/user-signin-signup/signin']);
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//bad request
            console.log(error.error);
          }
        });
  }

}
