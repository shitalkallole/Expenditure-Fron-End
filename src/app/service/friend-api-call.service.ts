import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface createFriendResponse{
  friendId:any;
  friendName:String;
}

interface successMessageResponse{
  successMessage:String;
}

@Injectable({
  providedIn: 'root'
})
export class FriendApiCallService {

  private baseUrl="http://localhost:8082/friend";

  constructor(private http:HttpClient) { }

  createFriend(friendRequest){
    return this.http.post<createFriendResponse>(this.baseUrl,friendRequest);
  }

  getFriends(){
    return this.http.get(this.baseUrl);
  }

  updateFriend(friendId,friendRequest){
    return this.http.put(this.baseUrl+"/"+friendId,friendRequest);
  }

  deleteFriend(friendId){
    return this.http.delete<successMessageResponse>(this.baseUrl+"/"+friendId);
  }

}
