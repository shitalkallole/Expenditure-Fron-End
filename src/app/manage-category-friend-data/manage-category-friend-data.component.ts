import { Component, OnInit } from '@angular/core';
import { CategoryApiCallService } from '../service/category-api-call.service';
import { ShareDataService } from '../service/share-data.service';
import { CategoryRequest } from '../model/http-request/category-request';
import { FriendRequest } from '../model/http-request/friend-request';
import { FriendApiCallService } from '../service/friend-api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-category-friend-data',
  templateUrl: './manage-category-friend-data.component.html',
  styleUrls: ['./manage-category-friend-data.component.css']
})
export class ManageCategoryFriendDataComponent implements OnInit {
  
  public redirectUrl:String="/user-signin-signup/signin";

  private categoryMapToFindWhichButtonsToShow=new Map();
  private friendMapToFindWhichButtonsToShow=new Map();

  //variables used for http request
  private categoryRequest=new CategoryRequest();
  private friendRequest=new FriendRequest();
  
  //variables used for http response
  private categoryList:any=[];
  private friendList:any=[];

  constructor(private shareData:ShareDataService,private categoryApiCall:CategoryApiCallService,private friendApiCall:FriendApiCallService,private route:Router) { }

  ngOnInit() {
    //get all categories
    this.categoryApiCall.getCategories()
        .subscribe(data=>{
          this.categoryList=data;
          this.categoryList.forEach(element => {
              this.categoryMapToFindWhichButtonsToShow.set(element.categoryId,1);
          });
        },
        error=>{
          //not required because this api is called on page load and when page loads by default session validation is done through auth guard
            
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//may be bad request
            console.log(error.error);
          }
        });

    //get All friends

    this.friendApiCall.getFriends()
    .subscribe(data=>{
      this.friendList=data;
      this.friendList.forEach(element => {
        this.friendMapToFindWhichButtonsToShow.set(element.friendId,1);
      });
    },
    error=>{
      //not required because this api is called on page load and when page loads by default session validation is done through auth guard
            
      if(error.status==403){//forbidden
        this.route.navigate([this.redirectUrl]);
        console.log("session expired pls login");
      }
      else{//may be bad request
        console.log(error.error);
      }
    });
  }

  onAddCategoryClick(){
    //check condition of categoryData i.e categoryRequest.categoryName not empty
    this.categoryApiCall.createCategory(this.categoryRequest)
    .subscribe(data=>{
      this.categoryList.push(data);
      this.categoryMapToFindWhichButtonsToShow.set(data.categoryId,1);

      this.categoryRequest.categoryName="";
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
  onEditCategoryClick(categoryId,updatedCategoryData,index){
    updatedCategoryData.disabled=false;
    this.categoryMapToFindWhichButtonsToShow.set(categoryId,0);
  }
  onUpdateCategoryClick(categoryId,updatedCategoryData,index){
    //check field is not empty
    let updateCategory=new CategoryRequest();
    updateCategory.categoryName=updatedCategoryData.value;

    this.categoryApiCall.updateCategory(categoryId,updateCategory)
        .subscribe(data=>{
          this.categoryList[index].categoryName=updatedCategoryData.value;
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//may be bad request or unauthorized
            updatedCategoryData.value=this.categoryList[index].categoryName;//assign to default value if error occured during update
            console.log(error.error);
          }   
        });
    
    /* the below code get executes if there is 403 also or any error  */
    updatedCategoryData.disabled=true;
    this.categoryMapToFindWhichButtonsToShow.set(categoryId,1);
  }
  onDeleteCategoryClick(categoryId,index){
    this.categoryApiCall.deleteCategory(categoryId)
        .subscribe(data=>{
          this.categoryList.splice(index,1);
          this.categoryMapToFindWhichButtonsToShow.delete(categoryId);

          console.log(data.successMessage);
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else
          {//may be bad request or unauthorized
            console.log(error.error);
          }
        });
  }
  onCancelCategoryClick(categoryId,updatedCategoryData,index){
    updatedCategoryData.value=this.categoryList[index].categoryName;
    updatedCategoryData.disabled=true;

    this.categoryMapToFindWhichButtonsToShow.set(categoryId,1);
  }

  //---------------------------------start of friend operation----------------------------------
  onAddFriendClick(){
    //check condition of friendData not empty
    this.friendApiCall.createFriend(this.friendRequest)
        .subscribe(data=>{
          this.friendList.push(data);
          this.friendMapToFindWhichButtonsToShow.set(data.friendId,1);

          this.friendRequest.friendName="";
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//may be bad request
            console.log(error.error);
          }
        });
  }

  onEditFriendClick(friendId,updatedFriendData){
    updatedFriendData.disabled=false;
    this.friendMapToFindWhichButtonsToShow.set(friendId,0);
  }

  onUpdateFriendClick(friendId,updatedFriendData,index){
    //check friend field is not empty
    let updateFriend=new FriendRequest();
    updateFriend.friendName=updatedFriendData.value;

    this.friendApiCall.updateFriend(friendId,updateFriend)
        .subscribe(data=>{
          this.friendList[index].friendName=updatedFriendData.value;
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//may be bad request or unauthorized 
            updatedFriendData.value=this.friendList[index].friendName;//assign to default value if error occured during update
            console.log(error.error);
          }
        });

    updatedFriendData.disabled=true;
    this.friendMapToFindWhichButtonsToShow.set(friendId,1);
  }

  onCancelFriendClick(friendId,updatedFriendData,index){
    updatedFriendData.value=this.friendList[index].friendName;
    updatedFriendData.disabled=true;

    this.friendMapToFindWhichButtonsToShow.set(friendId,1);
  }
  
  onDeleteFriendClick(friendId,index){
    this.friendApiCall.deleteFriend(friendId)
        .subscribe(data=>{
          this.friendList.splice(index,1);
          this.friendMapToFindWhichButtonsToShow.delete(friendId);

          console.log(data.successMessage);
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//may be bad request or unauthorized 
            console.log(error.error);
          }
        });
  }
}
