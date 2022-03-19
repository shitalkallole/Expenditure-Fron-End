import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private userData={
    "id":"",
    "emailId":"",
    "name":"",
    "gender":""
  }
  private  categoryList=[
    {"id":"dff2e8b7-7f51-4324-aa7b-ed3860e3955d","name":"macd"},
    {"id":"1517764f-9c72-4f26-9e98-8706cf1c0966","name":"subway"}  
  ];

  private friendList=[
    {"id":"ec8b496a-5d47-4c76-b935-4481740c62aa","name":"yogesh"},
    {"id":"5b9a04e7-bc5d-4e19-8d58-e5e89234fa3f","name":"aditya"}
  ]

  public setUserData(loggedInUser){
    this.userData.id=loggedInUser.userId;
    this.userData.name=loggedInUser.userName;
    this.userData.emailId=loggedInUser.emailId;
    this.userData.gender=loggedInUser.gender;
  }
  public getUserData(){
    return this.userData;
  }
  public getCategoryList(){
    return this.categoryList;
  }

  public getFriendList(){
    return this.friendList;
  }


  constructor() { }
}
