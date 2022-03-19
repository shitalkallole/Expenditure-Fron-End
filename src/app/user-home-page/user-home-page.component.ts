import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpSession } from '../model/http-request/http-session';
@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {
 
  public userData;
  constructor(private shareData:ShareDataService,private authService:AuthService,private route:Router) { }

  ngOnInit() {
    this.userData=this.shareData.getUserData();
  }
  onSignoutUserClick(){

    this.authService.deleteSession().subscribe(
      data=>{
        localStorage.removeItem("uId");
        localStorage.removeItem("sId");
        console.log(data.successMessage);
      },
      error=>{
        console.log(error.error);
      }
    );
    this.route.navigate(['/user-signin-signup/signin']);
  }

}
