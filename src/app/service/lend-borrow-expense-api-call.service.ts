import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface successMessageResponse{
  successMessage:String;
}

@Injectable({
  providedIn: 'root'
})
export class LendBorrowExpenseApiCallService {

  private baseUrl="http://localhost:8082/lendborrowexpense";

  constructor(private http:HttpClient) { }

  public createEntryInLendBorrowExpense(lendBorrowExpenseRequest){
    return this.http.post<successMessageResponse>(this.baseUrl,lendBorrowExpenseRequest);
  }

  public getAllLendBorrowExpensesBetweenDates(betweenDatesRequest){
    return this.http.get(this.baseUrl+"/show"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate);
  }

  public getAllLendBorrowExpensesOfFriendBetweenDates(betweenDatesRequest){
    return this.http.get(this.baseUrl+"/show"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate+"/"+betweenDatesRequest.friendId);
  }

  public deleteAllLendBorrowExpensesBetweenDates(betweenDatesRequest){
    return this.http.delete<successMessageResponse>(this.baseUrl+"/delete"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate);

  }
  public deleteAllLendBorrowExpensesOfFriendBetweenDates(betweenDatesRequest){
    return this.http.delete<successMessageResponse>(this.baseUrl+"/delete"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate+"/"+betweenDatesRequest.friendId);
  }

  public updateEntryInLendBorrowExpense(transactionId,lendBorrowExpenseRequest){
    return this.http.put(this.baseUrl+"/"+transactionId,lendBorrowExpenseRequest);
  }

  public deleteEntryFromLendBorrowExpense(transactionId){
    return this.http.delete<successMessageResponse>(this.baseUrl+"/"+transactionId);
  }

  public calculateLendBorrowExpenseForEachFriend(betweenDatesRequest){
    return this.http.get(this.baseUrl+"/calculate/all"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate);
  }

  public calculateLendBorrowExpenseForSingleFriend(betweenDatesRequest){
    return this.http.get(this.baseUrl+"/calculate"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate+"/"+betweenDatesRequest.friendId);
  }

  public calculateLendExpenseForCategory(betweenDatesRequest){
    return this.http.get(this.baseUrl+"/calculate/category/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate+"/"+betweenDatesRequest.categoryId);
  }
}
