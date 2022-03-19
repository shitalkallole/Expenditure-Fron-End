import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface successMessageResponse{
  successMessage:String;
}
@Injectable({
  providedIn: 'root'
})
export class PersonalExpenseApiCallService {

  private baseUrl="http://localhost:8082/personalexpense";

  constructor(private http:HttpClient) { }

  public createEntryInPersonalExpense(personalExpenseModel){
    return this.http.post<successMessageResponse>(this.baseUrl,personalExpenseModel);
  }

  public getAllPersonalExpensesBetweenDates(betweenDatesRequest){
    return this.http.get(this.baseUrl+"/show"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate);
  }

  public deleteAllPersonalExpenseBetweenDates(betweenDatesRequest){
    return this.http.delete<successMessageResponse>(this.baseUrl+"/delete"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate);
  }

  public updateEntryInPersonalExpense(transactionId,personalExpenseModel){
    return this.http.put(this.baseUrl+"/"+transactionId,personalExpenseModel);
  }

  public deleteEntryFromPersonalExpense(transactionId){
    return this.http.delete<successMessageResponse>(this.baseUrl+"/"+transactionId);
  }
  public calculatePersonalExpense(betweenDatesRequest){
    return this.http.get(this.baseUrl+"/calculate"+"/"+betweenDatesRequest.startDate+"/"+betweenDatesRequest.endDate);
  }
}
